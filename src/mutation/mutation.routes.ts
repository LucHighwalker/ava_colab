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
				const mutagen = await mutation.create(body);
				res.status(200).json({
					mutation: mutagen,
					msg: "",
					ok: true
				});
			} catch (err) {
				res.status(500).json({
					msg: err.message,
					ok: false
				});
			}
		});
	}
}

export default new Mutation().router;
