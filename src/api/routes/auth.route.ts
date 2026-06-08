import { Router } from "express";
import { login, refresh, signup } from "../controllers/auth.controller";
import { auth, authorization } from "../../utils/auth";


const router = Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/refresh', refresh)


router.get('/me', ()=>{})


router.get("/test", auth, authorization("admin"),(req,res)=>{
    res.send("this is super duper sensitive")
})

router.put('/update/:id', ()=>{})
router.delete('/delete/:id', ()=>{})

export default router;