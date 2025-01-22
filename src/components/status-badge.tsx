import { StatusIcon } from '@/constants';
import clsx from 'clsx';
import Image from 'next/image';

interface StatusBadgeProps {
  status: 'agendado' | 'pendente' | 'cancelado';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <div
      className={clsx('status-badge', {
        'bg-green-600': status === 'agendado',
        'bg-blue-600': status === 'pendente',
        'bg-red-600': status === 'cancelado',
      })}
    >
      <Image src={StatusIcon[status]} alt="doctor" width={24} height={24} className="h-fit w-3" />
      <p
        className={clsx('text-12-semibold capitalize', {
          'text-green-500': status === 'agendado',
          'text-blue-500': status === 'pendente',
          'text-red-500': status === 'cancelado',
        })}
      >
        {status}
      </p>
    </div>
  );
}
