import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function updateImages() {
  console.log('Fetching all posts to update with thematic images...')
  const posts = await client.fetch(`*[_type == "post"]`)
  
  if (posts.length === 0) {
    console.log('No posts found.')
    return
  }

  console.log(`Found ${posts.length} posts to update with AI generated images.`)

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    console.log(`\n[${i+1}/${posts.length}] Generating image for post: "${post.title}"...`)
    
    try {
        const prompt = `professional high quality realistic business tech photo representing ${post.title.replace(/[^a-zA-Z0-9 ]/g, '')}`
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1200&height=800&nologo=true&seed=${Math.floor(Math.random()*10000)}`
        
        const response = await fetch(url)
        if (!response.ok) {
           console.error(`Failed to fetch image for ${post.title}`)
           continue;
        }
        
        const arrayBuffer = await response.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        
        console.log(`Uploading thematic image to Sanity...`)
        const asset = await client.assets.upload('image', buffer, {
            filename: `${post.slug?.current || 'post-image'}-thematic.jpg`
        })
        
        console.log(`Patching post with new image...`)
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
        
        // Wait 1 second to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
        console.error(`Failed to update ${post.title}:`, e)
    }
  }
  
  console.log('\nAll posts successfully updated with thematic images.')
}

updateImages().catch(console.error)
