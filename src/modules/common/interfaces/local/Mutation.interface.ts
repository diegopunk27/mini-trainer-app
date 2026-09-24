type Mutation = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';

interface Mutations<ResponseType> {
  GET: (data?: unknown) => Promise<Array<ResponseType>>;
  DELETE?: (data?: unknown) => Promise<ResponseType>;
  PATCH?: (data?: unknown) => Promise<ResponseType>;
  POST?: (data?: unknown) => Promise<ResponseType>;
  PUT?: (data?: unknown) => Promise<ResponseType>;
}

export type { Mutation, Mutations };
