const AboutUs = () => {
  const teamRoles = [
    'CEO',
    'System Administrator',
    'Support Engineers',
    'Office Executives',
    'Accountants',
    'Marketing Team',
    'Technical Staff',
  ];

  const specialties = [
    'Technical Confidence',
    'Dedicated Workforce',
    'Ethical Operations',
    'Accountability',
    'Quick Service',
    'Custom Solutions',
  ];

  const clients = [
    'Mymensingh Medical College',
    'Bangladesh Agricultural University',
    'Sodesh Hospital',
    'Bangladesh Bank',
    'Janata Bank',
    'Sonali Bank',
    'Krishi Bank',
    'Teachers Training College',
    'World Vision',
    'Care Bangladesh',
  ];

  return (
    <section className="py-12 bg-gray-50">
      {/* Header Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">About JS Computer</h2>
          <div className="bg-red-600 text-white py-2 px-6 rounded-full inline-block">
            20+ Years of IT Excellence
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h3>
              <p className="text-gray-600 leading-relaxed">
                When establishing JS Computer, our foremost concern was how to satisfy our customers' needs. 
                Our professional team helps you choose suitable accessories and solutions for your computer needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Company Profile</h3>
              <p className="text-gray-600 mb-4">
                JS Computer is a service-oriented IT organization committed to reliability and connecting 
                people with technology's benefits through:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <ServiceItem icon="💻" label="Sales & Service" />
                <ServiceItem icon="🔧" label="Repairs & Networking" />
                <ServiceItem icon="🛡️" label="Security Solutions" />
                <ServiceItem icon="🔌" label="Troubleshooting" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h3>
              <div className="grid grid-cols-2 gap-4">
                {teamRoles.map((role) => (
                  <div key={role} className="flex items-center">
                    <span className="bg-green-100 p-2 rounded-lg mr-3">👨💼</span>
                    <span className="text-gray-600">{role}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="bg-blue-100 px-3 py-1 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clients Section */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Trusted By Leading Organizations
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {clients.map((client) => (
              <div
                key={client}
                className="p-3 bg-gray-100 rounded-lg text-center hover:bg-blue-50 transition"
              >
                <span className="text-gray-700 font-medium text-sm">{client}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 mb-4">
            We promise to deliver exceptional service with honesty and responsibility. 
            Give us the opportunity to demonstrate our capabilities!
          </p>
          <button className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition">
            Contact Our Team
          </button>
        </div>
      </div>
    </section>
  );
};

const ServiceItem = ({ icon, label }) => (
  <div className="flex items-center">
    <span className="bg-blue-100 p-2 rounded-lg mr-3">{icon}</span>
    <span className="font-medium">{label}</span>
  </div>
);

export default AboutUs;
