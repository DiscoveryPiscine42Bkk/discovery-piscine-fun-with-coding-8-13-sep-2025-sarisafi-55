$(function () {
  const $ftList = $("#ft_list");
  const $newBtn = $("#new");

  function getTasks() {
    const cookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("todoList="));
    if (!cookie) return [];
    try {
      return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    } catch {
      return [];
    }
  }

  function saveTasks() {
    const tasks = [];
    $ftList.children("div").each(function () {
      tasks.push($(this).text());
    });
    document.cookie = "todoList=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/";
  }

  function addTaskToDOM(task) {
    const $div = $("<div>").text(task);
    $div.on("click", function () {
      if (confirm("Delete this task?")) {
        $div.remove();
        saveTasks();
      }
    });
    $ftList.prepend($div);
  }

  // Load tasks from cookie
  getTasks().forEach(addTaskToDOM);

  $newBtn.on("click", function () {
    const task = prompt("Enter a new TO DO:");
    if (task && task.trim() !== "") {
      addTaskToDOM(task);
      saveTasks();
    }
  });
});

