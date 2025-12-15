import React from "react";
import "./Card.scss";

export default function Card({ className = "", children, width = "240px" }) {
  return (
    <div className={`card ${className}`} style={{ maxWidth: width }}>
      {children}
    </div>
  );
}
