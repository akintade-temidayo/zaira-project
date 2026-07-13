// reset password
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { forgotPassword, resetPassword } from '@/lib/api'

export default function ResetPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState(() => {
        if (typeof window === 'undefined') return ''
        return sessionStorage.getItem('resetEmail') || ''
    })
    const [otpCode, setOtpCode] = useState(() => {
        if (typeof window === 'undefined') return ''
        return sessionStorage.getItem('resetOtp') || ''
    })
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [resending, setResending] = useState(false)

    useEffect(() => {
        // If there's no email stored (and none initialized), redirect back to start.
        if (!email) {
            router.push('/forgot-password')
        }
    }, [router, email])

const handleResend = async () => {
    setResending(true)
    setError('')
    try {
        const data = await forgotPassword(email)
        setOtpCode(data.otpCode)
        sessionStorage.setItem('resetOtp', data.otpCode)
        setMessage('New code sent and filled in below.')
    } catch (err) {
        setError(err.message || 'Could not resend code')
    } finally {
        setResending(false)
    }
}

const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
        await resetPassword({ email, otpCode, newPassword })
        sessionStorage.removeItem('resetEmail')
        sessionStorage.removeItem('resetOtp')
        router.push('/login')
    } catch (err) {
        setError(err.message || 'Something went wrong')
    } finally {
        setLoading(false)
    }
}

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E8F1F1] px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 sm:p-8">
                <h1 className="text-xl sm:text-2xl font-semibold text-[#0C1622] mb-2">
                    Reset your password
                </h1>
                <p className="text-sm text-[#6D757F] mb-6">
                    Code sent to <span className="text-[#0C1622] font-medium">{email}</span>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-[#545E69] mb-1">Reset Code</label>
                        <input
                            type="text"
                            required
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            className="w-full rounded-md border border-[#DFDFDF] px-3 py-2 text-sm text-[#0C1622] tracking-widest focus:outline-none focus:ring-2 focus:ring-[#F4796C]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-[#545E69] mb-1">New Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded-md border border-[#DFDFDF] px-3 py-2 text-sm text-[#0C1622] focus:outline-none focus:ring-2 focus:ring-[#F4796C]"
                            placeholder="At least 6 characters"
                        />
                    </div>

                    {error && <p className="text-sm text-[#F4796C]">{error}</p>}
                    {message && <p className="text-sm text-[#183354]">{message}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#F4796C] text-white rounded-md py-2 text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
                    >
                        {loading ? (<div className="flex items-center justify-center gap-1">
                            <div className="flex gap-1">
                                <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                                <span className="dot  w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                                <span className="dot w-3 h-3 rounded-2xl bg-[#FFF3F2] inline-block" />
                            </div>
                        </div>) : 'Reset Password'}
                    </button>
                </form>

                <button
                    onClick={handleResend}
                    disabled={resending}
                    className="w-full mt-4 text-sm text-[#7C91AA] hover:text-[#183354] transition disabled:opacity-60"
                >
                    {resending ? 'Resending...' : "Didn't get a code? Resend"}
                </button>
            </div>
        </div>
    )
}