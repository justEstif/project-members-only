// source: https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c

export interface TRequest<T> extends Express.Request {
  body: T;
}
