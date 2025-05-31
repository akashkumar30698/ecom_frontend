import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    image: "https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "With over 15 years of industry experience, Alex founded the company with a vision to transform how people interact with products in their daily lives."
  },
  {
    name: "Jordan Taylor",
    role: "Chief Product Officer",
    image: "https://images.pexels.com/photos/5648101/pexels-photo-5648101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Jordan leads our product development with a keen eye for design and functionality, ensuring every item meets our high standards."
  },
  {
    name: "Casey Rivera",
    role: "Head of Customer Experience",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Dedicated to creating exceptional customer journeys, Casey works tirelessly to ensure every interaction with our brand exceeds expectations."
  },
  {
    name: "Sam Wilson",
    role: "Creative Director",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "Sam brings a unique creative vision to our team, shaping our brand identity and visual language across all touchpoints."
  }
];

const TeamSection = () => {
  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Meet Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The passionate individuals behind our success, dedicated to bringing you the best products and experiences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-indigo-600 transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSection;