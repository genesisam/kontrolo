import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function migrate() {
  console.log('Fetching niches...')
  const niches = await client.fetch(`*[_type == "niche"]`)
  
  for (const niche of niches) {
    let changed = false
    
    const newPainPoints = niche.painPoints?.map((pt: any) => {
      // Si tiene el campo antiguo 'point', lo migramos
      if (pt.point) {
        changed = true;
        return {
          ...pt,
          title: pt.title || pt.point,
          // Eliminamos point para limpiar
          point: undefined,
          // Si el icono es un objeto (referencia de imagen antigua), lo cambiamos a emoji por defecto
          icon: typeof pt.icon === 'string' ? pt.icon : '⚠️'
        }
      }
      return pt
    })

    const newFeatures = niche.features?.map((f: any) => {
      // Si tiene los campos antiguos, los migramos
      if (f.featureTitle || f.featureDescription) {
        changed = true;
        return {
          ...f,
          title: f.title || f.featureTitle,
          description: f.description || f.featureDescription,
          featureTitle: undefined,
          featureDescription: undefined
        }
      }
      return f
    })

    if (changed) {
      console.log(`Migrating data for niche: ${niche.industryName}...`)
      try {
        await client.patch(niche._id)
          .set({ painPoints: newPainPoints, features: newFeatures })
          // Remove old fields explicitly
          .unset(['painPoints[].point', 'features[].featureTitle', 'features[].featureDescription'])
          .commit()
        console.log(`Successfully migrated: ${niche.industryName}`)
      } catch (e) {
        console.error(`Error migrating ${niche.industryName}:`, e)
      }
    } else {
      console.log(`Niche ${niche.industryName} is already up to date.`)
    }
  }
  console.log('Niches migration completed.')
}

migrate().catch(console.error)
