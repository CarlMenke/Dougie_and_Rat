document.getElementById('cityButton1').addEventListener('mouseover', () =>{
    makeYellow(event);
})
document.getElementById('cityButton2').addEventListener('mouseover', () =>{
    makeYellow(event);
})
document.getElementById('cityButton3').addEventListener('mouseover', () =>{
    makeYellow(event);
})
document.getElementById('cityButton4').addEventListener('mouseover', () =>{
    makeYellow(event);
})
document.getElementById('cityButton5').addEventListener('mouseover', () =>{
    makeYellow(event);
})

document.getElementById('cityButton1').addEventListener('click', () =>{
    displayComplaints(event);
})
document.getElementById('cityButton2').addEventListener('click', () =>{
    displayComplaints(event);
})
document.getElementById('cityButton3').addEventListener('click', () =>{
    displayComplaints(event);
})
document.getElementById('cityButton4').addEventListener('click', () =>{
    displayComplaints(event);
})
document.getElementById('cityButton5').addEventListener('click', () =>{
    displayComplaints(event);
})

const makeYellow = (event) =>{
    event.target.classList.add('makeYellow')
    event.target.addEventListener('mouseout', () => {
        makeBlue(event);
    })
}
const makeBlue = (event) =>{
    event.target.classList.remove('makeYellow')
}

let input = document.getElementById('input')

const displayComplaints = async () =>{
document.getElementById('UI').innerHTML = '';

    let response = await axios.get(`https://data.cityofnewyork.us/resource/erm2-nwe9.json?&borough=${event.target.innerText.toUpperCase()}&agency=NYPD`);

    if(Number(input.value)===0){input.value = 10}
    for(let i = 0; i < Number(input.value); i++){

       let newDivContainer =  document.createElement('div');
       newDivContainer.classList.add('complaint');

       let newDivTitle =  document.createElement('p');
       newDivTitle.classList.add('complaintTitle');
       newDivTitle.innerHTML = `🆘 ${response.data[i+500].complaint_type}`;


       let newDivButton =  document.createElement('button');
       newDivButton.classList.add('complaintButton');
       newDivButton.innerText = 'What Did The Police Do?';
       let policeResponse = response.data[i+500].resolution_description;
       newDivButton.addEventListener('click', () => {showPoliceResponse(policeResponse, event)},{once:true})

       newDivContainer.append(newDivTitle, newDivButton);

       document.getElementById('UI').appendChild(newDivContainer);

    }
}

const showPoliceResponse = (policeResponse, event) =>{
    let policeActionElement = document.createElement('p');

    policeActionElement.innerHTML = policeResponse;

    event.target.parentNode.appendChild(policeActionElement);

    event.target.addEventListener('click', () => {revert(policeResponse,event)})
}

const revert = (policeResponse,event) =>{
    if(event.target.parentNode.children.length === 3){
    event.target.parentNode.children[2].remove(); 
    event.target.addEventListener('click', () => {showPoliceResponse(policeResponse, event)},{once:true});
    }
}