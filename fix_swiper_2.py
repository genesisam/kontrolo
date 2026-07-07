import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# Fix Swiper config to show more cards
html = html.replace('slidesPerView: 1,', 'slidesPerView: 1.2,')
html = html.replace('slidesPerView: 2,', 'slidesPerView: 2.5,')

# Fix arrows classes (remove Webflow classes that are breaking positioning)
# left-arrow and right-arrow classes are the culprits
html = html.replace('class="left-arrow swiper-button-prev-custom"', 'class="swiper-button-prev-custom"')
html = html.replace('class="right-arrow swiper-button-next-custom"', 'class="swiper-button-next-custom"')

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
