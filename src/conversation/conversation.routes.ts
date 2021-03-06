import * as express from "express";

import conversation from "./conversation.controller";

class Conversation {
	public router: express.Router;

	constructor() {
		this.router = express.Router();

		this.router.route("/");

		this.router.get("/", async (_, res) => {
			try {
				const conversations = await conversation.getAll();
				res.status(200).json({
					conversations,
					msg: "",
					ok: true
				});
			} catch (err) {
				res.status(400).json({
					msg: err.message,
					ok: false
				});
			}
		});

		this.router.get("/read/:id", async (req, res) => {
			try {
				const { id } = req.params;

				const {text, lastMutation} = await conversation.readConversation(id);
				res.status(200).json({
					text,
					lastMutation,
					msg: "",
					ok: true
				});
			} catch (err) {
				res.status(400).json({
					msg: err.message,
					ok: false
				});
			}
		});

		this.router.get("/:id", async (req, res) => {
			try {
				const { id } = req.params;

				const conv = await conversation.find(id);
				res.status(200).json({
					conversation: conv,
					msg: "",
					ok: true
				});
			} catch (err) {
				res.status(400).json({
					msg: err.message,
					ok: false
				});
			}
		});

		this.router.post("/", async (req, res) => {
			try {
				const body = req.body;

				const newConv = await conversation.create(body);
				res.status(200).json({
					conversation: newConv,
					msg: "",
					ok: true
				});
			} catch (err) {
				res.status(400).json({
					msg: err.message,
					ok: false
				});
			}
		});

		this.router.delete("/:id", async (req, res) => {
			try {
				const { id } = req.params;
				const deleted = await conversation.delete(id);
				res.status(200).json({
					deleted,
					msg: "",
					ok: true
				});
			} catch (err) {
				res.status(400).json({
					msg: err.message,
					ok: false
				});
			}
		});
	}
}

export default new Conversation().router;
