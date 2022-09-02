import { Todo } from "model/Todo";
import { useDispatch } from "react-redux";
import { StoreDispatch } from "../redux/store";
import { editTodo } from "../redux/todoSlice";
import React, { useState } from "react";

interface IRenderListProp {
  setOpenEdit: React.Dispatch<React.SetStateAction<any>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<any>>;
  selectedItem: string;
  openEdit: boolean;
}

const EditItem: React.FC<IRenderListProp> = ({
  setOpenEdit,
  setSelectedItem,
  selectedItem,
  openEdit,
}) => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch<StoreDispatch>();

  const editItem = (id: string, description: string) => {
    if (openEdit === true) {
      setOpenEdit(false);
      dispatch(editTodo({ id: id, description: description }));
      setSelectedItem("");
    }
  };

  return (
    <div className='edit_list_container'>
      <div className='edit_list_inner'>
        <input
          type='text'
          className='edit_field'
          placeholder='edit list'
          onChange={(e) => setTerm(e.target.value)}
          value={term}
        />
        <button
          className='confirm_button'
          onClick={() => editItem(selectedItem, term)}
        >
          CONFIRM
        </button>
        <button className='cancel_button' onClick={() => setOpenEdit(false)}>
          CANCEL
        </button>
      </div>
    </div>
  );
};
export default EditItem;
