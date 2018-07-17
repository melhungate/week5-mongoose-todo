import React from "react";
import PropTypes from "prop-types";

const Todo = props => {
  const { description, id, removeTodo, completed, completeTodo } = props;
  return (
    <li key={description}>
      {completed === true ? 
      	<del>{description}</del> : description
      }
      <button onClick={() => completeTodo(id)}>Complete Todo</button>
      <button onClick={() => removeTodo(id)}>Remove Todo</button>
    </li>
  );
};

Todo.propTypes = {
  description: PropTypes.string.isRequired
};

export default Todo;
