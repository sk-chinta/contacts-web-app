import React from "react";
import styles from "../components/modal.module.css";

const Modal = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={`${styles.modal}`} {...props} />
));
Modal.displayName = "Modal";
export { Modal };
