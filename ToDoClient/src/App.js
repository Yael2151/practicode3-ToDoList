import React, { useEffect, useState } from 'react';
import service from './service.js';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);


  async function getTodos() {
    const todos = await service.getTasks();
    console.log("Todos received:", todos); // הדפסת התגובה לבדוק את מבנה הנתונים
    if (Array.isArray(todos)) {
      setTodos(todos); // אם מדובר במערך, עדכן את ה-state
    } else {
      console.error("Error: Expected an array, but received:", todos);
      setTodos([]); // במידה ויש בעיה, הצג מערך ריק
    }
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo("");//clear input
    await getTodos();//refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo.id, isComplete);
    await getTodos();//refresh tasks list (in order to see the updated one)
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos();//refresh tasks list
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={createTodo}>
          <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        </form>
      </header>
      <section className="main" style={{ display: "block" }}>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
                <div className="view">
                  <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
                  <label>{todo.name}</label>
                  <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </section >
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import service from './service.js';

// function App() {
//   const [newTodo, setNewTodo] = useState("");
//   const [todos, setTodos] = useState([]);

//   async function getTodos() {
//     const todos = await service.getTasks();
//     setTodos(todos);
//   }

//   async function createTodo(e) {
//     e.preventDefault();
//     await service.addTask(newTodo);
//     setNewTodo("");//clear input
//     await getTodos();//refresh tasks list (in order to see the new one)
//   }

//   async function updateCompleted(todo, isComplete) {
//     await service.setCompleted(todo.id, isComplete);
//     await getTodos();//refresh tasks list (in order to see the updated one)
//   }

//   async function deleteTodo(id) {
//     await service.deleteTask(id);
//     await getTodos();//refresh tasks list
//   }

//   useEffect(() => {
//     getTodos();
//   }, []);

//   return (
//     <section className="todoapp">
//       <header className="header">
//         <h1>todos</h1>
//         <form onSubmit={createTodo}>
//           <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
//         </form>
//       </header>
//       <section className="main" style={{ display: "block" }}>
//         <ul className="todo-list">
//           {todos.map(todo => {
//             return (
//               <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
//                 <div className="view">
//                   <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
//                   <label>{todo.name}</label>
//                   <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </section>
//     </section >
//   );
// }

// export default App;

// import React, { useEffect, useState } from 'react';
// import service from './service.js';

// function App() {
//   const [newTodo, setNewTodo] = useState("");
//   const [todos, setTodos] = useState([]);

//   // פונקציה לשליפת המשימות
//   async function getTodos() {
//     try {
//       const todos = await service.getTasks();
//       if (Array.isArray(todos)) {
//         setTodos(todos); // עדכון רשימת המשימות
//       } else {
//         console.error("הנתונים שהתקבלו אינם מערך", todos);
//       }
//     } catch (error) {
//       console.error("שגיאה בשליפת המשימות", error);
//     }
//   }

//   // פונקציה להוספת משימה חדשה
//   async function createTodo(e) {
//     e.preventDefault();
//     if (newTodo.trim()) { // בדיקה אם הקלט לא ריק
//       try {
//         await service.addTask(newTodo);
//         setNewTodo(""); // ניקוי שדה הקלט
//         await getTodos(); // עדכון רשימת המשימות
//       } catch (error) {
//         console.error("שגיאה בהוספת המשימה", error);
//       }
//     }
//   }

//   // עדכון מצב המשימה (האם הושלמה או לא)
//   async function updateCompleted(todo, isComplete) {
//     try {
//       await service.setCompleted(todo.id, isComplete);
//       await getTodos(); // עדכון רשימת המשימות
//     } catch (error) {
//       console.error("שגיאה בעדכון המשימה", error);
//     }
//   }

//   // מחיקת משימה
//   async function deleteTodo(id) {
//     try {
//       await service.deleteTask(id);
//       await getTodos(); // עדכון רשימת המשימות
//     } catch (error) {
//       console.error("שגיאה במחיקת המשימה", error);
//     }
//   }

//   // קריאה לפונקציה לשליפת המשימות כאשר הקומפוננטה נטענת
//   useEffect(() => {
//     getTodos();
//   }, []);

//   return (
//     <section className="todoapp">
//       <header className="header">
//         <h1>todos</h1>
//         <form onSubmit={createTodo}>
//           <input
//             className="new-todo"
//             placeholder="Well, let's take on the day"
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//           />
//         </form>
//       </header>
//       <section className="main" style={{ display: "block" }}>
//         <ul className="todo-list">
//           {Array.isArray(todos) && todos.map(todo => {
//             return (
//               <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
//                 <div className="view">
//                   <input
//                     className="toggle"
//                     type="checkbox"
//                     defaultChecked={todo.isComplete}
//                     onChange={(e) => updateCompleted(todo, e.target.checked)}
//                   />
//                   <label>{todo.name}</label>
//                   <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </section>
//     </section>
//   );
// }

// export default App;



// import React, { useEffect, useState } from 'react';
// import service from './service.js';

// function App() {
//   const [newTodo, setNewTodo] = useState("");
//   const [todos, setTodos] = useState([]);

//   async function getTodos() {
//     const todos = await service.getTasks();
//     setTodos(todos);
//   }

//   async function createTodo(e) {
//     e.preventDefault();
//     await service.addTask(newTodo);
//     setNewTodo("");//clear input
//     await getTodos();//refresh tasks list (in order to see the new one)
//   }

//   async function updateCompleted(todo, isComplete) {
//     await service.setCompleted(todo.id, isComplete);
//     await getTodos();//refresh tasks list (in order to see the updated one)
//   }

//   async function deleteTodo(id) {
//     await service.deleteTask(id);
//     await getTodos();//refresh tasks list
//   }

//   useEffect(() => {
//     getTodos();
//   }, []);

//   return (
//     <section className="todoapp">
//       <header className="header">
//         <h1>todos</h1>
//         <form onSubmit={createTodo}>
//           <input className="new-todo" placeholder="Well, let's take on the day" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
//         </form>
//       </header>
//       <section className="main" style={{ display: "block" }}>
//         <ul className="todo-list">
//           {todos.map(todo => {
//             return (
//               <li className={todo.isComplete ? "completed" : ""} key={todo.id}>
//                 <div className="view">
//                   <input className="toggle" type="checkbox" defaultChecked={todo.isComplete} onChange={(e) => updateCompleted(todo, e.target.checked)} />
//                   <label>{todo.name}</label>
//                   <button className="destroy" onClick={() => deleteTodo(todo.id)}></button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       </section>
//     </section >
//   );
// }

// export default App;