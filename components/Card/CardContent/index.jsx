import React from "react";
import "./CardContent.scss";

export default function CardContent({ classNames = "", children, ...props }) {
  return (
    <div className={`card__content ${classNames}`} {...props}>
      {children}
    </div>
  );
}
