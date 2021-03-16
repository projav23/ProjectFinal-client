import React from 'react'
import { useParams } from 'react-router'
import DocumentsForm from '../../components/DocumentsForm/DocumentsForm'
import {newDocument} from '../../service/documents.service'

function NewDocument(){
const [redirect, setRedirect] = React.useState(false)
const {spaceId} = useParams()

  const handleSubmit= async (document)=>{
    try {
    console.log('entra a crear doc')
    const {data} = await newDocument(spaceId, document)
    console.log("createNewDoc",data)
    if (data){
      setRedirect(true)
    }
    } catch (e) {
    console.error(e)
    }
  }
  return(
    <>
    <DocumentsForm onSubmit={handleSubmit} isRedirect={redirect}/>
    </>
  )
}

export default NewDocument