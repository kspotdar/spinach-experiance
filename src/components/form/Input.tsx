"use client";

import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string | null;
  icon?: ReactNode;
  wrapperClassName?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    error,
    icon,
    wrapperClassName = "",
    className = "",
    type = "text",
    id,
    ...props
  },
  ref
) {
  return (
    <div className={`relative flex flex-col ${wrapperClassName}`}>
      <div className="relative flex items-center">
        {icon && (
          <span className="pointer-events-none absolute left-4 text-zinc-400 dark:text-zinc-500">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          className={`w-full rounded-2xl border bg-white dark:bg-zinc-900 px-4 py-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 ${
            icon ? "pl-11" : ""
          } ${
            error
              ? "border-rose-500 focus:border-rose-500 ring-2 ring-rose-500/20"
              : "border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <span className="mt-1.5 text-xs font-medium text-rose-300 dark:text-rose-400 ml-1 flex items-center gap-1">
          {error}
        </span>
      )}
    </div>
  );
});

export const EmailInput = forwardRef<HTMLInputElement, TextInputProps>(function EmailInput(
  props,
  ref
) {
  return <TextInput ref={ref} type="email" {...props} />;
});
