// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

const leader = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  if (req.method === "GET") {
    const leaders = (await prisma.leader.findMany({ orderBy: { name: "asc" } }))
    res.status(200).json(leaders)
  }

  else if (req.method === "POST") {

    const { name, color } = req.query as Record<string, string>;

    if (!name || !color) {
      res.status(400);
      return;
    }

    try {
      await prisma.leader.create({
        data: {
          name: name,
          color: color
        }
      })
    }
    catch (err) {
      res.status(400).send(err);
    }

    const leaders = (await prisma.leader.findMany({ orderBy: { name: "asc" } }))
    res.status(200).json(leaders)
  }

  else if (req.method === "PUT") {

    const { id, name, color } = req.query as Record<string, string>;

    if (!id) {
      res.status(400);
      return;
    }

    try {
      await prisma.leader.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          color: color
        }
      })
    }
    catch (err) {
      res.status(400).send(err);
      return;
    }

    const leaders = (await prisma.leader.findMany({ orderBy: { name: "asc" } }))
    res.status(200).json(leaders)
  }
  else if (req.method === "DELETE") {

    const { id } = req.query as Record<string, string>;

    if (!id) {
      res.status(400);
      return;
    }

    try {
      await prisma.leader.delete({
        where: {
          id: id,
        }
      })
    }
    catch (err) {
      res.status(400).send(err);
    }

    const leaders = (await prisma.leader.findMany({ orderBy: { name: "asc" } }))
    res.status(200).json(leaders)
  }
}

export default leader;