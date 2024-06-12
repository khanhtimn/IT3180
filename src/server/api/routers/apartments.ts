import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const apartments = await prisma.apartment.findMany({
        include: {
          residents: true,
          fees: true,
        },
      });
      res.status(200).json(apartments);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching apartments' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
