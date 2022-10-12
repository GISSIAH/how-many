// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../db/mongo';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { client,db } = await connectToDatabase();
  
  const test = await db.collection("movies")
  .find({})
  .toArray();
  res.status(200).json(test)
}
