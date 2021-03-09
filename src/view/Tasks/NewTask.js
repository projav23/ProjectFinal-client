import React from 'react'
import { useParams } from 'react-router'
import {newTask} from '../../service/tasks.service'
import TaskForm from '../../components/TaskForm/TaskForm'

function NewTask(){
  const {spaceId} = useParams()
  const handleSubmit= async (space)=>{
    try {
    const createNewTask = await newTask(spaceId, space)
    } catch (e) {
    console.error(e)
    }
  }
  return(
    <>
    <TaskForm onSubmit={handleSubmit} />
    </>
  )
}

export default NewTask