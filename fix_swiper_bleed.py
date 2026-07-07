import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update swiper container styles to width: 100% and overflow: visible
container_pattern = re.compile(r'<div class="swiper mySwiper review-slider" style="overflow: hidden; position: relative; width: calc\(50% \+ 50vw\); max-width: none; min-width: 0; padding: 20px 0;">')
new_container = '<div class="swiper mySwiper review-slider" style="overflow: visible; position: relative; width: 100%; max-width: 100%; min-width: 0; padding: 20px 0;">'
html = container_pattern.sub(new_container, html)

# 2. Add loopedSlides to Swiper script to ensure we have enough clones for the visible overflow
swiper_script_pattern = re.compile(r'var swiper = new Swiper\(".mySwiper", \{.*?\}\);', re.DOTALL)
new_swiper_script = """var swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        loopedSlides: 6, // Ensure enough clones for overflow on both sides
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
            spaceBetween: 30,
          },
        }
      });"""
html = swiper_script_pattern.sub(new_swiper_script, html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
