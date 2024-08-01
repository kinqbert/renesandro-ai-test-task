import cn from "classnames";
import "./Button.scss";

interface Props {
  buttonText: string;
  stretch?: boolean;
  type?: "reset" | "submit";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "outline" | "filled";
  compact?: boolean;
}

function Button({
  buttonText,
  stretch = false,
  type = undefined,
  onClick = () => {},
  variant = "outline",
  compact = false,
}: Props) {
  return (
    <button
      className={cn("button", `button--${variant}`, {
        "button--flex-stretch": stretch,
        "button--compact": compact,
      })}
      onClick={onClick}
      type={type}
    >
      {buttonText}
    </button>
  );
}

export default Button;
