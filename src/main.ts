import 'reflect-metadata';

import RestApplication from './app/rest.js';
import { AppComponent } from './types/common/app-component.enum.js';
import { createRestApplicationContainer } from './app/rest.container.js';
import { Container } from 'inversify';
import { createUserContainer } from './modules/user/user.container.js';
import { createGameContainer } from './modules/game/game.container.js';

async function bootstrap() {
  const mainContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createGameContainer()
  );

  const application = mainContainer.get<RestApplication>(AppComponent.RestApplication);
  await application.init();
}

bootstrap().catch(console.error);
