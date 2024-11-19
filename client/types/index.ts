import { Dispatch, SetStateAction } from 'react';

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  clerkId: string;
  img_url?: string;
  created_at: Date;
  updated_at: Date;
  role: string;
  phone_number?: string;
  location?: string;
  work_email?: string;
  work_phone?: string;
  company_id?: string;
  company?: Company;
};

export type Company = {
  id: string;
  created_at: Date;
  updated_at: Date;
  employees: User[];
  logo_url: string;
  location: string;
  phone_number: string;
  clerkId: string;
  slug: string;
  owner_id: string;
};

export interface DialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
