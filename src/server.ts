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
	public server;

	constructor() {
		this.server = express();
		this.connectDb();
		this.connectSocketIO();
		this.applyMiddleware();
		this.mountRoutes();
	}

	private connectDb(): void {
		const mongo = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/colab";
		mongoose.connect(mongo, {
			useNewUrlParser: true,
			useCreateIndex: true
		});
		const db = mongoose.connection;
		db.on("error", console.error.bind(console, "MongoDB Connection error"));
	}

	private connectSocketIO(): void {
		const server = new http.Server(this.server);
		const io = socket(server);

		io.on("connection", socketConnection);
	}

	private applyMiddleware(): void {
		this.server.use(expressSanitizer());
		this.server.use(bodyParser.json());
		this.server.use(bodyParser.urlencoded({ extended: true }));
		this.server.use(cors());
	}

	private mountRoutes(): void {
		this.server.use("/ping", pingRoutes);
		this.server.use("/info", infoRoutes);
		this.server.use("/conversations", conversationRoutes);
		this.server.use("/mutations", mutationRoutes);
	}
}

export default new Server().server;
