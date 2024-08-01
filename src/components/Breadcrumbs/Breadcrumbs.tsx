import React from "react";
import "./Breadcrumbs.scss";

interface Props {
  items: React.ReactNode[];
}

function Breadcrumbs({ items }: Props) {
  return (
    <nav className="breadcrumbs">
      {items.map((item, index) => (
        <span key={index} className="breadcrumbs__item small-text">
          {item}
          {index < items.length - 1 && (
            <span className="breadcrumbs__separator">{"/"}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
