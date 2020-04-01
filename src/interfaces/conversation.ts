import { Document } from "mongoose";
	
export interface Conversation extends Document {
	lastMutation: Object;
	text: String;
	mutations: [Mutation];
	creator: String;
}

export interface Mutation {
	author: String;
	conversationId: String;
	data: {
		index: Number;
		length?: Number;
		text?: String;
		type: String;
	}
}