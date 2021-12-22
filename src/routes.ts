import { Router } from 'express';

import { AuthenticateClientController } from '@modules/account/useCases/authenticateClient/AuthenticateClientController';
import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';

export const routes = Router();

routes.post('/client', new CreateClientController().handle);
routes.post('/authenticate', new AuthenticateClientController().handle);
