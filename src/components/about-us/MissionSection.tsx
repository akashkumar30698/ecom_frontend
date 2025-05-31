import { Target, Users, Globe } from 'lucide-react';

const MissionSection = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Our Mission & Vision</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              We believe in creating products that not only meet but exceed your expectations. Our mission is to innovate 
              consistently while maintaining the highest standards of quality and customer service.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Looking ahead, we envision a world where our products help make everyday tasks simpler, more efficient, 
              and more enjoyable for people around the globe.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start">
                <Target className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Purpose-Driven</h3>
                  <p className="text-gray-600">Creating products with intention and purpose</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Community-Focused</h3>
                  <p className="text-gray-600">Building relationships that last beyond transactions</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Globe className="w-6 h-6 text-indigo-600 mt-1 mr-3" />
                <div>
                  <h3 className="font-medium text-gray-800">Globally Minded</h3>
                  <p className="text-gray-600">Considering our impact on the world in everything we do</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Team collaboration" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-indigo-900/10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;