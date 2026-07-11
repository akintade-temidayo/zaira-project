"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { apiRequest } from "@/lib/api";
import { saveToken, savePendingEmail, savePendingOtp, saveUser } from "@/lib/authStorage";
import Image from "next/image";
import logo from "../../../public/logo.png";
import { Eye, EyeOff } from "lucide-react";

function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ fullName: "", email: "", password: "" });
    const [profilePicture, setProfilePicture] = useState(null);
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const base64 = await fileToBase64(file);
            setProfilePicture(base64);
            setPreview(base64);
        } catch {
            setError("Failed to process image. Please try another file.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await apiRequest("/auth/signup", {
                method: "POST",
                body: {
                    fullName: form.fullName,
                    email: form.email,
                    password: form.password,
                    profilePicture,
                },
            });
            saveToken(data.token);
            saveUser(data.user); 
            savePendingEmail(form.email);
            savePendingOtp(data.otpCode);
            router.push("/verify-otp");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#E8F1F1] flex flex-col">
            {/* Top bar with logo */}
            <div className="w-full px-6 py-4 flex justify-center border-b border-[#DFDFDF] bg-white">
                <Link href="/">
                    <Image src={logo} alt="Zaira" width={100} height={32} priority />
                </Link>
            </div>

            {/* Form area */}
            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md">
                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-[#DFDFDF] px-8 py-10">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-[#0C1622]">
                                Create an account
                            </h1>
                            <p className="text-sm text-[#6D757F] mt-1">
                                Join Zaira and start sharing your recipes.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <Input
                                label="Full name"
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />

                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                required
                            />

                            <div className="relative">
                                <Input
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="At least 6 characters"
                                    minLength={6}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-[38px] text-[#6D757F] hover:text-[#0C1622]"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>

                            {/* Profile picture */}
                            <div>
                                <label className="block mb-2 text-sm font-medium text-[#183354]">
                                    Profile picture
                                    <span className="text-[#7C91AA] font-normal ml-1">
                                        (optional)
                                    </span>
                                </label>

                                <div className="flex items-center gap-4">
                                    {/* Preview circle */}
                                    <div className="w-14 h-14 rounded-full bg-[#E8F1F1] border-2 border-dashed border-[#B8C1CD] flex items-center justify-center overflow-hidden flex-shrink-0">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-xl">👤</span>
                                        )}
                                    </div>

                                    <label className="cursor-pointer flex-1">
                                        <div className="border border-[#DFDFDF] rounded-md px-4 py-2.5 text-sm text-[#6D757F] hover:border-[#7C91AA] transition-colors text-center">
                                            {preview ? "Change photo" : "Choose photo"}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                            </div>

                            {error && (
                                <p className="text-sm text-[#F4796C] bg-[#FFF3F2] border border-[#F4796C]/20 rounded-md px-3 py-2">
                                    {error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className="w-full"
                            >
                                {loading ? "Creating account..." : "Sign Up"}
                            </Button>
                        </form>

                        <p className="text-sm text-[#6D757F] mt-6 text-center">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-[#F4796C] font-semibold hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}