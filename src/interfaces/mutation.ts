import { Document } from "mongoose";

export interface Mutation extends Document {
	author: String;
	conversationId: String;
	data: {
		_index: Number;
		length?: Number;
		text?: String;
		type: String;
	}
	origin: {
		Alice: Number;
		Bob: Number;
	}
}
