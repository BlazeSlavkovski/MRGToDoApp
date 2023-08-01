import { useState,useEffect } from 'react'
import './ToDoEditModal.scss'
interface Task{
    title: string;
    description: string;
    completed: boolean;
    id: string;
  }

interface ToDoEditModalProps {
    setEditModalTask: Task
    editTask: (param: Task,complete:boolean) => void
}


export default function ToDoEditModal({setEditModalTask,editTask} : ToDoEditModalProps){
    const [toDoFormDataEdit, setToDoFormDataEdit] = useState(setEditModalTask)

    //this is neccessary because state doesnt update if props get updated 
    //we updated the state explicitly to ensure it gets the proper data
    useEffect(()=>{
        setToDoFormDataEdit(setEditModalTask)
    },[setEditModalTask])

    const onChangeToDo = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setToDoFormDataEdit((prevValue) => ({
            ...prevValue,
            [e.target.id]: e.target.value
        }))
    }

    return(
        
            <form className='todoInputFormEdit' onSubmit={(e)=>{
                e.preventDefault()
                console.log()
                editTask(toDoFormDataEdit,toDoFormDataEdit.completed)
                }}>
                        <label htmlFor='title' className="todoLabelEdit">Task Title</label>
                        <input type='text' id='title' placeholder='Name of Task (Required)' value={toDoFormDataEdit.title} onChange={onChangeToDo} className='todoInputEdit' required minLength={1}/>
                        <label htmlFor='description' className='todoLabelEdit'>Description</label>
                        <textarea  id='description'  placeholder='Description of Task' value={toDoFormDataEdit.description}  onChange={onChangeToDo} className='todoInputEditDescription'/>
                        <input type='submit' value='Save Edit' className='todoInputEditSubmit'  />
            </form>
        
    )
}