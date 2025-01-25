import React from "react";
import image1 from "./images.svg";
import image2 from "./images2.png";
import image3 from "./images3.png";
import image4 from "./images4.png";
import image5 from "./images5.png";

const About = () => {
  const teamImages = [image1, image2, image3, image4, image5];

  const teamMembers = [
    { name: "Saviour", role: "Scrum Master", image: teamImages[0] },
    { name: "MaryLucy", role: "Frontend", image: teamImages[1] },
    { name: "Linex", role: "Frontend", image: teamImages[2] },
    { name: "Alex", role: "Backend", image: teamImages[3] },
    { name: "Victor", role: "Frontend", image: teamImages[4] },
  ];

  return (
    <div className="bg-white min-h-screen">
      <header className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="block">Be The</span>
            <span>Change</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Let us be the change we want to see in the world, and work towards a
            world free from the threat of communicable disease.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                icon: "",
                title: "Donation",
                description:
                  "Support our mission to combat communicable diseases.",
              },
              {
                icon: "",
                title: "Volunteer",
                description:
                  "Join us in making a difference in community health.",
              },
              {
                icon: "",
                title: "Help",
                description:
                  "Protect community health and prevent communicable diseases.",
              },
            ].map((section) => (
              <div
                key={section.title}
                className="bg-gray-100 p-4 rounded-lg text-center"
              >
                <img
                  src={section.icon}
                  alt={section.title}
                  className="mx-auto mb-4 h-12"
                />
                <h3 className="font-semibold mb-2">{section.title}</h3>
                <p className="text-sm text-gray-600">{section.description}</p>
                <button className="mt-4 text-blue-600 hover:underline">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="hidden md:block">
          <img src={vectorBg} alt="Background" className="w-full rounded-lg shadow-lg" />
        </div> */}
      </header>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Selfless Team
        </h2>
        <div className="grid md:grid-cols-5 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto rounded-full w-48 h-48 object-cover mb-4"
              />
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-6">Support Our Mission</h3>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition">
            Donate Now
          </button>
        </div>
      </footer>
    </div>
  );
};

export default About;
