/**
 * @file   : 业务逻辑demo
 * @author : David
 * @update : 2016-08-04 20:38:22
 */


import Slider from './export/page-slider.js';

var pageslider = new Slider({
    container: ".page",
    direction: "y",
    onSlide: function(current, previous, direction) {

        var previousSection = this.children[previous]; // 滑动前的section
        var currentSection  = this.children[current]; // 滑动后（当前）的section
        var scrollTimer     = null;

        console.log(direction);

        previousSection.classList.add("is-out");

        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(function() {
            previousSection.classList.remove("is-in")
        }, 700);

        currentSection.classList.add("is-in");
        currentSection.classList.remove("is-out");

    }
});

