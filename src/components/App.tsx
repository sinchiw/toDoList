import React, { useState } from "react";
import "../css/App.css";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch, RootState } from "../redux/store";
import { addTodo } from "../redux/todoSlice";

import RenderList from "./RenderList";
import Edititem from "./EditItem";

const App: React.FC = () => {
  const [term, setTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const todoList = useSelector((state: RootState) => state);
  const dispatch = useDispatch<StoreDispatch>();

  const addItem = () => {
    if (term) {
      dispatch(addTodo(term));
      setTerm("");
    }
  };

  const completeList = todoList.filter((item) => item.completed === true);
  const inCompleteList = todoList.filter((item) => item.completed === false);

  return (
    <div className='App'>
      <h1>MY TODO LIST</h1>
      <div className='add_field_container'>
        <input
          type='text'
          className='add_item_field'
          placeholder='add item'
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
        <button className='add_button' onClick={addItem}>
          ADD
        </button>
      </div>
      <RenderList
        todoList={inCompleteList}
        setSelectedItem={setSelectedItem}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
      />
      <h1>Complete: {completeList.length ? completeList.length : 0}</h1>
      <RenderList
        todoList={completeList}
        setSelectedItem={setSelectedItem}
        setOpenEdit={setOpenEdit}
        openEdit={openEdit}
      />
      {openEdit ? (
        <Edititem
          openEdit={openEdit}
          setOpenEdit={setOpenEdit}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
        />
      ) : null}
    </div>
  );
};

export default App;
