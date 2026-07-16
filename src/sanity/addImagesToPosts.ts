import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function addImages() {
  console.log('Fetching posts without images...')
  const posts = await client.fetch(`*[_type == "post" && !defined(mainImage)]`)
  
  if (posts.length === 0) {
    console.log('All posts already have an image.')
    return
  }

  console.log(`Found ${posts.length} posts to update.`)

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    console.log(`[${i+1}/${posts.length}] Adding image to post: "${post.title}"...`)
    
    try {
        // Obtenemos una imagen aleatoria. Usamos el _id del post como semilla para que sea "fija" por post
        // Utilizamos picsum photos que provee placeholders de alta calidad
        const response = await fetch(`https://picsum.photos/seed/${post._id}/1200/800`)
        if (!response.ok) {
           console.error(`Failed to fetch image for ${post.title}`)
           continue;
        }
        
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        
        console.log(`Uploading image to Sanity...`)
        const asset = await client.assets.upload('image', buffer, {
            filename: `${post.slug?.current || 'post-image'}.jpg`
        })
        
        console.log(`Patching post...`)
        await client.patch(post._id)
            .set({ 
                mainImage: {
                    _type: 'image',
                    asset: {
                        _type: "reference",
                        _ref: asset._id
                    }
                }
            })
            .commit()
            
        console.log(`Successfully updated post: ${post.title}`)
        
        // Esperamos 1 segundo para no saturar la API
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
        console.error(`Failed to update ${post.title}:`, e)
    }
  }
  
  console.log('All posts updated with images.')
}

addImages().catch(console.error)
