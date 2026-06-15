import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState({
    todo: [],
    progress: [],
    done: [],
  });

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    setTasks({
      ...tasks,
      todo: [...tasks.todo, task],
    });

    setTask("");
  };

  const moveTask = (
    fromColumn,
    index,
    toColumn
  ) => {
    const taskToMove =
      tasks[fromColumn][index];

    const updatedFromColumn = [
      ...tasks[fromColumn],
    ];

    updatedFromColumn.splice(index, 1);

    setTasks({
      ...tasks,
      [fromColumn]: updatedFromColumn,
      [toColumn]: [
        ...tasks[toColumn],
        taskToMove,
      ],
    });
  };

  return (
    <div className="container">
      <div className="topbar">
        <h1>My Task Board 📝</h1>

        <button className="logout-btn">
          Logout
        </button>
      </div>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) =>
            setTask(e.target.value)
          }
        />

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="board">
        <TaskColumn
          title="Todo"
          tasks={tasks.todo}
          column="todo"
          moveTask={moveTask}
        />

        <TaskColumn
          title="In Progress"
          tasks={tasks.progress}
          column="progress"
          moveTask={moveTask}
        />

        <TaskColumn
          title="Done"
          tasks={tasks.done}
          column="done"
          moveTask={moveTask}
        />
      </div>
    </div>
  );
}

function TaskColumn({
  title,
  tasks,
  column,
  moveTask,
}) {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <span>{tasks.length}</span>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-text">
          No tasks available
        </p>
      ) : (
        tasks.map((task, index) => (
          <div
            className="task-card"
            key={index}
          >
            <p>{task}</p>

            <div className="task-actions">
              {column === "todo" && (
                <button
                  onClick={() =>
                    moveTask(
                      "todo",
                      index,
                      "progress"
                    )
                  }
                >
                  Start
                </button>
              )}

              {column ===
                "progress" && (
                <button
                  onClick={() =>
                    moveTask(
                      "progress",
                      index,
                      "done"
                    )
                  }
                >
                  Done
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;