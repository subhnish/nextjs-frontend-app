import generateSiteMap from '../../../scripts/generateSiteMap'


export default async function handler(req, res) {
    if(req.method === "POST") {
        if(req.body.token === "voiGf1Xlk#4uVSLnF3h^g") {
            await generateSiteMap()
            res.send({"message: " : "Sitemap succesfully generated"})
        }
        else {
            res.send({"message: " : "Piss off, You are not Authenticated"})
        }
    }
    else {
      res.send({"message: " : "You are not Authenticated"})
    }
}