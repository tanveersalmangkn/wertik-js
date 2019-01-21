export default `
	type UserRole {
		id: Int
		user: Int
		role: Int
		successMessage: String
		successMessageType: String
		errors: [String]
		statusCode: String
		statusCodeNumber: Int
		created_at: String
		updated_at: String
	}
`;