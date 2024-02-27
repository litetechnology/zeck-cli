import crypto from 'crypto';

import logger from './logger.js';

const base64UrlEncode = (data) => {
  return Buffer.from(data).toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const encode = (payload, secret) => {
  const header = { alg: 'HS256', typ: 'JWT' };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.createHmac('sha256', secret).update(signatureInput).digest('base64');
  const encodedSignature = base64UrlEncode(signature);

  return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
};

const decode = (token, secret) => {
  const [encodedHeader, encodedPayload, encodedSignature] = token.split('.');

  const checkSignature = () => {
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = base64UrlEncode(
      crypto.createHmac('sha256', secret).update(signatureInput).digest('base64')
    );
    return signature === encodedSignature;
  };

  const decodedPayload = () => {
    const decoded = Buffer.from(encodedPayload, 'base64').toString('utf-8');
    return JSON.parse(decoded);
  };

  if (checkSignature()) {
    return decodedPayload();
  } else {
    logger.error('Invalid token signature');
  }
};

export { encode, decode };
