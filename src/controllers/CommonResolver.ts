export default function (req, res, modelPromise): void {
	const { body } = req;
	console.log(body);
	modelPromise(body)
		.then(success => res.status(200).send(success))
		.catch(err => res.status(200).send(err));
}