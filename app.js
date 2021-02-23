//Selectores
const contenedorListas = document.querySelector('.table-states')
const parentContainer = document.querySelector('.icon-states');
const deleteButton = document.querySelector('.btns');
//Events Listeners
contenedorListas.addEventListener('mouseover',getElementActivatedEnter);
contenedorListas.addEventListener('mouseout',getElementDeactivated);
contenedorListas.addEventListener('click',saveElementData);
parentContainer.addEventListener('click',deleteState);
document.addEventListener('DOMContentLoaded',getStates);
//Functions
function getElementDeactivated(event) {
    let id = event.target.parentElement;
    let look = event.target.parentElement.id
    if(look != "tit"){
        id.style.background = "#fff";
    }
}
function saveElementData(event) {
    let check = false;
    let id = event.target.parentElement.id
    let state = event.target.parentElement.firstElementChild.nextElementSibling.innerText;
    let TC = event.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText;;
    const stateData = {
        state,
        TC,
        id
    };
    if(localStorage.getItem('stateData') === null){
        let stateDatas = [];
        stateDatas.push(stateData);
        localStorage.setItem('stateData',JSON.stringify(stateDatas));
        createElements(stateData.state,stateData.TC);
    }else{
        let stateDatas = JSON.parse(localStorage.getItem('stateData'));
        let size = stateDatas.length;
        for(let i = 0; i < size;i++){
            if (stateData.state != stateDatas[i].state) {
                check = false;
            }else{
                check = true;
                break;
            }
        }
        if(check == false){
            stateDatas.push(stateData);
            localStorage.setItem('stateData',JSON.stringify(stateDatas));

            createElements(stateData.state,stateData.TC);
        }
    }
}
function getElementActivatedEnter(event) {
    let id = event.target.parentElement.id;
    if(id != null){
        let TC = event.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText;
        if(parseInt(TC) > 10000){
            document.getElementById(id).style.background = '#411212';
        }
        if(parseInt(TC) > 7500 && parseInt(TC) < 10000){
            document.getElementById(id).style.background = '#791B1B';
        }
        if(parseInt(TC) > 6000 && parseInt(TC) < 7500){
            document.getElementById(id).style.background = '9E1D1D';
        }
        if(parseInt(TC) > 4500 && parseInt(TC) < 6000){
            document.getElementById(id).style.background = 'E01E1E';
        }
        if(parseInt(TC) > 3000 && parseInt(TC) < 4500){
            document.getElementById(id).style.background = 'E04D4D';
        }
        if(parseInt(TC) > 2000 && parseInt(TC) < 3000){
            document.getElementById(id).style.background = 'E77878';
        }
        if(parseInt(TC) > 1500 && parseInt(TC) < 2000){
            document.getElementById(id).style.background = 'E69595';
        }
        if(parseInt(TC) > 1000 && parseInt(TC) < 1500){
            document.getElementById(id).style.background = 'E9C1C1';
        }
        if(parseInt(TC) > 500 && parseInt(TC) < 1000){
            document.getElementById(id).style.background = 'EBD1D1';
        }
        if(parseInt(TC) < 499){
            document.getElementById(id).style.background = '#DFD9D9';
        }
    }
}

function createElements(state,TC) {

    const divContainer = document.createElement('div');
    divContainer.classList.add('div-container')
    divContainer.id = state;
    const divContainerTitle = document.createElement('div');
    divContainerTitle.classList.add('div-container-title')
    const titleH3 = document.createElement('h3');
    titleH3.innerText = state;
    divContainerTitle.appendChild(titleH3);
    divContainer.appendChild(divContainerTitle);

    const divContainerData = document.createElement('div');
    const dataP1 = document.createElement('p');
    dataP1.innerText = TC;
    const dataP2 = document.createElement('p');
    dataP2.innerText = 'Casos'
    divContainerData.appendChild(dataP1);
    divContainerData.appendChild(dataP2);
    divContainerData.classList.add('div-container-data');
    let bg = getColor(TC);
    divContainerData.style.background = bg;
    divContainer.appendChild(divContainerData);

    const divContainerButton = document.createElement('div');
    divContainerButton.classList.add('div-container-button')
    const containerButton = document.createElement('button');
    containerButton.type = 'submit';
    containerButton.classList.add('btns');
    containerButton.value = state;
    containerButton.innerText = 'Delete';
    divContainerButton.appendChild(containerButton);
    divContainer.appendChild(divContainerButton);

    parentContainer.appendChild(divContainer);
}

