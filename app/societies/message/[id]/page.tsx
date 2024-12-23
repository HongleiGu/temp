'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from '@/app/components/button'; // Assume you have a custom button component
import { SocietyMessageFormData } from '@/app/lib/types';
import { useParams, usePathname } from 'next/navigation';

export default function SendEmailPage() {
  const [partner, setPartner] = useState({name: ''});
  const { id } = useParams(); // Use useParams for dynamic routing to get the dynamic id from the URL
  const pathname = usePathname(); // Optional: Useful for debugging to know the current path
  const { register, handleSubmit, control, setValue } = useForm<SocietyMessageFormData>({
    mode: 'onSubmit',
    defaultValues: {
      userEmail: '',
      subject: '',
      message: '',
    },
  });

  const router = useRouter();

  async function fetchPartnerName(id: string) {
    try {
      const response = await fetch('/api/societies/get-organiser-name', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch a specific organiser');
      }

      const data = await response.json();
      
      return data;
    } catch (err) {
      console.error('failed to retrieve organiser name', err);
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchPartnerName(id instanceof Array ? id[0] : id);
      setPartner(result);
    }
    fetch();
  }, [id])

  const onSubmit = async (data: SocietyMessageFormData) => {
    console.log('Form Data:', data); // Log all form data for debugging

    const toastId = toast.loading('Sending email...');

    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          email: data.userEmail,
          subject: data.subject,
          text: data.message,
          html: `<p>${data.message.replace(/\n/g, '<br>')}</p>`, // Ensure line breaks are converted to <br> tags
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Email sent successfully!', { id: toastId });
        router.push('/societies/thank-you'); // Redirect to thank-you page after sending email
      } else {
        toast.error(`Error sending email: ${result.error}`, { id: toastId });
      }
    } catch (error) {
      toast.error(`Error during email sending: ${error.message}`, { id: toastId });
      console.error('Error during email sending:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-start p-10 bg-gradient-to-b from-[#041A2E] via-[#064580] to-[#083157]">
      <h1 className="text-3xl font-semibold mb-6 ml-10 text-white">Send a Message to {partner.name}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg bg-transparent p-6 rounded-lg mb-10 mt-10">
        {/* User Email */}
        <div className="mb-4">
          <label className="block text-white font-bold mb-1">Your Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('userEmail', { required: true })}
            className="w-full p-2 border border-gray-300 rounded bg-transparent text-white placeholder-gray-500"
          />
        </div>

        {/* Email Subject */}
        <div className="mb-4">
          <label className="block text-white font-bold mb-1">Subject</label>
          <input
            type="text"
            placeholder="Enter email subject"
            {...register('subject', { required: true })}
            className="w-full p-2 border border-gray-300 rounded bg-transparent text-white placeholder-gray-500"
          />
        </div>

        {/* Email Message */}
        <div className="mb-4">
          <label className="block text-white font-bold mb-1">Message</label>
          <textarea
            rows={6}
            placeholder="Enter your message"
            {...register('message', { required: true })}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-white placeholder-gray-500 bg-transparent"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center">
          <Button variant='outline' onClick={handleSubmit(onSubmit)} className="bg-transparent text-white py-2 px-6 rounded-lg border-2 border-[#3c82f6] hover:bg-blue-900">
            Send Email
          </Button>
        </div>
      </form>
    </div>
  );
}
