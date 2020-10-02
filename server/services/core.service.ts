import fs from 'fs';

class CoreService {

    static readFile = async(path: string): Promise<string> => {
        return new Promise((res, rej) => {
            fs.readFile(path, 'utf8', (err, data) => {
                if(err) {
                    console.error(err);
                    return rej(err.message);
                }
                res(data);
            });
        });
    }
}

export default CoreService;