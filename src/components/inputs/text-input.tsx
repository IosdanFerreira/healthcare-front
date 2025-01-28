'use client';

import { ICustomInputProps } from '@/@types/input-props.interface';
import Image from 'next/image';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

function RenderInput({ field, props }: { field: any; props: ICustomInputProps }) {
  return (
    <div className="flex rounded-xl border border-light-600">
      {props.iconSrc && <Image src={props.iconSrc} height={24} width={24} alt={props.iconAlt || 'icon'} className="ml-2" />}
      <FormControl>
        <Input placeholder={props.placeholder} {...field} />
      </FormControl>
    </div>
  );
}

export default function TextInput(props: ICustomInputProps) {
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
