import getListByPaginationAndFiltersSchema from "./../../../framework/graphql/getListByPaginationAndFiltersSchema"
const {dialect} = process.env;
let relationSchemaType = "Int";
if (dialect == "MONGO_DB") {
	relationSchemaType = "String";
}
export default `
	type UserRole {
		_id: String
		id: Int
		user: User
		role: Role
		successMessage: String
		successMessageType: String
		createdAt: String
		updatedAt: String
	}
	${getListByPaginationAndFiltersSchema("UserRole")}
	input UserRoleInput {
		_id: String
		id: Int
		user: ${relationSchemaType}
		role: ${relationSchemaType}
	}
`;