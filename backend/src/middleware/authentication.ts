import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express';

export class Authentication {
  private static SECRET_KEY = 'JWT_SECRET';
  private static JWT_OPTIONS: jwt.SignOptions = {
    expiresIn: 3600, // in seconds
  };
  private static SALT_ROUNDS: number = 10;

  public static async generateToken(userdata: any): Promise<string> {
    return jwt.sign(userdata, this.SECRET_KEY, this.JWT_OPTIONS);
  }

  public static async verifyToken(token: string): Promise<string | object | null> {
    try {
      return jwt.verify(token, this.SECRET_KEY);
    } catch (e) {
      return null;
    }
  }

  public static async hashPassword(password: string) {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  public static async comparePasswordWithHash(password: string, hash: string) {
    try {
      const match: boolean = await bcrypt.compare(password, hash);
      return match;
    } catch (e) {
      return false;
    }
  }

  public static async verifyAccess(req: Request, res: Response, next: NextFunction) {
    const jwt = req.get('Authorization');

    // Check if the authorization header exists
    if (!jwt) {
      return res.status(401).send({ status: 'unauthorized' });
    }

    // Verify the token. Returns the jwt object if valid - else null
    const validToken = await Authentication.verifyToken(jwt);
    if (!validToken) {
      return res.status(401).send({ status: 'unauthorized' });
    }

    return next();
  }
};
