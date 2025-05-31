import { MapPin, Phone, Mail } from 'lucide-react';

const ContactCTA = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-800 to-indigo-900 text-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Get In Touch</h2>
            <p className="text-lg text-indigo-100 mb-8 leading-relaxed">
              Have questions about our products, services, or company? We'd love to hear from you. 
              Our team is ready to assist you with any inquiries you may have.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="w-6 h-6 text-indigo-300 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium text-xl mb-1">Visit Us</h3>
                  <p className="text-indigo-100">123 Innovation Drive, Tech City, CA 94107</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-6 h-6 text-indigo-300 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium text-xl mb-1">Call Us</h3>
                  <p className="text-indigo-100">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-6 h-6 text-indigo-300 mt-1 mr-4" />
                <div>
                  <h3 className="font-medium text-xl mb-1">Email Us</h3>
                  <p className="text-indigo-100">info@yourcompany.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full">
            <form className="bg-white p-8 rounded-xl shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
              
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Your name"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Your email"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Your message"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;