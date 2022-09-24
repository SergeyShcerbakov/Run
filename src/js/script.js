// Modals
$("[data-modal=modal-consultation]").on("click", function () {
  $(".overlay, #modal-consultation").fadeIn();
});

// Slider
$(".slider-wrapper").slick({
  /* dots: false,
  arrows: true, */
  /* slidesToShow: 1,
  speed: 1000,
  autoplay: true, */
  nextArrow:
    "<button type='button' class='slick-next'><img src='img/icon/right-arrow.png' /></button>",
  prevArrow:
    "<button type='button' class='slick-prev'><img src='img/icon/left-arrow.png' /></button>",
  responsive: [
    {
      breakpoint: 900,
      settings: {
        dots: true,
        arrows: false,
      },
    },
  ],
});

//

//tabs
let btn = document.querySelectorAll("test");

btn.forEach(function (item) {
  item.addEventListener("mousemove", function () {
    this.style = "background: red;";
  });
});
