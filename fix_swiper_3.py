import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Swiper config back to 1 and 2
html = html.replace('slidesPerView: 1.2,', 'slidesPerView: 1,')
html = html.replace('slidesPerView: 2.5,', 'slidesPerView: 2,')

# 2. Update .swiper container to have overflow: visible and padding-bottom: 80px
container_pattern = re.compile(r'<div class="swiper mySwiper review-slider"[^>]*>')
# The exact string I expect is: <div class="swiper mySwiper review-slider" style="overflow: hidden; position: relative; width: 100%; max-width: 100%; min-width: 0; padding: 20px 0;">
new_container = '<div class="swiper mySwiper review-slider" style="overflow: visible; position: relative; width: 100%; max-width: 100%; min-width: 0; padding-bottom: 80px; padding-top: 20px;">'
html = container_pattern.sub(new_container, html)

# 3. Replace the absolute positioned arrows with the wrapper + arrows
arrows_pattern = re.compile(
    r'<div class="swiper-button-prev-custom".*?</div>\s*<div class="swiper-button-next-custom".*?</div>',
    re.DOTALL
)

new_arrows_html = """<div class="swiper-nav-wrapper" style="position: absolute; bottom: 0; left: 0; width: 100%; display: flex; justify-content: center; gap: 20px; z-index: 10;">
              <div class="swiper-button-prev-custom" style="position: static; cursor: pointer; display: flex; justify-content: center; align-items: center; width: 44px; height: 44px; background-color: #0022cc; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 0;"><img src="images/slider-left-arrow.svg" loading="lazy" alt="Slider Left Arrow"></div>
              <div class="swiper-button-next-custom" style="position: static; cursor: pointer; display: flex; justify-content: center; align-items: center; width: 44px; height: 44px; background-color: #0022cc; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 0;"><img src="images/slider-right-arrow.svg" loading="lazy" alt="Slider Right Arrow"></div>
            </div>"""

html = arrows_pattern.sub(new_arrows_html, html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
