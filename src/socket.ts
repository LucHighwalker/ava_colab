import { Socket } from "socket.io";

export default (socket: Socket) => {
  console.log("socket connected");

  socket.on("message", msg => {
    console.log("message received: ", msg)
  })
}