export interface ErrorResponse<TResponse> {
	statusCode?: number
	errors?: string[]
	data?: TResponse
}
