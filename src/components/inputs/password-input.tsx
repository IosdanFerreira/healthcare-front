'use client';

import { ICustomInputProps } from '@/@types/input-props.interface';
import Image from 'next/image';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';

function RenderInput({ field, props }: { field: any; props: ICustomInputProps }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex rounded-xl border border-light-600">
      {props.iconSrc && <Image src={props.iconSrc} height={24} width={24} alt={props.iconAlt || 'icon'} className="ml-2" />}
      <FormControl>
        <Input placeholder={props.placeholder} {...field} type={showPassword ? 'text' : 'password'} className="border-0" />
      </FormControl>
      <Button type="button" variant="ghost" className="pr-3" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? (
          <Image src="/assets/icons/open-eye.svg" height={30} width={30} alt="open-eye-icon" className="" />
        ) : (
          <Image src="/assets/icons/slash-eye.svg" height={30} width={30} alt="slash-eye-icon" className="" />
        )}
      </Button>
    </div>
  );
}

export default function InputPassword(props: ICustomInputProps) {
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
