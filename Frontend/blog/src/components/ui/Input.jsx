//input.js
export default function Input({
  label,
  error,
  type = "text",
  id,
  className = "",
  bare = false,
  ...props
}) {
  const inputId = id || props.name;

  const baseClasses = [
    "w-full rounded-[7px] h-auto text-[#0C1622] placeholder-[#6D757F] bg-white",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    bare ? "px-4 py-3" : "px-4 py-2.5",
    error
      ? "border border-[#F4796C] focus:ring-[#F4796C]"
      : "border border-[#DFDFDF] focus:ring-[#7C91AA] focus:border-[#7C91AA]",
  ].join(" ");

  return (
    <div className="w-full">
      {label && !bare && (
        <label
          htmlFor={inputId}
          className="block mb-1.5 text-sm font-medium text-[#183354]"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        className={[baseClasses, className].join(" ")}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-sm text-[#F4796C]">{error}</p>
      )}
    </div>
  );
}
