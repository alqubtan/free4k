const request = require('request')


const search = (query, page, callback) => {
    
    const option = {
        url: `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&page=${encodeURIComponent(page)}&per_page=10`,
        json: true,
        headers: {
            Authorization: '563492ad6f917000010000011c5bce3ad894427681a58d21b4b8e8d4'
        }
        
    } 

    request(option, (error, response) => {

        if (error) {
            callback("unable to connect.", undefined);
            
        } else if (response.body.photos.length === 0) {
            callback("unable to find images.", undefined);
            
        } else {
            callback(undefined, response.body.photos);
        }
       
   })
}



module.exports = search