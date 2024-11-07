"use client";

import { useState, useEffect } from "react";
import { FiClipboard } from "react-icons/fi"; 

export default function Header() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await fetch("/api/token");
        const data = await response.json();
        setAccessToken(data.accessToken);
      } catch (error) {
        console.error("Failed to fetch access token:", error);
      }
    };
    fetchAccessToken();
  }, []);

  const copyToClipboard = () => {
    if (accessToken) {
      navigator.clipboard.writeText(accessToken)
        .then(() => {
          setCopied(true);
          console.log(accessToken , "__accessToken__")
          setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
        })
        .catch(err => console.error("Failed to copy access token:", err));
    }
  };

  return (
    <header className="header-container">
      {accessToken && (
        <button onClick={copyToClipboard} className="btn btn-copy">
          <FiClipboard className="clipboard-icon" />
          {copied ? "Copied!" : "Copy Access Token"}
        </button>
      )}
    </header>
  );
}
