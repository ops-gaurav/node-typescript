import { ResponseUtility } from 'appknit-backend-bundle';
import Entity from '../schemas/Entity';

export default class EntityModel {
	
	constructor() {
	}

	public async create({ name }): Promise<object> {
		const entityObject = new Entity({ name });
		await entityObject.save();
		return Promise.resolve(ResponseUtility.SUCCESS());
	}
}
