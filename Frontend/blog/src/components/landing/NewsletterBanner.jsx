"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const LETTERS_ONLY = /^[a-zA-Z\s]*$/;

export default function NewsletterBanner() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleNameChange = (e) => {
        const value = e.target.value;

        if (!LETTERS_ONLY.test(value)) {
            setErrors((prev) => ({
                ...prev,
                name: "Name can only contain letters"
            }));
        } else if (value.length > 50) {
            setErrors((prev) => ({
                ...prev,
                name: "Name cannot exceed 50 characters"
            }));
        } else {
            setErrors((prev) => ({ ...prev, name: "" }));
        }

        setName(value);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;

        // max 50 characters for email
        if (value.length > 50) {
            setErrors((prev) => ({
                ...prev,
                email: "Email cannot exceed 50 characters"
            }));
        } else {
            setErrors((prev) => ({ ...prev, email: "" }));
        }

        setEmail(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // validate email format properly
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrors((prev) => ({
                ...prev,
                email: "Please enter a valid email address"
            }));
            return;
        }

        const hasErrors = Object.values(errors).some(Boolean);
        if (hasErrors) return;

        setSubmitted(true);
    };

    return (
        <section className="mx-auto lg:mx-16"
        style={{ backgroundImage: "url('/Sectionbackground.png')" }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-7">
                    <div className="text-center sm:text-left">
                        <h2 className="text-lg sm:text-xl font-bold text-[#0C1622]">
                            Want to get new food daily?
                        </h2>
                        <p className="text-sm text-[#6D757F] mt-1">
                            Subscribe to our newsletter for the latest recipes.
                        </p>
                    </div>

                    {submitted ? (
                        <p className="text-sm text-[#183354] font-medium">
                            Thanks for subscribing! 🎉
                        </p>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col sm:flex-row items-start gap-3 w-full sm:w-auto"
                        >
                            {/* Name */}
                            <div className="w-full sm:w-36">
                                <Input
                                    bare
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={handleNameChange}
                                    required
                                    maxLength={50}
                                />
                                {errors.name && (
                                    <p className="text-xs text-[#F4796C] mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="w-full sm:w-48">
                                <Input
                                    bare
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    maxLength={50}
                                />
                                {errors.email && (
                                    <p className="text-xs text-[#F4796C] mt-1">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                size="sm"
                                className="w-full sm:w-auto whitespace-nowrap"
                            >
                                Submit Now
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
}