const form = document.querySelector('form');
const input = document.querySelector('.search-input');
const container = document.querySelector('main');
const statusSpan = document.querySelector('.status')


const status = {}

form.addEventListener('submit', (e) => {

    e.preventDefault();
    container.innerHTML = '';
    status.query = input.value
    status.page = 1  
    statusSpan.textContent = "loading..."
    fetchData(status.query, status.page)
    

})



const fetchData = (query, page) => {

     fetch(`http://localhost:3000/api?key=${query}&page=${page}`).then((response) => {
        
        
        response.json()
        
        .then((result) => {


           try {
                statusSpan.textContent = '';
                renderPhotos(result);
                

           } catch (e) {
              
                statusSpan.textContent = result.error;
           }

         })


    })
    
}







// Reuseable Functions

// 1: 

const renderPhotos = ({photos}) => {

    photos.forEach(renderPhoto)     

}


// 2:

const renderPhoto = (photo) => {

    const markup = `<div>
    <a href="${photo.src.original}" target="_blank"><img src="${photo.src.landscape}" style="max-width:100%;
    height:auto;"></a></div>`;

    container.insertAdjacentHTML("beforeend", markup);
    
}
        

// auto Fetching Data

(() => {
    const options = {
        threshold : 0.25,
        root: null
        
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0 && status.query !== undefined) {
                status.page += 1
                fetchData(status.query, status.page)
            }
        })
    }, options)

    observer.observe(document.querySelector('footer'))

})();



