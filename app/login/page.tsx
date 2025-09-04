"use client";
import React from "react";
import AuthForm from "./AuthForm";

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <AuthForm />
            </div>
        </main>
    );
}

