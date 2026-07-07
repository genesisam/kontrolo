import re

with open('src/pages/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace <script> with <script is:inline>
# We must be careful not to replace <script is:inline> if it already exists
content = re.sub(r'<script(?![^>]*is:inline)', r'<script is:inline', content)

with open('src/pages/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Added is:inline to all script tags")
