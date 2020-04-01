import * as express from 'express';

import info from './info.controller';

class Info {
	public router: express.Router;

	constructor() {
		this.router = express.Router();

		this.router.route('/');

		this.router.get("/", (req, res) => {
			res.status(200).json(info.getInfo())
		})
	}
}

export default new Info().router;
