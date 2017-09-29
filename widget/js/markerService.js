let filter = () => {document.getElementById("mySidenav").style.height = "100%";};
let closeNav = () => document.getElementById("mySidenav").style.height = "0";
let changeView = () => {
    mode = (mode == 'list') ? 'map' : 'list';
    router.navigate(`/${mode}`);
};

function createControl(controlDiv, buttons){
    let container = document.createElement('div');
    container.className = 'buttonContainer';

    controlDiv.appendChild(container);

    buttons.forEach((button) =>{
        let controlButton = document.createElement('div');
        let imageName = (button.name) ? button.name : mode;
        if(imageName === 'changeView'){
            imageName = (mode === 'list') ? 'map' : 'list';
        }

        controlButton.style.display = 'inline-block';
        controlButton.style.padding = button.padding;
        controlButton.innerHTML = `<img src="./images/${imageName}.svg"></img>`;
        if(button.action)
            controlButton.onclick = button.action;
        container.appendChild(controlButton);
    });

    return container;
}

function CenterControl(controlDiv) {
    createControl(controlDiv, [
        {name:'center', action: centerMap, padding: '8px'}
    ]);
}

function FilterControl (controlDiv){
    createControl(controlDiv, [
        {name:'changeView', action: changeView, padding: '12px'},
        {name:'filter', action: filter, padding: '12px'}
    ]);
}