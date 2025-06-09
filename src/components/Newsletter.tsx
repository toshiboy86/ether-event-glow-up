
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Successfully subscribed to our newsletter! 🎉', {
        description: 'You\'ll receive updates about the latest Ethereum events.',
      });
      setEmail('');
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Subscribe to our newsletter
        </h3>
        <p className="text-blue-100 mb-8 text-lg">
          Stay updated with the latest Ethereum events and never miss out on amazing opportunities! ✨
        </p>
        
        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/90 border-0 rounded-xl text-gray-900 placeholder-gray-500"
              required
            />
            <Button 
              type="submit"
              className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-8 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
