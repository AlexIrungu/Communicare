import React from 'react'
import rect from './images/rectangle don.png'
import './donation.css'
import rectangle from './images/Rectangle 6.png'
import styles from './donation.css'
import { Link } from 'react-router-dom'
// import line from  './Line 4.png'
const Donation = (props) => {
  return (
    <div>
      <div className="donation-donation">
        <img
          src={rect}
          alt="Rectangle31015"
          className="donation-rectangle3"
        />
        <div className="donation-menu">
          <div className="donation-menu-list">
          <Link to="/" className={styles['donation-text']}>
          <span>Home</span>
        </Link>
        <span className="donation-text02">
  <Link to="/about">
    <span>About</span>
  </Link>
</span>
        
            <span className="donation-text04">
              <span>Donation</span>
            </span>
            <span className="donation-text06">
  <Link to="/blog">
    <span>Blog</span>
  </Link>
</span>
<span className="donation-text08">
  <Link to="/contact">
    <span>Contact</span>
  </Link>
</span>
          </div>
        </div>
        <div className="donation-sign-in">
          <span className="donation-text10">
            <span>Sign in</span>
          </span>
        </div>
        <div className="donation-sign-up">
          <span className="donation-text12">
            <span>Sign up</span>
          </span>
        </div>
        <span className="donation-text14">
          <span className="donation-text15">
            Help us
            <span
              dangerouslySetInnerHTML={{
                __html: ' ',
              }}
            />
          </span>
          <span className="donation-text16">save</span>
          <span> the world from communicable diseases</span>
        </span>
        <div className="donation-group2163">
          <img
            src="https://c0.wallpaperflare.com/preview/298/1015/646/money-hands-message-quote.jpg"
            alt="image4964029"
            className="donation-image496"
          />
          <span className="donation-text18">
            <span>
              <span>
                Ensuring medicine for all the
                <span
                  dangerouslySetInnerHTML={{
                    __html: ' ',
                  }}
                />
              </span>
              <br></br>
              <span>affected</span>
            </span>
          </span>
          <div className="donation-donate-now">
            <img
              src="/playground_assets/rectangle21614-amw-600w.png"
              alt="Rectangle21614"
              className="donation-rectangle2"
            />
            <span className="donation-text23">
              <span> Donate Now</span>
            </span>
          </div>
          <div className="donation-card-payment-flow">
            <div className="donation-frame66">
              <div className="donation-frame119">
                <span className="donation-text25 SubHeadline1">
                  {/* <span>Payment</span> */}
                </span>
                {/* <img
                  src={line}
                  alt="Line41032"
                  className="donation-line4"
                /> */}
              </div>
              <div className="donation-frame58">
                <span className="donation-text27 SubHeadline3Bold">
                  <span>Pay With:</span>
                </span>
                <div className="donation-frame4">
                  <div className="donation-card">
                    <div className="donation-frame3">
                      {/* <img
                        src="/playground_assets/ellipse2i1032-dq1o-200w.png"
                        alt="Ellipse2I1032"
                        className="donation-ellipse2"
                      /> */}
                    <input type="radio" name="paymentMethod" value="bank" />
                    </div>
                    <span className="donation-text29">
                      <span>Card</span>
                    </span>
                  </div>
                  <div className="donation-bank">
                    <div className="donation-frame31">
                    <input type="radio" name="paymentMethod" value="card" />

                    </div>
                    <span className="donation-text31">
                      <span>Bank</span>
                    </span>
                  </div>
                  <div className="donation-transfer">
                    <div className="donation-frame32">
                    <input type="radio" name="paymentMethod" value="bank" />

                      {/* <img
                        src="/playground_assets/ellipse3i1032-op3l-200h.png"
                        alt="Ellipse3I1032"
                        className="donation-ellipse32"
                      /> */}
                    </div>
                    <span className="donation-text33">
                      <span>Transfer</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="donation-frame65">
                <div className="donation-frame63">
                  <div className="donation-frame59">
                    <span className="donation-text35 SubHeadline2">
                      <span>Card Number</span>
                    </span>
                    <div className="donation-frame6">
                      <span className="donation-text37">
                      <input type="text" placeholder="1234 5678 9101 1121" />
                      </span>
                    </div>
                  </div>
                  <div className="donation-frame62">
                    <div className="donation-frame61">
                      <span className="donation-text39 SubHeadline2">
                        <span>Expiration Date</span>
                      </span>
                      <div className="donation-frame8">
                        <span className="donation-text41">
                        <input type="text" placeholder="MM/YY" />
                        </span>
                      </div>
                    </div>
                    <div className="donation-frame60">
                      <span className="donation-text43 SubHeadline2">
                        <span>CVV</span>
                      </span>
                      <div className="donation-frame10">
                        <span className="donation-text45">
                        <input type="text" placeholder="123" />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="donation-savecarddetails">
                    <div className="donation-frame21"></div>
                    <span className="donation-text47 Body">
                    <label>
  <input type="checkbox" name="saveCardDetails" />
  <span>Save card details</span>
</label>
                    </span>
                  </div>
                </div>
              </div>
              <div className="donation-frame64">
                <div className="donation-pay">
                  <span className="donation-text49">
                    <span>
                      Pay
                      <span
                        dangerouslySetInnerHTML={{
                          __html: ' ',
                        }}
                      />
                    </span>
                  </span>
                </div>
                <span className="donation-text51 BodySmall">
                  <span>
                    Your personal data will be used to process your order,
                    support your experience throughout this website, and for
                    other purposes described in our privacy policy.
                  </span>
                </span>
              </div>
            </div>
            <div className="donation-donation-form">
              <div className="donation-group2177"></div>
              <span className="donation-text53">
                <span>Donation Amount</span>
              </span>
              <div className="donation-donation-option">
                <img
                  src={rectangle}
                  alt="Rectangle61034"
                  className="donation-rectangle6"
                />
                <span className="donation-text55">
                  <span>One-time</span>
                </span>
                <span className="donation-text57">
                  <span>Weekly</span>
                </span>
              </div>
              <div className="donation-group1">
                <span className="donation-text59">
                <input type="radio" name="amount" value="500" />
                  <span>500 Ks</span>
                </span>
              </div>
              <div className="donation-group2">
                <span className="donation-text61">
                <input type="radio" name="amount" value="1000" />
                  <span>1000 Ks</span>
                </span>
              </div>
              <div className="donation-group3">
                <span className="donation-text63">
                <input type="radio" name="amount" value="2000" />
                  <span>2000 Ks</span>
                </span>
              </div>
              <div className="donation-group4">
                <span className="donation-text65">
                <input type="radio" name="amount" value="500" />
                  <span>5000 Ks</span>
                </span>
              </div>
              <div className="donation-group5">
                <span className="donation-text67">
                <input type="radio" name="amount" value="1000" />
                  <span>10000 Ks</span>
                </span>
              </div>
              <div className="donation-group6">
                <span className="donation-text69">
                <input type="radio" name="amount" value="5000" />
                  <span>50000 Ks</span>
                </span>
              </div>
              <div className="donation-custom-amount">
                <span className="donation-text71">
                <input type="text" name="customAmount" className="custom-amount-input" />
                </span>
              </div>
              <div className="donation-donate-now1">
                <span className="donation-text73">
                  <span>DONATE NOW</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <img
          src="https://content.energage.com/company-images/SE45259/SE45259_logo_orig.png"
          alt="SE45259logoorigremovebgpreview14281"
          className="donation-se45259logoorigremovebgpreview1"
        />
      </div>
    </div>
  )
}

export default Donation