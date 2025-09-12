const balloon = document.getElementById('balloon');
let size = 200;
const maxSize = 420;
const minSize = 200;
const colors = ['red', 'green', 'blue'];
let colorIndex = 0;

// ฟังก์ชันเปลี่ยนสีถัดไป
function nextColor() {
  colorIndex = (colorIndex + 1) % colors.length;
  return colors[colorIndex];
}

// ฟังก์ชันเปลี่ยนสีย้อนกลับ
function prevColor() {
  colorIndex = (colorIndex - 1 + colors.length) % colors.length;
  return colors[colorIndex];
}

// เมื่อคลิกบอลลูน
balloon.addEventListener('click', () => {
  size += 10;

  if (size > maxSize) {
    // ระเบิด
    size = minSize;
    colorIndex = 0;
    balloon.style.backgroundColor = colors[colorIndex];
  } else {
    balloon.style.backgroundColor = nextColor();
  }

  balloon.style.width = `${size}px`;
  balloon.style.height = `${size}px`;
});

// เมื่อเมาส์ออกจากบอลลูน
balloon.addEventListener('mouseleave', () => {
  if (size > minSize) {
    size -= 5;
    balloon.style.width = `${size}px`;
    balloon.style.height = `${size}px`;
    balloon.style.backgroundColor = prevColor();
  }
});
