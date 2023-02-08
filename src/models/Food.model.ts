import { PaginationOutput } from "./pagination.model";

export interface Food {
  _id: string;
  photo: string;
  customer: string;
  category: {
    _id: string;
    name: string;
  };
  price: number;
  describtion: string;
  address: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface FoodPagination extends PaginationOutput {
  docs: Array<Food>;
}

export interface AddFood {
  token: string;
  photo: string;
  name: string;
  address: string;
  category: string;
  customer: string;
  describtion: string;
  price: number;
}
