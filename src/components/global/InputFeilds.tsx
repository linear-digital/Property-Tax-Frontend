/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Input as AntInput, Select, DatePicker } from "antd";
import type { SelectProps } from "antd";
import { Dayjs } from "dayjs";

type CommonProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  name?: string;
};

type InputProps = CommonProps & {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  maxLength?: number;
  minLength?: number;
  autoFocus?: boolean;
};

type TextAreaProps = CommonProps & {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  rows?: number;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
};

type DateProps = CommonProps & {
  value?: Dayjs;
  onChange?: any;
  onBlur?: () => void;
  format?: string;
  allowClear?: boolean;
};

type SelectInputProps = CommonProps & {
  options: SelectProps['options'];
  value?: string | number | string[];
  onChange?: (value: any, option?: any) => void;
  onBlur?: () => void;
  allowClear?: boolean;
  mode?: "multiple" | "tags";
  loading?: boolean;
  showSearch?: boolean;
  optionFilterProp?: string;
  dropdownRender?: SelectProps['dropdownRender'];
};

const FieldWrapper = ({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col w-full">
    {label && (
      <label
        htmlFor={label}
        className="text-sm text-gray-600 dark:text-gray-300 mb-1 capitalize"
      >
        {label}
      </label>
    )}
    {children}
  </div>
);

export const Input = ({
  label,
  placeholder,
  onChange,
  value,
  type = "text",
  required,
  disabled,
  className,
  style,
  id,
  name,
  onBlur,
  maxLength,
  minLength,
  autoFocus,
}: InputProps) => {
  return (
    <FieldWrapper label={label}>
      <AntInput
        id={id || label}
        name={name || label}
        required={required}
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        autoFocus={autoFocus}
        size="large"
        style={style}
        placeholder={placeholder || `Enter ${label}`}
        className={`w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3 ${className || ''}`}
      />
    </FieldWrapper>
  );
};
export const Password = ({
  label,
  placeholder,
  onChange,
  value,
  type = "text",
  required,
  disabled,
  className,
  style,
  id,
  name,
  onBlur,
  maxLength,
  minLength,
  autoFocus,
}: InputProps) => {
  return (
    <FieldWrapper label={label}>
      <AntInput.Password
        id={id || label}
        name={name || label}
        required={required}
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        autoFocus={autoFocus}
        size="large"
        style={style}
        placeholder={placeholder || `Enter ${label}`}
        className={`w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3 ${className || ''}`}
      />
    </FieldWrapper>
  );
};
export const TextArea = ({
  label,
  placeholder,
  onChange,
  value,
  disabled,
  className,
  style,
  id,
  name,
  onBlur,
  maxLength,
  rows = 4,
  autoSize,
}: TextAreaProps) => {
  return (
    <FieldWrapper label={label}>
      <AntInput.TextArea
        id={id || label}
        name={name || label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
        autoSize={autoSize}
        size="large"
        style={style}
        placeholder={placeholder || `Enter ${label}`}
        className={`w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3 ${className || ''}`}
      />
    </FieldWrapper>
  );
};

export const Date = ({
  label,
  placeholder,
  onChange,
  value,
  disabled,
  className,
  style,
  id,
  name,
  onBlur,
  format = "YYYY-MM-DD",
  allowClear = true,
}: DateProps) => {
  return (
    <FieldWrapper label={label}>
      <DatePicker
        id={id || label}
        name={name || label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        format={format}
        allowClear={allowClear}
        size="large"
        style={style}
        placeholder={placeholder || `Select ${label}`}
        className={`w-full border border-gray-200 p-[5px] rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm py-2 px-3 ${className || ''}`}
      />
    </FieldWrapper>
  );
};

export const InputSelect = ({
  label,
  options,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled,
  className,
  style,
  id,
  allowClear = true,
  mode,
  loading,
  showSearch = true,
  optionFilterProp = "label",
  dropdownRender,
}: SelectInputProps) => {
  return (
    <FieldWrapper label={label}>
      <Select
        id={id || label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        options={options}
        placeholder={placeholder || `Select ${label}`}
        allowClear={allowClear}
        mode={mode}
        loading={loading}
        showSearch={showSearch}
        optionFilterProp={optionFilterProp}
        dropdownRender={dropdownRender}
        title={label}
        size="large"
        style={style}
        className={`w-full border border-gray-200 rounded-md dark:text-white bg-white dark:bg-background-dark dark:border-gray-600 text-sm ${className || ''}`}
        filterOption={(input, option) =>
          (option?.label as string)?.toLowerCase().includes(input.toLowerCase())
        }
      />
    </FieldWrapper>
  );
};