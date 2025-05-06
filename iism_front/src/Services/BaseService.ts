import axiosInstance from "@/Services/axiosInstance";

export abstract class BaseService {
	protected axiosInstance = axiosInstance;
}
