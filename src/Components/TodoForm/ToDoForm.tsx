'use client'
import { useState } from 'react'
import './ToDoForm.scss'
import {v4 as uuidv4} from 'uuid';

const defaultFormData = {
    title:'',
    description: '',
    completed:false
}
interface Task{
    title: string;
    description: string;
    completed: boolean;
    id: string;
  }

interface ToDoFormProps {
    addTask: (param:Task) => void;
}

export default function ToDoForm({addTask}:ToDoFormProps){
    const [toDoFormData, setToDoFormData] = useState(defaultFormData)

    const onChangeToDo = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setToDoFormData((prevValue) => ({
            ...prevValue,
            [e.target.id]: e.target.value
        }))
    }

    //grabs the toDoFormData and adds a unique id that is used in the functions in App.tsx
    const submitToDo = (value: React.FormEvent<HTMLFormElement>) => {
        value.preventDefault()
        const id = uuidv4()
        addTask({...toDoFormData, id:id })
        setToDoFormData(defaultFormData)
    }
    return(

            <div className='container'>   
                <p className='todoTitle'>Add Task</p>
                <form className='todoInputForm' onSubmit={submitToDo}>
                        <label htmlFor='title' className="todoLabel">Task Title</label>
                        <input type='text' id='title' placeholder='Name of Task (Required)' value={toDoFormData.title} onChange={onChangeToDo} className='todoInput' required minLength={1}/>
                        <label htmlFor='description' className='todoLabel'>Description</label>
                        <textarea  id='description'  placeholder='Description of Task' value={toDoFormData.description}  onChange={onChangeToDo} className='todoInputDescription'/>
                        <input type='submit' value='Add Task' className='todoInputSubmit' />
                </form>
            </div>

    )
}