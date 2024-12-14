// layout.tsx
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container">
      <header>
        <h1>AI Background Remover</h1>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2023 AI Background Remover. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
