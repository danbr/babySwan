import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): string => {
    return bcrypt.hashSync(password)
}

export const verifyPassword = (password: string, hash: string | any): boolean => {
    return bcrypt.compareSync(password, hash);
};