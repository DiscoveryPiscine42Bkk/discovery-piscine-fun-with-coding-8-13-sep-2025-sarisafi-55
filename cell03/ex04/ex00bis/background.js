// เลือกปุ่ม
const button = document.getElementById('changeBtn');

// เพิ่ม event listener ให้ปุ่ม
button.addEventListener('click', function() {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = randomColor;
});
