import re

with open("index.html", "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update the JS block
swiper_script_pattern = re.compile(r'function getSwiperOffset\(\) \{.*\}\);', re.DOTALL)
new_swiper_script = """function getSwiperOffset() {
        var sliderParent = document.querySelector('.review-slider').parentElement;
        if (!sliderParent) return 0;
        return sliderParent.getBoundingClientRect().left;
      }

      function setSlideWidths() {
        var sliderParent = document.querySelector('.review-slider').parentElement;
        if (!sliderParent) return;
        var slideWidth = sliderParent.clientWidth * 0.4885;
        if (window.innerWidth < 768) {
            slideWidth = sliderParent.clientWidth * 0.85;
        }
        var slides = document.querySelectorAll('.review-slide-custom');
        slides.forEach(function(slide) {
          slide.style.width = slideWidth + 'px';
        });
      }

      setSlideWidths();

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
        var oldOffset = swiper.params.slidesOffsetBefore;
        setSlideWidths();
        var newOffset = getSwiperOffset();
        if (oldOffset !== newOffset) {
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

# 2. Remove the fixed CSS width for .review-slide-custom
style_pattern = re.compile(r'<style>\s*\.review-slide-custom.*?</style>\s*', re.DOTALL)
html = style_pattern.sub('', html)

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html)
