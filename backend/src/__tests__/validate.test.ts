import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { validate } from '../middleware/validate';

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

describe('validate middleware', () => {
  it('passes through when there are no validation errors', () => {
    const next = jest.fn() as unknown as NextFunction;

    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: () => true,
    });

    validate({} as Request, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });

  it('throws when validation errors exist', () => {
    const next = jest.fn() as unknown as NextFunction;

    (validationResult as unknown as jest.Mock).mockReturnValue({
      isEmpty: () => false,
      array: () => [{ msg: 'Email is required' }],
    });

    expect(() => validate({} as Request, {} as Response, next)).toThrow('Email is required');
    expect(next).not.toHaveBeenCalled();
  });
});
