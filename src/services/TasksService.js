import { db } from './SQLite';

export function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    done BOOLEAN DEFAULT FALSE,
    create_date TIMESTAMP);
    `;

  db.transaction((transaction) => {
    transaction.executeSql(sql);
  }, (error) => {
    console.log("error call back : " + JSON.stringify(error));
    console.log(error);
  }, () => {
    console.log("transaction complete call back ");
  });
}

export async function createTask(task) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO tasks (title, description, create_date) VALUES (?, ?,  datetime());", [task.title, task.description], () => {
        resolve("Tarefa adicionada com sucesso!");
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}

export async function updateTask(task) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE tasks SET title = ?, description = ? WHERE id = ?;", [task.title, task.description, task.id], () => {
        resolve("Tarefa atualizada com sucesso!");
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}

export async function updateStatus(task) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE tasks SET done = not done WHERE id = ?;", [task.id], () => {
        resolve("Tarefa atualizada com sucesso!");
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}

export async function deleteTask(task) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM tasks WHERE id = ?;", [task.id], () => {
        resolve("Tarefa removida com sucesso!");
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}

export async function listTasks() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM tasks ORDER BY create_date DESC;", [], (transaction, resultado) => {
        resolve(resultado.rows._array);
      })
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    });
  })
}