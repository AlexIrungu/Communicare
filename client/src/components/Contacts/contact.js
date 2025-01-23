import React from 'react'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import styles from './contact.module.css'
import rectangle3 from './Rectangle 3.png'
import Group from './Group 2175.png'
import rectangle4 from './Rectangle 4.png'
import vector from './Vector.png'
import vector2 from './Vector 1.png'
import image from './image 495.png'
import vector3 from './Vector 2.png'
import group from './Group 2176.png'
import vector4 from './Vector4.png'
import heart from './heart.png'
import vector5 from './Vector5.png'
import frame from './Frame 45.png'
import Vector6 from './Vector6.png'
import group3 from './Group 2170.png'
import Vector7 from './Vector7.png'
import who from './who.png'
import flag from './flag.png'
import health from './health.png'
const Contact = (props) => {
  return (
    <div>
      <div className={styles['contact']}>
        <img
          src={rectangle3}
          alt="Rectangle31615"
          className={styles['rectangle3']}
        />
        <img
          src="https://content.energage.com/company-images/SE45259/SE45259_logo_orig.png"
          alt="SE45259logoorigremovebgpreview14281"
          className={styles['se45259logoorigremovebgpreview1']}
        />
        <div className={styles['menu']}>
          <div className={styles['menu-list']}>
          <Link to="/home" className={styles['text']}>
          <span>Home</span>
        </Link>
        <Link to="/about" className={styles['text02']}>
          <span>About</span>
        </Link>
        <Link to="/donation" className={styles['text04']}>
          <span>Donation</span>
        </Link>
        <Link to="/blog" className={styles['text06']}>
          <span>Blog</span>
        </Link>
        <Link to="/contact" className={styles['text08']}>
          <span>Contact</span>
        </Link>
          </div>
          {/* <img
            src="/playground_assets/rectangle11616-8xp4-200h.png"
            alt="Rectangle11616"
            className={styles['rectangle1']}
          /> */}
        </div>
        <div className={styles['sign-in']}>
          <span className={styles['text10']}>
            <span>Sign in</span>
          </span>
        </div>
        <div className={styles['sign-up']}>
          <span className={styles['text12']}>
            <span>Sign up</span>
          </span>
        </div>
        <div className={styles['group2175']}>
          <img
          src={Group}
          alt='group'
          />
          <div className={styles['group2174']}>
{/*           
            <img
              src="/playground_assets/ellipse15268-olnh-700h.png"
              alt="Ellipse15268"
              className={styles['ellipse15']}
            />
            <img
              src="/playground_assets/ellipse14267-sxr-500h.png"
              alt="Ellipse14267"
              className={styles['ellipse14']}
            /> */}
          </div>
          {/* <img
            src="/playground_assets/image494265-ytzl-800w.png"
            alt="image494265"
            className={styles['image494']}
          /> */}
        </div>
        <img
          src={rectangle4}
          alt="Rectangle3463846266"
          className={styles['rectangle3463846']}
        />
        <div className={styles['header']}>
          <span className={styles['text14']}>
            <span className={styles['text15']}>
              Let’s make an
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>impact</span>
          </span>
          <span className={styles['text17']}>
            <span>
              Welcome to our website, &quot;CommuniCare: Preventing Communicable
              Diseases with Technology.&quot; We are a non-profit organization
              dedicated to making a difference in the fight against communicable
              diseases through the use of innovative technological solutions.
            </span>
          </span>
        </div>
        <div className={styles['category1']}>
          <span className={styles['text19']}>
            <span>
              Together, we can work towards a world where communicable diseases
              are effectively prevented and the health and well-being of
              communities are protected.
            </span>
          </span>
          <img
            src={vector3}
            alt="Vector2725"
            className={styles['vector']}
          />
          <span className={styles['text21']}>
            <span>Help</span>
          </span>
        </div>
        <div className={styles['category2']}>
          <span className={styles['text23']}>
            <span>where are located in afya center 3rd floor room 301</span>
          </span>
          <div className={styles['group2176']}>
            <img
              src={group}
              alt="Vector2727"
              className={styles['vector01']}
            />
            <img
              src={vector4}
              alt="Vector2728"
              className={styles['vector02']}
            />
          </div>
          <span className={styles['text25']}>
            <span>Location</span>
          </span>
        </div>
        <div className={styles['category3']}>
          <span className={styles['text27']}>
            <span>
              Thank you for your support in our mission to combat communicable
              diseases with technology. Let&apos;s make a difference together!
            </span>
          </span>
          <span className={styles['text29']}>
            <span>Donate</span>
          </span>
          <img
            src={heart}
            alt="lahandholdingheart2730"
            className={styles['lahandholdingheart']}
          />
        </div>
        <div className={styles['category4']}>
          <span className={styles['text31']}>
            <span>
              Join us in making a difference by exploring our website and
              learning about the most prevalent communicable diseases, areas
              most affected by these diseases, and the impact of our
              interventions.
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
          </span>
          <img
            src={vector5}
            alt="Vector2724"
            className={styles['vector03']}
          />
          <span className={styles['text33']}>
            <span>Volunteer</span>
          </span>
        </div>
        <div className={styles['maskgroup']}>
          <img
            src={vector2}
            alt="Vector2747"
            className={styles['vector04']}
          />
          <img
            src={vector}
            alt="Vector2750"
            className={styles['vector05']}
          />
          <img
            src={image}
            alt="image4952746"
            className={styles['image495']}
          />
        </div>
        <span className={styles['text35']}>
          <span>Be A Part Of Our Journey</span>
        </span>
        <span className={styles['text37']}>
          <span>
            By becoming a part of our team, you can make a real difference in
            the lives of communities affected by communicable diseases. You will
            have the opportunity to use your skills and expertise to develop
            innovative solutions, create awareness, and drive positive change.
            Whether you have experience in public health, technology,
            communications, fundraising, or community engagement, your
            contributions can have a meaningful impact on our efforts to
            eradicate communicable diseases.
          </span>
        </span>
        <div className={styles['input-form']}>
          <span className={styles['text39']}>
<input type="text" placeholder='Enter your email'/>
          </span>
        </div>
        <div className={styles['submit']}>
          <span className={styles['text41']}>
            <span>Submit</span>
          </span>
        </div>
        <img
          src={frame}
          alt="Frame452776"
          className={styles['frame45']}
        />
        <div className={styles['frame44']}>
          <div className={styles['frame43']}></div>
          <div className={styles['group2171']}>
            <img
              src={Vector6}
              alt="Vector454"
              className={styles['vector06']}
            />
            <img
              src={Vector7}
              alt="Vector455"
              className={styles['vector07']}
            />
            <div className={styles['group2170']}>
              <img
                src={group3}
                alt="Vector457"
                className={styles['vector08']}
              />
              {/* <img
                src="/playground_assets/vector458-fsh4.svg"
                alt="Vector458"
                className={styles['vector09']}
              /> */}
              {/* <img
                src="/playground_assets/vector459-eopi.svg"
                alt="Vector459"
                className={styles['vector10']}
              /> */}
            </div>
          </div>
        </div>
        <span className={styles['text43']}>
          <span>Partners</span>
        </span>
        <div className={styles['secondary-footer']}>
          <span className={styles['text45']}>
            <span>© 2023 . All rights reserved.</span>
          </span>
          <div className={styles['termsofservice']}>
            <span className={styles['text47']}>
              <span>Terms of Service</span>
            </span>
            <span className={styles['text49']}>
              <span>Privacy Policy</span>
            </span>
          </div>
        </div>
        <img
          src={who}
          alt="WHOremovebgpreview14361"
          className={styles['w-oremovebgpreview1']}
        />
        <img
          src={flag}
          alt="FlagUnitedNationsLogoremovebgpreview14361"
          className={styles['flag-united-nations-logoremovebgpreview1']}
        />
        <img
          src={health}
          alt="Ministryofhealthe1591912421151removebgpreview14361"
          className={styles['ministryofhealthe1591912421151removebgpreview1']}
        />
      </div>
    </div>
  )
}

export default Contact