"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { apiRequest } from "@/lib/api";
import logo from "../../../public/logo.png";

export default function RequestReactivationPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await apiRequest("/auth/request-reactivation", {
                method: "POST",
                body: { email },
            });

            // save email and OTP for verify page
            sessionStorage.setItem("reactivationEmail", email);
            sessionStorage.setItem("reactivationOtp", data.otpCode);

            router.push("/verify-reactivation");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#E8F1F1] flex flex-col">
            {/* Logo bar */}
            <div className="w-full px-6 py-4 flex justify-center border-b border-[#DFDFDF] bg-white">
                <Link href="/">
                    <Image src={logo} alt="Zaira" width={100} height={32} priority />
                </Link>
            </div>

            <div className="flex-1 flex items-center justify-center px-4 py-10">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-[#DFDFDF] px-8 py-10">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-[#0C1622]">
                            Reactivate your account
                        </h1>
                        <p className="text-sm text-[#6D757F] mt-1">
                            Enter your email and we will send you a reactivation code.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />

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
                            {loading ?(<div className="flex items-center justify-center gap-1">
                                <div className="flex gap-1">
                                    <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                                    <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                                    <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                                </div>
                            </div>) : "Send Reactivation Code"}
                        </Button>
                    </form>

                    <p className="text-sm text-[#6D757F] mt-6 text-center">
                        Remember your password?{" "}
                        <Link href="/login" className="text-[#F4796C] font-semibold hover:underline">
                            Back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}