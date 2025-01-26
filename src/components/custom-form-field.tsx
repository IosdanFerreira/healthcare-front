import Image from 'next/image';
import { Control } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-phone-number-input/style.css';
import { ptBR } from 'date-fns/locale';
registerLocale('ptBR', ptBR);
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { InputMask } from '@react-input/mask';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  PASSWORD = 'password',
}

export interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

function RenderInput({ field, props }: { field: any; props: CustomProps }) {
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-xl border border-light-600">
          {props.iconSrc && <Image src={props.iconSrc} height={24} width={24} alt={props.iconAlt || 'icon'} className="ml-2" />}
          <FormControl>
            <Input placeholder={props.placeholder} {...field} className="" />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea placeholder={props.placeholder} {...field} className="shad-textArea" disabled={props.disabled} />
        </FormControl>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <div className="flex rounded-xl border border-light-600">
          {props.iconSrc && <Image src={props.iconSrc} height={24} width={24} alt={props.iconAlt || 'icon'} className="ml-2" />}
          <FormControl>
            <InputMask
              mask="(__) _____-____"
              replacement={{ _: /\d/ }}
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
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
            <label htmlFor={props.name} className="text-sm text-dark-300">
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-xl border border-light-600">
          <Image src="/assets/icons/calendar.svg" height={24} width={24} alt="user" className="ml-2" />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? 'MM/dd/yyyy'}
              wrapperClassName="date-picker"
              locale="ptBR"
              placeholderText="Selecione uma data"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={props.placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">{props.children}</SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    case FormFieldType.PASSWORD:
      return (
        <div className="flex rounded-xl border border-light-600">
          {props.iconSrc && <Image src={props.iconSrc} height={24} width={24} alt={props.iconAlt || 'icon'} className="ml-2" />}
          <FormControl>
            <Input placeholder={props.placeholder} {...field} type="password" className=" border-0" />
          </FormControl>
        </div>
      );
    default:
      return null;
  }
}

export default function CustomFormField(props: CustomProps) {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && <FormLabel className=" text-dark-400">{label}</FormLabel>}
          <RenderInput field={field} props={props} />

          <FormMessage className="text-error-300 text-[12px]" />
        </FormItem>
      )}
    />
  );
}
