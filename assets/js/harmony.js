$(document).ready(function () {
  $("#subscriber").validate({
    // initialize the plugin
    rules: {
      name: {
        required: true,
      },
      phone: {
        required: true,
        minlength: 11,
        maxlength: 11,
      },
    },
    messages: {
      name: {
        required: "لطفا نام خود را وارد کنید",
      },
      phone: {
        required: "لطفا شماره تماس خود را وارد کنید",
        minlength: "شماره تماس وارد شده معتبر نیست",
        maxlength: "شماره تماس وارد شده معتبر نیست",
      },
    },
    submitHandler: function () {
      form_submit();
    },
  });
  $("#calculator").validate({
    // initialize the plugin
    rules: {
      price: {
        required: true,
      }
    },
    messages: {
      price: {
        required: "لطفا مبلغ خود را وارد کنید",
      },
     
    },
    submitHandler: function () {
      form_calculator();
    },
  });
  // hover package
  $(".middleBox").hover(
    function () {
      $(this).css("transform", "scale(1.1)");
      $(this).css("transition", "1s");
    },
    function () {
      $(this).css("transform", "scale(1)");
      $(this).css("transition", "1s");
      $(this).removeClass("zoom");
    }
  );
});

(function ($) {
  $.QueryString = (function (a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
      var p = a[i].split("=");
      if (p.length != 2) continue;
      b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
  })(window.location.search.substr(1).split("&"));
})(jQuery);

var utm_source = jQuery.QueryString["utm_source"];
var utm_medium = jQuery.QueryString["utm_medium"];
var utm_campaign = jQuery.QueryString["utm_campaign"];
var utm_term = jQuery.QueryString["utm_term"];
var utm_content = jQuery.QueryString["utm_content"];

if (location.search != "") {
  // query string exists
  sessionStorage.setItem("utm_source", utm_source);
  sessionStorage.setItem("utm_medium", utm_medium);
  sessionStorage.setItem("utm_campaign", utm_campaign);
  sessionStorage.setItem("utm_term", utm_term);
  sessionStorage.setItem("utm_content", utm_content);
}

function form_calculator(){

  let price = parseInt($("form#calculator #price").val());
  $(".secondStep #inputPrice").html(price.toLocaleString());
  let professionalPrice = parseInt((price*67)/100);
  let amateurPrice = parseInt((price*63)/100);


  $(".professionalPrice").html(professionalPrice.toLocaleString());
  $(".amateurPrice").html(amateurPrice.toLocaleString());
  $("#calculate .firstStep").hide();
  $(".secondStep").fadeIn();

}
function form_submit() {
  var formDataSubscriber = {
    name: $("#subscriber #name").val(),
    phone: $("#subscriber #phone").val(),
    utm_source: sessionStorage.getItem("utm_source"),
    utm_campaign: sessionStorage.getItem("utm_medium"),
    utm_medium: sessionStorage.getItem("utm_campaign"),
    utm_term: sessionStorage.getItem("utm_term"),
    utm_content: sessionStorage.getItem("utm_content"),
    referrer: document.referrer,
  };
  $.ajax({
    type: "POST",
    url: "panel/process.php",
    data: formDataSubscriber,
    dataType: "json",
    encode: true,
  }).done(function (data) {
    if (data["success"] == true) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "formSubmission",
      });
      $("#subscriber .error-submit").hide();
      $("#subscriber").hide();
      $(".modal-body .result").html(
        '<div class="success-submit">' + data["message"] + "</div>"
      );
    } else {
      $("#subscriber .error-submit").show();
      $("#subscriber .error-submit").html(data["message"]);
    }
  });
}

$("#subscriber #phone").keyup(function (e) {
  $("#subscriber #phone").val(persianToEnglish($(this).val()));
});

function persianToEnglish(input) {
  var inputstring = input;
  var persian = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"];
  var english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  for (var i = 0; i < 10; i++) {
    var regex = new RegExp(persian[i], "g");
    inputstring = inputstring.toString().replace(regex, english[i]);
  }
  return inputstring;
}


// stickyHeader
jQuery(function ($) {
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 100 && $(this).scrollTop() < 4300) {
      $("header").addClass("stickyHeader");
    } else {
      $("header").removeClass("stickyHeader");
    }
  });
});

