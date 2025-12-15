"use client";

export default function Button({
  children,
  variant = "primary",
  onClick,
  classes,
  ...props
}) {
  const baseStyles = "px-4 py-2 rounded font-medium transition-colors";
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    default: "",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${classes}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
