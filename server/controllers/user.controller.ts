import { RequestHandler } from 'express';
import prisma from '../db';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { first_name, last_name, username, email, clerkId } = await req.body;

    if (!first_name || !last_name || !username || !email || !clerkId) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    const user = await prisma.user.create({
      data: {
        first_name,
        last_name,
        username,
        email,
        clerkId,
      },
    });

    res.status(201).json({ message: 'Successfully created user', user });
    return;
  } catch (error) {
    console.log('[ERROR] createUser:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
      where: {
        clerkId: id,
      },
      include: {
        company: {
          include: {
            employees: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'Successfully retrieved user', user });
    return;
  } catch (error) {
    console.log('[ERROR] getUser:', error);
    res.status(500).json({ message: 'Internal server error' });
    return;
  }
};
