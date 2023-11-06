import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className="h-10 w-30 w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm shadow-sm"
        style={{
          border: 0,
          cursor: "pointer",
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
