import { Document } from "mongoose";

export interface Mutation extends Document {
	author: string;
	conversationId: string;
	data: {
		_index: number;
		length?: number;
		text?: string;
		type: string;
	}
	origin: object;
}
