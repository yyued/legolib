if (!Element.prototype.matches) {
    Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function(s) {
            var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
}

module.exports = function delegate ( selector, handler, counter ) {
    if (counter) {
        let callback = function ( event ) {
            counter--;
            if (!counter) {
                this.removeEventListener(event.type, callback, false);
            }
            for (let target = event.target; target && target != this; target = target.parentNode) {
                if (target.matches(selector)) {
                    return handler.apply(target, arguments);
                }
            }
        };
        return callback;
    }

    return function ( event ) {
        for (let target = event.target; target && target != this; target = target.parentNode) {
            if (target.matches(selector)) {
                return handler.apply(target, arguments);
            }
        }
    };
}
