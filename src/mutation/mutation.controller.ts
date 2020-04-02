import MutationModel from "../models/mutation";
import { Mutation } from "../interfaces/mutation";

class MutationController {
	public async create(body: any): Promise<Mutation | Error> {
		try {
			const mutation = new MutationModel(body);
			await mutation.save();
			return mutation;
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
				runValidators: true
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