//  testimonial carousels
var testimonialSwiper = new Swiper(".testimonialSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  centeredSlidesBounds: true,
  // autoplay: {
  //   delay: 6000,
  // },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

//  testimonial carousels
var levelSwiper = new Swiper(".levelSwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlides: true,
  centeredSlidesBounds: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  }
});
// var elSwiper = $('.testimonialSwiper');

// elSwiper.mouseenter(function () {
//   testimonialSwiper.autoplay.stop();
// });

// elSwiper.mouseleave(function () {
//   testimonialSwiper.autoplay.start();
// });

// timer
function handleTickInit(tick) {
  // uncomment to set labels to different language

  var locale = {
    YEAR_PLURAL: "Jaren",
    YEAR_SINGULAR: "Jaar",
    MONTH_PLURAL: "Maanden",
    MONTH_SINGULAR: "Maand",
    WEEK_PLURAL: "Weken",
    WEEK_SINGULAR: "Week",
    DAY_PLURAL: "روز",
    DAY_SINGULAR: "روز",
    HOUR_PLURAL: "ساعت",
    HOUR_SINGULAR: "ساعت",
    MINUTE_PLURAL: "دقیقه",
    MINUTE_SINGULAR: "دقیقه",
    SECOND_PLURAL: "ثانیه",
    SECOND_SINGULAR: "ثانیه",
    MILLISECOND_PLURAL: "Milliseconden",
    MILLISECOND_SINGULAR: "Milliseconde",
  };

  for (var key in locale) {
    if (!locale.hasOwnProperty(key)) {
      continue;
    }
    tick.setConstant(key, locale[key]);
  }

  // format of due date is ISO8601
  // https://en.wikipedia.org/wiki/ISO_8601

  // '2018-01-31T12:00:00'        to count down to the 31st of January 2018 at 12 o'clock
  // '2019'                       to count down to 2019
  // '2018-01-15T10:00:00+01:00'  to count down to the 15th of January 2018 at 10 o'clock in timezone GMT+1

  // create the countdown counter
  var counter = Tick.count.down("2022-08-06T00:00:00+01:00");

  counter.onupdate = function (value) {
    tick.value = value;
  };

  counter.onended = function () {
    // redirect, uncomment the next line
    // window.location = 'my-location.html'
    // hide counter, uncomment the next line
    // tick.root.style.display = 'none';
    // show message, uncomment the next line
    // document.querySelector('.tick-onended-message').style.display = '';
  };
}

// sidebar
var fixmeTop = $(".sidebar").offset().top; // get initial position of the element
$(window).scroll(function () {
  // assign scroll event listener
  var currentScroll = $(window).scrollTop(); // get current position
  if (currentScroll >= fixmeTop && currentScroll < 8000) {
    // apply position: fixed if you
    $(".sidebar").css({
      // scroll to that element or below it
      position: "fixed",
      top: "70px",
      bottom: "20px",
      width: "430px",
    });
  } else {
    // apply position: static
    $(".sidebar").css({
      // if you scroll above it
      position: "static",
      width: "430px",
      height: "fit-content",
    });
  }
});

// pause video on click btn-close
$(".motion").on("hidden.bs.modal", function () {
  $(".motionVideo video").trigger("pause");
});

// hover for copy right
$(".copyright a").hover(
  function () {
    let logo = $(".copyright .hover-company");
    logo.addClass("active");
  },
  function () {
    let logo = $(".copyright .hover-company");
    logo.removeClass("active");
  }
);

$( ".testimonialSwiper .swiper-slide" ).each(function( index ) {
  console.log( $( this ).data('bg'));
  $( this ).css("background-image", "url(" + $( this ).data('bg') + ")");


});
$('.moviebtn').on('click', function () {
  var videoSrc = $(this).data('video');
  $('.motionVideo video').attr('src', videoSrc);
  $('#testimonialModal').modal('show');

});

$(".level-icon").hover(
  function () {
    let str = this.className;
    let ret = str.split(" ");
    let textToReplace = ret[1];
    let newText = textToReplace.replace("level-", "");
    $('p.' + newText).css("opacity", 1);
  },
  function () {
    $("#level p").css("opacity", 0.5);
  }
);

$('.againBtn').on('click',function(){
    
  $("#calculate .secondStep").hide();
  $("#calculate .firstStep").fadeIn();

});