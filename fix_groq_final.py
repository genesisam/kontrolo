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

old_query = r'"heroImageUrl": heroImage\.asset->url, clientCount, rating, painPoints\[\]\{ type\(@\) == "string" => \{ "isString": true, "value": @ \}, type\(@\) != "string" => \{ "isString": false, point, "iconUrl": icon\.asset->url \} \},'
new_query = r'"heroImageUrl": heroImage.asset->url, clientCount, rating, painPoints, "painPointsIcons": painPoints[].icon.asset->url,'

for fpath in astro_files:
    replace_in_file(fpath, old_query, new_query)
    
    old_component_call = r'<PainPointsGrid points=\{niche\.painPoints\} />'
    new_component_call = r'<PainPointsGrid points={niche.painPoints} icons={niche.painPointsIcons} />'
    replace_in_file(fpath, old_component_call, new_component_call)

# Update PainPointsGrid.astro
pain_points_grid_path = "src/components/niches/PainPointsGrid.astro"

old_grid_content = r"""---
interface Props \{
  points: any\[\];
\}
const \{ points \} = Astro\.props;
---
<section class="section">
  <div class="container w-container">
    <div style="text-align: center; margin-bottom: 60px;">
      <h2 class="title-heading">Entendemos tus retos diarios</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(300px, 1fr\)\); gap: 30px;">
      \{points\.map\(\(pt\) => \{
        if \(!pt\) return null;
        const isString = pt\.isString \|\| typeof pt === 'string';
        const text = isString \? \(pt\.value \|\| pt\) : pt\.point;
        const iconUrl = isString \? null : pt\.iconUrl;"""

new_grid_content = """---
interface Props {
  points: any[];
  icons?: (string | null)[];
}
const { points, icons = [] } = Astro.props;
---
<section class="section">
  <div class="container w-container">
    <div style="text-align: center; margin-bottom: 60px;">
      <h2 class="title-heading">Entendemos tus retos diarios</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
      {points.map((pt, index) => {
        if (!pt) return null;
        const isString = typeof pt === 'string';
        const text = isString ? pt : pt.point;
        const iconUrl = icons[index] || null;"""

replace_in_file(pain_points_grid_path, old_grid_content, new_grid_content)
