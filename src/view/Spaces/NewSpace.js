import React from 'react'
import SpaceForm from '../../components/SpaceForm/SpaceForm'
import {newSpace} from '../../service/spaces.service'

function NewSpace(){
const [redirect, setRedirect] = React.useState(false)

  const handleSubmit= async (space)=>{
    try {
    const createNew = await newSpace(space)
    console.log(createNew)
    if (createNew){
      setRedirect(true)
    }
    } catch (e) {
    console.error(e)
    }
  }
  return(
    <>
    <SpaceForm onSubmit={handleSubmit} isRedirect={redirect}/>
    </>
  )
}

export default NewSpace