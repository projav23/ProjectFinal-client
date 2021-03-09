import React from 'react'
import './SpaceList.css'

function SpacesList({space}){
return(
  <div className='card-space'>
    <p>{space.name}</p>
    <p>{space.description}</p>
    <p>{space.type}</p>
  </div>
)
}

export default SpacesList