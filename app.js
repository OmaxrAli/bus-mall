'use strict';

let attebmptEl=document.getElementById('attempts');
let mainEl=document.getElementById('main');

let AEl=document.getElementById('A');
let BEl=document.getElementById('B');
let CEl=document.getElementById('C');

let EMG=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg',
'chair.jpg','cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg',
'shark.jpg','sweep.jpg','tautaun.jpg','unicorn.jpg','water.jpg','wine-glass.jpg']
let stuff=[];

let resultEl= document.getElementById('result')

function busMall(name,){
    this.name= name;

    stuff.push(this)
     
}
for (let index = 0; index < EMG.length; index++) {
    new busMall(EMG[index]);
}
