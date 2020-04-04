import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as expressSanitizer from "express-sanitizer";
import * as http from "http";

import * as socket from "socket.io";
import socketConnection from "./socket";

import pingRoutes from "./ping/ping.routes";
import infoRoutes from "./info/info.routes";
import conversationRoutes from "./conversation/conversation.routes";
import mutationRoutes from "./mutation/mutation.routes";

class Server {
	public server: http.Server;
	public app: express.Express;
	public io: socket.Server;

	constructor() {
		this.app = express();
		this.createServer();
		this.connectDb();
		this.connectSocketIO();
		this.applyMiddleware();
		this.mountRoutes();
	}

	public listen(port: String | Number): void {
		this.server.listen(port, (error: Error) => {
			if (error) {
				return console.log(error);
			}

			return console.log(`Server is listening on port: ${port}`);
		});
	}

	private createServer(): void {
		this.server = http.createServer(this.app);
	}

	private connectDb(): void {
		const mongo = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/colab";
		mongoose.connect(mongo, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		const db = mongoose.connection;
		db.on("error", console.error.bind(console, "MongoDB Connection error"));
	}

	private connectSocketIO(): void {
		this.io = socket.listen(this.server, {
			origins: "http://192.168.1.15:3001",
			path: "/socket",
		});
		this.io.on("connect", socketConnection);
	}

	private applyMiddleware(): void {
		this.app.use(expressSanitizer());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(cors());
	}

	private mountRoutes(): void {
		this.app.use("/ping", pingRoutes);
		this.app.use("/info", infoRoutes);
		this.app.use("/conversations", conversationRoutes);
		this.app.use("/mutations", mutationRoutes);
	}
}

export default new Server();
