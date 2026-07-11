//button.js
const VARIANTS = {
primary: "bg-[#F4796C] text-white hover:bg-[#e35f51] focus-visible:outline-[#F4796C]",
dark: "bg-[#183354] text-white hover:bg-[#0C1622] focus-visible:outline-[#183354]",
outline:
"bg-transparent text-[#183354] border border-[#B8C1CD] hover:border-[#183354] focus-visible:outline-[#183354]",
text: "bg-transparent text-[#F4796C] hover:text-[#e35f51] px-0 focus-visible:outline-[#F4796C]",
};

const SIZES = {
sm: "text-sm px-4 py-2",
md: "text-base px-6 py-3",
lg: "text-lg px-8 py-4",
};

export default function Button({
children,
variant = "primary",
size = "md",
type = "button",
disabled = false,
className = "",
...props
}) {
const isText = variant === "text";

return (
<button
    type={type}
    disabled={disabled}
    className={[
    "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors",
    "focus-visible:outline focus-visible:outline-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    VARIANTS[variant],
    isText ? SIZES[size].replace(/px-\d+/, "px-0") : SIZES[size],
    className,
    ].join(" ")}
    {...props}
>
    {children}
</button>
);
}
