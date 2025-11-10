import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { title: t('footer.allProducts'), link: '/' },
      { title: t('footer.smartphones'), link: '/category/smartphones' },
      { title: t('footer.tablets'), link: '/category/tablets' },
      { title: t('footer.laptops'), link: '/category/laptops' },
    ],
    support: [
      { title: t('footer.helpCenter'), link: '/help' },
      { title: t('footer.shipping'), link: '/shipping' },
      { title: t('footer.returns'), link: '/returns' },
      { title: t('footer.contactUs'), link: '/contact' },
    ],
    company: [
      { title: t('navbar.about'), link: '/about' },
      { title: t('footer.blog'), link: '/blog' },
      { title: t('footer.careers'), link: '/careers' },
      { title: t('footer.privacy'), link: '/privacy' },
    ],
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">{t('footer.aboutStore')}</h3>
            <p className="footer__description">
              {t('footer.storeDescription')}
            </p>
            <div className="footer__social">
              <a href="#" aria-label="Facebook" className="footer__social-link">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="footer__social-link">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="footer__social-link">
                <FaInstagram />
              </a>
              <a href="#" aria-label="LinkedIn" className="footer__social-link">
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{t('footer.shop')}</h3>
            <ul className="footer__links">
              {footerLinks.shop.map((link) => (
                <li key={link.link}>
                  <Link to={link.link}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{t('footer.support')}</h3>
            <ul className="footer__links">
              {footerLinks.support.map((link) => (
                <li key={link.link}>
                  <Link to={link.link}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{t('footer.company')}</h3>
            <ul className="footer__links">
              {footerLinks.company.map((link) => (
                <li key={link.link}>
                  <Link to={link.link}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__section">
            <h3 className="footer__title">{t('footer.contactUs')}</h3>
            <ul className="footer__contact">
              <li>
                <FaPhone />
                <span>{t('footer.phone')}</span>
              </li>
              <li>
                <FaEnvelope />
                <span>{t('footer.email')}</span>
              </li>
              <li>
                <FaMapMarkerAlt />
                <span>{t('footer.address')}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} Reda Store. {t('footer.allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

