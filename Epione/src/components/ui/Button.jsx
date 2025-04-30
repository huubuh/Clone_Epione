const Button = ({
  children,
  variant = "primary",
  icon = null,
  className = "",
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center px-5 py-2.5 rounded-xl font-medium transition-colors duration-200";

  const variants = {
    primary: "bg-[#1202b0] text-white hover:bg-[#0f029a]",
    outline: "border border-[#1202b0] text-[#1202b0] hover:bg-[#f0f3ff]",
    text: "text-[#1202b0] underline-offset-4 hover:underline",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};
export default Button;