function deleteState(event) {
    let id = event.target.value;
    console.log(id)
    let remu =  document.getElementById(id)
    deleteLocalState(id);
    remu.remove();

}
function deleteLocalState(state){
    let datas = JSON.parse(localStorage.getItem('stateData'));
    for(let i=0; i<datas.length; i++){
        if(datas[i].state == state){
            datas.splice(i,1)
        }
    }
    localStorage.setItem('stateData',JSON.stringify(datas));
}
function getColor(TC) {
    let bg;
    if(parseInt(TC) > 10000){
        bg= '#411212';
    }
    if(parseInt(TC) > 7500 && parseInt(TC) < 10000){
        bg = '#791B1B';
    }
    if(parseInt(TC) > 6000 && parseInt(TC) < 7500){
        bg = '9E1D1D';
    }
    if(parseInt(TC) > 4500 && parseInt(TC) < 6000){
        bg = 'E01E1E';
    }
    if(parseInt(TC) > 3000 && parseInt(TC) < 4500){
        bg = 'E04D4D';
    }
    if(parseInt(TC) > 2000 && parseInt(TC) < 3000){
        bg = 'E77878';
    }
    if(parseInt(TC) > 1500 && parseInt(TC) < 2000){
        bg = 'E69595';
    }
    if(parseInt(TC) > 1000 && parseInt(TC) < 1500){
        bg = 'E9C1C1';
    }
    if(parseInt(TC) > 500 && parseInt(TC) < 1000){
        bg = 'EBD1D1';
    }
    if(parseInt(TC) < 499){
        bg = '#DFD9D9';
    }

    return bg;
}
function getStates() {
    let stateDatas;
    if(localStorage.getItem('stateData') === null){
        stateDatas = [];
    }else{
        stateDatas = JSON.parse(localStorage.getItem('stateData'));
    }
    stateDatas.forEach(function(datas){

        const divContainer = document.createElement('div');
        divContainer.classList.add('div-container')
        divContainer.id = datas.state;
        const divContainerTitle = document.createElement('div');
        divContainerTitle.classList.add('div-container-title')
        const titleH3 = document.createElement('h3');
        titleH3.innerText = datas.state;
        divContainerTitle.appendChild(titleH3);
        divContainer.appendChild(divContainerTitle);
    
        const divContainerData = document.createElement('div');
        const dataP1 = document.createElement('p');
        dataP1.innerText = datas.TC;
        const dataP2 = document.createElement('p');
        dataP2.innerText = 'Casos'
        divContainerData.appendChild(dataP1);
        divContainerData.appendChild(dataP2);
        divContainerData.classList.add('div-container-data');
        let bg = getColor(datas.TC);
        divContainerData.style.background = bg;
        divContainer.appendChild(divContainerData);
    
        const divContainerButton = document.createElement('div');
        divContainerButton.classList.add('div-container-button')
        const containerButton = document.createElement('button');
        containerButton.type = 'submit';
        containerButton.classList.add('btns');
        containerButton.innerText = 'Delete';
        containerButton.value = datas.state;
        divContainerButton.appendChild(containerButton);
        divContainer.appendChild(divContainerButton);
    
        parentContainer.appendChild(divContainer);
    });
}
function getButtonELement(event) {
    let id = event.target.parentElement;
    console.log(id)
}