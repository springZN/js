window.onload = function() {
    var carousel = document.querySelector('.carousel');
    // 左右按钮的父级元素
    var button = document.querySelector('.button');
    // 放图片的父级元素
    var slide = document.querySelector('.slide-img');
    // 下面的小圆圈
    var clicle = document.querySelector('.clicle');
    // 获取图片的宽度
    var imgWidth = document.querySelector('img').offsetWidth;
    carousel.addEventListener('mouseover', function() {
        // 8、经过carousel 就清除定时器
        clearInterval(timer);
        timer = null;
    })
    carousel.addEventListener('mouseout', function() {
        // 因为在页面一开始加载的时候 定时器就是开的 所以一开始就是有timer的 所以不需要再次定义
        // 离开就加上定时器
        timer = setInterval(function() {
            right.click();
        }, 2000)

    });
    // 控制左右按钮
    var num = 0;
    // 控制小圆圈
    var follow = 0;
    for (var i = 0; i < slide.children.length; i++) {
        // 1、动态生成小圆圈 给第一个小圆圈添加now类
        var span = document.createElement('span');
        clicle.appendChild(span)
        clicle.children[0].className = 'now';
        // 2.1 生成小圆圈的时候 需要给他加一个自定的属性 用来做图片滚动 [不能在点击小圆圈的事件里面做 要不然出错【因为在执行到下面的回调的时候 span就只是一个元素】 在这里做 每一次循环都能给每一个span添加自定义属性
        span.setAttribute('index', i)
        span.addEventListener('click', function() {
            for (var i = 0; i < clicle.children.length; i++) {
                clicle.children[i].className = '';
            }
            this.className = 'now';
            // 2.2 点击某个小圆圈 ， 就让图片滚动 小圆圈的 索引号乘以图片的宽度做为slide-img移动距离
            var spanIndex = this.getAttribute('index');
            // 6、需要修改num follow 因为如果不修改 当我们点击小圆圈的时候 num、follow是不发生变化的 等到点击按钮的时候 num再发生变化就出错
            num = spanIndex;
            follow = spanIndex;
            animation(slide, -spanIndex * imgWidth);
        })
    }
    //  3.1 为了实现无缝滚动 克隆slide里面的第一个li放在slide的后面 克隆的位置得在动态创建小圈圈的下面 这样 在动态创建完小圆圈后 就不会多一个小圆圈
    var cloneImg = slide.children[0].cloneNode(true);
    slide.appendChild(cloneImg);
    // 9、节流阀 为了是连续点击左右按钮 不会出现播放过快的情况
    var flag = true;
    // 4.1 右侧按钮
    var right = document.querySelector('.right')
    right.addEventListener('click', function() {
        if (flag) {
            flag = false; // 第一次执行的时候 flag是true 第二次执行的时候 flag = false 当我们还没有执行完这个事件里面的动画的时候 flag一直是false
            // 走到了最后复制那张图片 slide-img要快速的不加动画的复原 设置left为0
            if (num == slide.children.length - 1) {
                slide.style.left = 0;
                num = 0;
            }
            num++;
            // 这里也是负数 因为是往左走
            animation(slide, -imgWidth * num, function() {
                flag = true; // 执行完这个动画了 flag变为true
            });
            // 5、小圆圈跟着变化
            follow++;
            // 点击第六次的时候 follow需要变成0 要不然小圆圈没办法一直跟着变化
            follow = follow == clicle.children.length ? 0 : follow
            spanStyle();
        }
    });
    // 4.2 左侧按钮
    var left = document.querySelector('.left')
    left.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                // 左边按钮  num是0 就代表是第一张 需要快速的不加动画的跳到倒数第1张 如果是不加动画的跳到倒数第二张 就没有动画了 因为是直接跳到倒数第二张
                num = slide.children.length - 1;
                slide.style.left = -num * imgWidth + 'px';
            }
            num--;
            animation(slide, -imgWidth * num, function() {
                flag = true;
            });
            // 右侧是相反的
            follow--;
            follow = follow < 0 ? clicle.children.length - 1 : follow;
            spanStyle();
        }
    })

    function spanStyle() {
        for (var i = 0; i < clicle.children.length; i++) {
            clicle.children[i].className = '';
        }
        clicle.children[follow].className = 'now';
    }
    // 7、自动播放
    var timer = setInterval(function() {
        // 手动调用右侧按钮的点击事件 即使不点击 也是会调用
        right.click();
    }, 2000)
}