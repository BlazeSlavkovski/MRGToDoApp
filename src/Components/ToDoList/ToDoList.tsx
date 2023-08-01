import ToDo from '../ToDo/ToDo'
import './ToDoList.scss'

interface Task{
    title: string;
    description: string;
    completed: boolean;
    id: string;
  }

interface ToDoListProps {
    showModal: (param:string, complete:boolean) => void;
    deleteTask: (param:string, complete:boolean) => void;
    completeTask:(param:string) => void;
    toDoList: Task[]
}



export default function ToDoList({showModal,toDoList,deleteTask ,completeTask}:ToDoListProps){

    const toDoListItems = toDoList.map((item) => {
        return(
            <ToDo key={item.id} showModal={showModal} completeTask={completeTask} deleteTask={deleteTask} title={item.title} description={item.description} id={item.id} completed={item.completed}/>
        )
        
    })
    return(
        <div className='containerToDoList'>
            <p className='todoTitle'>Tasks To Do</p>
            {toDoListItems?.length === 0?<h2 className='noTasksToDo'>You have no tasks to do</h2> :toDoListItems}
        </div>
    )
}