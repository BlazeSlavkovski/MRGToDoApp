import { useState } from "react";
import ToDoForm from "./Components/TodoForm/ToDoForm";
import ToDoList from "./Components/ToDoList/ToDoList";
import ToDoEditModal from "./Components/ToDoEditModal/ToDoEditModal";
import ToDoListComplete from "./Components/ToDoListComplete/ToDoListComplete";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./App.scss";
import {Task} from './Types/types.ts'


function App() {
  const [toDoList, setToDoList] = useState<Task[]>([]);
  const [editModalTask, setEditModalTask] = useState<Task | null>(null);

  //Show modal will bring up the editModal based on the id passed
  const showEditingModal = (taskId: string): void => {
    const taskToEdit = toDoList.find((task) => task.id === taskId)
    //a fallback in case the task somehow does not exist
    if(!taskToEdit){
      console.error('Task Not Found')
      setEditModalTask(null)
      return
    }
    setEditModalTask(
      taskToEdit
    );
  };

  //when the modal is hidden we need to reset the values of EditModalTask
  const hideModal = (): void => {
    setEditModalTask(null)
  };

  //editTask will update the specific task based on its id
  const editTask = (updatedTask: Task) => {
    setToDoList(
      toDoList.map((existingTask) => {
        if (existingTask.id === updatedTask.id) {
          return updatedTask;
        }
        return existingTask;
      })
    );
    setEditModalTask(null)
  };

  //adds a new task to the toDoList dataset
  const addTask = (newTask: Task) => {
    setToDoList((prevValue) => [newTask, ...prevValue]);
  };

  //removes a speific task based on its id from the dataset
  const deleteTask = (taskId: string) => {
    setToDoList((prevValue) =>
        prevValue.filter((existingTask) => existingTask.id != taskId)
    );
  };

  //this function updated the completed value of a specifc Task Object based on its taskId
  const completeTask = (taskId: string) => {
    const itemFound = toDoList.find((existingTask) => existingTask.id === taskId)
    if(itemFound){
      itemFound.completed = true
      setToDoList(toDoList.map((existingTask) => {
        if (existingTask.id === itemFound.id) {
          return itemFound;
        }
        return existingTask;
      }))
    }
  }

  return (
    <div className="appContainer">
      <h1 className="appTitle">MRG ToDo App Challenge</h1>
      <div className="toDoAppContainer">
        <ToDoForm addTask={addTask} />
        <div className="toDoAppContainerLists">
          {toDoList.length === 0 ? (
            <h2 className="noTasks">
              You have no tasks currently, add a task so they will show up
              here
            </h2>):(
            <>
              <ToDoList
              showEditingModal={showEditingModal}
              deleteTask={deleteTask}
              completeTask={completeTask}
              toDoList={toDoList.filter((task) => task.completed != true)}/>
              <ToDoListComplete
              showEditingModal={showEditingModal}
              completeTask={completeTask}
              deleteTask={deleteTask}
              completedToDoList={toDoList.filter((task) => task.completed === true)}/>
            </>)}
        </div>
      </div>
      {editModalTask && (
        <Rodal
          visible={!!editModalTask}
          animation="slideUp"
          onClose={hideModal}
          height={260}
          width={360}
          customStyles={{ "borderRadius": "2rem" }}>
          <ToDoEditModal
            editModalTask={editModalTask}
            editTask={editTask}/>
        </Rodal>
      )}
    </div>
  );
}

export default App;
