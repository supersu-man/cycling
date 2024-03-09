loadData()

async function loadData(){
    var xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    xObj.open('GET', './cycling.json', true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) {
            //xObj.responseText
            let data = JSON.parse(xObj.responseText)
            let eventList = ''
            data.forEach((event, index) => {
                eventList+=eventTemplate(index, event.heading, event.date, event.description, event.images)
            })
            document.body.innerHTML += eventList
            let script = document.createElement('script')
            script.id = "ID";
            script.src = "https://cdn.jsdelivr.net/npm/nanogallery2@3/dist/jquery.nanogallery2.min.js";
            script.type = "text/javascript";
            document.getElementsByTagName('head')[0].appendChild(script);
        }
    };
    xObj.send(null);
}

let eventTemplate = (index, heading, date, description, images) => {
    let eventImages = ''
    images.forEach(image => {
        eventImages+=`
            <a href="${image}" data-ngThumb="${image}"></a>
        `
    });
    return `
        <div class="fs-4 pt-2">${heading}</div>
        <div>${date}</div>
        <div class="accordion accordion-flush my-2 ${description ? '' : 'visually-hidden'}">
            <div class="accordion-item">
                <div class="accordion-header">
                    <div type="button" class="accordion-button collapsed text-white" data-bs-toggle="collapse" data-bs-target="#collapse${index}">Description</div>
                </div>
                <div id="collapse${index}" class="accordion-collapse collapse text-white">
                    <div class="accordion-body py-2 px-3">${description}</div>
                </div>
            </div>
        </div>
        <div id="nanogallery2" class="pb-2" data-nanogallery2='{ "thumbnailHeight": 200, "thumbnailWidth": "auto", "itemsBaseURL": "/assets/images/", "thumbnailBorderHorizontal": 0, "thumbnailBorderVertical": 0}'>
            ${eventImages}
        </div>
    `
}