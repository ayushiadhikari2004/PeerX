import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} PersonalSpace — Secure Decentralized Storage</p>
    </footer>
  );
}

export default Footer;
