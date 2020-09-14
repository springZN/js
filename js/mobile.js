window.onload = function() {
    var ul = document.querySelector('ul');
    var imgWidth = document.querySelector('img').offsetWidth;
    // 1、添加定时器 移动ul
    // 声明一个变量 用于计算移动的距离 -move * 每一个图片的宽度
    var move = 0;
    var timer = setInterval(function() {
        move++;
        moveImg(ul);
    }, 2000);
    // 2、等着过渡完成之后 执行事件
    ul.addEventListener('transitionend', function() {
        if (move >= ul.children.length - 2) {
            move = 0;
            ul.style.transition = 'none'
            ul.style.transform = 'translateX(' + -move * imgWidth + 'px)';
        } else if (move < 0) {
            // move小于0 要到5张轮播图的最后一张
            move = ul.children.length - 3;
            ul.style.transition = 'none'
            ul.style.transform = 'translateX(' + -move * imgWidth + 'px)';
        }
        // 3、小圆点跟着变化
        document.querySelector('.now').classList.remove('now');
        document.querySelector('.button').children[move].classList.add('now')
    });
    // 3、拖动元素
    var startX = 0;
    var moveX = 0; // 拖动距离 不但用于手指滑动 还用于手指松开事件中的判断
    ul.addEventListener('touchstart', function(e) {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer)
    })
    var flag = true;
    ul.addEventListener('touchmove', function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子 盒子原来的位置 + 手指移动的距离
        var touchW = -move * imgWidth + moveX;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + touchW + 'px)';
        e.preventDefault();
        flag = false;
    });
    // 4、当手指松开的时候
    ul.addEventListener('touchend', function() {
        if (flag == false) {
            if (Math.abs(moveX) > 50) { // 移动距离大于50 就移动
                if (moveX > 0) {
                    move--;
                } else if (moveX < 0) {
                    move++;
                }
                moveImg(ul);
                // 如果用户按下 并不想拖动 就不需要拖动 只有用户手指滑动了 才会拖动 使用一个变量【flag】控制即可
            } else {
                moveImg(ul)
            }
            flag = true; // 每一次的松开 都应该复原flag 要不然 只有一次效果
        }
        // 5、手指离开的时候 开启定时器
        clearInterval(timer);
        timer = setInterval(function() {
            move++;
            moveImg(ul)
        }, 2000)
    })

    function moveImg(ele) {
        ele.style.transform = 'translateX(' + -move * imgWidth + 'px)';
        ele.style.transition = 'transform .5s';
    }
}