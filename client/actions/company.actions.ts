'use server';

import { auth, OrganizationInvitation } from '@clerk/nextjs/server';
import axios from 'axios';

export const createCompany = async ({
  clerkId,
  name,
  slug,
  logo_url,
  owner_id,
  max_members,
}: {
  clerkId: string;
  name: string;
  slug: string;
  logo_url: string;
  owner_id: string;
  max_members: number;
}) => {
  const res = await axios(`http://localhost:8080/api/companies`, {
    method: 'POST',
    data: {
      clerkId,
      name,
      owner_id,
      slug,
      logo_url,
      max_members,
    },
  });

  return res.data.message;
};
