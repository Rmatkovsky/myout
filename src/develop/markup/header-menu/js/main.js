$( document ).ready(function() {

    $('.avatar').on('click', showLogginedMenu);

    function showLogginedMenu() {
        $('.header__nav, .loggined-menu').toggleClass('show');
    }


    $('.header__hamburger').on('click', showMainMenu);

        function showMainMenu() {
            $('.header__nav,.main-menu').toggleClass('show');
        }


        $('.change-chal-list').on('click', function () {
            $('.main-menu__list').toggleClass('disabled');

        })

    // $('.avatar, .loggined-menu').mouseover(function(){
    //     $('.loggined-menu').show();
    // });
    //
    // $('.avatar, .loggined-menu').mouseout(function(){
    //     $('.loggined-menu').hide();
    // })

});

