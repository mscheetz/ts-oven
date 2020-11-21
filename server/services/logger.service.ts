/**
 * Copyright (c) 2020
 * 
 * Logging Service setup and configure logger
 * 
 * @summary LoggingService
 * @author Matt Scheetz
 * 
 * Created at       : 2020-11-21
 * Last modified    : 2020-11-21
 */
import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    level: process.env.LOGLEVEL,
    format: format.combine(
        format.timestamp(),
        format.json(),
        format.printf(info => `[${info.timestamp} ${info.level}]: ${info.message}`+ (info.splat !== undefined ? `${info.splat}`: " "))
    ),    
    transports: [
        new transports.Console({  }),
        new transports.File({
            filename: 'logs.log'
        })
    ]
});
