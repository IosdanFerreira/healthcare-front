export interface IErrorProps {
  property: string;
  message: string;
}

interface IPagination {
  total_items: number;
  limit_per_page: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  total_pages: number;
}

export interface IDefaultResponse<T> {
  status_code: number;
  success: boolean;
  message: string;
  data: T;
  pagination: IPagination | null;
  errors: IErrorProps[] | null;
  error_type: string | null;
}
