interface Task{
    title: string;
    description: string;
    completed: boolean;
    id: string;
}

interface ToDoListProps {
    showEditingModal: (param:string) => void;
    deleteTask: (param:string) => void;
    completeTask:(param:string) => void;
    toDoList: Task[]
}

interface ToDoProps {
    showEditingModal: (param:string) => void;
    deleteTask: (param:string) => void;
    completeTask:(param:string) => void;
    title:string;
    description:string;
    id:string ;
    completed:boolean;
}

interface ToDoListPropsComplete {
    showEditingModal: (param:string) => void;
    deleteTask: (param:string) => void;
    completeTask:(param:string) => void;
    completedToDoList: Task[];
}

interface ToDoFormProps {
    addTask: (param:Task) => void;
}

interface ToDoEditModalProps {
    editModalTask: Task;
    editTask: (param: Task) => void
}

export type {Task,ToDoListProps,ToDoProps,ToDoListPropsComplete,ToDoFormProps,ToDoEditModalProps};