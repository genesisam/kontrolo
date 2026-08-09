import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function migrateFaqs() {
  console.log('Fetching niches to migrate FAQs...')
  const niches = await client.fetch(`*[_type == "niche"]`)
  
  for (const niche of niches) {
    if (!niche.faqs || !Array.isArray(niche.faqs)) continue;
    
    let changed = false
    
    const newFaqs = niche.faqs.map((faq: any) => {
      if (typeof faq.answer === 'string') {
        changed = true;
        return {
          ...faq,
          answer: [
            {
              _key: Math.random().toString(36).substring(2, 10),
              _type: 'block',
              children: [
                {
                  _key: Math.random().toString(36).substring(2, 10),
                  _type: 'span',
                  text: faq.answer,
                  marks: []
                }
              ],
              markDefs: [],
              style: 'normal'
            }
          ]
        }
      }
      return faq
    })

    if (changed) {
      console.log(`Migrating FAQs for niche: ${niche.industryName}...`)
      try {
        await client.patch(niche._id)
          .set({ faqs: newFaqs })
          .commit()
        console.log(`Successfully migrated FAQs: ${niche.industryName}`)
      } catch (e) {
        console.error(`Error migrating FAQs ${niche.industryName}:`, e)
      }
    }
  }
  console.log('FAQ migration completed.')
}

migrateFaqs().catch(console.error)
