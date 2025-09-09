window.onload = function () {
  const ftList = document.getElementById("ft_list"); // หา element ที่มี id เป็น 'ft_list' มาเก็บในตัวแปร ftList
  const newBtn = document.getElementById("new");    // หา element ที่มี id เป็น 'new' มาเก็บในตัวแปร newBtn

  // โหลด task จาก cookie (ถ้ามี)
  const savedTasks = getTasks(); // เรียกใช้ฟังก์ชัน getTasks() เพื่อดึงรายการ task ที่บันทึกไว้ใน cookie
  savedTasks.forEach(task => {
    addTaskToDOM(task); // นำแต่ละ task ที่ดึงมาได้มาแสดงผลบนหน้าเว็บ
  });

  // เมื่อกดปุ่ม New
  newBtn.addEventListener("click", () => {
    const task = prompt("Enter a new TO DO:"); // เปิดหน้าต่าง prompt ให้ผู้ใช้กรอก task ใหม่
    if (task && task.trim() !== "") { // ตรวจสอบว่าผู้ใช้กรอกข้อความเข้ามาและไม่ใช่แค่ช่องว่าง
      addTaskToDOM(task); // เพิ่ม task ใหม่ลงในหน้าเว็บ
      saveTasks(); // บันทึกรายการ task ลงใน cookie
    }
  });

  // ฟังก์ชันเพิ่ม task ลงใน DOM
  function addTaskToDOM(task) {
    const div = document.createElement("div"); // สร้าง element div ใหม่
    div.textContent = task; // ใส่ข้อความ task ลงใน div
    div.addEventListener("click", () => { // เมื่อคลิกที่ task นั้น
      if (confirm("Do you want to delete this task?")) { // แสดง confirm ถามว่าจะลบ task หรือไม่
        div.remove(); // ถ้าตกลงให้ลบ task ออกจากหน้าเว็บ
        saveTasks(); // อัปเดต cookie หลังจากลบ task แล้ว
      }
    });
    ftList.prepend(div); // นำ div task ที่สร้างขึ้นมาแทรกไว้ด้านบนสุดของรายการ
  }

  // ฟังก์ชันดึง task จาก cookie
  function getTasks() {
    const cookie = document.cookie
      .split('; ') // แยก cookie ออกเป็นแต่ละคู่ key=value
      .find(row => row.startsWith('todoList=')); // หา cookie ที่ชื่อ 'todoList'
    if (!cookie) return []; // ถ้าไม่มี cookie 'todoList' ให้คืนค่าเป็น array ว่าง
    try {
      return JSON.parse(decodeURIComponent(cookie.split('=')[1])); // ถอดรหัสและแปลงข้อมูล JSON ที่เก็บไว้ใน cookie กลับเป็น array
    } catch {
      return []; // ถ้าแปลงไม่ได้ให้คืนค่าเป็น array ว่าง
    }
  }

  // ฟังก์ชันบันทึก task ลงใน cookie
  function saveTasks() {
    const tasks = [];
    const children = ftList.querySelectorAll("div"); // ดึง task ทั้งหมดที่แสดงในหน้าเว็บ (เป็น div)
    children.forEach(child => {
      tasks.push(child.textContent); // เก็บข้อความของแต่ละ task ลงใน array
    });
    // แปลง array เป็น JSON string แล้วเข้ารหัส และเซ็ตเป็น cookie ชื่อ 'todoList'
    document.cookie = "todoList=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/";
  }
};
