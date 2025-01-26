import Image from 'next/image';
import { Button } from './ui/button';

interface SubmitButtonProps {
  isLoading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function SubmitButton({ isLoading, className, children }: SubmitButtonProps) {
  return (
    <Button type="submit" disabled={isLoading} className={className ?? 'text-white w-full rounded-xl bg-green-500 hover:bg-[#1d9267]'}>
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image src="/assets/icons/loader.svg" alt="loader" width={24} height={24} className="animate-spin" />
          Carregando...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}
