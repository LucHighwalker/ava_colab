import { Schema, Model, model } from "mongoose";
import { Conversation } from "../interfaces/conversation";

export const ConversationSchema: Schema = new Schema({
	lastMutation: {
		type: Schema.Types.ObjectId,
		ref: "Mutation"
	},
	text: {
		type: String
	},
	mutations: [
		{
			type: Schema.Types.ObjectId,
			ref: "Mutation"
		}
	],
	creator: {
		type: String,
		required: true
	}
});

const ConversationModel: Model<Conversation> = model<Conversation>(
	"Conversation",
	ConversationSchema
);

export default ConversationModel;
