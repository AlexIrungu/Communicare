import React from 'react';
import { Link } from 'react-router-dom';
import rectangle3 from './images/Rectangle 3.png';
import rectangle20 from './images/Rectangle 20.png';

const Blog = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between">
            <img src={rectangle3} alt="Rectangle31615" className="w-24 h-auto" />
            <img
              src="https://content.energage.com/company-images/SE45259/SE45259_logo_orig.png"
              alt="SE45259logoorigremovebgpreview24569"
              className="w-20 h-auto"
            />
            <nav className="space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-800">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">
                About
              </Link>
              <Link to="/donation" className="text-gray-600 hover:text-gray-800">
                Donation
              </Link>
              <span className="text-gray-800">Blog</span>
              <Link to="/contacts" className="text-gray-600 hover:text-gray-800">
                Contact
              </Link>
            </nav>
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800">Stay Up To Date</h2>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-md rounded-lg p-4">
                <img
                  src={rectangle20}
                  alt="Rectangle201615"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1628348070889-cb656235b4eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                  alt="Ellipse31062"
                  className="w-20 h-20 rounded-full -mt-10 ml-4 border-4 border-white"
                />
                <h3 className="text-lg font-medium text-gray-800 mt-2">
                  Ensuring medicine for all the affected.
                </h3>
                <p className="text-gray-600 mt-2">CATEGORY</p>
                <p className="text-gray-600 mt-2">
                  Donating can be a powerful tool in the prevention and management
                  of non-communicable diseases. Whether it's supporting
                  research, education and awareness, access to healthcare, or
                  lifestyle interventions, donations can make a tangible impact
                  on global health outcomes. By contributing to organizations and
                  initiatives dedicated to preventing and managing NCDs,
                  individuals can help create a healthier future for themselves
                  and their communities. Remember, every donation counts, and
                  together we can make a difference in the fight against
                  non-communicable diseases.
                </p>
                <div className="mt-4">
                  <Link to="/medicine" className="text-blue-500 hover:text-blue-700">
                    Expand
                  </Link>
                </div>
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <img
                  src="https://store.thtcentre.com/images/communicable-diseases.png"
                  alt="image4974051"
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <h3 className="text-lg font-medium text-gray-800 mt-4">
                  Communicable Diseases
                </h3>
                <p className="text-gray-600 mt-2">
                  Communicable diseases also known as chronic diseases,
                  are medical conditions that are not contagious and cannot be
                  transmitted from person to person.
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800">Affected areas</h3>
                <p className="text-gray-600 mt-2">
                  Global impact: NCDs are a leading cause of death and disability
                  worldwide. According to the World Health Organization (WHO), NCDs
                  are responsible for approximately 71% of all global deaths,
                </p>
                <img
                  src="https://assets.weforum.org/editor/AbLC3IQxbU_l8ImxS3UoRieNQTCI7Dt_7QLRHa-avX8.JPG"
                  alt="image4994061"
                  className="w-full h-32 object-cover rounded-lg mt-4"
                />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800">Testimonials</h3>
                <p className="text-gray-600 mt-2">
                  I am incredibly grateful for the support I received from Communicare, made possible by generous donations from individuals like you.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1576765607924-3f7b8410a787?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDE1fHxzaWNrJTIwcGVvcGxlfGVufDB8fHx8MTY4Mjc4ODg0Mg&ixlib=rb-4.0.3&w=400"
                  alt="image5004061"
                  className="w-full h-32 object-cover rounded-lg mt-4"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <Link to="/areas">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Learn More
                </button>
              </Link>
              <Link to="/testimonial">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Learn More
                </button>
              </Link>
              <Link to="/diseases">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;