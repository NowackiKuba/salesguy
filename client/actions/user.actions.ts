'use server';
import { User } from '@/types';
import { auth } from '@clerk/nextjs/server';
import axios from 'axios';
export const createUser = async ({
  first_name,
  last_name,
  email,
  clerkId,
  username,
}: {
  first_name: string;
  last_name: string;
  email: string;
  clerkId: string;
  username: string;
}) => {
  const res = await axios(`http://localhost:8080/api/users`, {
    method: 'POST',
    data: {
      first_name,
      last_name,
      email,
      clerkId,
      username,
    },
  });

  return res.data.message;
};

export const getUser = async ({ id }: { id?: string }): Promise<User> => {
  let user_id: string;

  if (!id) {
    const { userId } = await auth();
    user_id = userId!;
  } else {
    user_id = id;
  }

  const res = await axios(`http://localhost:8080/api/users/${user_id}`, {
    method: 'GET',
  });

  return res.data.user;
};
