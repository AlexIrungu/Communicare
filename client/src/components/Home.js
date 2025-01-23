import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import styles from './home.module.css'
import ellipseImage from "./images/Ellipse 3.png"; // Import the local image
import ellipseImg from "./images/Ellipse 4.png"; // Import the local image
import ellipse from "./images/Ellipse 6.png"; // Import the local image
import vector from "./images/Form Vector.png"
// import rectangle from "./images/Rectangle 6.png"
import images from "./images/images.png"
import image506 from "./images/image 506.png"
// import rectangle from "./images/Rectangle"
const Home = (props) => {
  return (
    <div>
      <div className={styles['home']}>
        <div className={styles['menu']}>
          <div className={styles['menu-list']}>
            <span className={styles['text']}>
              <span>Home</span>
            </span>
          
            <Link to="/about" className={styles['text02']}>
              <span>About</span>
            </Link>
            <Link to="/donation" className={styles['text04']}>
          <span>Donation</span>
        </Link>
            <Link to="/admin" className={styles['text06']}>
          <span>Blog</span>
        </Link>
            <Link to ="/contacts" span className={styles['text08']}>
              <span>Contact</span>
            </Link>
            <Link to ="/map" span className={styles['text222']}>
              <span>Maps</span>
            </Link>

          </div>
          {/* <img
            src="/playground_assets/rectangle1911-vhec-200h.png"
            alt="Rectangle1911"
            className={styles['rectangle1']}
          /> */}
        </div>
        {/* <div className={styles['sign-in']}>
        <Link to="/login" className={styles['text10']}>
          <span>Sign in</span>
        </Link>
      </div> */}
      <div className={styles['sign-up']}>
        {/* Update sign-up element to use Link */}
        
      </div>
        <div className={styles['background-circles']}>
        <img
        src={ellipseImg} // Use the imported image as the src
        alt="Ellipse31062"
        className={styles['ellipse4']}
      />
         <img
        src={ellipseImage} // Use the imported image as the src
        alt="Ellipse31062"
        className={styles['ellipse3']}
      />
          <img
        src={ellipse} // Use the imported image as the src
        alt="Ellipse31062"
        className={styles['ellipse6']}
      />
        </div>
        <img
          src={vector}
          alt="FormVector925"
          className={styles['form-vector']}
        />
        <span className={styles['text14']}>
          <span>
            <span>Revolutionizing Public Health:</span>
            <br></br>
            <span></span>
            <br></br>
            <span className={styles['text90']}>
            Leveraging Cutting-Edge Technology to Combat Communicable Diseases</span>
          </span>
        </span>
        <div className={styles['donate-now']}>
          <span className={styles['text21']}>
            <span>Donate Now</span>
          </span>
        </div>
        {/* <div className={styles['donation-form']}>
          <span className={styles['text23']}>
            <span>Donation Amount</span>
          </span>
          <div className={styles['donation-option']}>
            <img
              src={rectangle}
              alt="Rectangle6933"
              className={styles['rectangle 6']}
            />
            <span className={styles['text25']}>
              <span>One-time</span>
            </span>
            <span className={styles['text27']}>
              <span>Weekly</span>
            </span>
          </div>
          <form>
  <div className={styles['group1']}>
    <span className={styles['text29']}>
      <input type="radio" name="amount" value="500" />
      <span>500 Ksh</span>
    </span>
  </div>
  <div className={styles['group2']}>
    <span className={styles['text31']}>
      <input type="radio" name="amount" value="1000" />
      <span>1000 Ksh</span>
    </span>
  </div>
  <div className={styles['group3']}>
    <span className={styles['text33']}>
      <input type="radio" name="amount" value="2000" />
      <span>2000 Ksh</span>
    </span>
  </div>
  <div className={styles['group4']}>
    <span className={styles['text35']}>
      <input type="radio" name="amount" value="5000" />
      <span>5000 Ksh</span>
    </span>
  </div>
  <div className={styles['group5']}>
    <span className={styles['text37']}>
      <input type="radio" name="amount" value="10000" />
      <span>10000 Ksh</span>
    </span>
  </div>
  <div className={styles['group6']}>
    <span className={styles['text39']}>
      <input type="radio" name="amount" value="50000" />
      <span>50000 Ksh</span>
    </span>
  </div>
  <div className={styles['custom-amount']}>
    <span className={styles['text41']}>
    <input type="text" name="customAmount" className={styles['custom-amount-input']} />
    </span>
  </div>
</form> */}

          {/* <div className={styles['donate-now1']}>
            <span className={styles['text43']}>
              <span>DONATE NOW</span>
            </span>
          </div>
        </div> */}
        <img
          src="https://content.energage.com/company-images/SE45259/SE45259_logo_orig.png"
          alt="SE45259logoorigremovebgpreview24569"
          className={styles['logo']}
        />
         <img
            src={images}
            alt="e6689edd16e65a1d2932fe677058f64eremovebgpreview11067"
            className={
              styles['images']
            }
          />
          <div className={styles['frame67']}>
          <div className={styles['frame68']}>
            <img
              src={image506}
              alt="image5061072"
              className={styles['image506']}
            />
            </div>
            </div>
          </div>
      </div>
  )
          }

export default Home