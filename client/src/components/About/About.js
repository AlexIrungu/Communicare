
 

import React from 'react'
import { Link } from 'react-router-dom';
import styles from './about.module.css'
import Vector from './Vector.png'
import Vector2 from './Vector 2.png'
import vector03 from './Vector 3.png'
import image1 from    './images.svg'     
import image2 from './images2.png'     
import image3 from './images3.png'   
import image4 from './images4.png'   
import image5 from './images5.png' 
// import imagex from './images6.jpeg' 
import image6 from './Rectangle 3.png'   
//import image7 from './image7.png'   
// import image8 from './image8.png'   
import image9 from './image9.png'     
import Line2 from './Line 2.png'        
import line1 from './Line 1.png'     
import group1 from './Group1.svg'
import group2 from './Group2.svg'
import Group3 from './Group3.svg'
import v1 from './v1.png'
import v2 from './v2.png'
import v3 from './v3.png'

const About = (props) => {
  return (
    <div>
      <div className={styles['about']}>
        <img
          alt="Rectangle31065"
          src={image6}
          className={styles['rectangle3']}
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
        <span className={styles['text14']}>
          <span className={styles['text15']}>
            Be The
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span>Change</span>
        </span>
        <span className={styles['text17']}>
          <span>
          Let us be the change we want to see in the world, and work towards a world free from the threat of communicable disease.
          </span>
        </span>
        <div className={styles['group7']}>
          <img
            alt="Vector1084"
            src={Vector2}
            className={styles['vector']}
          />
          <span className={styles['text19']}>
            <span>Donation</span>
          </span>
          <span className={styles['text21']}>
            <span>
              Thank you for your support in our mission to combat communicable
              diseases with technology. Let&apos;s make a difference together!
            </span>
          </span>
          <div className={styles['learnmore']}>
            <span className={styles['text23']}>
              <span>Learn More</span>
            </span>
          </div>
        </div>
        <div className={styles['group8']}>
          <span className={styles['text25']}>
            <span>Volunteer</span>
          </span>
          <span className={styles['text27']}>
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
          <div className={styles['learnmore1']}>
            <span className={styles['text29']}>
              <span>Learn More</span>
            </span>
          </div>
          <img
            alt="fluentpersonheart20regular1087"
            src={Vector}
            className={styles['fluentpersonheart20regular']}
          />
        </div>
        <div className={styles['group9']}>
          <span className={styles['text31']}>
            <span>Help</span>
          </span>
          <span className={styles['text33']}>
            <span>
              Together, we can work towards a world where communicable diseases
              are effectively prevented and the health and well-being of
              communities are protected.
            </span>
          </span>
          <div className={styles['learnmore2']}>
            <span className={styles['text35']}>
              <span>Learn More</span>
            </span>
          </div>
          <img
            alt="Vector1086"
            src={vector03}
            className={styles['vector01']}
          />
        </div>
        <span className={styles['text37']}>
          <span>ABOUT US</span>
        </span>
        <span className={styles['text39']}>
          <span className={styles['text40']}>
            <span>We are here to support</span>
            <br></br>
            <span></span>
          </span>
          <span className={styles['text44']}>vulnerable</span>
          <span> communities.</span>
        </span>
        <div className={styles['maskgroup']}>
          <img
            alt="Ellipse91012"
            src={image9}
            className={styles['ellipse9']}
          />
          
        </div>
        <div className={styles['category-list']}>
          <div className={styles['group10']}>
            
            <img
              alt="Vector1013"
              src={Group3}
              className={styles['vector02']}
            />
          </div>
          <div className={styles['group11']}>
            
            <img
              alt="Vector1013"
              src={group2}
              className={styles['vector03']}
            />
          </div>
          <div className={styles['group12']}>
            
            <img
              alt="Vector1013"
              src={group1}
              className={styles['vector04']}
            />
          </div>
          <div className={styles['group13']}>
            <span className={styles['text46']}>
              <span>CATEGORY 1</span>
            </span>
            <span className={styles['text48']}>
              <span>
                Donating to organizations and initiatives that are dedicated to
                preventing communicable diseases is a meaningful way to support
                the cause.
              </span>
            </span>
          </div>
          <div className={styles['group14']}>
            <span className={styles['text50']}>
              <span>CATEGORY 2</span>
            </span>
            <span className={styles['text52']}>
              <span>
                There are many ways you can help in the fight against
                communicable diseases. You can spread awareness about the
                importance of preventive measures, such as vaccination, hand
                hygiene, and safe sexual practices, among your family, friends,
                and community.
              </span>
            </span>
          </div>
          <div className={styles['group15']}>
            <span className={styles['text54']}>
              <span>CATEGORY 3</span>
            </span>
            <span className={styles['text56']}>
              <span>
                Volunteering is a powerful way to make a direct impact in
                preventing communicable diseases.
              </span>
            </span>
          </div>
          <img
            alt="Line11014"
            src={line1}
            className={styles['line1']}
          />
          <img
            alt="Line21014"
            src={Line2}
            className={styles['line2']}
          />
        </div>
        <div className={styles['donate-now']}>
          <span className={styles['text58']}>
            <span>Donate Now</span>
          </span>
        </div>
        
        <span className={styles['text60']}>
          <span className={styles['text61']}>
            Our
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span className={styles['text62']}>Selfless</span>
          <span>
            {' '}
            Team
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
        </span>
        <div className={styles['person1']}>
          <img
            alt="image4921614"
            src={image1}
            className={styles['image492']}
          />
        </div>
        <img
          alt="image5014389"
          src={image3}
          className={styles['image501']}
        />
       
        <img
          alt="image5024389"
          src={image2}
          className={styles['image502']}
        />
        <span className={styles['text64']}>
          <span>Saviour</span>
        </span>
        <span className={styles['text66']}>
          <span>MaryLucy</span>
        </span>
        <span className={styles['text68']}>
          <span>Linex</span>
        </span>
        
        <span className={styles['text70']}>
          <span>(Scrum Master)</span>
        </span>
        <span className={styles['text72']}>
          <span>(Frontend)</span>
        </span>
        <span className={styles['text74']}>
          <span>(Frontend)</span>
        </span>
        
        <div className={styles['group2171']}>
          <img
            alt="Vector1615"
            src={v1}
            className={styles['vector05']}
          />
          <img
            alt="Vector1615"
            src={v2}
            className={styles['vector06']}
          />
          <div className={styles['group2170']}>
            <img
              alt="Vector1615"
              src={v3}
              className={styles['vector07']}
            />
           
          </div>
        </div>
        <div className={styles['group2172']}>
          <img
            alt="Vector1615"
            src={v1}
            className={styles['vector10']}
          />
          <img
            alt="Vector1615"
            src={v2}
            className={styles['vector11']}
          />
          <div className={styles['group21701']}>
            <img
              alt="Vector1615"
              src={v3}
              className={styles['vector12']}
            />
           
            
          </div>
        </div>
        <div className={styles['group2173']}>
          <img
            alt="Vector1615"
            src={v1}
            className={styles['vector15']}
          />
          <img
            alt="Vector1615"
            src={v2}
            className={styles['vector16']}
          />
          <div className={styles['group21702']}>
            <img
              alt="Vector1615"
              src={v3}
              className={styles['vector17']}
            />
            
          </div>
        </div>
        <img
          alt="image5034381"
          src={image4}
          className={styles['image503']}
        />
        <span className={styles['text76']}>
          <span>Alex</span>
        </span>
        <span className={styles['text78']}>
          <span>(Backend)</span>
        </span>
        
        <div className={styles['group2174']}>
          

          <img
            alt="Vector4061"
            src={v1}
            className={styles['vector20']}
          />
          <img
            alt="Vector4061"
            src={v2}
            className={styles['vector21']}
          />
          <div className={styles['group21703']}>
            <img
              alt="Vector4061"
              src={v3}
              className={styles['vector22']}
            />
           
           
          <div className={styles['group21704']}>
            
           
           
          </div>
          </div>
        </div>
        <img
          alt="image5044381"
          src={image5}
          className={styles['image504']}
        />
        <span className={styles['text81']}>
          <span>Victor</span>
        </span>
        <span className={styles['text82']}>
          <span>(Frontend)</span>
        </span>
        <div className={styles['group2175']}>
          <img
            alt="Vector4061"
            src={v1}
            className={styles['vector25']}
          />
          <img
            alt="Vector4061"
            src={v2}
            className={styles['vector26']}
          />
          <div className={styles['group21704']}>
            <img
              alt="Vector4061"
              src={v3}
              className={styles['vector27']}
            />


            
            
            <img
              alt="Vector4061"
              src={v3}
              className={styles['vector22']}
            />
           
          </div>
        </div>
        <img
          src="https://content.energage.com/company-images/SE45259/SE45259_logo_orig.png"
          alt='logo'
          className={styles['se45259logoorigremovebgpreview1']}
        />
      </div>
    </div>
  )
}

export default About