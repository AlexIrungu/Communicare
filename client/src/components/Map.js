import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Map.css'
function Map(props) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    accidentDate: "",
    description: "",
    status: "",
    // review: "",
    imageUpload: null,
    videoUpload: null,
    location: '',
  }); // set the default location here

  const [location, setLocation] = useState(null);

  console.log({location})

  const [submittedData, setSubmittedData] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null); // new state variable for video URL

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setFormData({ ...formData, [name]: files[0] });

     if (event.target.accept === "video/*") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setVideoURL(e.target.result);
        };
        reader.readAsDataURL(files[0]);
      }
   else if (event.target.accept === "image/*") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageURL(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form data:", formData);
    setLocation(formData.location)
    setSubmittedData(formData);
    setFormData({
      title: "",
      accidentDate: "",
      description: "",
      status: "",
    //   review: "",
      imageUpload: null,
      videoUpload: null,
      geolocation: "",
    });
    // setImageURL(null); // Reset image URL
    // setVideoURL(null); // Reset video URL
  };
  useEffect(() => {
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location},Kenya&key=d8e08d86813a4657bb5f4b35886dcea2`)
      .then(response => {
        setLatitude(response.data.results[0].geometry.lat);
        setLongitude(response.data.results[0].geometry.lng);
      })
      .catch(error => {
        console.log(error);
      });
  }, [location]);

  useEffect(() => {
    if (latitude && longitude) {
      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 10
      };
      const mapElement = document.getElementById('map');
      const newMap = new window.google.maps.Map(mapElement, mapOptions);

      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: newMap,
        title: 'Current location'
      });
      newMap.addListener('click', (event) => {
        const clickedLatitude = event.latLng.lat();
        const clickedLongitude = event.latLng.lng();
        setLatitude(clickedLatitude);
        setLongitude(clickedLongitude);
        // Fetch location using reverse geocoding API
        axios
          .get(`https://api.opencagedata.com/geocode/v1/json?q=${clickedLatitude},${clickedLongitude}&key=d8e08d86813a4657bb5f4b35886dcea2`)
          .then((response) => {
            setLocation(response.data.results[0].formatted);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
    
  }, [latitude, longitude]);

  return (
    <div>
      
      <div className="map-container">
        <div className="report-content">
          
        <form className="report" onSubmit={handleSubmit}>
  <label htmlFor="title">Title:</label>
  <input
    className="input"
    type="text"
    id="title"
    name="title"
    value={formData.title}
    onChange={handleInputChange}
    required
  />
  <label htmlFor="disease">Disease:</label>
  <input
    className="input"
    type="text"
    id="disease"
    name="disease"
    value={formData.disease}
    onChange={handleInputChange}
    required
  />
  <label htmlFor="location">Location:</label>
  <input
    className="input"
    type="text"
    id="location"
    name="location"
    value={formData.location}
    onChange={handleInputChange}
    required
  />
  <label htmlFor="date-range">Date Range:</label>
  <div className="date-range">
    <input
      type="date"
      id="start-date"
      name="startDate"
      value={formData.startDate}
      onChange={handleInputChange}
      required
    />
    <span>to</span>
    <input
      type="date"
      id="end-date"
      name="endDate"
      value={formData.endDate}
      onChange={handleInputChange}
      required
    />
  </div>
  <label htmlFor="description">Description:</label>
  <textarea
    className="input"
    id="description"
    name="description"
    value={formData.description}
    onChange={handleInputChange}
    required
  ></textarea>
  <label htmlFor="review">Review:</label>
  <textarea
    className="input"
    id="review"
    name="review"
    value={formData.review}
    onChange={handleInputChange}
  ></textarea>
  <label htmlFor="image-upload">Image Upload:</label>
  <input
    type="file"
    id="image-upload"
    name="imageUpload"
    accept="image/*"
    onChange={handleFileChange}
  />
  {imageURL && (
    <div>
      <h3>Preview:</h3>
      <img src={imageURL} alt="Uploaded" width="200" />
    </div>
  )}
  <button className="submit-btn" type="submit" value="Submit">
    Submit
  </button>
</form>
      
      </div>
      <div id="map" style={{ height: '1200px', width: '50%', float: 'right', margin: '20px', position: 'fixed'}}></div>
      </div>
      {submittedData && (
  <div className="card">
    <div className='card-text'>
    <p className='text-title'><span style={{ textTransform: 'uppercase' }}>{submittedData.title}</span></p>
    <p style={{ color: 'orange' }}><b>AFFECTED AREA</b> {submittedData.accidentDate}</p>
    <p><b>DESCRIPTION:</b><span style={{ textTransform: 'capitalize' }}> {submittedData.description}</span></p>
    <p> <b>LOCATION:</b> <span style={{ textTransform: 'capitalize' }}>{formData.location} </span></p> 
    <p> <b>LATITUDE: </b>  {latitude}</p> 
    <p> <b>LONGITUDE: </b>  {longitude}</p> 
    {/* <p> <b>REVIEW: </b> {review}</p> */}
    
</div>

<div className='card-img'>
{imageURL && (
  <div>
 
    {/* <img src={imageURL} alt="Uploaded" width="300" height="800" /> */}
    <img src={imageURL} alt="Uploaded"  /> 
  </div>
)}
    
    {/* <img src={imageURL} alt="Uploaded" /> */}

          {videoURL && (
            <div>
             
              {/* <video src={videoURL} controls width="100" height="200" /> */}
              <video src={videoURL} controls />
            </div>
            
          )}
 
</div>
  </div>
)}
    <Link to="/blog">Back to blog</Link> {/* Link to the blog page */}

    </div>
    
  );
}

export default Map;