import React, { useState } from "react";
import "./CookieBanner.css";

function CookieBanner({ user }) {
  const [accepted, setAccepted] = useState(() =>
    localStorage.getItem("cookiesAccepted") === "true"
  );

  const acceptCookies = () => {
    setAccepted(true);
    localStorage.setItem("cookiesAccepted", "true");
  };

  if (accepted) return null;

  return (
    <div className="cookie-banner">
      <p>This site uses cookies to improve your experience.</p>
      <button onClick={acceptCookies}>Accept</button>
    </div>
  );
}

export default CookieBanner;
