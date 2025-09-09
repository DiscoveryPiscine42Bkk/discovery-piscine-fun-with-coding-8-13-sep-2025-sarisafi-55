window.onload = function () {
  const ftList = document.getElementById("ft_list");
  const newBtn = document.getElementById("new");

  // โหลด task จาก cookie
  const savedTasks = getTasks();
  savedTasks.forEach(task => {
    addTaskToDOM(task);
  });

  // เมื่อกดปุ่ม New
  newBtn.addEventListener("click", () => {
    const task = prompt("Enter a new TO DO:");
    if (task && task.trim() !== "") {
      addTaskToDOM(task);
      saveTasks();
    }
  });

  function addTaskToDOM(task) {
    const div = document.createElement("div");
    div.textContent = task;
    div.addEventListener("click", () => {
      if (confirm("Do you want to delete this task?")) {
        div.remove();
        saveTasks();
      }
    });
    ftList.prepend(div);
  }

  function getTasks() {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('todoList='));
    if (!cookie) return [];
    try {
      return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
    } catch {
      return [];
    }
  }

  function saveTasks() {
    const tasks = [];
    const children = ftList.querySelectorAll("div");
    children.forEach(child => {
      tasks.push(child.textContent);
    });
    document.cookie = "todoList=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/";
  }
};
