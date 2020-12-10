import React from "react";
import './Misc.css';

export default function LoaderButton({
  isLoading = false,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`StandardButton LoaderButton ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Refresh Icon */}
      {!isLoading && props.children}
      {isLoading && <i className="fa fa-refresh fa-spin"></i>}
    </button>
  );
}