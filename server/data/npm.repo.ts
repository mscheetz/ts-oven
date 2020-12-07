/**
 * Copyright (c) 2020
 * 
 * NPM Repository
 * 
 * @summary NPM Repository
 * @author Matt Scheetz
 * 
 * Created at       : 2020-12-06
 * Last modified    : 2020-12-06
 */
import axios from 'axios';
import { logger } from '../services/logger.service';

class NPMRepo {
    private baseUrl = "https://registry.npmjs.org";
    constructor() { }
    
    public getVersions = async(pkg: string) => {
        const url = `${this.baseUrl}/${pkg}`;

        try {
            const response = await axios.get(url);
            const data = response.data;
            let versions = Object.keys(data.versions);

            return versions.reverse();
        } catch(err) {
            logger.error(err);
            return [];
        }
        
    }
}

export default NPMRepo;
