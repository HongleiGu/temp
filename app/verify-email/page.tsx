"use client";
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13 app directory
import toast from 'react-hot-toast';

export default function VerifyEmailTemporaryPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('token');
            if (!token) {
                toast.error("Invalid or missing token.");
                return;
            }

            try {
                const response = await fetch('/api/verify-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (!response.ok) {
                    toast.error("An error occurred during verification, or link is expired."); 
                    return;
                }

                toast.success("Email verified!");
                router.push('/'); 
            } catch (error) {
                console.error('Error validating token:', error);
                toast.error(error.message || "An error occurred during verification."); // Display error message from server or a generic message
				return;
            }
        };

        verifyEmail();
    }, []);

    return <div>Verifying your email...</div>; // Or a loading indicator
}