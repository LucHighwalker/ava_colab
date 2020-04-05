import { Socket } from "socket.io";

import mutationController from "./mutation/mutation.controller";

export default (socket: Socket) => {
	socket.on("mutation", async (data) => {
		try {
			const { mutation } = await mutationController.create(data);
			socket.broadcast.emit(`mutationRecieved-${mutation.conversationId}`, mutation);
		} catch (err) {
			console.log(err);
		}
	});
};
