import { RequestHandler } from 'express';
import prisma from '../db';

export const createCompany: RequestHandler = async (req, res, next) => {
  try {
    const { clerkId, name, owner_id, slug, logo_url, max_members } =
      await req.body;

    console.log(clerkId, owner_id, slug, name, logo_url, max_members);

    const company = await prisma.company.create({
      data: {
        clerkId,
        name,
        owner_id,
        slug,
        logo_url,
        max_members,
      },
    });

    await prisma.user.update({
      where: {
        clerkId: owner_id,
      },
      data: {
        company: {
          connect: {
            id: company.id,
          },
        },
        owned_company: {
          connect: {
            id: company.id,
          },
        },
      },
    });

    res.status(201).json({ message: 'Successfully created company', company });
    return;
  } catch (error) {
    console.log('[ERROR] createCompany:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
