'use client';
import React from 'react';
import ReactInputMask from 'react-input-mask';
import { CustomProps } from './custom-form-field';

export default function InputMask({ field, props }: { field: any; props: CustomProps }) {
  return <ReactInputMask mask="99/99/9999" onChange={field.onChange} value={field.value} />;
}
