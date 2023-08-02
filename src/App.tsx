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
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [toDoList, setToDoList] = useState<Task[]>([]);
  const [editModalTask, setEditModalTask] = useState<Task | undefined>();

  //Show modal will bring up the editModal based on the id passed
  //complete boolean is used to determine which dataset to grab the task from
  const showEditingModal = (taskId: string): void => {
    setEditModalTask(
      toDoList.find((task) => task.id === taskId)
    );
    setShowEditModal(true);
  };

  //when the modal is hidden we need to reset the values of EditModalTask
  const hideModal = (): void => {
    setEditModalTask(undefined)
    setShowEditModal(false);
  };

  //editTask will update the specific task based on its id
  //complete boolean is used to ensure it looks in the proper dataset to place the new object
  const editTask = (updatedTask: Task) => {
    setToDoList(
      toDoList.map((existingTask) => {
        if (existingTask.id === updatedTask.id) {
          return updatedTask;
        }
        return existingTask;
      })
    );
    setShowEditModal(false);
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
          visible={showEditModal}
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
