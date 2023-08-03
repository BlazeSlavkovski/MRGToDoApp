import './ToDo.scss'
import {ToDoProps} from '../../Types/types'

export default function ToDo({showEditingModal,title,description,deleteTask,completeTask,id,completed}:ToDoProps){

    return(
        <div className='toDoElement'>
            <div className={'toDoElementInfo'}>
                <p className='toDoElementTitle'>{title}</p>
                <p  className='toDoElementDescription'>{description}</p>
            </div>
            <div className='iconContainer'>
                {completed === true? '':<div className='toDoElementIcon checkIcon' onClick={()=>completeTask(id)}/>}
                <div className='toDoElementIcon editIcon'  onClick={()=>showEditingModal(id)} />
                <div className='toDoElementIcon trashIcon' onClick={() => deleteTask(id)}/>
            </div>
        </div>
    )
}