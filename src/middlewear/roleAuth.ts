import type { NextFunction, Response } from "express"


export const authorizeRole=(...allowedRoles: string[])=>{

    return(req:any,res:Response,next:NextFunction)=>{
        const userRole = req.user?.role;

        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({
                success:false,
                message:"Access denied. Insufficient Permission"
            });
        }
        next()
    };

};