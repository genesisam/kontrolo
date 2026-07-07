import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Remove the custom <style> block
style_pattern = re.compile(r'<style>\s*\.review-slide-custom.*?</style>\s*', re.DOTALL)
html = style_pattern.sub('', html)

# 2. Remove the 'review-slide-custom' class from all slides
html = html.replace(' review-slide-custom', '')

# 3. Revert .swiper container to width: 100% and overflow: visible
container_pattern = re.compile(r'<div class="swiper mySwiper review-slider"[^>]*>')
new_container = '<div class="swiper mySwiper review-slider" style="overflow: visible; position: relative; width: 100%; max-width: 100%; min-width: 0; padding: 20px 0;">'
html = container_pattern.sub(new_container, html)

# 4. Update Swiper JS configuration to accurately mimic the Webflow design
swiper_script_pattern = re.compile(r'var swiper = new Swiper\(".mySwiper", \{.*?\}\);', re.DOTALL)
new_swiper_script = """var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1.1,
        spaceBetween: 20,
        loop: true,
        loopAdditionalSlides: 4,
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
            slidesPerView: 2.047, // This matches exactly 48.85% width from original design!
            spaceBetween: 30,
          },
        }
      });"""
html = swiper_script_pattern.sub(new_swiper_script, html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
