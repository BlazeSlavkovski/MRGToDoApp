import ToDo from '../ToDo/ToDo'
import './ToDoListComplete.scss'

interface Task{
    title: string;
    description: string;
    completed: boolean;
    id: string;
  }

interface ToDoListPropsComplete {
    showModal: (param:string, complete:boolean) => void;
    deleteTask: (param:string, complete:boolean) => void;
    completeTask:(param:string) => void;
    completedToDoList: Task[]
}

export default function ToDoListComplete({completedToDoList,deleteTask,showModal,completeTask}:ToDoListPropsComplete){
    const toDoListItemsComplete = completedToDoList?.map((item) => {
        return(
            <ToDo key={item.id} showModal={showModal} completeTask={completeTask} deleteTask={deleteTask} title={item.title} description={item.description} id={item.id} completed={item.completed}/>
        )
    })
    return(
        <div>
            <p className='completedTitle'>Tasks Completed</p>
            {toDoListItemsComplete?.length === 0?<h2 className='completedNoTasks'>You have no completed tasks currently</h2> :toDoListItemsComplete}
        </div>
    )
}