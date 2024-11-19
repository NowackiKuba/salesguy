import { DialogProps } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { useOrganization } from '@clerk/nextjs';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { OrganizationCustomRoleKey } from '@clerk/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { EmailAddress } from '@clerk/nextjs/server';
import { Loader2 } from 'lucide-react';

const InviteDialog = ({ open, setOpen }: DialogProps) => {
  const { organization } = useOrganization();
  const [emails, setEmails] = useState<string[]>([]);
  const [role, setRole] = useState<string>('');
  const [fetchedRoles, setRoles] = useState<OrganizationCustomRoleKey[]>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const isPopulated = useRef(false);
  useEffect(() => {
    if (isPopulated.current) return;
    organization
      ?.getRoles({
        pageSize: 20,
        initialPage: 1,
      })
      .then((res) => {
        isPopulated.current = true;
        setRoles(
          res.data.map((roles) => roles.key as OrganizationCustomRoleKey)
        );
      });
  }, [organization?.id]);
  const handleInvite = () => {
    try {
      setIsPending(true);

      organization?.inviteMembers({
        emailAddresses: emails,
        role,
      });
      toast({
        title: 'Success',
        description: 'Invited employees successfully',
        variant: 'success',
        duration: 1500,
      });
    } catch {
      toast({
        title: 'Error',
        description: 'An error occurred while inviting employees',
        variant: 'destructive',
        duration: 1500,
      });
    } finally {
      setIsPending(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(v);
        }
      }}
    >
      <DialogContent className='max-w-2xl w-full flex flex-col'>
        <p className='text-2xl font-bold'>
          Invite Employees to {organization?.name}
        </p>
        <div className='flex flex-col gap-1 w-full'>
          <Label>Email Adresses</Label>
          <Textarea
            rows={6}
            className='resize-none'
            placeholder='example1@mail.com, example2@gmail.com'
            onChange={(e) => {
              setEmails(e.target.value.split(',').map((email) => email.trim()));
            }}
          />
        </div>
        <div className='flex items-center justify-between w-full mt-2'>
          <Select onValueChange={(e) => setRole(e)} defaultValue={role}>
            <SelectTrigger className='max-w-[220px]'>
              <SelectValue placeholder='Select Role' />
            </SelectTrigger>
            <SelectContent>
              {fetchedRoles.map((r) => (
                <SelectItem value={r} key={r}>
                  {r.replaceAll('org:', '')}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleInvite}
            disabled={!role || !emails || emails.length <= 0 || isPending}
          >
            {isPending ? (
              <div className='flex items-center gap-1'>
                <Loader2 className='h-4 w-4 animate-spin' />
                <p>Invite</p>
              </div>
            ) : (
              'Invite'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
