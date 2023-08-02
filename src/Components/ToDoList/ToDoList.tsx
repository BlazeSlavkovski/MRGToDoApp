import ToDo from '../ToDo/ToDo'
import './ToDoList.scss'
import { ToDoListProps } from '../../Types/types';




export default function ToDoList({showEditingModal,toDoList,deleteTask ,completeTask}:ToDoListProps){

    const toDoListItems = toDoList.map((item) => {
        return(
            <ToDo key={item.id} showEditingModal={showEditingModal} completeTask={completeTask} deleteTask={deleteTask} title={item.title} description={item.description} id={item.id} completed={item.completed}/>
        )
    })
    
    return(
        <div className='containerToDoList'>
            <p className='todoTitle'>Tasks To Do</p>
            {toDoListItems?.length === 0?<h2 className='noTasksToDo'>You have no tasks to do</h2> :toDoListItems}
        </div>
    )
}