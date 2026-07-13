// login
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { apiRequest } from "@/lib/api";
import { saveToken, saveUser, saveIsAdmin } from "@/lib/authStorage";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reactivated = searchParams.get("reactivated");

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showReactivationLink, setShowReactivationLink] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShowReactivationLink(false);
    setLoading(true);

    try {
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: {
          email: form.email,
          password: form.password,
        },
      });

      saveToken(data.token);
      saveUser(data.user);
      saveIsAdmin(data.isAdmin);

      // silent redirect based on role
      if (data.isAdmin) {
        router.push("/admin");       // ← admin goes here invisibly
      } else {
        router.push("/dashboard");   // ← regular users go here
      }
    } catch (err) {
      // check if account is disabled
      if (err.message?.toLowerCase().includes("disabled")) {
        setError(err.message);
        setShowReactivationLink(true);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#E8F1F1] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-[#0C1622] mb-1">Welcome back</h1>
        <p className="text-sm text-[#6D757F] mb-6">
          Sign in to manage and share your recipes.
        </p>

        {reactivated && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm mb-4">
                ✅ Your account has been reactivated. You can now log in.
            </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          {error && <p className="text-sm text-[#F4796C]">{error}</p>}

          {showReactivationLink && (
            <Link
                href="/request-reactivation"
                className="text-sm text-[#7C91AA] hover:text-[#183354] underline text-center block"
            >
                Request account reactivation →
            </Link>
          )}

          <Button type="submit" variant="primary" disabled={loading} className="w-full mt-2">
            {loading ? 
              (<div className="flex items-center justify-center gap-2">                
                <div className="flex gap-1 ">
                    <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                    <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                    <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                </div>
              </div>) : "Sign In"}
          </Button>
          <div className="flex justify-end">
          <Link href="/forgot-password" className="text-sm text-[#7C91AA] hover:text-[#183354]">
              Forgot password?
          </Link>
</div>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-[#6D757F]">New here? </span>
          <Link href="/signup" className="text-[#F4796C] font-medium">
            Create account
          </Link>
        </div>
      </div>
    </main>
  );
}