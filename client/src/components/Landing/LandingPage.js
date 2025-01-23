import React from 'react';
import { Link } from 'react-router-dom';
import styles from './landing-page.module.css';
import Decore from '../images/Decore.png';
import virus from '../images/virus.png';
import liza from '../images/liza.png';
import dollar from '../images/dollar 1.png';
import charity from '../images/charity 1.png';

const LandingPage = (props) => {
  return (
    <div className={styles['container']}>
      <div className={styles['travel-agency-landing-page-ui']}>
        <div className={styles['hero']}>
          <div className={styles['decore']}>
            <img
              src="/playground_assets/ellipse82038-b5uk-500w.png"
              alt="Ellipse82038"
              className={styles['ellipse8']}
            />
            <img
              src={Decore}
              alt="Decore2038"
              className={styles['decore1']}
            />
          </div>
          <div className={styles['dropdown']}>
            <span className={styles['text']}>
              {/* <span>EN</span> */}
            </span>
            {/* <img
              src="/playground_assets/vector12038-tdm.svg"
              alt="Vector12038"
              className={styles['vector1']}
            /> */}
          </div>
          <div className={styles['hero-content']}>
            <div className={styles['cta']}>
              <Link to="/signup" className={styles['cta1']}>
                <span>Get Started</span>
              </Link>
            </div>
            <span className={styles['text02']}>
              <span>you can make a difference worldwide.</span>
            </span>
            <span className={styles['text04']}>
              <span>
                Welcome to Communicare, your go-to platform for information and
                support on communicable diseases. Whether you&apos;re seeking
                knowledge, assistance, or looking to make a difference,
                we&apos;ve got you covered
              </span>
            </span>
            {/* <div className={styles['decore2']}>
              <img
                src="/playground_assets/vector2039-tcjg.svg"
                alt="Vector2039"
                className={styles['vector']}
              />
            </div> */}
            <span className={styles['text06']}>
              <span>
                <span>
                  With Communicare, we
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br></br>
                <span>provide global awareness,</span>
                <br></br>
                <span> education, and support for</span>
                <br></br>
                <span>
                  {' '}
                  those impacted by
                  <span
                    dangerouslySetInnerHTML={{
                      __html: ' ',
                    }}
                  />
                </span>
                <br></br>
                <span>communicable diseases.</span>
              </span>
            </span>
          </div>
        </div>
        <img
          src={liza}
          alt="pexelslizasummer6347738removebgpreview12039"          className={styles['pexelslizasummer6347738removebgpreview1']}
          />
          <img
            src="https://content.energage.com/company-images/SE45259/SE45259_logo_orig.png"
            alt="SE45259logoorig12039"
            className={styles['se45259logoorig1']}
          />
          <img
            src={virus}
            alt="pexelscdc3992933removebgpreview12039"
            className={styles['pexelscdc3992933removebgpreview1']}
          />
          <img
            src={charity}
            alt="charity112039"
            className={styles['charity11']}
          />
          <img
            src={dollar}
            alt="dollar112039"
            className={styles['dollar11']}
          />
        </div>
        <div className={styles['sign-in']}>
  <Link to="/login" className={styles['text19']}>
    <span>Sign in</span>
  </Link>
</div>

<div className={styles['sign-up']}>
  <Link to="/signup" className={styles['text21']}>
    <span>Sign up</span>
  </Link>
</div>

      </div>
    );
  };
  
  export default LandingPage;
  