import os
import re

def replace_in_file(filepath, pattern, replacement):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {filepath}")

# 1. Update niche.ts schema
niche_ts_path = "src/sanity/schemaTypes/niche.ts"
old_pain_points_schema = r"\{\s*name:\s*'painPoints',\s*title:\s*'Puntos de Dolor \(Pain Points\)',\s*type:\s*'array',\s*of:\s*\[\{\s*type:\s*'string'\s*\}\],\s*description:\s*'Lista de 3 a 6 dolores del nicho\.'\s*\}"
new_pain_points_schema = """{
      name: 'painPoints',
      title: 'Puntos de Dolor (Pain Points)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'point', title: 'Punto de Dolor', type: 'string' },
            { name: 'icon', title: 'Icono Personalizado (Opcional)', type: 'image', options: { hotspot: true } }
          ]
        },
        { type: 'string' }
      ],
      description: 'Lista de 3 a 6 dolores del nicho.'
    }"""
replace_in_file(niche_ts_path, old_pain_points_schema, new_pain_points_schema)

# 2. Update the 3 [nicho].astro files
astro_files = [
    "src/pages/pms/[nicho].astro",
    "src/pages/erp/[nicho].astro",
    "src/pages/pos/[nicho].astro"
]

old_query_part = r'"heroImageUrl": heroImage.asset->url, clientCount, rating, painPoints,'
new_query_part = r'"heroImageUrl": heroImage.asset->url, clientCount, rating, painPoints[]{ _type == "string" => @, _type != "string" => { point, "iconUrl": icon.asset->url } },'

for file_path in astro_files:
    replace_in_file(file_path, old_query_part, new_query_part)

# 3. Update PainPointsGrid.astro
pain_points_grid_path = "src/components/niches/PainPointsGrid.astro"

old_grid_content = r"""---
interface Props \{
  points: string\[\];
\}
const \{ points \} = Astro\.props;
---
<section class="section">
  <div class="container w-container">
    <div style="text-align: center; margin-bottom: 60px;">
      <h2 class="title-heading">Entendemos tus retos diarios</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat\(auto-fit, minmax\(300px, 1fr\)\); gap: 30px;">
      \{points\.map\(\(point\) => \(
        <div style="background: #fff; border: 1px solid #eaeaea; border-radius: 16px; padding: 30px; text-align: center; box-shadow: 0 4px 10px rgba\(0,0,0,0\.03\);">
          <div style="width: 48px; height: 48px; background: rgba\(255, 60, 60, 0\.1\); color: #ff3c3c; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10\.29 3\.86L1\.82 18a2 2 0 0 0 1\.71 3h16\.94a2 2 0 0 0 1\.71-3L13\.71 3\.86a2 2 0 0 0-3\.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12\.01" y2="17"></line></svg>
          </div>
          <p style="font-size: 16px; font-weight: 500; color: #111;">\{point\}</p>
        </div>
      \)\)\}
    </div>
  </div>
</section>"""

new_grid_content = """---
interface Props {
  points: any[];
}
const { points } = Astro.props;
---
<section class="section">
  <div class="container w-container">
    <div style="text-align: center; margin-bottom: 60px;">
      <h2 class="title-heading">Entendemos tus retos diarios</h2>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
      {points.map((pt) => {
        const isString = typeof pt === 'string';
        const text = isString ? pt : pt.point;
        const iconUrl = isString ? null : pt.iconUrl;

        return (
          <div style="background: #fff; border: 1px solid #eaeaea; border-radius: 16px; padding: 30px; text-align: center; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
            {iconUrl ? (
              <div style="width: 64px; height: 64px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <img src={iconUrl} alt="Pain point icon" style="max-width: 100%; max-height: 100%; object-fit: contain;" />
              </div>
            ) : (
              <div style="width: 48px; height: 48px; background: rgba(255, 60, 60, 0.1); color: #ff3c3c; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              </div>
            )}
            <p style="font-size: 16px; font-weight: 500; color: #111;">{text}</p>
          </div>
        );
      })}
    </div>
  </div>
</section>"""

replace_in_file(pain_points_grid_path, old_grid_content, new_grid_content)

