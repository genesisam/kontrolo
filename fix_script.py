import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Replace the broken script block
broken_script = """  <script>
    setTimeout(function() {
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },
      }, 100);
    }, 100);
  </script>"""

fixed_script = """  <script>
    setTimeout(function() {
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }
      });
    }, 100);
  </script>"""

html = html.replace(broken_script, fixed_script)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
