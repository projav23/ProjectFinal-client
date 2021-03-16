import React from 'react'
import { useParams } from 'react-router'
import {newTask} from '../../service/tasks.service'
import TaskForm from '../../components/TaskForm/TaskForm'

function NewTask(){
  const {spaceId} = useParams()
  const [redirect, setRedirect] = React.useState(false)
  const handleSubmit= async (task)=>{
    try {
    console.log('Vista')
    console.log('tarea', task)
    const createNewTask = await newTask(spaceId, task)
    console.log('createNewTask', createNewTask)
    if (createNewTask){
      setRedirect(true)
    }
    console.log('tarea',createNewTask)
    } catch (e) {
    console.error(e)
    }
  }
  return(
    <>
    <TaskForm onSubmit={handleSubmit} isRedirect={redirect}/>
    </>
  )
}

export default NewTask