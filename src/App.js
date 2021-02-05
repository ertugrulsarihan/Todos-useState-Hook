import "./App.css";
import { Container } from "react-bootstrap";
import React, { useReducer, useState } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "add_todo":
      return {
        
        todos: [
          ...state.todos,
          { text: action.text, completed: false},
        ],
      };
    case "already_do":
      return {
        todos: state.todos.map((todo, idx) =>
          idx === action.idx
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo
        ),
      };

    default:
      return state;
  }
};

const App = () => {
  const [{ todos }, dispatch] = useReducer(reducer, { todos: [] });
  const [text, setText] = useState();

  const handlechange = (e) => {
     setText(e.target.value);
  };

  return (
    <Container className="main-cont">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "add_todo", text });
          setText("");
          console.log(todos);
        }}
      >
        <input value={text} onChange={handlechange} />
      </form>

      <div className="main-div">
        {todos.map((todo, idx) => (
          <div className="main-div" onClick={() => dispatch({ type: "already_do", idx })}>
            <h3 className={todo.completed ? "div-text" : ""}>{todo.text}</h3>
            <button>
              Done
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default App;
