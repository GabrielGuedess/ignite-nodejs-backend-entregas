import { Router } from 'express';
import { ensureAuthenticateClient } from 'middlewares/ensureAuthenticateClient';
import { ensureAuthenticateDeliveryman } from 'middlewares/ensureAuthenticateDelivery';

import { AuthenticateClientController } from '@modules/account/useCases/authenticateClient/AuthenticateClientController';
import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from '@modules/clients/useCases/deliveries/FindAllDeliveriesController';
import { CreateDeliveryController } from '@modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from '@modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { UpdateDeliverymanController } from '@modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { UpdateEndDateController } from '@modules/deliveries/useCases/updateEndDate/UpdateEndDateController';
import { AuthenticateDeliverymanController } from '@modules/deliveryman/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliverymanController } from '@modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController';
import { FindAllDeliveriesDeliverymanController } from '@modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController';

export const routes = Router();

routes.post('/client/authenticate', new AuthenticateClientController().handle);

routes.post(
  '/deliveryman/authenticate',
  new AuthenticateDeliverymanController().handle,
);

routes.post('/client', new CreateClientController().handle);

routes.post('/deliveryman', new CreateDeliverymanController().handle);

routes.post(
  '/delivery',
  ensureAuthenticateClient,
  new CreateDeliveryController().handle,
);

routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryman,
  new FindAllAvailableController().handle,
);

routes.put(
  '/delivery/update/:id',
  ensureAuthenticateDeliveryman,
  new UpdateDeliverymanController().handle,
);

routes.get(
  '/client/deliveries',
  ensureAuthenticateClient,
  new FindAllDeliveriesController().handle,
);

routes.get(
  '/deliveryman/deliveries',
  ensureAuthenticateDeliveryman,
  new FindAllDeliveriesDeliverymanController().handle,
);

routes.put(
  '/delivery/updateEndDate/:id',
  ensureAuthenticateDeliveryman,
  new UpdateEndDateController().handle,
);
