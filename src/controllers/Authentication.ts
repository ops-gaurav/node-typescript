import { TokenUtility } from 'appknit-backend-bundle';

/**
 * Authentication Controller class that contains the authentication
 * function to handle the application entity authentication using 
 * authorization header.
 */
class AuthenticationController {
	private request;
	private response;
	private next;
	
	private readonly userIdentifierRole1 = 'user1';
	private readonly userIdentifierRole2 = 'user2';

	/**
	 * prepare the decoded data
	 * @param userIdentifier 
	 */
	private prepareDecodedData(userIdentifier: string): Promise<object> {
		const { headers: { authorization } } = this.request;
		const decoded = TokenUtility.decodeToken(authorization);
		if (decoded) {
			const { data: { email, _id, role } } = decoded;
			if (role === userIdentifier) {
				return Promise.resolve({ type: userIdentifier, email, id: _id });
			}
		}
		return Promise.reject();
	}

	/**
	 * handles the decoding of header and process express request/response
	 * routing
	 * @param userIdentifier 
	 */
	private commonDecodingHandler(userIdentifier: string): void {
		const { headers: { authorization } } = this.request;
		if (authorization) {
			this.prepareDecodedData(userIdentifier)
				.then((payload) => {
					const body = Object.assign({}, this.request.body, payload);
					this.request.body = body;
					return this.next();
				}).catch(() => {
					this.response.status(401).send({ code: 401, message: 'Token might be invalid or has been expired.' });
				})
		} else {
			return this.response.status(400).send({ code: 400, message: 'Malformed Request', error: 'Missing headers.' });
		}
	}

	/**
	 * @returns a middleware function for handling user1 authentication
	 */
	public authenticateUser1(request, response, next): void {
		this.request = request;
		this.response = response;
		this.next = next;
		return this.commonDecodingHandler(this.userIdentifierRole1);
	}
	/**
	 * @returns a middleware function for handlign user 2 authentication
	 */
	public authenticateUser2(request, response, next): void {
		this.request = request;
		this.response = response;
		this.next = next;
		return this.commonDecodingHandler(this.userIdentifierRole2);
	}
};

export default new AuthenticationController();