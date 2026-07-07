import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Swiper config
swiper_script_pattern = re.compile(r'var swiper = new Swiper\(".mySwiper", \{.*?\}\);', re.DOTALL)
new_swiper_script = """var swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
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
            spaceBetween: 30,
          },
        }
      });"""
html = swiper_script_pattern.sub(new_swiper_script, html)

# 2. Add custom styles for the slides right before the swiper container
style_block = """<style>
  .review-slide-custom {
    width: 450px;
  }
  @media (max-width: 767px) {
    .review-slide-custom {
      width: 85vw;
    }
  }
</style>
"""
# insert before the swiper container
html = html.replace('<div class="swiper mySwiper review-slider"', style_block + '<div class="swiper mySwiper review-slider"')

# 3. Update swiper container styles
container_pattern = re.compile(r'<div class="swiper mySwiper review-slider"[^>]*>')
new_container = '<div class="swiper mySwiper review-slider" style="overflow: hidden; position: relative; width: calc(50% + 50vw); max-width: none; min-width: 0; padding: 20px 0;">'
html = container_pattern.sub(new_container, html)

# 4. Add the custom class to all swiper slides
html = html.replace('class="swiper-slide"', 'class="swiper-slide review-slide-custom"')

# 5. Move the navigation wrapper outside the swiper container
# The navigation wrapper is currently inside the swiper container, at the very end.
nav_wrapper_pattern = re.compile(
    r'<div class="swiper-nav-wrapper" style="position: absolute; bottom: 0; left: 0; width: 100%; display: flex; justify-content: center; gap: 20px; z-index: 10;">(.*?)</div>\s*</div>\s*</div>\s*</div>',
    re.DOTALL
)

# Replace with the wrapper moved outside the swiper container (which ends at the first </div> after the wrapper)
new_nav_wrapper = r"""
            </div>
          </div>
          <div class="swiper-nav-wrapper" style="display: flex; justify-content: center; gap: 20px; width: 100%; margin-top: 30px; position: relative; z-index: 10;">\1</div>
        </div>
      </div>"""

html = nav_wrapper_pattern.sub(new_nav_wrapper, html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
