// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Tweet } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const tweet = await prisma.tweet.create({ data: req.body });

    res.status(201).send(tweet);
  }
  else if(req.method === "GET"){
    const tweets = await prisma.tweet.findMany({})

    res.send(tweets)
  }
}
