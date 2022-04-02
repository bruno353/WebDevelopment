import React from "react";

function Footer() {

    const currentYear = new Date().getFullYear();

    return <footer>
    <a href="https://github.com/bruno353">
    <p>
        Bruno353 © {currentYear}
    </p></a>
    </footer>
}

export default Footer;