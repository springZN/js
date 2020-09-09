function animation(object, target, callback) {
    clearInterval(object.timer);
    object.timer = setInterval(function() {
        var step = (target - window.pageYOffset) / 10;
        step = step > 10 ? Math.ceil(step) : Math.floor(step);
        window.scroll(0, window.pageYOffset + step);
        if (window.pageYOffset == target) {
            clearInterval(object.timer);
            callback && callback();
        }
    }, 15)
}
// 页面滚动动画