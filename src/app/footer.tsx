import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
        <small>&copy; {currentYear} Meg Shinagawa all rights reserved</small>
    </footer>
  );
};

export default Footer;
