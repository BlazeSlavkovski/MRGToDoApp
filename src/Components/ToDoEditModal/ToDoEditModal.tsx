import { useState,useEffect } from 'react'
import './ToDoEditModal.scss'
interface ToDoListElement {
    title: string;
    description: string;
    completed: boolean;
    id: string;
  }

interface ToDoEditModalProps {
    editModalData: ToDoListElement
    editToDoListElement: (param: ToDoListElement,complete:boolean) => void
}


export default function ToDoEditModal({editModalData,editToDoListElement} : ToDoEditModalProps){
    const [toDoFormDataEdit, setToDoFormDataEdit] = useState(editModalData)

    useEffect(()=>{
        setToDoFormDataEdit(editModalData)
    },[editModalData])

    const onChangeToDo = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setToDoFormDataEdit((prevValue) => ({
            ...prevValue,
            [e.target.id]: e.target.value
        }))
    }
    return(
        
            <form className='todoInputFormEdit' onSubmit={(e)=>{
                e.preventDefault()
                editToDoListElement(toDoFormDataEdit,toDoFormDataEdit.completed)
                }}>
                        <label htmlFor='title' className="todoLabelEdit">Task Title</label>
                        <input type='text' id='title' placeholder='Name of Task (Required)' value={toDoFormDataEdit.title} onChange={onChangeToDo} className='todoInputEdit' required minLength={1}/>
                        <label htmlFor='description' className='todoLabelEdit'>Description</label>
                        <textarea  id='description'  placeholder='Description of Task' value={toDoFormDataEdit.description}  onChange={onChangeToDo} className='todoInputEditDescription'/>
                        <input type='submit' value='Save Edit' className='todoInputEditSubmit'  />
            </form>
        
    )
}