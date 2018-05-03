$(document).ready(function() {
  // Phone mask
  mask_validation();
  $('.phone_us').mask('(000) 000-0000');
  // End
  $('[data-toggle="datepicker"]').datepicker({
    autoShow: true,
  });
});

// Slide 1
function slide1() {
  // alert('Slide 1');
  var zipcode = $('#zip_code_from').val();
  var regex = new RegExp(/^\d{5}$/);
  if(zipcode.match(regex)) {
    history_slide();
    // $('.taxi-road-graphics .tr-grphics .tr-grphics-bg-img').addClass('graphics-position--1000');
  }
  else {
    $('#zip_code_from').addClass('error').focus();
  }
}
function slide1_input() {
  $('#zip_code_from').removeClass('error');
}
// End

// Slide 2
function slide2_input() {
  $('#zip_code_to').removeClass('error');
}
// End

// Slide 3
function slide3() {
  // $('.taxi-road-graphics .tr-grphics .tr-grphics-bg-img').addClass('graphics-position--3000');
}
// End

// Slide 5
function slide5_active_btn() {

}
// End

// Slide 8
function slide8_input() {
  $('#email_input').removeClass('error');
}
// End

// Slide 9
function slide9_input() {
  $('#name_input').removeClass('error');
}
// End

// Slide 10
function slide10_input() {
  $('#number_input').removeClass('error');
}
// End


/**
 * Progress bar
 */
function move() {
  var elem = document.getElementById("myBar");
  var p_val = document.getElementById("progress-value");
  var width = 0;

  var id = setInterval(interval_progress, 35);
  function interval_progress() {
    if (width >= 33) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width * 1 + '%';
    }
  }

  setTimeout(function() {
    $('.progress-steps ul li:nth-child(2) .completed-icon .step-done').show();
    $('.progress-steps ul li:nth-child(2) .completed-icon .step-loader').hide();
    var id2 = setInterval(interval_progress2, 35);
    function interval_progress2() {
      if (width >= 66) {
        clearInterval(id2);
      } else {
        width++;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
      }
    }
  }, 3000);
  setTimeout(function() {
    $('.progress-steps ul li:nth-child(3) .completed-icon .step-done').show();
    $('.progress-steps ul li:nth-child(3) .completed-icon .step-loader').hide();
    var id3 = setInterval(interval_progress3, 35);
    function interval_progress3() {
      if (width >= 100) {
        clearInterval(id3);
      } else {
        width++;
        elem.style.width = width + '%';
        elem.innerHTML = width * 1 + '%';
      }
    }
  }, 5600);

  setTimeout(function() {
    $('.progress-steps ul li:nth-child(4) .completed-icon .step-done').show();
    $('.progress-steps ul li:nth-child(4) .completed-icon .step-loader').hide();
  }, 8000);

  setTimeout(function() {
    $('.slide6').hide();
    $('.slide7').show();
  }, 8800);

  setTimeout(function() {
    $('.slide7').hide();
    $('#movers-found-slide7').trigger('click');
  }, 10000);
}
