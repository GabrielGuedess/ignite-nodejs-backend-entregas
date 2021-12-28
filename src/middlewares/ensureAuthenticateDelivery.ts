import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: 'Token is missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(
      token,
      '8f438accd74229077d3bf8b4719663b6',
    ) as IPayload;

    request.id_deliveryman = sub;

    return next();
  } catch (err) {
    return response.status(401).json({ message: 'Token is invalid' });
  }
}
