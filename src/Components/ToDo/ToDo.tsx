
import './ToDo.scss'

interface ToDoProps {
    //this is the fcn that shows the edit Modal
    showModal: (param:string, complete:boolean) => void;
    deleteTask: (param:string, complete:boolean) => void;
    completeTask:(param:string) => void;
    title:string;
    description:string;
    id:string ;
    completed:boolean;
}


export default function ToDo({showModal,title,description,deleteTask,completeTask,id,completed}:ToDoProps){

    return(
        <div className='toDoElement'>
            <div className={'toDoElementInfo'}>
                <p className='toDoElementTitle'>{title}</p>
                <p  className='toDoElementDescription'>{description}</p>
            </div>
            
            <div className='iconContainer'>
                {completed === true? '':<div className='toDoElementIcon checkIcon' onClick={()=>completeTask(id)}/>}
                <div className='toDoElementIcon editIcon'  onClick={()=>showModal(id,completed)} />
                <div className='toDoElementIcon trashIcon' onClick={() => deleteTask(id,completed)}/>
            </div>
        </div>
    )
}