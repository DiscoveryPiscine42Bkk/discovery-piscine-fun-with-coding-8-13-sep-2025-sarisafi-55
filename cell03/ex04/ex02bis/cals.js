$(function () {
  $('#calcBtn').on('click', function () {
    const left = $('#left').val();
    const right = $('#right').val();
    const operator = $('#operator').val();

    const leftNum = parseInt(left);
    const rightNum = parseInt(right);

    if (isNaN(leftNum) || isNaN(rightNum) || leftNum < 0 || rightNum < 0) {
      alert("Error :(");
      return;
    }

    if ((operator === '/' || operator === '%') && rightNum === 0) {
      alert("It's over 9000!!");
      console.log("It's over 9000!!");
      return;
    }

    let result;
    switch (operator) {
      case '+':
        result = leftNum + rightNum;
        break;
      case '-':
        result = leftNum - rightNum;
        break;
      case '*':
        result = leftNum * rightNum;
        break;
      case '/':
        result = leftNum / rightNum;
        break;
      case '%':
        result = leftNum % rightNum;
        break;
    }

    alert(result);
    console.log(result);
  });

  // แจ้งเตือนทุก 30 วินาที
  setInterval(function () {
    alert("Please, use me...");
  }, 30000);
});
