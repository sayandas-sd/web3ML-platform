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
            userId: ExistUser.id
        }, JWT_SECRET)

        res.json({
            token
        })

    } else {
        const user = await prisma.user.create({
            data: {
                address: publicKey
            }
        })


        const token = jwt.sign({
            userId: user.id,
        }, JWT_SECRET)

        res.json({
            token
        })
    }


});

export default router;