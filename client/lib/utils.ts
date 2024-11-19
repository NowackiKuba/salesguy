import { clsx, type ClassValue } from 'clsx';
import { Crown, Siren, User } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRoleColorAndIcon = (role: string) => {
  switch (role.toLowerCase()) {
    case 'admin': {
      return {
        color:
          'bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/20 dark:text-yellow-200',
        icon: Crown,
      };
    }
    case 'manager': {
      return {
        color:
          'bg-rose-500/10 text-rose-500 dark:bg-rose-500/20 dark:text-rose-200',
        icon: Siren,
      };
    }
    case 'employee': {
      return {
        color:
          'bg-blue-500/10 text-blue-500 dark:bg-blue-500/20 dark:text-blue-200',
        icon: User,
      };
    }
    default: {
      return { color: 'bg-gray-500', icon: User };
    }
  }
};
