import * as mongoose from 'mongoose';
import database from '../Database';

const EntitySchema = new mongoose.Schema({
	name: String,
});

export default database.model('Entity', EntitySchema);
