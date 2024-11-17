import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "123saya";

const router = Router();


const prisma = new PrismaClient();

router.post("/", async (req,res) => {
    const publicKey = "HtkgKvwwJdEwq3EpwwCtVcHqvZed1Davc1wCB4JQkzcZ";

    const ExistUser = await prisma.user.findFirst({
        where: {
            address: publicKey
        }
    })

    if(ExistUser) {
        const token = jwt.sign({
            userId: publicKey
        }, JWT_SECRET)
    } else {
        const user = await prisma.user.create({
            data: {
                address: publicKey
            }
        })
    }


});

export default router;