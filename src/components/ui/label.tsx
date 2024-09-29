import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-xs peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "text-primary",
        destructive: "text-destructive",
        secondary: "text-blue-600",
        gray: "text-gray-600",
        h1: "text-[56px]",
        h2: "text-[48px]",
        h3: "text-[40px]",
        h4: "text-[32px]",
        h5: "text-[24px]",
        h6: "text-[20px]",
        "label-xl": "text-[24px]",
        "label-lg": "text-[18px]",
        "label-md": "text-[16px]",
        "label-sm": "text-[14px]",
        "label-xs": "text-[12px]",
        "paragraph-xl": "text-[24px] font-normal",
        "paragraph-lg": "text-[18px] font-normal",
        "paragraph-md": "text-[16px] font-normal",
        "paragraph-sm": "text-[14px] font-normal",
        "paragraph-xs": "text-[12px] font-normal",
        "subheading-md": "text-[16px] font-medium",
        "subheading-sm": "text-[14px] font-medium",
        "subheading-xs": "text-[12px] font-medium",
        "subheading-xxs": "text-[10px] font-medium",
      },
      weight: {
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
      weight: "regular",
    },
  }
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, variant, weight, ...props }, ref) => (
  <LabelPrimitive.Root
    className={cn(labelVariants({ variant, weight }), className)}
    ref={ref}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
