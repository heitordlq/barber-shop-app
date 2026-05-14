"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CheckboxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  checked?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, disabled, ...props }, ref) => {
    return (
      <span
        className={cn(
          "relative inline-flex size-4 items-center justify-center rounded-sm border border-input bg-transparent text-foreground shadow-xs",
          "focus-within:ring-3 focus-within:ring-ring/50 focus-within:border-ring",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          className="absolute inset-0 size-full cursor-pointer appearance-none"
          checked={checked}
          disabled={disabled}
          {...props}
        />
        {checked ? <CheckIcon className="size-3" /> : null}
      </span>
    )
  }
)

Checkbox.displayName = "Checkbox"

