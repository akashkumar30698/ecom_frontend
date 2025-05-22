
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Newsletter = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold font-heading mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-11"
              required
            />
            <Button type="submit" className="h-11 bg-navy-900 hover:bg-navy-800">
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
