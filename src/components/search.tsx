import * as React from "react";
import { Input } from "./input";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Search = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="w-80 w-full">
        <Input ref={ref} {...props}></Input>
      </div>
    );
  }
);
Search.displayName = "Search";

export { Search };
