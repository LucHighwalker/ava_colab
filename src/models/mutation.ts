import { Schema, Model, model } from "mongoose";
import { Mutation } from "../interfaces/mutation";

export const MutationSchema: Schema = new Schema({
	author: {
		type: String,
		required: true,
	},
	conversationId: {
		type: Schema.Types.ObjectId,
		ref: "Conversation",
		required: true,
	},
	data: {
		_index: Number,
		length: Number,
		text: String,
		type: String,
	},
	origin: {
		Alice: Number,
		Bob: Number,
	}
});

const MutationModel: Model<Mutation> = model<Mutation>("Mutation", MutationSchema);

export default MutationModel;
