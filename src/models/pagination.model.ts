export interface PaginationOutput {
  totalDocs: number;

  limit: number;

  totalPages: number;

  page: number;

  pagingCounter: number;

  hasPrevPage: boolean;

  hasNextPage: boolean;

  prevPage: number | null;

  nextPage: number | null;
}

export interface PaginationParams extends TokenInput {
  page?: number;

  limit?: number;

  allowPagination?: boolean;
}
export interface TokenInput {
  token: string;
}
