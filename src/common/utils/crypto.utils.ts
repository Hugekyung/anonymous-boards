import { createHash } from 'crypto';

export const GenDigestPwd = (password: string) => {
    let digestPwd = createHash('sha512').update(password).digest('hex');
    digestPwd = createHash('sha512').update(digestPwd).digest('hex');
    return digestPwd;
};
