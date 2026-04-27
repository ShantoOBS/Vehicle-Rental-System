import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config";

const auth = (...roles: string[])=>{

  return async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

    if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  const token = authHeader.split(" ")[1];


  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded =  jwt.verify(token,config.token_secret as string) as JwtPayload;
 //   console.log(decoded);
    req.user = decoded as JwtPayload;

     if(roles.length && !roles.includes(decoded.role)){
            return  res.status(403).json({
                message: "Valid token but insufficient permissions"
             })
      }


      if(roles[0]!='admin' && decoded.id!=req.params.userId ){
         return  res.status(403).json({
                message: "Valid token but insufficient permissions"
             })
      }

      // if(roles[0]=='customer'){

           
      // }

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
}
}

export default auth;