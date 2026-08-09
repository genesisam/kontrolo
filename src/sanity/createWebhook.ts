import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function createHook() {
    const token = client.config().token
    const projectId = client.config().projectId
    const dataset = client.config().dataset || 'production'
    
    console.log(`Creating webhook for project ${projectId}, dataset ${dataset}...`)

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(`https://api.sanity.io/vX/hooks/projects/${projectId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            name: "Vercel Deploy",
            description: "Triggers Vercel rebuild on content changes",
            url: "https://api.vercel.com/v1/integrations/deploy/prj_EaZljdyBHMAaP6jyqo1ILSVnVSuY/7ZnxO8bJFH",
            dataset: dataset,
            httpMethod: "POST",
            // For Sanity API vX hooks endpoint, the payload structure is:
            // "action": "create,update,delete",
            // "isPublished": true, etc.
        })
    })
    // Actually the standard API for webhooks is not fully documented publicly, but client.request with /hooks works.
    
    // Let's use the CLI's request to be safe:
    try {
        const res = await client.request({
            uri: `/hooks`,
            method: 'POST',
            body: {
                name: "Vercel Deploy",
                url: "https://api.vercel.com/v1/integrations/deploy/prj_EaZljdyBHMAaP6jyqo1ILSVnVSuY/7ZnxO8bJFH",
                dataset: dataset
            }
        })
        console.log("Webhook created successfully!", res)
    } catch (e) {
        console.error("Failed to create webhook via client.request", e)
    }
}

createHook().catch(console.error)
