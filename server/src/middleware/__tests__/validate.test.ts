import { NextFunction, Request, Response } from "express";
import { createUserSchema } from "../../schema/user.schema";
import validate from "../validate";

describe("User Registration", () => {
  test("User password doesn't match ", () => {
    const mockRequest: Partial<Request> = {
      body: {
        name: "Wick",
        userName: "johnWick123",
        email: "johnWick@email.com",
        password: "doggydogpw",
        passwordConfirmation: "Doggydogpw",
      },
    };

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext: NextFunction = jest.fn();

    validate(createUserSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});
