import * as express from "express";

import mutation from "./mutation.controller";

class Mutation {
	public router: express.Router;

	constructor() {
		this.router = express.Router();

		this.router.route("/");

		this.router.post("/", async (req, res) => {
			try {
				const body = req.body;
				const { text } = await mutation.create(body);
				res.status(200).json({
					text,
					msg: "",
					ok: true,
				});
			} catch (err) {
				res.status(400).json({
					msg: err.message,
					ok: false,
				});
			}
		});
	}
}

export default new Mutation().router;
