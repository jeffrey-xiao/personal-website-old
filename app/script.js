// create a module
var site = angular.module('site', ['ngRoute', 'ngAnimate', 'entryDirective', 'blogDirective']);

var adjustSlideshow = function (activeIndex, elements, isLeft) {
    elements.eq(activeIndex).css('left', '0%');
    elements.css('z-index', '-1');
    elements.eq(activeIndex).css('z-index', '1');
    elements.each(function(index, element) {
        if (index != activeIndex) {
            var minVal = index - (activeIndex + elements.length);
            var maxVal = index - (activeIndex - elements.length);
            if (index - activeIndex < 0)
                minVal = Math.max(minVal, index - activeIndex);
            if (index - activeIndex > 0)
                maxVal = Math.min(maxVal, index - activeIndex);

            if (isLeft && elements.eq(index).css('left') < '0px') {
                elements.eq(index).css('z-index', '1');
            } else if (!isLeft && elements.eq(index).css('left') > '0px') {
                elements.eq(index).css('z-index', '1');
            }

            if (-minVal < maxVal) {
                elements.eq(index).css('left', minVal * 100 + '%');
            } else {
                elements.eq(index).css('left', maxVal * 100 + '%');
            }
        }
    });
}
var getActiveSlide = function (elements) {
    var activeIndex = 0;
    elements.each(function(index, element) {
        if ($(element).hasClass('active'))
            activeIndex = index;
    });
    return activeIndex;
}

$(document).on("click", ".hierarchy li:has(ul)", function(event) {
    if (event.target == this) {
        if ($(event.target).hasClass('collapsed')) {
            $(event.target).removeClass('collapsed');
            $(event.target).addClass('expanded');
            var childTags = $(event.target).children('ul');
            for (var i = 0; i < childTags.length; i++) {
                childTags.eq(i).css('opacity', '1');
                childTags.eq(i).css('max-height', '1000px');
            }
        } else {
            $(event.target).removeClass('expanded');
            $(event.target).addClass('collapsed');
            var childTags = $(event.target).children('ul');
            for (var i = 0; i < childTags.length; i++) {
                childTags.eq(i).css('opacity', '0');
                childTags.eq(i).css('max-height', '0px');
            }
        }
    }
    return false;
});

$(document).on('click', '.slideshow-left', function(event) {
    var elements = $(".slideshow .slideshow-content .slideshow-section");
    var elementsControl = $(".slideshow .slideshow-control li");
    var activeIndex = getActiveSlide(elements);
    elements.eq(activeIndex).removeClass('active');
    elementsControl.eq(activeIndex).removeClass('active');
    elements.eq((activeIndex - 1 + elements.length) % elements.length).addClass('active');
    elementsControl.eq((activeIndex - 1 + elements.length) % elements.length).addClass('active');
    adjustSlideshow((activeIndex - 1 + elements.length) % elements.length, elements, true);
});

$(document).on('click', '.slideshow-right', function(event) {
    var elements = $(".slideshow .slideshow-content .slideshow-section");
    var elementsControl = $(".slideshow .slideshow-control li");
    var activeIndex = getActiveSlide(elements);
    elements.eq(activeIndex).removeClass('active');
    elementsControl.eq(activeIndex).removeClass('active');
    elements.eq((activeIndex + 1) % elements.length).addClass('active');
    elementsControl.eq((activeIndex + 1) % elements.length).addClass('active');
    adjustSlideshow((activeIndex + 1) % elements.length, elements, false);
});

$(document).on('click', '.slideshow-control li', function() {
    var elements = $(".slideshow .slideshow-content .slideshow-section");
    var elementsControl = $(".slideshow .slideshow-control li");
    var activeIndex = getActiveSlide(elements);

    var minVal = $(this).index() - (activeIndex + elements.length);
    var maxVal = $(this).index() - (activeIndex - elements.length);
    if ($(this).index() - activeIndex < 0)
        minVal = Math.max(minVal, $(this).index() - activeIndex);
    if ($(this).index() - activeIndex > 0)
        maxVal = Math.min(maxVal, $(this).index() - activeIndex);
    var isLeft = true;

    if (maxVal < -minVal)
        isLeft = false;

    elements.eq(activeIndex).removeClass('active');
    elementsControl.eq(activeIndex).removeClass('active');
    elements.eq($(this).index()).addClass('active');
    elementsControl.eq($(this).index()).addClass('active');
    adjustSlideshow($(this).index(), elements, isLeft);
});

$(document).ready(function () {

    // code to process when the menu button is clicked when the page is in the small size
    $('.hierarchy').find('li:has(ul)').addClass('collapsed').children('ul').hide();
    $('.button').click(function () {
        $('.menu').toggleClass('toggled');
        $('.el-chevron-up').toggle();
        $('.el-chevron-down').toggle();
        if ($('.menu').hasClass('toggled'))
            $('nav').css('padding-bottom', '0px');
        else
            $('nav').css('padding-bottom', '10px');
    });

    // code for back to top
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });

    // code to process the pop-out images
    $('body').on('click', '#article-zoom-bg', function(){
        $('.img-container.full').trigger('click');
    });

    $('body').on('click', '.img-container', function(){
        $(this).toggleClass('full');
        if($(this).hasClass('full')){
            var scrollTop = $(window).scrollTop();
            var maxScale = Math.min(($(window).width()-30)/$(this).width(),($(window).height()-30 - $('nav').height())/$(this).height());

            var newHeight = 30 / maxScale;
            var newFontSize = 14 / maxScale;
            var newPadding = 5 / maxScale;

            $('.caption').css('height', newHeight+'px');
            $('.caption').css('bottom', -newHeight+'px');
            $('.caption').css('font-size', newFontSize+'px');
            $('.caption').css('padding', newPadding+'px');

            var centerY = $(this).offset().top - scrollTop + $(this).outerHeight()/2;
            var centerX = $(this).offset().left + $(this).outerWidth()/2;
            $(this).css('transform', 'translate('+($(window).width()/2-centerX)+'px,'+(($(window).height() + $('nav').height())/2-centerY)+'px) scale('+maxScale+')');

            $('#article-zoom-bg').show();
            setTimeout(function(){
                $('#article-zoom-bg').addClass('show');
            }, 1);
        } else {
            $('.caption').css('height', '30px');
            $('.caption').css('bottom', '-30px');
            $('.caption').css('font-size', '14px');
            $('.caption').css('padding', '5px');

            $(this).css('z-index', '98');
            setTimeout(function(){
                $('.img-container').css('z-index', '');
            }, 500);

            $('#article-zoom-bg').removeClass('show').delay(500).hide(1);
            $(this).css('transform', '');
        }
    });
});

$(window).bind("load", function() {
	$('#loader-wrapper').toggleClass('loaded');
});