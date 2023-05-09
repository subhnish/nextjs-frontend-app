import generateSiteMap from "../../scripts/generateSiteMap"

export default async function sitemap(req, res) {
// if(req.method === "POST") {
await generateSiteMap()
res.end(JSON.stringify({message: "Successfully Generated Sitemap"}))
// }
//  else {
//      res.end(JSON.stringify({message: "Piss off, You are not authenticated"}))
//  }
}