/**
 * Copyright (c) 2020
 * 
 * Address Controller gets addresses
 * 
 * @summary Address Controller
 * @author Matt Scheetz
 * 
 * Created at       : 2020-11-23
 * Last modified    : 2020-11-23
 */
import express from 'express';
import dotenv from 'dotenv';
import BtcXpubAddress from 'btc-xpub-address';
import { logger } from '../services/logger.service';

class AddressController {
    constructor() {
        dotenv.config();
    }

    static btc = async(req: express.Request, res: express.Response) => {
        logger.verbose(`BTC address request from: '${req.ip}'`);
        const xpub: string = process.env.BTC_XPUB!;
        const address = await BtcXpubAddress.getAddress(xpub);

        res.status(200).send(address);
    }

    static eth = async(req: express.Request, res: express.Response) => {
        logger.verbose(`ETH address request from: '${req.ip}'`);
        res.status(200).send(process.env.ETH!);
    }

    static xmr = async(req: express.Request, res: express.Response) => {
        logger.verbose(`XMR address request from: '${req.ip}'`);
        res.status(200).send(process.env.XMR!);
    }
}

export default AddressController;