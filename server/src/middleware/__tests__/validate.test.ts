import { NextFunction, Request, Response } from "express";
import { registerSchema } from "../../schema/authentication.schema";
import validate from "../validate";

describe("User Registration", () => {
  test.skip("User password doesn't match ", () => {
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

    validate(registerSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockNext).toHaveBeenCalledTimes(0);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });

  test("User is valid", () => {
    const mockRequest: Partial<Request> = {
      body: {
        name: "Wick",
        userName: "johnWick123",
        email: "johnWick@email.com",
        password: "test123",
        passwordConfirmation: "test123",
      },
    };

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext: NextFunction = jest.fn();

    validate(registerSchema)(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });
});
