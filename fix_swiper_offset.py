import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Add back the style block for review-slide-custom
style_block = """<style>
  .review-slide-custom {
    width: 460px;
  }
  @media (max-width: 767px) {
    .review-slide-custom {
      width: 85vw;
    }
  }
</style>
"""
html = html.replace('<div class="swiper mySwiper review-slider"', style_block + '<div class="swiper mySwiper review-slider"')

# 2. Add the custom class to all swiper slides
html = html.replace('class="swiper-slide"', 'class="swiper-slide review-slide-custom"')

# 3. Update swiper container to 100vw and overflow hidden
container_pattern = re.compile(r'<div class="swiper mySwiper review-slider"[^>]*>')
new_container = '<div class="swiper mySwiper review-slider" style="overflow: hidden; position: relative; width: 100vw; margin-left: calc(-50vw + 50%); max-width: none; min-width: 0; padding: 20px 0;">'
html = container_pattern.sub(new_container, html)

# 4. Update Swiper JS configuration to use slidesOffsetBefore
swiper_script_pattern = re.compile(r'var swiper = new Swiper\(".mySwiper", \{.*?\}\);', re.DOTALL)
new_swiper_script = """function getSwiperOffset() {
        var container = document.querySelector('.w-container');
        if (!container) return 0;
        var offset = (window.innerWidth - container.clientWidth) / 2;
        return offset > 0 ? offset : 0;
      }

      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 'auto',
        spaceBetween: 20,
        loop: true,
        slidesOffsetBefore: getSwiperOffset(),
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
      });

      window.addEventListener('resize', function() {
        var newOffset = getSwiperOffset();
        if (swiper.params.slidesOffsetBefore !== newOffset) {
            swiper.destroy(true, true);
            swiper = new Swiper(".mySwiper", {
                slidesPerView: 'auto',
                spaceBetween: 20,
                loop: true,
                slidesOffsetBefore: newOffset,
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
              });
        }
      });"""
html = swiper_script_pattern.sub(new_swiper_script, html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
