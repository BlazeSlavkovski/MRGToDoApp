import ToDo from '../ToDo/ToDo'
import './ToDoList.scss'

interface ToDoListElement {
    title: string;
    description: string;
    completed: boolean;
    id: string
  }

interface ToDoListProps {
    showModal: (param:string, complete:boolean) => void;
    deleteToDoListElement: (param:string, complete:boolean) => void;
    completeToDoListItem:(param:string) => void;
    toDoListData: ToDoListElement[]
}



export default function ToDoList({showModal,toDoListData,deleteToDoListElement ,completeToDoListItem}:ToDoListProps){

    const toDoListItems = toDoListData.map((item) => {
        return(
            <ToDo key={item.id} showModal={showModal} completeToDoListItem={completeToDoListItem} deleteToDoListElement={deleteToDoListElement} title={item.title} description={item.description} id={item.id} completed={item.completed}/>
        )
        
    })
    return(
        <div className='containerToDoList'>
            <p className='todoTitle'>Tasks To Do</p>
            {toDoListItems?.length === 0?<h2 className='noTasksToDo'>You have no tasks to do</h2> :toDoListItems}
        </div>
    )
}