import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. We will find the arrows and replace their inline styles
# Left arrow
old_left_arrow_pattern = re.compile(r'<div class="left-arrow swiper-button-prev-custom" style="[^"]*">')
new_left_arrow = '<div class="left-arrow swiper-button-prev-custom" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); z-index: 10; cursor: pointer; display: flex; justify-content: center; align-items: center; width: 44px; height: 44px; background-color: #0022cc; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">'
html = old_left_arrow_pattern.sub(new_left_arrow, html)

# Right arrow
old_right_arrow_pattern = re.compile(r'<div class="right-arrow swiper-button-next-custom" style="[^"]*">')
new_right_arrow = '<div class="right-arrow swiper-button-next-custom" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); z-index: 10; cursor: pointer; display: flex; justify-content: center; align-items: center; width: 44px; height: 44px; background-color: #0022cc; border-radius: 50%; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">'
html = old_right_arrow_pattern.sub(new_right_arrow, html)

# 2. Make sure padding-bottom is removed from .swiper since arrows are not at the bottom anymore
swiper_container_pattern = re.compile(r'<div class="swiper mySwiper review-slider" style="[^"]*">')
new_swiper_container = '<div class="swiper mySwiper review-slider" style="overflow: hidden; position: relative; width: 100%; max-width: 100%; min-width: 0; padding: 20px 0;">'
html = swiper_container_pattern.sub(new_swiper_container, html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
