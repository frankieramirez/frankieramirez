"use client";

import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "@tanstack/react-form";
import { z } from "zod/v4";

// Global type declarations for reCAPTCHA
declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
    onRecaptchaVerify?: (token: string) => void;
  }
}

// Zod schema for validation
const contactFormSchema = z.object({
  name: z.string().min(1, "NAME IS REQUIRED"),
  email: z.string().min(1, "EMAIL IS REQUIRED").email("EMAIL IS INVALID"),
  message: z.string().min(1, "MESSAGE IS REQUIRED"),
});

// Type for form data based on Zod schema
type ContactFormData = z.infer<typeof contactFormSchema>;

export default function PixelContactForm() {
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const recaptchaLoaded = useRef(false);
  const [honeypotWebsite, setHoneypotWebsite] = useState(""); // For honeypot

  // Fetch reCAPTCHA site key from server
  // useEffect(() => {
  //   const fetchRecaptchaKey = async () => {
  //     try {
  //       const response = await fetch("/api/recaptcha-key");
  //       const data = await response.json();
  //       setRecaptchaSiteKey(data.siteKey);
  //     } catch (error) {
  //       console.error("Failed to fetch reCAPTCHA site key:", error);
  //     }
  //   };
  //
  //   fetchRecaptchaKey();
  // }, []);

  useEffect(() => {
    if (recaptchaSiteKey && !recaptchaLoaded.current) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      recaptchaLoaded.current = true;

      return () => {
        document.head.removeChild(script);
        recaptchaLoaded.current = false;
      };
    }
  }, [recaptchaSiteKey]);

  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null
  ); // null, 'success', 'error'
  const formRef = useRef(null);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    validators: {
      onChange: contactFormSchema,
    },
    onSubmit: async ({ value }: { value: ContactFormData }) => {
      // This is called after TanStack Form validation passes
      if (window.grecaptcha && window.grecaptcha.execute && recaptchaSiteKey) {
        try {
          const token = await window.grecaptcha.execute(recaptchaSiteKey, {
            action: "submit",
          });
          // submitFormInternal will now throw an error if email sending fails
          await submitFormInternal(value, token);
          // If submitFormInternal completes without error, onSubmit has succeeded.
          // Success toasts and form reset are handled in handleFormSubmit.
        } catch (error) {
          // This catch block handles errors from reCAPTCHA execution OR from submitFormInternal (email sending failure)
          console.error(
            "reCAPTCHA execution error or email submission error:",
            error
          );
          setFormStatus("error");
          toast({
            variant: "destructive",
            title: "SENDING FAILED!",
            description:
              (error as Error).message ||
              "Could not send your message. Please try again.",
            action: <ToastAction altText="Try again">TRY AGAIN</ToastAction>,
          });
          throw error; // Re-throw the error to notify form.handleSubmit() in handleFormSubmit
        }
      } else {
        console.error("reCAPTCHA not available for execution");
        setFormStatus("error");
        const recaptchaError = new Error(
          "reCAPTCHA not ready. Please try again in a moment."
        );
        toast({
          variant: "destructive",
          title: "ERROR!",
          description: recaptchaError.message,
          action: <ToastAction altText="Try again">TRY AGAIN</ToastAction>,
        });
        throw recaptchaError; // Throw an error to notify form.handleSubmit()
      }
    },
  });

  // Load reCAPTCHA script (no changes here)
  useEffect(() => {
    // This function will be called when reCAPTCHA token is received (though we now use execute)
    window.onRecaptchaVerify = (token) => {
      // setRecaptchaToken(token); // Not strictly needed if execute is the main path
      console.log("Legacy onRecaptchaVerify called with token:", token);
    };

    return () => {
      // Cleanup
      window.onRecaptchaVerify = undefined;
    };
  }, []);

  const submitFormInternal = async (
    formDataValues: ContactFormData,
    recaptchaToken: string // Renamed 'token' to 'recaptchaToken' for clarity
  ) => {
    try {
      // TODO: Update your /api/send-email to verify the recaptchaToken on the server-side.
      const response = await fetch("/api/contact", {
        // Changed endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formDataValues.name,
          email: formDataValues.email,
          message: formDataValues.message,
          // Add company and subject if they are part of your ContactFormData and schema
          // company: formDataValues.company,
          // subject: formDataValues.subject,
          recaptchaToken, // Send reCAPTCHA token to backend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If API returns an error (e.g., 4xx, 5xx), throw an error
        throw new Error(
          data.message || "Failed to send email. Please try again."
        );
      }
      // If response.ok, do nothing here. Success is handled by handleFormSubmit.
      // No setFormStatus, no form.reset(), no toast() here.
      return data; // Optionally return data if needed by caller (not currently used)
    } catch (error) {
      console.error(
        "Error in submitFormInternal (sending message via API):",
        error
      );
      // Re-throw the error so it's caught by useForm.onSubmit
      // Ensure it's an Error object with a message property
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(
        "An unexpected error occurred while sending your message."
      );
    }
    // No 'finally' block needed here for isSubmitting; TanStack Form handles it.
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent default browser validation UI

    // Check if the honeypot field is filled (bots will fill this)
    if (honeypotWebsite) {
      console.log("Honeypot field filled - likely a bot");
      setFormStatus("success"); // Pretend success
      form.reset();
      setHoneypotWebsite("");
      toast({
        title: "MESSAGE SENT!",
        description: "THANKS FOR REACHING OUT. I'LL GET BACK TO YOU SOON.",
        action: <ToastAction altText="Close">CLOSE</ToastAction>,
      });
      return;
    }

    // Rate limiting - prevent more than 1 submission every 30 seconds
    const now = Date.now();
    if (now - lastSubmitTime < 30000) {
      toast({
        variant: "destructive",
        title: "PLEASE WAIT",
        description: "YOU CAN ONLY SUBMIT THE FORM ONCE EVERY 30 SECONDS.",
        action: <ToastAction altText="Close">CLOSE</ToastAction>,
      });
      return;
    }

    // TanStack Form's form.state.isSubmitting will be true during form.handleSubmit()
    // The submit button's Loader2 and disabled state depend on form.state.isSubmitting

    try {
      await form.handleSubmit(); // This triggers TanStack Form's validation and our modified onSubmit logic
      // If handleSubmit completes without throwing, it means email was sent successfully.

      setFormStatus("success");
      form.reset();
      setHoneypotWebsite(""); // Reset honeypot field
      setLastSubmitTime(Date.now());

      toast({
        title: "MESSAGE SENT!",
        description: "THANKS FOR REACHING OUT. I'LL GET BACK TO YOU SOON.",
        action: <ToastAction altText="Close">CLOSE</ToastAction>,
      });
    } catch (error) {
      // This catches errors re-thrown by useForm.onSubmit (e.g., reCAPTCHA or email sending failure)
      // Or errors from TanStack Form's internal validation/submission process if they occur before our onSubmit.
      console.error("Form submission failed in handleFormSubmit:", error);
      // setFormStatus("error") should have already been called by useForm.onSubmit's catch block.
      // The specific error toast (reCAPTCHA failure or API send failure) should also have been shown there.
    }
    // TanStack Form automatically sets form.state.isSubmitting to false when handleSubmit completes (success or error).
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      className="space-y-6 text-sm"
      noValidate // Disable browser's default validation
    >
      <form.Field
        name="name"
        validators={{ onChange: contactFormSchema.shape.name }}
        children={(field) => (
          <div className="relative">
            <label htmlFor={field.name} className="sr-only">
              Name
            </label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="NAME"
              className={`block w-full rounded-none border-0 bg-black px-3 py-2.5 text-white shadow-sm ring-1 ring-inset ring-stone-700 placeholder:text-stone-400 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 ${
                field.state.meta.errors.length > 0
                  ? "ring-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
            {field.state.meta.errors.length > 0 && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
            {field.state.meta.errors.length > 0 && (
              <p
                className="mt-2 text-xs text-red-500"
                id={`${field.name}-error`}
              >
                {field.state.meta.errors.map(String).join(", ")}
              </p>
            )}
          </div>
        )}
      />

      <form.Field
        name="email"
        validators={{ onChange: contactFormSchema.shape.email }}
        children={(field) => (
          <div className="relative">
            <label htmlFor={field.name} className="sr-only">
              Email
            </label>
            <input
              id={field.name}
              name={field.name}
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="EMAIL"
              className={`block w-full rounded-none border-0 bg-black px-3 py-2.5 text-white shadow-sm ring-1 ring-inset ring-stone-700 placeholder:text-stone-400 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 ${
                field.state.meta.errors.length > 0
                  ? "ring-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
            {field.state.meta.errors.length > 0 && (
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <AlertCircle
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
            {field.state.meta.errors.length > 0 && (
              <p
                className="mt-2 text-xs text-red-500"
                id={`${field.name}-error`}
              >
                {field.state.meta.errors.map(String).join(", ")}
              </p>
            )}
          </div>
        )}
      />

      {/* Honeypot field - visually hidden */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website (Honeypot)</label>
        <input
          type="text"
          id="website"
          name="website"
          value={honeypotWebsite}
          onChange={(e) => setHoneypotWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <form.Field
        name="message"
        validators={{ onChange: contactFormSchema.shape.message }}
        children={(field) => (
          <div className="relative">
            <label htmlFor={field.name} className="sr-only">
              Message
            </label>
            <textarea
              id={field.name}
              name={field.name}
              rows={4}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="MESSAGE"
              className={`block w-full rounded-none border-0 bg-black px-3 py-2.5 text-white shadow-sm ring-1 ring-inset ring-stone-700 placeholder:text-stone-400 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6 ${
                field.state.meta.errors.length > 0
                  ? "ring-red-500 focus:ring-red-500"
                  : ""
              }`}
            />
            {field.state.meta.errors.length > 0 && (
              <div className="pointer-events-none absolute inset-y-0 right-0 top-2.5 flex items-center pr-3">
                <AlertCircle
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
              </div>
            )}
            {field.state.meta.errors.length > 0 && (
              <p
                className="mt-2 text-xs text-red-500"
                id={`${field.name}-error`}
              >
                {field.state.meta.errors.map(String).join(", ")}
              </p>
            )}
          </div>
        )}
      />

      <div>
        <Button
          type="submit"
          variant="secondary"
          className="w-full rounded-none bg-orange-500 px-6 py-4 font-semibold uppercase tracking-wider text-black transition-colors duration-300 ease-in-out hover:bg-orange-400 disabled:opacity-50"
          disabled={form.state.isSubmitting || formStatus === "success"}
        >
          {form.state.isSubmitting ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : formStatus === "success" ? (
            <CheckCircle className="mr-2 h-4 w-4" />
          ) : null}
          {formStatus === "success"
            ? "MESSAGE SENT!"
            : form.state.isSubmitting
            ? "SENDING..."
            : "SEND MESSAGE"}
        </Button>
      </div>

      {formStatus === "error" && (
        <p className="mt-4 text-center text-sm text-red-500">
          <AlertCircle className="mr-1 inline h-4 w-4" />
          OOPS! SOMETHING WENT WRONG. PLEASE TRY AGAIN.
        </p>
      )}
    </form>
  );
}
