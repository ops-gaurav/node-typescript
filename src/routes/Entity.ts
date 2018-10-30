import { RoutingInterface } from './RoutingInterface';
import {
	EntityController,
	AuthenticationController,
} from '../controllers';

export default class EntityRoutes implements RoutingInterface {
	private app;
	private readonly prefix = '/api/entity/';
	
	constructor (app) {
		this.app = app;

		this.initializeRoutes();
	}

	initializeRoutes(): void {
		/**
		 * @todo implement the routes here
		 */
		this.app.get(`${this.prefix}hello`, (req, res) => res.send('Hello world'));
		this.app.post(`${this.prefix}create`, EntityController.create);
	}

}