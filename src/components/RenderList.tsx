import { Todo } from "model/Todo";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../redux/store";
import { deleteTodo, setComplete, editTodo } from "../redux/todoSlice";
import React from "react";

import "../css/RenderList.css";
interface IRenderListProp {
  todoList: Todo[];
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
  setOpenEdit: React.Dispatch<React.SetStateAction<any>>;
  openEdit: boolean;
}
const RenderList: React.FC<IRenderListProp> = ({
  todoList,
  setSelectedItem,
  setOpenEdit,
  openEdit,
}) => {
  const dispatch = useDispatch<StoreDispatch>();
  const deleteItem = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const editItem = (id: string) => {
    if (openEdit === false) {
      setOpenEdit(true);
      setSelectedItem(id);
    }
  };

  const markComplete = (id: string, completed: boolean) => {
    dispatch(setComplete({ completed: !completed, id: id }));
  };
  const items = todoList.map((item) => {
    return (
      <div className='single_item' key={item.id}>
        <p>{item.description}</p>
        <div>
          <button className='edit_button' onClick={() => editItem(item.id)}>
            EDIT
          </button>
          <button className='delete_button' onClick={() => deleteItem(item.id)}>
            DELETE
          </button>
          {item.completed === false ? (
            <button
              className='complete_button'
              onClick={() => markComplete(item.id, item.completed)}
            >
              COMPLETE
            </button>
          ) : (
            <button
              className='incomplete_button'
              onClick={() => markComplete(item.id, item.completed)}
            >
              INCOMPLETE
            </button>
          )}
        </div>
      </div>
    );
  });
  return <div className='list_container'>{items}</div>;
};
export default RenderList;
