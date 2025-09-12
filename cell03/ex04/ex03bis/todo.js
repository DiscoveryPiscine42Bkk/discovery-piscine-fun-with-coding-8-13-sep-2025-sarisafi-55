$(document).ready(function () {
    const $ftList = $("#ft_list");
    const $newBtn = $("#new");

    // โหลด task จาก cookie
    const savedTasks = getTasks();
    savedTasks.forEach(task => {
        addTaskToDOM(task);
    });

    // เมื่อคลิกปุ่ม "New"
    $newBtn.click(function () {
        const task = prompt("Enter a new TO DO:");
        if (task && task.trim() !== "") {
            addTaskToDOM(task);
            saveTasks();
        }
    });

    // ฟังก์ชันเพิ่ม task
    function addTaskToDOM(task) {
        const $div = $("<div></div>").text(task);
        $div.click(function () {
            if (confirm("Do you want to delete this task?")) {
                $(this).remove();
                saveTasks();
            }
        });
        $ftList.prepend($div);
    }

    // ฟังก์ชันโหลด task จาก cookie
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

    // ฟังก์ชันบันทึก task ลง cookie
    function saveTasks() {
        const tasks = [];
        $ftList.children("div").each(function () {
            tasks.push($(this).text());
        });
        document.cookie = "todoList=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/";
    }
});
