export interface RegisterRequest {
	firstName: string
	lastName: string
	email: string
	password: string
	address: string
	phoneNumber: string
	gender: "female" | "male"
	dateOfBirth: string
}
