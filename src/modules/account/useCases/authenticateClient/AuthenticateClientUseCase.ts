import { compare } from 'bcrypt';
import { prisma } from 'database/prismaClient';
import { sign } from 'jsonwebtoken';

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error('Client or password invalid');
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error('Client or password invalid');
    }

    const token = sign({ username }, '8f438accd74229033d3bf8b4719663b6', {
      subject: client.id,
      expiresIn: '1d',
    });

    return token;
  }
}
