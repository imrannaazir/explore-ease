export type TMeta = {
  total: number;
  page: number;
  limit: number;
  totalPage: number;
};

export type TResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: TMeta;
  data: T;
};

export type TError = {
  statusCode: number;
  success: boolean;
  message: string;
  errorSources: unknown;
};
