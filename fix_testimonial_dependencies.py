import re

# 1. Read index.astro and remove Swiper dependencies
with open('src/pages/index.astro', 'r', encoding='utf-8') as f:
    index_content = f.read()

index_content = re.sub(r'<link[^>]*swiper-bundle\.min\.css[^>]*>\s*', '', index_content)
index_content = re.sub(r'<script[^>]*swiper-bundle\.min\.js[^>]*></script>\s*', '', index_content)

with open('src/pages/index.astro', 'w', encoding='utf-8') as f:
    f.write(index_content)

# 2. Add dependencies to Testimonial.astro
with open('src/components/Testimonial.astro', 'r', encoding='utf-8') as f:
    test_content = f.read()

deps = """<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
<script is:inline src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
"""

# Append dependencies before the inline initialization script
# Actually, the initialization script is at the bottom of Testimonial.astro. Let's prepend to the file.
# Since it's a component, Astro hoists CSS/JS nicely but inline scripts are rendered in-place.
# We'll just put the deps at the very top.
test_content = deps + test_content

with open('src/components/Testimonial.astro', 'w', encoding='utf-8') as f:
    f.write(test_content)

print("Moved Swiper dependencies into Testimonial component for perfect encapsulation.")
