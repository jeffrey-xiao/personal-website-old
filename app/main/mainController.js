var mainController = function ($scope, Page, Global, $window) {
	$scope.Page = Page;
	$scope.isSmallSize = false;
	var w = angular.element($window);
	w.bind('resize', function () {
		$scope.isSmallSize = $(window).width() >= 750;
		adjustContainers($scope.isSmallSize, Page);
	});
};

mainController.$inject = ['$scope', 'Page', 'Global', '$window'];

angular.module('site').controller('mainController', mainController);

// when the window is resized, adjust the components accordingly
var adjustContainers = function(isSmallSize, Page) {
	var activePage = "#"+Page.getTitle().substring(15).toLowerCase()+"-label";
    if($(window).width() <= 767) {
        $('.caption').css('display', 'none');
        $('.slideshows-section .simple-button').css('display', 'block');

        $("#site-title").hide();
        $("nav a.site-link").css('padding-top', '0px');
        $("nav a.site-link").css('height', 'auto');
        $("nav a.site-link").css('font-size', '15px');

        $(activePage).removeClass('active-large');
        $(activePage).addClass('active-small');

        $('nav').css('padding-top', '10px');
        $('nav a.site-link').css('border-bottom-width', '0px');
        $('nav a.site-link').hover(function() {
            $(this).removeClass("selected");
            $(this).removeClass('special');
        });
        if (!isSmallSize) {
            $('.min-button').show();
            $('.menu').addClass('toggled');
            $('.el-chevron-up').hide();
            $('.el-chevron-down').show();
        }
        $('.back-to-top').css('margin-top', '10px');
        isSmallSize = true;
    } else {
        $('.caption').css('display', 'block');
        $('.slideshows-section .simple-button').css('display', 'none');

        $("#site-title").show();
        $("nav a.site-link").css('padding-top', '13px');
        $("nav a.site-link").css('height', '50px');
        $("nav a.site-link").css('font-size', '16px');

        $(activePage).addClass('active-large');
        $(activePage).removeClass('active-small');

        $('nav').css('padding-bottom', '0px');
        $('nav').css('padding-top', '0px');
        $('nav a.site-link').css('border-bottom-width', '5px');
        $('nav a.site-link').hover(function() {
            $(this).addClass("selected");
            $(this).addClass('special');
        }, function(){
            $(this).removeClass("selected");
        });

        if (isSmallSize) {
            $('.min-button').hide();
            $('.menu').removeClass('toggled');
            $('.el-chevron-up').show();
            $('.el-chevron-down').hide();
        }
        $('.back-to-top').css('margin-top', '0px');
        isSmallSize = false;
    }

    var width = $('.row-centered').width() - 30;
    var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var rowCount = 1;
    if (viewportWidth < 768) {
        width = width;
        rowCount = 1;
    } else if (viewportWidth < 992) {
        width = width / 2;
        rowCount = 2;
    } else {
        width = width / 3;
        rowCount = 3;
    }


    setTimeout(function() {
        $('.slideshow .slideshow-content .slideshow-section').each(function(i, section) {
            $(section).css('height', viewportWidth * 2 / 5+'px');
        });
        $('.slideshow .slideshow-content').each(function(i, section) {
            $(section).css('height', viewportWidth * 2 / 5+'px');
        });
        $('.slideshow').each(function(i, section) {
            $(section).css('height', viewportWidth * 2 / 5+'px');
        });

        $('.card .card-inner > img').each(function(i, img){
            $(img).css("height", width * 3 / 5+'px');
        });
		var projectWidth = $('#project-img-wrapper').width();
		console.log(projectWidth);
		$('#project-img-wrapper').css("height", projectWidth * 4 / 5 + "px");

        var cardDescElements = $('.card-description');
        var maxHeight = [];
        for (var i = 0; i < Math.ceil(cardDescElements.length / rowCount); i++)
            maxHeight.push(0);

        cardDescElements.each(function(i, description) {
            maxHeight[Math.floor(i / rowCount)] = Math.max(maxHeight[Math.floor(i / rowCount)], $(description).height());
        });
        $('.card-description-wrapper').each(function(i, description) {
            $(description).css("height", maxHeight[Math.floor(i / rowCount)] + "px");
        });
    }, 500);

    $('.section-responsive').each(function(i, element) {
        if ($(this).width() >= 400) {
            $(this).children().css('min-width', '0%');
        } else {
            $(this).children().css('min-width', '100%');
        }
    });
}