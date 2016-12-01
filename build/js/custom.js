$(function() {
	/*click on buttons
    ==================================*/
    $('#js-nav ul li a').on('click', function(e){
        var scrollElem = $($(this).attr('href')).offset().top;
        $(this).addClass('active');
        $('ul, body').animate({
            scrollTop: scrollElem - 100
        }, 6000);
    });

    /*document on scroll
    ===================================*/
    var pageHeaderHeight = $('#js-page-header').height();

    $(document).scroll(function(){
        var documentScroll = $(this).scrollTop();
        var navHeight = $('#js-nav').innerHeight();
        if(documentScroll > pageHeaderHeight){
            $('#js-nav').addClass('fixed');
            $('#js-page-header').css({
                paddingTop: navHeight
            });
        }else{
            $('#js-nav').removeClass('fixed');
            $('#js-page-header').removeAttr('style');
        }
    });
});
