'use strict';

let attebmptEl=document.getElementById('attempts');
let mainEl=document.getElementById('main');

let AEl=document.getElementById('A');
let BEl=document.getElementById('B');
let CEl=document.getElementById('C');
let resultEl= document.getElementById('result')
let ulEl=document.getElementById('result');
let ButEl =document.getElementById('button');

let EMG=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg',
'chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg',
'shark.jpg','sweep.png','tauntaun.jpg','unicorn.jpg','water-can.jpg','wine-glass.jpg']
let stuff = [];
let SNames=[];
let Vvotes=[];
let Vview=[];

let maxAttempts = 25;
let attempt = 1;
let storage=[];


function busMall(name){
    this.Stuffname= name.split('.')[0];
    this.Stuffex=name.split('.')[1];
    this.StuffImg= `./images/${this.Stuffname}.${this.Stuffex}`;
    this.votes=0;
    this.views=0;
    stuff.push(this);
    SNames.push(this.Stuffname);
}

for (let i = 0; i < EMG.length; i++) {
    new busMall(EMG[i]);
}


function getRandom(){
   return  Math.floor( Math.random() * stuff.length);
}


let Aindex;
let Bindex;
let Cindex;

let notA;
let notB;
let notC;
function RenderImg(){
    Aindex =getRandom();
    Bindex =getRandom();
    Cindex =getRandom();

   while (Aindex === Bindex|| Aindex===Cindex|| Bindex=== Cindex
    || notA=== Aindex||notA=== Bindex||notA=== Cindex||
    notB=== Aindex||notB=== Bindex||notB=== Cindex||
    notC=== Aindex||notC=== Bindex||notC=== Cindex) {

    Aindex = getRandom();
    Bindex = getRandom();
    Cindex = getRandom();
    
}  
  AEl.setAttribute('src', stuff[Aindex].StuffImg);
  BEl.setAttribute('src', stuff[Bindex].StuffImg);
  CEl.setAttribute('src', stuff[Cindex].StuffImg);

  stuff[Aindex].views++;
  stuff[Cindex].views++;
  stuff[Bindex].views++;

    notA= Aindex;
    notB= Bindex;
    notC= Cindex;

}
RenderImg();

AEl.addEventListener('click', clickHandler);
BEl.addEventListener('click', clickHandler);
CEl.addEventListener('click', clickHandler);

let clicked= false;
ButEl.onclick = function(){
    
    if( clicked== false){
        for (let i = 0; i < stuff.length; i++) {
            let liEl = document.createElement('li');
            result.appendChild(liEl);
            liEl.textContent = `${stuff[i].Stuffname} has ${stuff[i].votes} votes and  ${stuff[i].views} views.`;
             Vview.push(stuff[i].views);
             Vvotes.push(stuff[i].votes);
        }
        clicked = true;
        savetoLS();
        chartRender();
    }
    }
function clickHandler(event) {
    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;
        if (clickedImage === 'A') {
            stuff[Aindex].votes++;
        } else if (clickedImage === 'B') {
            stuff[Bindex].votes++;
        }
        else if(clickedImage === 'C'){
            stuff[Cindex].votes++;

        }
        RenderImg();
        console.log(stuff);
        attempt++;
    } else if(maxAttempts==25){
       
        
        AEl.removeEventListener('click', clickHandler);
        BEl.removeEventListener('click', clickHandler);
        CEl.removeEventListener('click', clickHandler);
        
    }
    
}



    
    function chartRender(){
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: SNames,
        datasets: [{
            label: '# of Votes',
            data: Vvotes,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
               
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
               
            ],
            borderWidth: 1
        }, {
            label: '# of Views',
            data: Vview,
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
               
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',

            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}

function savetoLS(){
    let localS=JSON.stringify(Vvotes);
    localStorage.setItem('Votes',localS);
    
}
