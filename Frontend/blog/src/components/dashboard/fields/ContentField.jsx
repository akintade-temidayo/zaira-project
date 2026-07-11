"use client";

const LETTERS_AND_NUMBERS = /^[a-zA-Z0-9\s.,\-:()]*$/;

export default function ContentField({ value, onChange, error, setError }) {
    const handleChange = (e) => {
        const val = e.target.value;
        if (!LETTERS_AND_NUMBERS.test(val)) {
            setError("Content can only contain letters, numbers and basic punctuation");
        } else {
            setError("");
        }
        onChange(e);
    };

    return (
        <div className="w-full">
            <label className="block mb-1.5 text-sm font-medium text-[#183354]">
                Content
            </label>
            <textarea
                name="content"
                value={value}
                onChange={handleChange}
                placeholder="Write your blog post content here..."
                required
                rows={4}
                className={`w-full rounded-md border px-4 py-2.5 text-sm text-[#0C1622] placeholder-[#6D757F] focus:outline-none focus:ring-2 resize-none ${
                    error
                        ? "border-[#F4796C] focus:ring-[#F4796C]"
                        : "border-[#DFDFDF] focus:ring-[#7C91AA] focus:border-[#7C91AA]"
                }`}
            />
            {error && (
                <p className="mt-1.5 text-sm text-[#F4796C]">{error}</p>
            )}
        </div>
    );
}