import Image from "next/image";

import { Checkbox } from "../../ui/checkbox";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Textarea } from "../../ui/textarea";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

interface CustomProps {
  type?: string;
  value?: any;
  onChange?: (value: any) => void;
  error?: boolean;
  errors?: string[];
  name: string;
  step?: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: () => React.ReactNode;
  fieldType: FormFieldType;
  className?: string;
}

const RenderInput = ({ props }: { props: CustomProps }) => {
  const {
    value,
    onChange,
    fieldType,
    placeholder,
    name,
    step,
    errors,
    iconSrc,
    iconAlt,
    disabled,
    children,
    className,
  } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div
          className={`flex rounded-md border ${className}  ${
            errors ? "border-red-500" : "dark:border-dark-500 dark:bg-dark-400"
          }`}
        >
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <Input
            step={step && step}
            type={props.type || "text"}
            name={name}
            value={value} // Vincula o valor
            onChange={(e) => onChange && onChange(e.target.value)} // Atualiza o estado
            aria-describedby={`${name}-error`}
            placeholder={placeholder}
            className="shad-input border-0 "
            disabled={disabled}
          />
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <Textarea
          name={name}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          aria-describedby={`${name}-error`}
          placeholder={placeholder}
          className="shad-textArea"
          disabled={disabled}
        />
      );
    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={`${name}-checkbox`}
            name={name}
            aria-describedby={`${name}-error`}
            checked={value}
            onCheckedChange={onChange}
          />
          <label htmlFor={name} className="checkbox-label">
            {props.label}
          </label>
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <Select
          name={name}
          aria-describedby={`${name}-error`}
          value={value}
          onValueChange={onChange}
        >
          <SelectTrigger className="shad-select-trigger">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="shad-select-content">
            {children}
          </SelectContent>
        </Select>
      );
    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton() : null;
    default:
      return null;
  }
};

const ServerCustomField = (props: CustomProps) => {
  const { name, label, errors } = props;

  return (
    <div className="col-span-2">
      {label && <p className="text-sm font-medium mb-1">{label} *</p>}
      <RenderInput props={props} />
      {errors && (
        <div id={`${name}-error`} aria-live="polite" aria-atomic="true">
          {errors.map((err: string) => (
            <p key={err} className="text-red-700 text-xs">
              {err}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServerCustomField;
