document.addEventListener('DOMContentLoaded', function () {
    //gọi sự khi click vào nut
    var Next = document.querySelector('.nutchuyen .phai'),
        Prev = document.querySelector('.nutchuyen .trai'),
        slides = document.querySelectorAll('.slides ul li');
    console.log(slides);
    var chisohientai = 0;
    var slslides = slides.length;
    console.log(slslides);
    var trangthai = 'TamDung'; //hiệu ứng đang tạm dừng

    //Xây dưng hàm xác định đối tượng và gắn hiệu ứng
    function XacDinhDoiTuong_cd(nut) {
        if (trangthai == 'chuyendong') { return false }//Nếu hiệu ứng đang hoạt động thì dừng không làm gì hết
        trangthai = 'chuyendong';
        var Trangthaicua2cd = 0;
        var pthientai = slides[chisohientai];
        //Nếu là nút trái
        if (nut == 'Left') {
            //console.log('code xử lý cho nút trái');
            if (chisohientai > 0) //chưa đến slide cuối
            {
                chisohientai = chisohientai - 1;
            }
            else {
                chisohientai = slslides - 1;
            }
        }
        //Nếu là nút phải
        else {
            //console.log('code xử lý cho nut phải'); 
            if (chisohientai < slslides - 1) {
                chisohientai = chisohientai + 1;
            }
            else {
                chisohientai = 0;
            }
        }
        var pttieptheo = slides[chisohientai];
        //đến đây thì đã xác định được 2 phần tử cần click
        //Tiếp theo xử lý phần chuyển động
        var ketThucAnSlide = function () {
            //console.log('slide hiện tại đã ẩn rồi');
            this.classList.remove('active');
            if (nut == 'Left') {
                this.classList.remove('anslidePrev');
            }
            //Nếu là nút phải
            else {
                //console.log('code xử lý cho nut phải'); 
                this.classList.remove('anslideNext');
            }
            Trangthaicua2cd++;
            if (Trangthaicua2cd == 2) { trangthai = 'TamDung'; }
        }
        var ketThucHienSlide = function () {
            console.log('slide tiếp theo đã hiện ra');
            this.classList.add('active');
            if (nut == 'Left') {
                this.classList.remove('hienslidePrev');
            }
            //Nếu là nút phải
            else {
                //console.log('code xử lý cho nut phải'); 
                this.classList.remove('hienslideNext');
            }
            Trangthaicua2cd++;
            if (Trangthaicua2cd == 2) { trangthai = 'TamDung'; }
        }
        pthientai.addEventListener('webkitAnimationEnd', ketThucAnSlide);
        pttieptheo.addEventListener('webkitAnimationEnd', ketThucHienSlide);
        if (nut == 'Left') {
            pthientai.classList.add('anslidePrev');
            pttieptheo.classList.add('hienslidePrev');
        }
        else {
            pthientai.classList.add('anslideNext');
            pttieptheo.classList.add('hienslideNext');
        }
    }
    var moveslideRight = function () {
        XacDinhDoiTuong_cd('Right');
    }
    //End nút Right
    var moveslideLeft = function () {
        XacDinhDoiTuong_cd('Left');
    }
    //gọi hàm moveslideRight
    Next.addEventListener('click', moveslideRight);
    //gọi hàm moveslideLeft
    Prev.addEventListener('click', moveslideLeft);
}, false)