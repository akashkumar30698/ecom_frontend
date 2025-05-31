import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Users, Award, Leaf, Palette, Shield, Star, CheckCircle, Heart, Target, Globe, Zap } from "lucide-react";

const AboutUs = () => {
  const [searchParams] = useSearchParams()
  const userId = searchParams.get("userId")
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <Navbar/>

      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Badge className="bg-gray-100 text-gray-700 border-gray-200 px-4 py-2 text-sm mb-6">
            Established 2020
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            About StyleTees
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crafting premium t-shirts that blend comfort, style, and sustainability. 
            We believe exceptional fashion starts with exceptional materials and craftsmanship.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Our Story
                </h2>
                <div className="w-16 h-1 bg-gray-900 mb-6"></div>
              </div>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  StyleTees was founded with a mission to create t-shirts that don't compromise on quality, 
                  comfort, or ethics. What began as a small operation has evolved into a trusted brand 
                  recognized for premium materials and sustainable practices.
                </p>
                <p>
                  Every piece we create reflects our commitment to excellence and our belief that 
                  great fashion should make you feel confident while respecting the planet.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-gray-100 text-gray-700 px-4 py-2 text-base font-medium border-0">
                  <Award className="w-4 h-4 mr-2" />
                  Premium Quality
                </Badge>
                <Badge className="bg-gray-100 text-gray-700 px-4 py-2 text-base font-medium border-0">
                  <Leaf className="w-4 h-4 mr-2" />
                  100% Sustainable
                </Badge>
              </div>
            </div>
            <div className="relative">
              <AspectRatio ratio={4/3}>
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80"
                  alt="StyleTees professional team working together"
                  className="object-cover rounded-2xl shadow-lg w-full h-full"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainability</h3>
                <p className="text-gray-600 leading-relaxed">
                  Eco-friendly materials and ethical manufacturing processes that minimize environmental impact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality</h3>
                <p className="text-gray-600 leading-relaxed">
                  Premium materials and rigorous quality control ensure every t-shirt meets our high standards.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Style</h3>
                <p className="text-gray-600 leading-relaxed">
                  Timeless designs that blend contemporary trends with classic aesthetics for every preference.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quality Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quality Promise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence in every aspect of production
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, value: "100%", label: "Organic Cotton", desc: "Sustainably sourced materials", color: "text-green-600 bg-green-50" },
              { icon: Shield, value: "0", label: "Harmful Chemicals", desc: "Safe for you and environment", color: "text-red-600 bg-red-50" },
              { icon: Award, value: "24/7", label: "Quality Control", desc: "Continuous monitoring", color: "text-blue-600 bg-blue-50" },
              { icon: Heart, value: "∞", label: "Durability", desc: "Built to last", color: "text-purple-600 bg-purple-50" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{item.value}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.label}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600">
              Meet the passionate people behind StyleTees
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex Smith", role: "Founder & CEO", initials: "AS", desc: "Visionary leader with 15+ years in fashion industry." },
              { name: "Maria Johnson", role: "Head of Design", initials: "MJ", desc: "Creative genius behind our innovative designs." },
              { name: "David Chen", role: "Sustainability Director", initials: "DC", desc: "Environmental advocate ensuring eco-friendly practices." }
            ].map((member, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-xl font-semibold">{member.initials}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4 font-medium">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-100 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl text-black font-bold mb-6">Ready to Experience StyleTees?</h2>
          <p className="text-xl mb-10 text-gray-400 leading-relaxed">
            Join thousands of satisfied customers who trust StyleTees for premium quality t-shirts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/?userId=${userId || "no_name"}`}>
              <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold">
              Shop Now
            </Button>
            </Link>
          
          <Link
          to={`/?userId=${userId || "no_name"}`}
          >
             <Button  className="border-2 border-white text-white  px-8 py-3 text-lg font-semibold">
              Learn More
            </Button>
          </Link>
         
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
      
    </div>
  );
};

export default AboutUs;
