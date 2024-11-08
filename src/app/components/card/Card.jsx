import "../../styles/card/card.css";

import Image from "next/image";
import viewIcon from "../../../../public/images/card/card-view-icon.png";
import submitIcon from "../../../../public/images/card/card-submit-icon.png";
import profileIcon from "../../../../public/images/card/card-profile-icon.png";
import faqIcon from "../../../../public/images/card/card-faq-icon.png";
import whitefaqicon from "../../../../public/images/home/white-faq-icon.png";

export default function Card(props) {
  return (
    <>
      <div className="section-2">
        <div className="section-2-content">
          {/* card 1 */}
          <div className="card">
            <div className="card-content">
              <div className="image">
                <Image src={viewIcon} alt="view icon" />
              </div>
              <h1>Ethics Review Guidelines</h1>
              <p>
                Access the ethics review guidelines and all the essential links you need.
              </p>
              <a href="/EthicsReviewGuidelines">
                <button>Click here</button>
              </a>
            </div>
          </div>

          {/* card 2 */}
          <div className="card">
            <div className="card-content">
              <div className="image">
                <Image src={submitIcon} alt="submit icon" />
              </div>
              <h1>Submission Requirements</h1>
              <p>
              Stay informed with comprehensive submission requirements for each REC.
              </p>
              <a href="/RECRequirements">
                <button>Click here</button>
              </a>
            </div>
          </div>

          {/* card 3 */}
          <div className="card">
            <div className="card-content">
              <div className="image">
                <Image src={profileIcon} alt="profile icon" />
              </div>
              <h1>How to Create an Account</h1>
              <p>
                Learn how both Thomasian and external researchers can create an
                account here.
              </p>
              <a href="/faqs">
                <button>Click here</button>
              </a>
            </div>
          </div>

          {/* card 4 */}
          <div className="card">
            <div className="card-content">
              <div className="image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#FCBF15"
                  className="bi bi-question-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247m2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z" />
                </svg>
              </div>
              <h1>Frequent Questions</h1>
              <p>
                Get answers to frequently asked questions about UST ethics
                review here.
              </p>
              <a href="/faqs">
                <button>Click here</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
