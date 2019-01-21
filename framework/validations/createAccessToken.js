import moment from "moment";
import jwt from "jsonwebtoken";
export default async function createAccessToken(data) {

	let firstArgument = {data: data};
	let secret = process.env.JWT_SECRET;
	let thirdArgument = { expiresIn: moment().add('1', 'days').seconds()};
	return await jwt.sign(firstArgument, secret, thirdArgument);
}