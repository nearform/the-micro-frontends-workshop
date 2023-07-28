import React from 'react'
import LayoutBox from 'remote/nextjs-layout-box'
import Table from 'remote/nextjs-table'

import Nav from './components/Nav'
import Title from './components/Title'

import './style.css'
import Logo from './react-logo.png'

const links = [
  { url: '/', label: 'Home' },
  { url: 'https://react.dev/', label: 'Learn more about React.js' },
  {
    url: 'https://webpack.js.org/concepts/module-federation/',
    label: 'Learn more about Module Federation',
  },
]

const tableData = [
  {
    company: 'IBM',
    state: 'New York',
    country: 'USA',
  },
  {
    company: 'Telus',
    state: 'British Colombia',
    country: 'Canada',
  },
  {
    company: 'William Hill',
    state: 'England',
    country: 'UK',
  },
  {
    company: 'Renalytix',
    state: 'England',
    country: 'UK',
  },
]

function App() {
  return (
    <LayoutBox>
      <Title title="This is React.js App" />
      <Nav links={links} />
      <img
        style={{ maxWidth: '200px', margin: '50px auto' }}
        src={Logo}
        alt="logo"
      />
      <Table data={tableData} />
    </LayoutBox>
  )
}

export default App
