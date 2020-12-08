/**
 * Copyright (c) 2020
 * 
 * Encrytion Service manages encryption for application
 * 
 * @summary Encryption Service
 * @author Matt Scheetz
 * 
 * Created at       : 2020-10-02
 * Last modified    : 2020-11-21
 */
import bcrypt from 'bcrypt';
import { logger } from './logger.service';

class EncryptionService {

    /**
     * Hash a password
     * @param plaintext string to hash
     */
    static hashPassword = async(plaintext: string) => {
        const saltRounds = 10;

        return await bcrypt.hash(plaintext, saltRounds);
    }

    /**
     * Compare a string to a hash
     * 
     * @param plaintext string to compare
     * @param hash hash of password
     */
    static checkPassword = async(plaintext: string, hash: string): Promise<boolean> => {
        try {
            const match = await bcrypt.compare(plaintext, hash);

            return match;
        } catch(err) {
            logger.error(err);

            return false;
        }
    }
}

export default EncryptionService;