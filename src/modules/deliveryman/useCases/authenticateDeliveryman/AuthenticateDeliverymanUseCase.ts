import { compare } from 'bcrypt';
import { prisma } from 'database/prismaClient';
import { sign } from 'jsonwebtoken';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error('deliveryman or password invalid');
    }

    const passwordMatch = await compare(password, deliveryman.password);

    if (!passwordMatch) {
      throw new Error('deliveryman or password invalid');
    }

    const token = sign({ username }, '8f438accd74229077d3bf8b4719663b6', {
      subject: deliveryman.id,
      expiresIn: '1d',
    });

    return token;
  }
}
