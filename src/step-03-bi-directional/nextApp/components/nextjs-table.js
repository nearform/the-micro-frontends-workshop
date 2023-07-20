import * as React from 'react'

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>State</th>
          <th>Country</th>
        </tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr key={d.company}>
            <td>{d.company}</td>
            <td>{d.state}</td>
            <td>{d.country}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
