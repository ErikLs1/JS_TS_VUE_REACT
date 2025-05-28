export interface ErrorResponseDto<TResponse> {
    statusCode?: number
    errors?: string[]
    data?: TResponse
}
