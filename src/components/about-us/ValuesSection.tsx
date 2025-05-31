import { Shield, RefreshCw, Zap, HeartHandshake } from 'lucide-react';

const values = [
  {
    icon: <Shield className="w-12 h-12 text-indigo-600" />,
    title: "Quality",
    description: "We never compromise on quality. Every product we create undergoes rigorous testing to ensure it meets our high standards."
  },
  {
    icon: <RefreshCw className="w-12 h-12 text-indigo-600" />,
    title: "Innovation",
    description: "We continuously seek new ways to improve and innovate, staying ahead of trends and anticipating customer needs."
  },
  {
    icon: <Zap className="w-12 h-12 text-indigo-600" />,
    title: "Efficiency",
    description: "We value your time and ours. Our processes are streamlined to deliver exceptional results without unnecessary delays."
  },
  {
    icon: <HeartHandshake className="w-12 h-12 text-indigo-600" />,
    title: "Integrity",
    description: "We operate with complete transparency and honesty, building trust with our customers, partners, and team members."
  }
];

const ValuesSection = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Our Core Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do, from product development to customer service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:bg-indigo-50"
            >
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuesSection;