export interface PagedData<TEntity> {
	items: TEntity[];
	totalCount: number;
	pageIndex: number;
	pageSize: number;
}
