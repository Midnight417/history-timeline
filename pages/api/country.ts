// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from '../../util/db';
import type { NextApiRequest, NextApiResponse } from 'next'

const country = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {

  if (req.method === "GET") {
    const countries = (await prisma.country.findMany({ orderBy: { name: "asc" } }))
    res.status(200).json(countries)
  }

  else if (req.method === "POST") {

    const { name, color } = req.query as Record<string, string>;

    if (!name || !color) {
      res.status(400);
      return;
    }

    try {
      await prisma.country.create({
        data: {
          name: name,
          color: color,
        }
      })
    }
    catch (err) {
      res.status(400).send(err);
    }

    const countries = (await prisma.country.findMany({ orderBy: { name: "asc" } }))
    res.status(200).json(countries)
  }

  else if (req.method === "PUT") {

    const { id, name, color } = req.query as Record<string, string>;

    if (!id) {
      res.status(400);
      return;
    }

    try {
      await prisma.country.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          color: color,
        }
      })
    }
    catch (err) {
      res.status(400).send(err);
      return;
    }

    const countries = (await prisma.country.findMany({ orderBy: { name: "asc" } }))
    res.status(200).json(countries)
  }
  else if (req.method === "DELETE") {

    const { id } = req.query as Record<string, string>;

    if (!id) {
      res.status(400);
      return;
    }

    try {
      await prisma.country.delete({
        where: {
          id: id,
        }
      })
    }
    catch (err) {
      res.status(400).send(err);
    }

    const countries = (await prisma.country.findMany({ orderBy: { name: "asc" } }))
    res.status(200).json(countries)
  }
}

export default country;