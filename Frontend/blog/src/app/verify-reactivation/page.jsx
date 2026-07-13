"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { apiRequest } from "@/lib/api";
import logo from "../../../public/logo.png";

export default function VerifyReactivationPage() {
    const router = useRouter();
    const [email, setEmail] = useState(() => {
        if (typeof window === "undefined") return "";
        return sessionStorage.getItem("reactivationEmail") || "";
    });
    const [otpCode, setOtpCode] = useState(() => {
        if (typeof window === "undefined") return "";
        return sessionStorage.getItem("reactivationOtp") || "";
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!email) {
            router.push("/request-reactivation");
        }
    }, [email, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await apiRequest("/auth/verify-reactivation", {
                method: "POST",
                body: { email, otpCode },
            });

            sessionStorage.removeItem("reactivationEmail");
            sessionStorage.removeItem("reactivationOtp");

            router.push("/login?reactivated=true");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setError("");
        try {
            const data = await apiRequest("/auth/request-reactivation", {
                method: "POST",
                body: { email },
            });
            setOtpCode(data.otpCode);
            sessionStorage.setItem("reactivationOtp", data.otpCode);
        } catch (err) {
            setError(err.message);
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
                            Enter your reactivation code
                        </h1>
                        <p className="text-sm text-[#6D757F] mt-1">
                            Code sent to{" "}
                            <span className="font-medium text-[#0C1622]">{email}</span>.
                            It&apos;s pre-filled below.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Input
                            label="Reactivation Code"
                            name="otpCode"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="6-digit code"
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
                                <span className="dot  w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                                <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                                <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                            </div>
                        </div>) : "Reactivate Account"}
                        </Button>
                    </form>

                    <button
                        onClick={handleResend}
                        className="text-sm text-[#7C91AA] hover:text-[#183354] mt-4 w-full text-center hover:underline"
                    >
                        Resend code
                    </button>
                </div>
            </div>
        </div>
    );
}