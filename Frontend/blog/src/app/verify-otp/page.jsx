// verify-otp
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { apiRequest } from "@/lib/api";
import {
getPendingEmail,
getPendingOtp,
clearPendingEmail,
clearPendingOtp,
} from "@/lib/authStorage";

export default function VerifyOtpPage() {
const router = useRouter();
const [email, setEmail] = useState(() => getPendingEmail() || "")
const [otpCode, setOtpCode] = useState(() => getPendingOtp() || "")
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);
const [resending, setResending] = useState(false);

useEffect(() => {
    const pendingEmail = getPendingEmail()

    if (!pendingEmail) {
        router.push("/signup")
    }
}, [router])

const handleVerify = async (e) => {
e.preventDefault();
setError("");
setLoading(true);
try {
    await apiRequest("/auth/verify-otp", {
    method: "POST",
    body: { email, otpCode },
    });

    clearPendingEmail();
    clearPendingOtp();
    router.push("/login");
} catch (err) {
    setError(err.message);
} finally {
    setLoading(false);
}
};

const handleResend = async () => {
setError("");
setResending(true);
try {
    // generate-otp is a protected route — this only works if a token
    // is still in localStorage from signup (see note in chat)
    const data = await apiRequest("/auth/generate-otp", {
    method: "GET",
    auth: true,
    });
    setOtpCode(data.otpCode);
} catch (err) {
    setError("Could not resend code. Try signing up again.");
} finally {
    setResending(false);
}
};

return (
<main className="min-h-screen flex items-center justify-center bg-[#E8F1F1] px-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
    <h1 className="text-2xl font-bold text-[#0C1622] mb-1">Verify your account</h1>
    <p className="text-sm text-[#6D757F] mb-6">
        We generated a code for <span className="font-medium">{email}</span>. It&apos;s
        pre-filled below — just confirm.
    </p>

    <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <Input
        label="Verification code"
        name="otpCode"
        value={otpCode}
        onChange={(e) => setOtpCode(e.target.value)}
        placeholder="6-digit code"
        required
        />

        {error && <p className="text-sm text-[#F4796C]">{error}</p>}

        <Button type="submit" variant="primary" disabled={loading} className="w-full mt-2">
        {loading ? (<div className="flex items-center justify-center gap-1">
                <div className="flex gap-1">
                    <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                    <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                    <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                </div>
            </div>) : "Verify"}
        </Button>
    </form>

    <button
        onClick={handleResend}
        disabled={resending}
        className="text-sm text-[#F4796C] mt-4 text-center w-full hover:underline disabled:opacity-50"
    >
        {resending ? "Resending..." : "Resend code"}
    </button>
    </div>
</main>
);
}