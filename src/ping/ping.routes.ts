import * as express from 'express';

import ping from './ping.controller';

class Ping {
	public router: express.Router;

	constructor() {
		this.router = express.Router();

		this.router.route('/');

		this.router.get("/", (_, res) => {
			res.status(200).json({
				"ok": true,
				"msg": "pong"
			})
		})
	}
}

export default new Ping().router;
