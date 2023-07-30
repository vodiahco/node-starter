const base64 = require('base64url');
const crypto = require('crypto');
const verifyFunction = crypto.createVerify('RSA-SHA256');
const jwkToPem = require('jwk-to-pem');

class JWTService {

    decode(jwt: string): JWTDecoded {
        const jwtParts = jwt.split('.');
        const headerInBase64UrlFormat = jwtParts[0];
        const payloadInBase64UrlFormat = jwtParts[1];
        const signatureInBase64UrlFormat = jwtParts[2];
        const decodedHeader: any = base64.decode(headerInBase64UrlFormat);
        const decodedPayload: any = base64.decode(payloadInBase64UrlFormat);
        const decodedSignature = base64.decode(signatureInBase64UrlFormat);

        const header = JSON.parse(decodedHeader);
        const payload = JSON.parse(decodedPayload) || {};

        return {
            header: decodedHeader,
            payload: decodedPayload,
            signature: decodedSignature,
            issued_at: decodedPayload.iat,
            issuer: decodedPayload.iss,
            expiry: decodedPayload.exp,
            json_header: header,
            json_payload: payload
        }
    }

    verify(jwt: string, key: string): boolean {
        const jwtHeader = jwt.split('.')[0];
        const jwtPayload = jwt.split('.')[1];
        const jwtSignature = jwt.split('.')[2];

        verifyFunction.write(jwtHeader + '.' + jwtPayload);
        verifyFunction.end();
        const jwtSignatureBase64 = base64.toBase64(jwtSignature);
        return verifyFunction.verify(key, jwtSignatureBase64, 'base64');
    }

    verifyDecode(jwt: JWTDecoded, key: string): boolean {
        const jwtHeader = jwt.header
        const jwtPayload = jwt.payload
        const jwtSignature = jwt.signature

        verifyFunction.write(jwtHeader + '.' + jwtPayload);
        verifyFunction.end();
        const jwtSignatureBase64 = base64.toBase64(jwtSignature);
        return verifyFunction.verify(key, jwtSignatureBase64, 'base64');
    }

    getPenFromKey(key: any) {
        return jwkToPem(key);
    }
}

interface JWTDecoded {
    header: any,
    payload: any,
    signature?: any;
    issued_at?: number,
    issuer?: string;
    expiry?: string;
    json_header: any,
    json_payload: any,
}

export default JWTService;
