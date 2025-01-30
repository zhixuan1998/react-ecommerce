import './CustomFooter.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const links = [
  {
    title: 'Facebook',
    icon: faFacebook,
    url: 'https://www.facebook.com/seowzhixuan0126'
  },
  {
    title: 'LinkedIn',
    icon: faLinkedin,
    url: 'https://www.linkedin.com/in/zhixuan98/'
  },
  {
    title: 'GitHub',
    icon: faGithub,
    url: 'https://github.com/zhixuan1998'
  }
];

function CustomFooter() {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="footer-mid">
          <div className="contact-wrapper">
            <span>Find me elsewhere on the web as well:</span>
            <ul className="contact-links">
              {links.map((link, i) => (
                <li className="contact-link" key={i}>
                  <a href={link.url} target="_blank">
                    <FontAwesomeIcon icon={link.icon} />
                    <span className="contact-link-title">{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <span className="copyright">
            <FontAwesomeIcon icon={faCopyright} style={{ paddingRight: '5px' }} />
            An e-commerce web application using React.js / Express.js
          </span>
        </div>
      </div>
    </footer>
  );
}

export default CustomFooter;
