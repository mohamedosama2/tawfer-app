import { PaginationOutput } from "./pagination.model";

export interface Category {
  _id: string;
  photo: string;
  describtion: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface CategoryAndIsFav extends Category {
  isFav: boolean;
}

export interface CategoryPagination extends PaginationOutput {
  docs: Array<Category>;
}

export interface AddToFavourits {
  id: string;
  token: string;
}
