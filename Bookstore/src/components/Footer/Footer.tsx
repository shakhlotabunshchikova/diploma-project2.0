import styles from './Footer.module.scss'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
export const Footer =()=> {
    return(
        <footer className={styles.footer}>
            <div className={styles.container}>
            <p>© {new Date().getFullYear()} Made by Shakhlo Tabunshchikova</p>
            <div className={styles.socials}>
                <a href='https://github.com/' target='_blank'> 
                <FaGithub/>
                </a>
                <a href='https://linkedin.com/' target='_blank'> 
                <FaLinkedin/>
                </a>
                <a href='mailto:shakhlo@example.com"' target='_blank'> 
                <FaEnvelope/>
                </a>
            </div>
            </div>
        </footer>
    );
};