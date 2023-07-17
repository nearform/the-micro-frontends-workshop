import React from 'react';
import LayoutBox from 'remote/nextjs-layout-box';
import Nav from './components/Nav';
import Title from './components/Title';

const links = [
  {url: "/", label: "Home"},
  {url: "https://react.dev/", label: "Learn more about React.js"}
]

function App() {
  return (     
      <LayoutBox>
        <Title title="This is the React container App hosted at localhost:8080" />
        <Nav links={links} />
      </LayoutBox>
  );
}

export default App;
