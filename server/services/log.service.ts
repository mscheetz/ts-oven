/**
 * Copyright (c) 2020
 * 
 * Log Service handle logging for application
 * 
 * @summary Log Service
 * @author Matt Scheetz
 * 
 * Created at       : 2020-11-02
 * Last modified    : 2020-11-07
 */
import { Logger } from 'tslog';
import { LogLevel } from '../interfaces/enums';

class LogService {

    static writeLog = async(level: LogLevel, ...args: any[]) => {
        const log: Logger = new Logger({name: 'TS-Oven'});
        if(level === LogLevel.DEBUG) {
            if(args.length === 1) {
                log.debug(args[0]);
            } else if (args.length === 2) {
                log.debug(args[0], args[1]);
            } else {
                log.debug(args);
            }
        } else if(level === LogLevel.ERROR) {
            if(args.length === 1) {
                log.error(args[0]);
            } else if (args.length === 2) {
                log.error(args[0], args[1]);
            } else {
                log.error(args);
            }
        } else if(level === LogLevel.FATAL) {
            if(args.length === 1) {
                log.fatal(args[0]);
            } else if (args.length === 2) {
                log.fatal(args[0], args[1]);
            } else {
                log.fatal(args);
            }
        } else if(level === LogLevel.INFO) {
            if(args.length === 1) {
                log.info(args[0]);
            } else if (args.length === 2) {
                log.info(args[0], args[1]);
            } else {
                log.info(args);
            }
        } else if(level === LogLevel.SILLY) {
            if(args.length === 1) {
                log.silly(args[0]);
            } else if (args.length === 2) {
                log.silly(args[0], args[1]);
            } else {
                log.silly(args);
            }
        } else if(level === LogLevel.TRACE) {
            if(args.length === 1) {
                log.trace(args[0]);
            } else if (args.length === 2) {
                log.trace(args[0], args[1]);
            } else {
                log.trace(args);
            }
        } else if(level === LogLevel.WARN) {
            if(args.length === 1) {
                log.warn(args[0]);
            } else if (args.length === 2) {
                log.warn(args[0], args[1]);
            } else {
                log.warn(args);
            }
        }
    }
}

export default LogService;