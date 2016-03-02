// Just adding this rather then pulling in all of underscore
// http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
let debounce = function(func, wait) {
    // we need to save these in the closure
    let timeout, args, context, timestamp;

    return function() {

        // save details of latest call
        context = this;
        args = [].slice.call(arguments, 0);
        timestamp = new Date();

        // this is where the magic happens
        let later = function() {

            // how long ago was the last call
            let last = (new Date()) - timestamp;

            // if the latest call was less that the wait period ago
            // then we reset the timeout to wait for the difference
            if (last < wait) {
                timeout = setTimeout(later, wait - last);

                // or if not we can null out the timer and run the latest
            } else {
                timeout = null;
                func.apply(context, args);
            }
        };

        // we only need to set the timer now if one isn't already running
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
    };
};

module.exports = debounce;
