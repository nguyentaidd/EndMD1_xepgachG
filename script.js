
if(window.innerWidth < 500){//window:lấy thông số cửa sổ trình duyệt (width:chiều rộng)
    var boardWidth = window.innerWidth;//chiều rộng viên gạch
    var gameWidth = window.innerWidth;//chiều rộng của game
    document.documentElement.style.setProperty('--boardWidth', boardWidth + "px");//thay đổi giá trị gạch đã css bằng js
    document.documentElement.style.setProperty('--width', gameWidth + "px");//thay đổi giá trị game đã css bằng js
}else{
    var boardWidth = 500;
    var gameWidth = 400;
}
var counter = 2;
var btn = document.getElementById("btn");
function stopSliding(sliderMoving, sliderAbove, sliderB4){ //3 viên
    var sliderMoving = document.getElementById(sliderMoving);//viên đang move
    var sliderAbove = document.getElementById(sliderAbove);//viên trên nó
    var sliderB4 = document.getElementById(sliderB4);//trở lại viên dang move(mà đã dừng)
    var left = window.getComputedStyle(sliderMoving).getPropertyValue("left");//tạo biến left gạch move khi ng chơi nhấn nút
    sliderMoving.classList.remove("animate"); //bỏ hoạt ảnh di chuyển khiến viên gạch đang move về 0 (nếu k viên đầu sẽ move theo những viên tiếp theo)
    sliderMoving.style.left = left;//rồi set vị trí viên đang move về biến left (để cả khối 0 dừng lại)
    var width = parseFloat(window.getComputedStyle(sliderMoving).getPropertyValue("width"));//tạo biến width trả về giá trị số viên move: width
    left = parseFloat(left);//gán left = giá trị số của nó
    var leftB4 = parseFloat(window.getComputedStyle(sliderB4).getPropertyValue("left"));//tạo biến leftb4 trả về giá trị số viên đó: left
    var difference = left - leftB4;//tạo thêm biến hiệu số 2 viên
    var absDifference = Math.abs(difference);//tạo biến luôn dương
    if(difference>width||difference<-width) { //(diff > width trả về giá trị dương) nếu viên gạch không chạm đến tọa độ của viên gạch trước dừng
        document.getElementById("restart").style.display = "block";//tạo sự kiện cho nút chơi lại
        var score = "Điểm của bạn: ".concat(counter - 2);//tạo biến tính điểm trả về mảng mới
        btn.setAttribute("onclick", "");//thêm thuộc tính vào thẻ nhấp!
        alert(score)//sau khi chơi xong thì hiện hộp thoại điểm
        Location.reload();//thêm sự kiện tải lại trò chơi (gần giống f5)
    }
    if(difference>0){//thêm điều kiện nếu diff là số dương
        left = left + absDifference;//gán lại giá trị cho left (2 viên gạch trùng đúng vị trí sẽ k có j xảy ra)
    }else {//diff là số âm
        left = left - difference;//gán lại giá trị cho left
        sliderMoving.style.left = left.toString().concat("px");//tránh việc khi hiển thị viên đang move thò ra phần thừa bên trái
    }
    var offset = (width - absDifference).toString().concat("px");//tạo biến offset tránh hiển thị viên move thò ra phần thừa bên phải
    sliderMoving.style.width = offset;//gán giá trị viên đang di chuyển là offset (cắt phần thừa bên phải)
    sliderAbove.style.width = offset;//gán giá trị viên tiếp theo là offset (căn đúng bảng trò chơi k tràn ra ngoài)
    sliderAbove.style.visibility = "visible";//gán giá trị để viên tiếp theo hiển thị
    gameWidth = gameWidth + absDifference;//gán giá trị gamewidth luôn dương
    document.documentElement.style.setProperty('--width', gameWidth + "px");//thay đổi giá trị biến width = gamewidth
    var onclick = "stopSliding('slider".concat(counter, "','slider", counter+1, "','slider", counter-1, "')");//gán giá trị onclick khi viên gạch ngưng chuyển động với 3 viên
    btn.setAttribute("onclick",onclick);//thêm thuộc tính onclick vào thẻ nhấp!
    counter++;
}
