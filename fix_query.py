import os
import re

def replace_in_file(filepath, pattern, replacement):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

astro_files = [
    "src/pages/pms/[nicho].astro",
    "src/pages/erp/[nicho].astro",
    "src/pages/pos/[nicho].astro"
]

old_query_part = r'"heroImageUrl": heroImage\.asset->url, clientCount, rating, painPoints\[\]\{ _type == "string" => @, _type != "string" => \{ point, "iconUrl": icon\.asset->url \} \},'
new_query_part = r'"heroImageUrl": heroImage.asset->url, clientCount, rating, painPoints[]{ type(@) == "string" => { "isString": true, "value": @ }, type(@) != "string" => { "isString": false, point, "iconUrl": icon.asset->url } },'

for file_path in astro_files:
    replace_in_file(file_path, old_query_part, new_query_part)

# Update PainPointsGrid.astro
pain_points_grid_path = "src/components/niches/PainPointsGrid.astro"

old_grid_content = r"""      \{points\.map\(\(pt\) => \{
        const isString = typeof pt === 'string';
        const text = isString \? pt : pt\.point;
        const iconUrl = isString \? null : pt\.iconUrl;"""

new_grid_content = """      {points.map((pt) => {
        if (!pt) return null;
        const isString = pt.isString || typeof pt === 'string';
        const text = isString ? (pt.value || pt) : pt.point;
        const iconUrl = isString ? null : pt.iconUrl;"""

replace_in_file(pain_points_grid_path, old_grid_content, new_grid_content)
