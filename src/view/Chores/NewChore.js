import React from 'react'
import { useParams } from 'react-router'
import ChoresForm from '../../components/ChoreForm/ChoreForm'
import DocumentsForm from '../../components/DocumentsForm/DocumentsForm'
import { newChore } from '../../service/chores.service'
import {newDocument} from '../../service/documents.service'

function NewChore(){
const [redirect, setRedirect] = React.useState(false)
const {spaceId} = useParams()

  const handleSubmit= async (chore)=>{
    try {
    const {data} = await newChore(spaceId, chore)
    if (data){
      setRedirect(true)
    }
    } catch (e) {
    console.error(e)
    }
  }
  return(
    <>
    <ChoresForm onSubmit={handleSubmit} isRedirect={redirect}/>
    </>
  )
}

export default NewChore