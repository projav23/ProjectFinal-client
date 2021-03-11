import React from 'react'
import ExpensesForm from '../../components/ExpensesForm/ExpensesForm'
import {newExpense} from '../../service/expenses.service'
import {useParams} from 'react-router-dom'

function NewExpense(){
const [redirect, setRedirect] = React.useState(false)
const {spaceId} = useParams()

  const handleSubmit= async (expense)=>{
    console.log('Entra aqui?')
    try {
    const createNew = await newExpense(spaceId, expense)
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
    <ExpensesForm onSubmit={handleSubmit} isRedirect={redirect}/>
    </>
  )
}

export default NewExpense