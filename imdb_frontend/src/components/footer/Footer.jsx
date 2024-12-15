import style from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <>
        <footer className={style.footer}>
            <p>© {currentYear} IMDb</p>
            <p>This is an exam project made by Adelina Radulescu, Maria Otelea and Pawel Stepien for the Computer Science Masters at Roskilde University.</p>
        </footer>
        </>
    );
}

export default Footer;