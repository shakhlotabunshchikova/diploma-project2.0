import styles from './Footer.module.scss'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>
          <p>© {new Date().getFullYear()} Made by Shakhlo Tabunshchikova</p>
          <div className={styles.socials}>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="mailto:shakhlo@example.com" target="_blank" rel="noopener noreferrer"><FaEnvelope /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
