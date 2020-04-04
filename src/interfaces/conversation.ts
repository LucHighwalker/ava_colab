import { Document } from "mongoose";
import { Mutation } from "./mutation"

export interface Conversation extends Document {
	lastMutation: Mutation;
	text: String;
	mutations: Mutation[];
	creator: String;
}