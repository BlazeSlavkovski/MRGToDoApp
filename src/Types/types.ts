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

interface ToDoProps {
    showModal: (param:string, complete:boolean) => void;
    deleteTask: (param:string, complete:boolean) => void;
    completeTask:(param:string) => void;
    title:string;
    description:string;
    id:string ;
    completed:boolean;
}

interface ToDoListPropsComplete {
    showModal: (param:string, complete:boolean) => void;
    deleteTask: (param:string, complete:boolean) => void;
    completeTask:(param:string) => void;
    completedToDoList: Task[];
}

interface ToDoFormProps {
    addTask: (param:Task) => void;
}

interface ToDoEditModalProps {
    setEditModalTask: Task;
    editTask: (param: Task,complete:boolean) => void
}

export type {Task,ToDoListProps,ToDoProps,ToDoListPropsComplete,ToDoFormProps,ToDoEditModalProps};