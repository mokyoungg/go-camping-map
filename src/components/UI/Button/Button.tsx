import { ComponentPropsWithRef, PropsWithChildren, forwardRef } from "react";
import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

interface ButtonProps extends ComponentPropsWithRef<"button"> {
  size: "small" | "medium";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  (props, ref) => {
    const {
      children,
      className,
      size,
      type = "button",
      disabled,
      isLoading = false,
      ...rest
    } = props;

    return (
      <button
        className={cx(className, "button", `button--${size}`)}
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading ? <div>Loading...</div> : children}
      </button>
    );
  }
);

export default Button;
