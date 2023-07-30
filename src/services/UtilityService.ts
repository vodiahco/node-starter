// @ts-ignore
import Jwt = require('jsonwebtoken');
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

class UtilityService {

    /**
     * createJWT
     * @param data
     * create jwt from data
     */
    public createJWT(data: any) {
        return Jwt.sign({
                data: data,
                exp: Math.floor(Date.now() / 1000) + (84600 * 14)
            },
            process.env.APP_SECRET
        );
    }

    /**
     * newJWT
     * @param data
     * @param secret
     * create jWT from data, override secret key
     */
    public newJWT(data:any, secret: string = process.env.APP_SECRET) {
        return Jwt.sign({
                data: data,
                exp: Math.floor(Date.now() / 1000) + (84600)
            },
            secret
        );
    }


    /**
     * verifyToken
     * @param token
     * @param callback
     * verify JWT, callback
     */
    public verifyToken(token: string, callback: (err: any, p: any) => void) {
        Jwt.verify(token, process.env.APP_SECRET, function(err: any, decoded: any) {
            callback(err, decoded || {});
        });
    }

    /**
     * verifyTokenPromise
     * @param token
     * @param key
     * verify JWT, promise
     */
    public verifyTokenPromise(token: string, key = process.env.APP_SECRET) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, key, function(err: any, decoded: unknown) {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded);
                }
            });
        });
    }

    /**
     * verifyFormatPromise
     * @param token
     * @param key
     * @param format
     * verify JWT, promise, override secret kety and algorithm
     */
    public verifyFormatPromise(token: string, key: string = process.env.APP_SECRET, format: any = {algorithms: ['RS256']}) {
        return new Promise((resolve, reject) => {
            Jwt.verify(token, key, format, function(err: any, decoded: unknown) {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded);
                }
            });
        });

    }

    /**
     * generateUUIDV4
     * generate uuid
     */
    public generateUUIDV4() {
        return uuidv4();
    }

    /**
     * generateUUIDV4Static
     * generate uuid static version
     */
    public static generateUUIDV4Static() {
        return uuidv4();
    }
}

export default UtilityService;
