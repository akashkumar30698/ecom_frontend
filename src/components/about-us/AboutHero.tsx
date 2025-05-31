import React from 'react';
import { UserRound, Award, Clock, Heart } from 'lucide-react';

const AboutHero = () => {
  return (
    <div className="relative bg-indigo-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-800 opacity-90"></div>
      <div className="relative container mx-auto px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Our Story</h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-10 leading-relaxed">
          We're passionate about delivering exceptional products and experiences that enhance your everyday life.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg transition-all duration-300 hover:bg-white/20">
            <UserRound className="w-10 h-10 mb-4 text-indigo-300" />
            <h3 className="text-xl font-semibold mb-2">Founded</h3>
            <p>Established in 2015 with a vision to transform the industry</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg transition-all duration-300 hover:bg-white/20">
            <Award className="w-10 h-10 mb-4 text-indigo-300" />
            <h3 className="text-xl font-semibold mb-2">Excellence</h3>
            <p>Committed to the highest standards in everything we do</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg transition-all duration-300 hover:bg-white/20">
            <Clock className="w-10 h-10 mb-4 text-indigo-300" />
            <h3 className="text-xl font-semibold mb-2">Reliability</h3>
            <p>Delivering on our promises consistently for years</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg transition-all duration-300 hover:bg-white/20">
            <Heart className="w-10 h-10 mb-4 text-indigo-300" />
            <h3 className="text-xl font-semibold mb-2">Customer Focus</h3>
            <p>Your satisfaction is at the heart of everything we do</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;