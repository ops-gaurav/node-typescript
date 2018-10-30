import { EntityModel } from '../model';
import CommonResolver from './CommonResolver';

const entityModel = new EntityModel();

class EntityController {
	constructor() {

	}

	public create(req, res): void {
		return CommonResolver(req, res, entityModel.create);
	}
};

export default new EntityController();