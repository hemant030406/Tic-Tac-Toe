import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DocumentationSections from './DocumentationSections';
import Footer from './Footer';

const Docs = () => {
  return (
    <div className="app">
      <Header />
      <div className="content">
        {/* <Sidebar /> */}
        <DocumentationSections />
      </div>
      <Footer />
    </div>
  );
}

export default Docs;
