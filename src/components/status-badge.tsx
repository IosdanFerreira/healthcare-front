import { StatusIcon } from '@/constants';
import clsx from 'clsx';
import Image from 'next/image';

interface StatusBadgeProps {
  status: 'scheduled' | 'pending' | 'cancelled';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div
      className={clsx('status-badge', {
        'bg-green-600': status === 'scheduled',
        'bg-blue-600': status === 'pending',
        'bg-red-600': status === 'cancelled',
      })}
    >
      <Image src={StatusIcon[status]} alt="doctor" width={24} height={24} className="h-fit w-3" />
      <p
        className={clsx('text-12-semibold capitalize', {
          'text-green-500': status === 'scheduled',
          'text-blue-500': status === 'pending',
          'text-red-500': status === 'cancelled',
        })}
      >
        {status}
      </p>
    </div>
  );
}
