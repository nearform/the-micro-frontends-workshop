import React from 'react'
import LayoutBox from 'remote/nextjs-layout-box'
import Table from 'remote/nextjs-table'

import Nav from './components/Nav'
import Title from './components/Title'

import './style.css'

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
    company: 'Nutrien',
    state: 'Saskatchewan',
    country: 'Canada',
  },
  {
    company: 'Walmart',
    state: 'Delaware',
    country: 'USA',
  },
  {
    company: 'Microsfot',
    state: 'Washington',
    country: 'USA',
  },
]

function App() {
  return (
    <LayoutBox>
      <Title title="This is React.js App hosted at localhost:8080" />
      <Nav links={links} />
      <Table data={tableData} />
    </LayoutBox>
  )
}

export default App
