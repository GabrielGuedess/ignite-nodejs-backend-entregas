import { Router } from 'express';

import { AuthenticateClientController } from '@modules/account/useCases/authenticateClient/AuthenticateClientController';
import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { AuthenticateDeliverymanController } from '@modules/deliveryman/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliverymanController } from '@modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';

export const routes = Router();

routes.post('/client/authenticate', new AuthenticateClientController().handle);
routes.post(
  '/deliveryman/authenticate',
  new AuthenticateDeliverymanController().handle,
);

routes.post('/client', new CreateClientController().handle);
routes.post('/deliveryman', new CreateDeliverymanController().handle);
