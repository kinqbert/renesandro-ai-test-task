import { useState } from "react";
import cn from "classnames";
import "./Accordion.scss";

interface Props {
  title: string;
  item: React.ReactNode;
  isLast?: boolean;
}

function Accordion({ title, item, isLast = false }: Props) {
  const [toggled, setToggled] = useState(false);

  const handleAccordionToggle = () => {
    setToggled(!toggled);
  };

  return (
    <div className={cn("accordion", { toggled, "accordion--last": isLast })}>
      <button
        className="accordion__toggle"
        onClick={handleAccordionToggle}
      >
        <p>{title}</p>
        <span className="accordion__direction-indicator">
          {toggled ? "-" : "+"}
        </span>
      </button>
      <div className="accordion__content-wrapper">
        <div className="accordion__content">{item}</div>
      </div>
    </div>
  );
}

export default Accordion;
