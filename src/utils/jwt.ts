import jwt, { type JwtPayload } from "jsonwebtoken";
import type { RUser } from "../types";
import config from "../config";


export const verifyToken =(token:string, type: "access" | "refresh") =>{
    const secret = type === "access" ? config.jwt_secret : config.refresh_secret
    
    const decode= jwt.verify(token, secret)
    return decode as JwtPayload
};

export const signToken =(payload: RUser & {id:number})=>{

    //accessToken =>data access

    const accessToken = jwt.sign(payload,config.jwt_secret,{
        expiresIn:"1d"
    })

  
    //refreshToken => accessToken abr generate korbe

     const refreshToken = jwt.sign(payload,config.refresh_secret,{
        expiresIn:"7d"
    })


    return {refreshToken,accessToken}

};

// console.log(signToken({age:123,email:"hello@gmail.com",name:"test",role:"admin"}));