import * as mongoose from 'mongoose';
import Constants from './Constants';

mongoose.connect(Constants.mongoConnectionString, {}, (err) => {
	if (err) {
		console.error(err);
		throw new Error(err);
	}
	console.log('Connected to database');
});

export default mongoose;