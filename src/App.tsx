import { useState } from "react";
import ToDoForm from "./Components/TodoForm/ToDoForm";
import ToDoList from "./Components/ToDoList/ToDoList";
import ToDoEditModal from "./Components/ToDoEditModal/ToDoEditModal";
import ToDoListComplete from "./Components/ToDoListComplete/ToDoListComplete";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./App.scss";

interface Task{
  title: string;
  description: string;
  completed: boolean;
  id: string;
}

function App() {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [toDoList, setToDoList] = useState<Task[]>([]);
  const [completedToDoList, setCompletedToDoList] = useState<Task[]>([]);
  const [editModalTask, setEditModalTask] = useState<Task | undefined>();

  //Show modal will bring up the editModal based on the id passed
  //complete boolean is used to determine which dataset to grab the task from
  const showModal = (taskId: string,complete: boolean): void => {
    if(complete){
      setEditModalTask(
        completedToDoList.find((task) => task.id === taskId)
      );
    }else{  
      setEditModalTask(
        toDoList.find((task) => task.id === taskId)
      );
    }
    setShowEditModal(true);
  };

  const hideModal = (): void => {
    setShowEditModal(false);
  };

  //editTask will update the specific task based on its id
  //complete boolean is used to ensure it looks in the proper dataset to place the new object
  const editTask = (updatedTask: Task,complete: boolean) => {
    if(complete){
      setCompletedToDoList(
        completedToDoList.map((existingTask) => {
          if (existingTask.id === updatedTask.id) {
            return updatedTask;
          }
          return existingTask;
        })
      );
    }else{
      setToDoList(
        toDoList.map((existingTask) => {
          if (existingTask.id === updatedTask.id) {
            return updatedTask;
          }
          return existingTask;
        })
      );
    }
    setShowEditModal(false);
  };

  //adds a new task to the toDoList dataset
  const addTask = (newTask: Task) => {
    setToDoList((prevValue) => [newTask, ...prevValue]);
  };

  //removes a speific task based on its id from the dataset
  //complete boolean used to determine it is lookin in the proper dataset
  const deleteTask = (taskId: string,complete: boolean) => {
    if(complete){
      setCompletedToDoList((prevValue) =>
        prevValue.filter((existingTask) => existingTask.id != taskId)
      );
    }else{
      setToDoList((prevValue) =>
        prevValue.filter((existingTask) => existingTask.id != taskId)
      );
    }
  };

  //this function moves a task object from toDoList to completedToDoList
  //also removes the object it moves from toDoList
  const completeTask = (taskId: string) => {
    const itemFound = toDoList.find((existingTask) => existingTask.id === taskId)
    if(itemFound){
      itemFound.completed = true
      setCompletedToDoList((prevValue) => [
        itemFound,
        ...prevValue
      ])
      setToDoList((prevValue) =>
      prevValue.filter((existingTask) => existingTask.id != taskId)
      );
    }
  }

  return (
    <div className="appContainer">
      <h1 className="appTitle">MRG ToDo App Challenge</h1>
      <div className="toDoAppContainer">
        <ToDoForm addTask={addTask} />
        <div className="toDoAppContainerLists">
          {toDoList.length === 0 && completedToDoList.length === 0 ? (
            <h2 className="noTasks">
              You have no tasks currently, add a task so they will show up
              here
            </h2>):(
            <>
              <ToDoList
              showModal={showModal}
              deleteTask={deleteTask}
              completeTask={completeTask}
              toDoList={toDoList}/>
              <ToDoListComplete
              showModal={showModal}
              completeTask={completeTask}
              deleteTask={deleteTask}
              completedToDoList={completedToDoList}/>
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
            setEditModalTask={editModalTask}
            editTask={editTask}/>
        </Rodal>
      )}
    </div>
  );
}

export default App;
