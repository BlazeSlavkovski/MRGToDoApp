import ToDo from '../ToDo/ToDo'
import './ToDoListComplete.scss'

interface ToDoListElement {
    title: string;
    description: string;
    completed: boolean;
    id: string
  }

interface ToDoListPropsComplete {
    showModal: (param:string, complete:boolean) => void;
    deleteToDoListElement: (param:string, complete:boolean) => void;
    completeToDoListItem:(param:string) => void;
    completedToDoList: ToDoListElement[]
}

export default function ToDoListComplete({completedToDoList,deleteToDoListElement,showModal,completeToDoListItem}:ToDoListPropsComplete){

    
    const toDoListItemsComplete = completedToDoList?.map((item) => {
        return(
            <ToDo key={item.id} showModal={showModal} completeToDoListItem={completeToDoListItem} deleteToDoListElement={deleteToDoListElement} title={item.title} description={item.description} id={item.id} completed={item.completed}/>
        )
        
    })
    return(
        <div className=''>
            <p className='completedTitle'>Tasks Completed</p>
            {toDoListItemsComplete?.length === 0?<h2 className='completedNoTasks'>You have no completed tasks currently</h2> :toDoListItemsComplete}
        </div>
    )
}