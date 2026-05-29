"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="py-20 px-6 bg-surface border-t border-border">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Stay in the know
        </h2>
        <p className="text-sm text-muted mb-6">
          No spam, just updates on new items and seasonal sales.
        </p>
        {submitted ? (
          <p className="text-accent font-medium">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-accent-dim text-white text-sm font-semibold hover:bg-accent transition-colors"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
