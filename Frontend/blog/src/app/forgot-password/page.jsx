// forget password
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { forgotPassword } from '@/lib/api'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function ForgotPasswordPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
        const data = await forgotPassword(email)
        sessionStorage.setItem('resetEmail', email)
        sessionStorage.setItem('resetOtp', data.otpCode)
        router.push('/reset-password')
    } catch (err) {
        setError(err.message)
    } finally {
        setLoading(false)
    }
}

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#E8F1F1] px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-6 sm:p-8">
                <h1 className="text-xl sm:text-2xl font-semibold text-[#0C1622] mb-2">
                    Forgot your password?
                </h1>
                <p className="text-sm text-[#6D757F] mb-6">
                    Enter the email linked to your account and we&apos;ll send you a reset code.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <p className="text-sm text-[#F4796C]">{error}</p>
                    )}

                    <Button type="submit" variant="primary" disabled={loading} className="w-full">
                        {loading ? 'Sending...' : 'Send Reset Code'}
                    </Button>
                </form>

                <p className="text-sm text-[#6F6F6F] mt-6 text-center">
                    Remembered it?{' '}
                    <Link href="/login" className="text-[#183354] font-medium">
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    )
}