// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require react
//= require react_ujs
//= require components
//= require_tree .

// to be rendered on listings/id page

// $(function getWalkScore(address, lat, long) {

//   $.ajax({
//     url: '',
//     dataType: '',
//     success:
//   });



// });


// });

$(document).ready(function(){
    $('.navbar-toggle').on('click', function(){
      alert('Yo!')
      // if ($('body').hasClass('nav-open')) {
      //   $('body').removeClass('nav-open');
      // } else {
      //   $('body').addClass('nav-open');
      // }
      if ($('.mobile-nav').hasClass('hide')){
        $('.mobile-nav').removeClass('hide');
      } else {
        $('.mobile-nav').addClass('hide');
      }
    });

});
