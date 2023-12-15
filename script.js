let eventTemplate = (index, heading, date, description, images) => {

    let imageList = `
    <div class="col-12 p-1 fs-4">${heading}</div>
    <div class="col-12 p-1">${date}</div>
    <div class="accordion accordion-flush g-0 p-1 ${description ? '' : 'visually-hidden'}">
        <div class="accordion-item bg-black">
            <div class="accordion-header">
                <div type="button" class="accordion-button collapsed px-1 py-2 bg-dark text-white" data-bs-toggle="collapse" data-bs-target="#collapse${index}">Description</div>
            </div>
            <div id="collapse${index}" class="accordion-collapse collapse text-white" >
                <div class="accordion-body p-1">${description}</div>
            </div>
        </div>
    </div>
    `
    images.forEach(image => {
        imageList+=`
            <div class="col-auto p-1">
                <img class="img-fluid" src="assets/images/${image}" />
            </div>
        `
    });

    return `
        <div class="row pt-4">
            ` + 
            imageList
            +
            `
        </div>
    `
}

this.loadJSON((response) => {
    let data = JSON.parse(response)
    let eventList = ''
    data.forEach((event, index) => {
        eventList+=eventTemplate(index, event.heading, event.date, event.description, event.images)
    })
    this.document.body.innerHTML = eventList
})

function loadJSON(callback) {
    var xObj = new XMLHttpRequest();
    xObj.overrideMimeType("application/json");
    xObj.open('GET', './cycling.json', true);
    xObj.onreadystatechange = () => {
        if (xObj.readyState === 4 && xObj.status === 200) callback(xObj.responseText); 
    };
    xObj.send(null);
}
