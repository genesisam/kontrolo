import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add Swiper CSS
if "swiper-bundle.min.css" not in html:
    html = html.replace('</head>', '  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />\n</head>')

# 2. Add Swiper JS and init script before </body>
if "swiper-bundle.min.js" not in html:
    script_tag = """
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
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
      });
    });
  </script>
</body>
"""
    html = html.replace('</body>', script_tag)

# 3. Modify slider HTML structure
html = html.replace('<div data-delay="4000" data-animation="slide" class="review-slider w-slider" data-autoplay="true" data-easing="ease" data-hide-arrows="false" data-disable-swipe="false" data-w-id="58d91a1e-f5c5-7f58-1b4f-b73dbdec3539" data-autoplay-limit="0" data-nav-spacing="3" data-duration="400" data-infinite="true">', '<div class="swiper mySwiper review-slider" style="overflow: hidden; position: relative; padding-bottom: 50px;">')

# Replace mask
html = html.replace('<div class="review-mask w-slider-mask">', '<div class="swiper-wrapper">')

# Replace slides
html = html.replace('<div class="review-slide w-slide">', '<div class="swiper-slide" style="height: auto;">')

# Replace arrows
html = html.replace('<div class="left-arrow w-slider-arrow-left">', '<div class="left-arrow swiper-button-prev-custom" style="position:absolute; bottom:0px; left:calc(50% - 50px); z-index:10; cursor:pointer; display:flex; justify-content:center; align-items:center; width: 44px; height: 44px;">')
html = html.replace('<div class="right-arrow w-slider-arrow-right">', '<div class="right-arrow swiper-button-next-custom" style="position:absolute; bottom:0px; right:calc(50% - 50px); z-index:10; cursor:pointer; display:flex; justify-content:center; align-items:center; width: 44px; height: 44px;">')

# Remove nav dots
html = html.replace('<div class="d-none w-slider-nav w-round w-num"></div>', '')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
