import React from "react";
import vector from "./images/Form Vector.png";
import images from "./images/images.png";
import image506 from "./images/image 506.png";

const Home = ({ user, setUser }) => {
  return (
    <div className="container mx-auto">
      <img
        src={vector}
        alt="FormVector925"
        className="absolute top-0 left-0 w-1/2 h-auto"
      />
      <div className="text-gray-800 mt-16 md:mt-32 px-4 md:px-0">
        <h2 className="text-4xl font-bold">
          Revolutionizing Public Health:
        </h2>
        <p className="text-2xl my-4">
          Leveraging Cutting-Edge Technology to Combat Communicable Diseases
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8">
          Donate Now
        </button>
      </div>

      <img
        src="https://content.energage.com/company-images/SE45259/SE45259_logo_orig.png"
        alt="SE45259logoorigremovebgpreview24569"
        className="absolute top-4 right-4 w-24 h-auto"
      />
      <img
        src={images}
        alt="e6689edd16e65a1d2932fe677058f64eremovebgpreview11067"
        className="absolute bottom-0 right-0 w-1/2 h-auto"
      />
      <div className="absolute bottom-0 left-0 w-1/2 h-auto">
        <div className="bg-white shadow-md rounded-md p-4">
          <img
            src={image506}
            alt="image5061072"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;