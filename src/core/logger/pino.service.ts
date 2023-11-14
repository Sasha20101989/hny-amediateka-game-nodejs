import path from 'node:path';
import fs from 'node:fs';
import { Logger, pino } from 'pino';
import { injectable } from 'inversify';

import type { LoggerInterface } from './logger.interface.js';

@injectable()
export default class PinoService implements LoggerInterface {
  private readonly logger: Logger;

  constructor() {
    const currentDirectory = process.cwd();

    const logDirectory = path.join(currentDirectory, './log');
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory);
    }

    const today = new Date();
    const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const logFilePath = path.join(logDirectory, `logfile_${dateString}.log`);

    this.logger = pino({
      level: 'debug',
    }, pino.destination(logFilePath));

    this.logger.info('Logger created');
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
