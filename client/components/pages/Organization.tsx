'use client';
import { useUser } from '@/hooks/useUser';
import { User } from '@/types';
import { useOrganization } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Settings, UserCog, UserPlus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { format, set } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { get } from 'http';
import { getRoleColorAndIcon } from '@/lib/utils';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import InviteDialog from '../dialogs/InviteDialog';

const Organization = () => {
  const { organization, membership, isLoaded } = useOrganization();
  const [isOpenInvite, setIsOpenInvite] = useState<boolean>(false);
  const { data: user, isLoading } = useUser({});
  const router = useRouter();
  const [detailsView, setDetailsView] = React.useState<string>('data');

  const [selectedEmployee, setSelectedEmployee] = React.useState<User>();
  const [selectedEmployeeRoleData, setSelectedEmployeeRoleData] =
    React.useState(getRoleColorAndIcon(selectedEmployee?.role ?? ''));

  useEffect(() => {
    if (!user || !user?.company || !user?.company?.employees) return;

    const roleData = getRoleColorAndIcon(user.role);

    setSelectedEmployee(user.company.employees[0]);
    setSelectedEmployeeRoleData(roleData);
  }, [user]);

  if (!isLoaded || isLoading) {
    return <p>...loading</p>;
  }

  if (!organization) {
    router.push('/create-organization');
    return;
  }
  return (
    <div className='w-full flex flex-col gap-6'>
      <div className='flex items-start gap-5 w-full'>
        <div className='flex flex-col gap-5 w-full'>
          <div className='w-full rounded-lg bg-secondary p-3 h-[140px] flex items-center gap-3'>
            <div className='w-[116px] h-full relative'>
              <div className='h-full w-full rounded-lg absolute bg-gradient-to-t from-black/60 to-transparent'></div>
              <Image
                height={500}
                width={500}
                className='w-full h-full rounded-lg'
                alt={organization.name}
                src={organization.imageUrl}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <p className='text-3xl font-bold'>Welcome, {user?.first_name}</p>
              <p className='text-base font-semibold text-gray-400'>
                <span className='font-bold'>{organization?.name}&apos;s </span>
                {user?.role.toLowerCase() === 'admin'
                  ? 'Owner'
                  : user?.role?.toLowerCase() === 'manager'
                  ? 'Manager'
                  : 'Employee'}
              </p>
            </div>
          </div>
          <div className='w-full rounded-lg bg-secondary p-3 h-[140px]'></div>
        </div>
        <div className='w-full rounded-lg bg-secondary p-3 h-[300px]'>
          <p className='text-3xl font-bold'>Employee Of The Month</p>
          <div className='flex items-center gap-3 w-full'></div>
        </div>
      </div>
      <div className='w-full flex items-start gap-4'>
        <div className='w-2/5 bg-secondary rounded-lg p-3 flex flex-col gap-3'>
          <p className='text-2xl font-bold'>
            {selectedEmployee?.first_name} {selectedEmployee?.last_name}&apos;s
            Details
          </p>
          <div className='flex items-center gap-3 w-full pb-3 border-b border-border'>
            <Avatar className='h-24 w-24 rounded-lg'>
              <AvatarImage
                src={selectedEmployee?.img_url}
                className='h-24 w-24 rounded-lg aspect-square'
              />
              <AvatarFallback className='flex items-center justify-center outline-colors h-24 w-24 rounded-lg text-3xl font-bold'>
                {selectedEmployee?.first_name[0]}
                {selectedEmployee?.last_name[0]}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col items-start'>
              <p className='text-2xl font-bold'>
                {selectedEmployee?.first_name} {selectedEmployee?.last_name}
              </p>
              <div
                className={`px-4 py-2 rounded-sm text-xs font-semibold ${selectedEmployeeRoleData.color} flex items-center gap-2`}
              >
                <selectedEmployeeRoleData.icon className='h-3.5 w-3.5 stroke-[3px]' />
                <p className='first-letter:uppercase'>
                  {selectedEmployee?.role.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
          <div className='flex items-start gap-3 w-full'>
            <div className='w-[21%] h-full flex flex-col gap-1.5'>
              <div
                className={`${
                  detailsView === 'data'
                    ? 'bg-background/60'
                    : 'hover:bg-background/60'
                } cursor-pointer duration-100 ease-linear flex items-center px-3 py-2 rounded-sm text-xs font-semibold gap-2 `}
              >
                <UserCog className='h-4 w-4' />
                <p>User Data</p>
              </div>
              <div
                className={`${
                  detailsView === 'settings'
                    ? 'bg-background/60'
                    : 'hover:bg-background/60'
                } cursor-pointer duration-100 ease-linear flex items-center px-3 py-2 rounded-sm text-xs font-semibold gap-2 `}
              >
                <Settings className='h-4 w-4' />
                <p>Settings</p>
              </div>
            </div>
            <div className='w-4/5 flex flex-col gap-4'>
              <p className='text-xl font-bold'>
                {selectedEmployee?.first_name}&apos;s Data
              </p>
              <div className='flex flex-col gap-2 w-full'>
                <div className='flex items-center gap-2 w-full'>
                  <div className='flex flex-col gap-1 w-full'>
                    <Label>First Name</Label>
                    <Input defaultValue={selectedEmployee?.first_name} />
                  </div>
                  <div className='flex flex-col gap-1 w-full'>
                    <Label>Last Name</Label>
                    <Input defaultValue={selectedEmployee?.last_name} />
                  </div>
                </div>
                <div className='flex flex-col gap-1 w-full'>
                  <Label>Email</Label>
                  <Input defaultValue={selectedEmployee?.email} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-3/5 bg-secondary rounded-lg p-3 flex flex-col gap-3'>
          <div className='flex items-center justify-between w-full'>
            <p className='text-2xl font-bold'>Employees</p>
            <Button
              size={'icon'}
              variant={'blue'}
              onClick={() => {
                setIsOpenInvite(true);
              }}
            >
              <UserPlus />
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow className='bg-background/60 hover:bg-background/60'>
                <TableHead className='w-[32px] rounded-tl-lg'></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joined At</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className='text-right rounded-tr-lg'>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {user?.company?.employees?.map((e, i) => (
                <TableRow
                  key={e.id}
                  className={`${
                    selectedEmployee == e
                      ? 'bg-background/40'
                      : 'bg-background/60'
                  }  hover:bg-background/60`}
                >
                  <TableCell
                    className={`${
                      user?.company?.employees?.length === i + 1 &&
                      'rounded-bl-lg'
                    }`}
                  >
                    <Avatar className='h-10 w-10 rounded-lg'>
                      <AvatarImage
                        src={e.img_url}
                        className='h-10 w-10 rounded-lg aspect-square'
                      />
                      <AvatarFallback className='flex items-center justify-center outline-colors h-10 w-10 rounded-lg text-base font-bold'>
                        {e.first_name[0]}
                        {e.last_name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className='flex flex-col gap-0.5'>
                      <p className='text-sm font-semibold'>
                        {e.first_name} {e.last_name}
                      </p>
                      <p className='text-xs text-gray-400'>@{e.username}</p>
                    </div>
                  </TableCell>
                  <TableCell>{e.email}</TableCell>
                  <TableCell>{format(e.created_at, 'dd.MM.yyyy')}</TableCell>
                  <TableCell>{e.role}</TableCell>
                  <TableCell
                    className={`${
                      user?.company?.employees?.length === i + 1 &&
                      'rounded-br-lg'
                    }`}
                  >
                    <div className='flex justify-end'>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button variant={'ghost'} size={'icon'}>
                            <Settings />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent></DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <InviteDialog open={isOpenInvite} setOpen={setIsOpenInvite} />
    </div>
  );
};

export default Organization;
