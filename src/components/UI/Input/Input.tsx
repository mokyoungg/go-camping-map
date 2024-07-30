import { ComponentPropsWithRef, forwardRef } from "react";
import classNames from "classnames/bind";

import styles from "./Input.module.scss";

const cx = classNames.bind(styles);

interface InputProps extends ComponentPropsWithRef<"input"> {
  handleReset?: () => void;
  error?: boolean;
  message?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    id,
    className,
    type = "text",
    error,
    message,
    disabled,
    placeholder = "Add Text",
    handleReset,
    ...rest
  } = props;

  return (
    <div
      className={cx(className, "container", {
        "container--error": error,
      })}
    >
      <input
        id={id}
        className={cx("input")}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

export default Input;
