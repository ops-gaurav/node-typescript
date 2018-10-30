import EntityRoutes from './Entity';

export default class RoutesActivator {
	constructor(app) {
		new EntityRoutes(app);
	}
};
