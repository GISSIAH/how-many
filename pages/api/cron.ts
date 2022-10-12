// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Tweet } from "@prisma/client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    axios
      .get(
        "https://api.apify.com/v2/acts/vdrmota~twitter-scraper/runs/last/dataset/items?token=apify_api_qa7GvGfKydcnO2bqRr65vJGXKfWaOD2zDhpz"
      )
      .then(async (resp) => {
        const filteredTweets = resp.data.map((item: any) => {
          const filteredTweet = {
            full_text: item.full_text,
            reply_count: item.reply_count,
            retweet_count: item.retweet_count,
            favorite_count: item.favorite_count,
            url: item.url,
            created_at: item.created_at,
          };

          return filteredTweet
        });
        
        const tweets = await prisma.tweet.createMany({ data: filteredTweets });

        res.send(tweets);
      });
  } else if (req.method === "GET") {
    const tweets = await prisma.tweet.findMany({});

    res.send(tweets);
  }
}
