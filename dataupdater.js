import fs from 'fs/promises'

setInterval(async () => {
    const data = await fs.readFile('clients.json')
    const json = JSON.parse(data.toString())
    const index = Math.floor(Math.random() * json.clients.length)
   json.apps[index].status = Math.random() > 0.5 == true
   fs.writeFile('apps.json', JSON.stringify(json))
}, 3000)

//launch via: node dataupdater.js