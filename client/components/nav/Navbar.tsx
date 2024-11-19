'use client';
import {
  OrganizationProfile,
  OrganizationSwitcher,
  RedirectToCreateOrganization,
  useOrganization,
  UserButton,
} from '@clerk/nextjs';
import React, { useState } from 'react';
import { ChevronsUpDown } from 'lucide-react';

const Navbar = () => {
  const { organization } = useOrganization();
  const [redirect, setRedirect] = useState(false);
  return (
    <div className='w-full flex items-center justify-between px-4 py-3 border-b border-border'>
      <div
        onClick={() => setRedirect(true)}
        className='w-[260px] h-10 rounded-lg border border-border flex items-center justify-between px-4'
      >
        <OrganizationSwitcher />
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
