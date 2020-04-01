import { Schema, Model, model } from "mongoose";
import { Conversation } from "../interfaces/conversation";

export const ConversationSchema: Schema = new Schema({
	lastMutation: {
		type: Object,
	},
	text: {
		type: String,
	},
	mutations: {
		type: [Object],
	},
	creator: {
		type: String,
		required: true,
	},
});

const ConversationModel: Model<Conversation> = model<Conversation>("Conversation", ConversationSchema);

export default ConversationModel;
