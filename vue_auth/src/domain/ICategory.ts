import type {IDomainId} from "@/domain/IDomainId.ts";

export interface ICategory extends IDomainId{
    categoryName: string;
    categoryDescription: string;
}