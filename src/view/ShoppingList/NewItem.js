import React from 'react'
import { useParams } from 'react-router'
import {newItemList} from '../../service/shopping.service'
import ShoppingForm from '../../components/ShoppingForm/ShoppingForm'

function NewItem(){
  const {spaceId} = useParams()
  const [redirect, setRedirect] = React.useState(false)
  const handleSubmit= async (item)=>{
    try {
      console.log('Vista')
    const createNewItem = await newItemList(spaceId, item)
    if (createNewItem){
      setRedirect(true)
    }
    console.log('tarea',createNewItem)
    } catch (e) {
    console.error(e)
    }
  }
  return(
    <>
    <ShoppingForm onSubmit={handleSubmit} isRedirect={redirect}/>
    </>
  )
}

export default NewItem