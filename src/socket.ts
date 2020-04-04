import { Socket } from "socket.io";

import mutationController from "./mutation/mutation.controller";

export default (socket: Socket) => {
	console.log("socket connected");

	socket.on("message", (msg) => {
		console.log("message received: ", msg);
	});

	socket.on("mutation", async (data) => {
		try {
			const { mutation } = await mutationController.create(data);
			socket.emit(`mutationRecieved-${mutation.conversationId}`, mutation);
		} catch (err) {
			console.log(err);
		}
	});
};
