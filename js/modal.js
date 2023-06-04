function trashcan() {
    let trashbox = document.createElement('div');
    trashbox.setAttribute('class', 'trash__box');
    let trash = document.createElement('i')
    trash.setAttribute('class', 'fa fa-light fa-trash-can')
    trashbox.appendChild(trash);
    return trashbox
}

function moveitem() {
    let moovebox = document.createElement('div');
    moovebox.setAttribute('class', 'moove__box');
    let moove = document.createElement('i')
    moove.setAttribute('class', 'fa fa-light fa-arrows-up-down-left-right')
    moovebox.appendChild(moove);
    return moovebox
}

async function deleteWork(id, modalId) {
	// Envoi des données du formulaire
	const f = await fetch(`http://localhost:5678/api/works/${id}`, {
		method:'POST',
		headers: {
			Accept: "application/json",
			"Content-type":"application/json",
            'Authorization': `Bearer ${T}`
		}
	})
    if (f.ok) {
        document.getElementById(`${modalId}`).remove()
        document.getElementById(`${id}`).remove()
    }
};

function modalHomeGallery(){
    let box = document.querySelector('.modal__gallery__box')
    document.querySelectorAll('.gallery figure').forEach(a => {
        let copyFigure = a.cloneNode(true);
        copyFigure.setAttribute('id', `modal_${a.getAttribute('id')}`)
        copyFigure.appendChild(trashcan()).addEventListener('click', (e) => {
            e.stopPropagation()
            let actualModalImage = e.currentTarget.parentElement.getAttribute('id');
            let imageId = actualModalImage.split('_')[1]
            deleteWork(imageId, actualModalImage)
        })
        copyFigure.querySelector('figcaption').innerText = 'Editer';
        box.appendChild(copyFigure)
    })
    document.getElementById('modal_1').appendChild(moveitem())
}


function removeWhenClose(){
    let modal_gallery = document.querySelector('.modal__gallery__box');
    while (modal_gallery.firstChild){
        modal_gallery.removeChild(modal_gallery.lastChild)
    }}
