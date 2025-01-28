'use client';

import { ICustomInputProps } from '@/@types/input-props.interface';
import Image from 'next/image';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { InputMask, Replacement } from '@react-input/mask';

interface MaskInputProps extends ICustomInputProps {
  mask: string | undefined;
  replacement?: string | Replacement | undefined;
}

function RenderInput({ field, props }: { field: any; props: MaskInputProps }) {
  return (
    <div className="flex rounded-xl border border-light-600">
      {props.iconSrc && <Image src={props.iconSrc} height={24} width={24} alt={props.iconAlt || 'icon'} className="ml-2" />}
      <FormControl>
        <InputMask
          mask={props.mask}
          replacement={props.replacement}
          className="flex h-9 w-full rounded-xl bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 
              file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground 
              placeholder:text-[#9394a5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
              disabled:cursor-not-allowed disabled:opacity-50 md:text-sm placeholder:text"
          placeholder={props.placeholder}
          {...field}
        />
      </FormControl>
    </div>
  );
}

export default function MaskInput(props: MaskInputProps) {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {label && <FormLabel className=" text-dark-400">{label}</FormLabel>}
          <RenderInput field={field} props={props} />

          <FormMessage className="text-error-300 text-[12px]" />
        </FormItem>
      )}
    />
  );
}
