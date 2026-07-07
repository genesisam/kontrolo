import os

with open('src/pages/index.astro', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('<header></header>', '<Header />')
content = content.replace('<footer></footer>', '<Footer />')

with open('src/pages/index.astro', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed component tags in index.astro")
