import ConversationModel from "../models/conversation";
import { Conversation } from "../interfaces/conversation";
import { Mutation } from "../interfaces/mutation";

class ConversationController {
	public async addMutation(
		id: String,
		mutation: Mutation
	): Promise<Conversation> {
		try {
			const conversation = await this.find(id);
			conversation.mutations.push(mutation);
			conversation.lastMutation = mutation;
			await conversation.save();
			return conversation;
		} catch (err) {
			throw err;
		}
	}

	public async readConversation(
		id: String
	): Promise<any> {
		try {
			const conversation = await ConversationModel.findById(id)
				.populate("mutations")
				.populate("lastMutation");
			const { lastMutation } = conversation;

			let text = "";

			conversation.mutations.forEach((mutation) => {
				const start = mutation.data._index;

				if (mutation.data.type == "insert") {
					text = text.slice(0, start) + mutation.data.text + text.slice(start);
				} else if (mutation.data.type == "delete") {
					const end = start + mutation.data.length;
					text = text.slice(0, start) + text.slice(end);
				}
			});

			return {
				text,
				lastMutation,
			};
		} catch (err) {
			throw err;
		}
	}

	public async getAll(): Promise<Conversation[]> {
		try {
			const conversations = await ConversationModel.find();
			return conversations;
		} catch (err) {
			throw err;
		}
	}

	public async create(body: Conversation): Promise<Conversation> {
		try {
			const conversation = new ConversationModel(body);
			await conversation.save();
			return conversation;
		} catch (err) {
			throw err;
		}
	}

	public async find(id: String): Promise<Conversation> {
		try {
			const conversation = await ConversationModel.findById(id);
			return conversation;
		} catch (err) {
			throw err;
		}
	}

	public async update(id: String, body: any): Promise<Conversation> {
		try {
			const conversation = await ConversationModel.findByIdAndUpdate(id, body, {
				new: true,
				runValidators: true,
			});
			return conversation;
		} catch (err) {
			throw err;
		}
	}

	public async delete(id: String): Promise<String> {
		try {
			await ConversationModel.findByIdAndRemove(id);
			return id;
		} catch (err) {
			throw err;
		}
	}
}

export default new ConversationController();
