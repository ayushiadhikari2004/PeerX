import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} PeerX — P2P file sharing app</p>
    </footer>
  );
}

export default Footer;
