import MutationModel from "../models/mutation";
import { Mutation } from "../interfaces/mutation";

import conversations from "../conversation/conversation.controller";

class MutationController {
	private originsAreSame(mutA: Mutation, mutB: Mutation): Boolean {
		if (mutA === undefined || mutA === null) return false;

		let same = true;

		Object.keys(mutB.origin).forEach((key) => {
			if (mutA.origin[key] !== mutB.origin[key]) {
				same = false;
				return;
			}
		});
		return same;
	}

	// TODO create interface.
	public async create(body: any): Promise<any> {
		try {
			const mutation = new MutationModel(body);
			let conversation = await conversations.find(mutation.conversationId);

			if (conversation === null) {
				conversation = await conversations.create({ creator: mutation.author });
				mutation.conversationId = conversation._id;
			}

			const lastMutation = await MutationModel.findById(
				conversation.lastMutation
			);

			if (this.originsAreSame(lastMutation, mutation)) {
				mutation.origin[lastMutation.author] !== undefined
					? (mutation.origin[lastMutation.author] += 1)
					: (mutation.origin[lastMutation.author] = 1);

				if (lastMutation.data._index <= mutation.data._index) {
					if (lastMutation.data.type === "insert") {
						mutation.data._index += lastMutation.data.length;
					} else if (lastMutation.data.type === "delete") {
						mutation.data._index -= lastMutation.data.length - 1;
						if (mutation.data._index < 0) mutation.data._index = 0;
					}
				}
			}

			await mutation.save();
			await conversations.addMutation(mutation.conversationId, mutation);
			const { text } = await conversations.readConversation(
				mutation.conversationId
			);
			return {
				text,
				mutation,
			};
		} catch (err) {
			throw err;
		}
	}

	public async find(id: string): Promise<Mutation | Error> {
		try {
			const mutation = await MutationModel.findById(id);
			return mutation;
		} catch (err) {
			throw err;
		}
	}

	public async update(id: string, body: any): Promise<Mutation | Error> {
		try {
			const mutation = await MutationModel.findByIdAndUpdate(id, body, {
				new: true,
				runValidators: true,
			});
			return mutation;
		} catch (err) {
			throw err;
		}
	}

	public async delete(id: string): Promise<string | Error> {
		try {
			await MutationModel.findByIdAndRemove(id);
			return id;
		} catch (err) {
			throw err;
		}
	}
}

export default new MutationController();
