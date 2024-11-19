import { CreateOrganization } from '@clerk/nextjs';
import React from 'react';

const page = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <CreateOrganization afterCreateOrganizationUrl={'/app/home'} />
    </div>
  );
};

export default page;
