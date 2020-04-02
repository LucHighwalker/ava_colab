import ConversationModel from "../models/conversation";
import { Conversation } from "../interfaces/conversation";

class ConversationController {
	public async getAll(): Promise<Conversation[]> {
		try {
			const conversations = await ConversationModel.find({});
			return conversations
		} catch (err) {
			throw err
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

	public async find(id: string): Promise<Conversation> {
		try {
			const conversation = await ConversationModel.findById(id);
			return conversation
		} catch (err) {
			throw err
		}
	}

	public async update(id: string, body: any): Promise<Conversation> {
		try {
			const conversation = await ConversationModel.findByIdAndUpdate(
				id,
				body,
				{
					new: true,
					runValidators: true
				});
			return conversation
		} catch (err) {
			throw err
		}
	}

	public async delete(id: string): Promise<string> {
		try {
			await ConversationModel.findByIdAndRemove(id)
			return id
		} catch (err) {
			throw err
		}
	}
}

export default new ConversationController();
