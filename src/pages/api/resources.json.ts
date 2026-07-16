import { sanityClient } from "sanity:client";

export async function GET() {
  const resources = await sanityClient.fetch(`*[_type == "resource"]{
    title,
    "slug": slug.current,
    description,
    "category": category->title,
    "tags": tags[]->title,
    resourceType
  }`);

  return new Response(
    JSON.stringify(resources),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}
