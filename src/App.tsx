import { useState } from "react";
import ToDoForm from "./Components/TodoForm/ToDoForm";
import ToDoList from "./Components/ToDoList/ToDoList";
import ToDoEditModal from "./Components/ToDoEditModal/ToDoEditModal";
import ToDoListComplete from "./Components/ToDoListComplete/ToDoListComplete";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./App.scss";

interface ToDoListElement {
  title: string;
  description: string;
  completed: boolean;
  id: string;
}

function App() {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [toDoListData, setToDoListData] = useState<ToDoListElement[]>([]);
  const [completedToDoList, setCompletedToDoList] = useState<ToDoListElement[]>(
    []
  );
  const [editModalData, setEditModalData] = useState<
    ToDoListElement | undefined
  >();

  const showModal = (idOfElement: string,complete: boolean): void => {
    if(complete){
      setEditModalData(
        completedToDoList.find((element) => element.id === idOfElement)
      );
    }else{  
      setEditModalData(
        toDoListData.find((element) => element.id === idOfElement)
      );
    }
    
    setShowEditModal(true);
  };

  const hideModal = (): void => {
    setShowEditModal(false);
  };

  const editToDoListElement = (toDoListElement: ToDoListElement,complete: boolean) => {
    
    if(complete){
      
      setCompletedToDoList(
        completedToDoList.map((toDoListDataElement) => {
          if (toDoListDataElement.id === toDoListElement.id) {
            return toDoListElement;
          }
          return toDoListDataElement;
        })
      );
    }else{
      setToDoListData(
        toDoListData.map((toDoListDataElement) => {
          if (toDoListDataElement.id === toDoListElement.id) {
            return toDoListElement;
          }
          return toDoListDataElement;
        })
      );
    }
    setShowEditModal(false);
  };

  const addToDoListElement = (toDoListElement: ToDoListElement) => {
    setToDoListData((prevValue) => [toDoListElement, ...prevValue]);
  };

  const deleteToDoListElement = (idOfElement: string,complete: boolean) => {
    if(complete){
      setCompletedToDoList((prevValue) =>
        prevValue.filter((element) => element.id != idOfElement)
      );
    }else{
      setToDoListData((prevValue) =>
        prevValue.filter((element) => element.id != idOfElement)
      );
    }
  };

  const completeToDoListItem = (idOfElement: string) => {
    const itemFound = toDoListData.find((element) => element.id === idOfElement)
    if(itemFound){
      itemFound.completed = true
      setCompletedToDoList((prevValue) => [
        itemFound,
        ...prevValue
      ])
      setToDoListData((prevValue) =>
      prevValue.filter((element) => element.id != idOfElement)
      );
    }
  }

  return (
    <div className="appContainer">
      <h1 className="appTitle">MRG ToDo App Challenge</h1>
      <div className="toDoAppContainer">
        <ToDoForm addToDoListElement={addToDoListElement} />
        <div className="toDoAppContainerLists">
          {toDoListData.length === 0 && completedToDoList.length === 0 ? (
            <h2 className="noTasks">
              You have no tasks currently, add a task for so they will show up
              here :D
            </h2>
          ) : (
            <>
              <ToDoList
              showModal={showModal}
              deleteToDoListElement={deleteToDoListElement}
              completeToDoListItem={completeToDoListItem}
              toDoListData={toDoListData}
            />
            <ToDoListComplete
            showModal={showModal}
            completeToDoListItem={completeToDoListItem}
            deleteToDoListElement={deleteToDoListElement}
            completedToDoList={completedToDoList}
            />
            </>
          )}
        </div>
      </div>
      {editModalData && (
        <Rodal
          visible={showEditModal}
          animation="slideUp"
          onClose={hideModal}
          height={260}
          width={360}
          customStyles={{ "borderRadius": "2rem" }}
        >
          <ToDoEditModal
            editModalData={editModalData}
            editToDoListElement={editToDoListElement}
          />
        </Rodal>
      )}
    </div>
  );
}

export default App;
