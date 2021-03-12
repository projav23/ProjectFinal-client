import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {findSpace, editSpace} from '../../service/spaces.service'
import EditSpaceForm from '../../components/EditSpaceForm/EditSpaceForm'

const EditSpace = () => {
const [state, setState] = React.useState({name:'', users:[], description:''})
const {spaceId} = useParams()
const [redirect, setRedirect] = React.useState(false)

const getSpace = async () =>{
  try {
  const {data} = await findSpace(spaceId)
  setState(data)
  } catch (e) {
  console.error(e)
  }
}
useEffect(()=>{
  getSpace()
},[])

const handleSubmit = async (space) =>{
 try {
 const editSpaceOne = await editSpace(space)
 console.log(editSpaceOne)
 setRedirect(true)
 } catch (e) {
 
 }
}
console.log('state',state)

  return ( <EditSpaceForm state={state} onSubmit={handleSubmit} isRedirect={redirect}/> );
}
 
export default EditSpace;