import { AppSidebar } from '@/components/nav/AppSidebar';
import Navbar from '@/components/nav/Navbar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className='w-full h-screen flex items-start'>
      <SidebarProvider defaultOpen={false}>
        <AppSidebar />
        <section className='flex flex-col w-full'>
          <Navbar />
          <section className='w-full h-full px-4 py-6 max-h-[calc(100vh-50px)] overflow-y-auto'>
            {children}
          </section>
        </section>
      </SidebarProvider>
    </main>
  );
};

export default layout;
