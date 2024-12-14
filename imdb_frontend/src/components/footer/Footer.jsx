import style from './Footer.module.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <>
        <footer className={style.footer}>
            <p>© {currentYear} IMDb</p>
        </footer>
        </>
    );
}

export default Footer;