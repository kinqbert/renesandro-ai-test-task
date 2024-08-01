import cn from "classnames";
import "./Button.scss";

interface Props {
  buttonText: string;
  stretch?: boolean;
  type?: "reset" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "outline" | "filled";
}

function Button({
  buttonText,
  stretch = false,
  type = undefined,
  onClick = () => {},
  variant = "outline",
}: Props) {
  return (
    <button
      className={cn("button", `button--${variant}`, {
        "button--flex-stretch": stretch,
      })}
      onClick={onClick}
      type={type}
    >
      {buttonText}
    </button>
  );
}

export default Button;
