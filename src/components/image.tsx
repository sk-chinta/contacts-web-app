"use client";

import * as React from "react";

const Avatar = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement>
>(({ className, ...props }, ref) => (
  <img
    ref={ref}
    className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"
    {...props}
  />
));
Avatar.displayName = "Avatar";

export { Avatar };
