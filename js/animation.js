function animation(object, target, callback) {
    clearInterval(object.time);
    object.time = setInterval(function() {
        var step = (target - object.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        object.style.left = object.offsetLeft + step + 'px';
        if (object.offsetLeft == target) {
            clearInterval(object.time);
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
    }, 15)
}