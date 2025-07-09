import { useState } from "react";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";
import { event as gaEvent } from "@/lib/gtag";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    gaEvent({
      action: "contact_form_submit",
      category: "Form",
      label: formData.email,
    });

    toast.dismiss();
    const loadingToast = toast.loading("Sending email...");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID;

    if (!serviceId || !templateId || !userId) {
      toast.error("EmailJS environment variables are missing!");
      setIsSending(false);
      return;
    }

    const emailData = {
      ...formData,
      date: new Date().toLocaleDateString(),
    };

    try {
      await emailjs.send(serviceId, templateId, emailData, userId);
      toast.success("Email sent successfully!", { id: loadingToast });
      setFormData({ name: "", email: "", message: "" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error("Failed to send email: " + error.message, {
          id: loadingToast,
        });
      } else {
        toast.error("Failed to send email: An unknown error occurred.", {
          id: loadingToast,
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <Toaster position='top-right' />
      <form
        onSubmit={handleSubmit}
        className='flex flex-col md:w-1/2 items-center text-black place-self-start justify-center gap-5'
      >
        <input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Name'
          required
          className='w-full border-2 border-[#2d323c] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#2d323c] focus:border-transparent'
        />
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          required
          className='w-full border-2 border-[#2d323c] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#2d323c] focus:border-transparent'
        />
        <textarea
          name='message'
          value={formData.message}
          onChange={handleChange}
          placeholder='Message'
          required
          className='w-full border-2 border-[#2d323c] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#2d323c] focus:border-transparent'
        />
        <button
          type='submit'
          disabled={isSending}
          className='border-2 border-[#2d323c] rounded-full py-2 px-4 focus:outline-none transition duration-700 focus:ring-2 focus:ring-[#2d323c] focus:border-transparent text-gray-200 hover:bg-gray-300 hover:text-gray-700'
        >
          {isSending ? "Sending..." : "Send"}
        </button>
      </form>
    </>
  );
}
