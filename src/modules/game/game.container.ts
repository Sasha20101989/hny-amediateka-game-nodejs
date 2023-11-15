
import { Container } from 'inversify';

import type { ControllerInterface } from '../../core/controller/controller.interface.js';
import { AppComponent } from '../../types/common/app-component.enum.js';
import { GameServiceInterface } from './game-service.interface.js';
import GameService from './game-service.js';
import GameController from './game.controller.js';

export function createGameContainer() {
  const userContainer = new Container();
  userContainer.bind<GameServiceInterface>(AppComponent.GameServiceInterface).to(GameService).inSingletonScope();
  userContainer.bind<ControllerInterface>(AppComponent.GameController).to(GameController).inSingletonScope();

  return userContainer;
}
