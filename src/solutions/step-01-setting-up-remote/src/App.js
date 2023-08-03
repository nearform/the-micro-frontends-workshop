import React from 'react';

import Nav from './components/Nav';

const links = [
  { url: '/', label: 'Home' },
  { url: 'https://react.dev/', label: 'Learn more about React.js' },
  { url: 'https://webpack.js.org/concepts/module-federation/', label: 'Learn more about Module Federation' }
];

const App = () => (
  <div>
    <h1 style={{textAlign: "center"}}>Basic Remote Application</h1>
    <Nav links={links} />
  </div>
);
export default App;
