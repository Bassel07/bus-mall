'use strict';

let attemptsEl = document.getElementById('attempts');
let containerEl = document.getElementById('container');

let img1El = document.getElementById('img1');
let img2El = document.getElementById('img2');
let img3El = document.getElementById('img3');

let ulEl = document.getElementById('results')


let Products = [];
let attempt = 0;
let maxAttempts = 25;

let productnamesonly = [];

let votes = [];
let views = [];



function Pimgs(productname){
    this.productname = productname.split('.')[0];
    this.imag = 'img/' + productname;
    this.votes = 0;
    this.views = 0;
    productnamesonly.push(this.productname);
    Products.push(this);
   
    
}


let productsImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

for (let i = 0; i < productsImages.length; i++) {
    new Pimgs(productsImages[i]);
  
  }

  function randIndex() {

    return Math.floor(Math.random() * Products.length);
  
  }

  let leftIndex;
  let middleIndex;
  let rightIndex;

  function renderRandomImg() {

    leftIndex = randIndex();//0 cruisin-goat.jpg
    middleIndex = randIndex();
    rightIndex = randIndex();
    while (leftIndex === rightIndex || middleIndex === rightIndex || middleIndex === leftIndex)  {
        leftIndex = randIndex();
        middleIndex = randIndex();
        rightIndex = randIndex();
    }

    img1El.setAttribute('src', Products[leftIndex].imag);
    img2El.setAttribute('src', Products[middleIndex].imag);
    img3El.setAttribute('src', Products[rightIndex].imag);

    img1El.setAttribute('alt', Products[leftIndex].productname);
    img2El.setAttribute('alt', Products[middleIndex].productname);
    img3El.setAttribute('alt', Products[rightIndex].productname);

    img1El.setAttribute('title', Products[leftIndex].productname);
    img2El.setAttribute('title', Products[middleIndex].productname);
    img3El.setAttribute('title', Products[rightIndex].productname);

    Products[leftIndex].views++;
    Products[middleIndex].views++;
    Products[rightIndex].views++;


}

renderRandomImg();


img1El.addEventListener('click', handelClicks);
img2El.addEventListener('click', handelClicks);
img3El.addEventListener('click', handelClicks);



function handelClicks(event) {
  attempt++;
  let votedImg = event.target.id;
  
  if (attempt <= maxAttempts) {
                
      if (event.target.id === 'img1') {
        Products[leftIndex].votes++;
      }
      else if (event.target.id === 'img2') {
            
        Products[middleIndex].votes++;
      }
     else if (event.target.id === 'img3') {
      Products[rightIndex].votes++;
    }  

     renderRandomImg()
    console.log(votedImg)
 
  } else { 
    let ulEl =document.getElementById('results')

    let buttonEl = document.getElementById('button')
    buttonEl.addEventListener('click',analysisresults)
    function analysisresults(events){
    
    
    for (let i=0;i<Products.length;i++){
      let liEl = document.createElement('li');
      liEl.textContent = `${Products[i].productname} has ${Products[i].votes} votes and ${Products[i].views} views .`
      ulEl.appendChild(liEl);
      votes.push(Products[i].votes);
      views.push(Products[i].views); 
    }
    buttonEl.removeEventListener('click', analysisresults);
    chartRender();
    }

  

    img1El.removeEventListener('click', handelClicks);
    img2El.removeEventListener('click', handelClicks);
    img3El.removeEventListener('click', handelClicks);

    savetolocalstorage()
   
    
      }
       
    }
  
  
  console.log(Products) 

  fromLocalStorage();

function chartRender(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: productnamesonly,
        datasets: [{
            label: '# of Votes',
            data: votes,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
          
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        },
        {
          
              label: '# of Views',
              data: views,
              backgroundColor: [
                  'rgba(155, 199, 132, 0.2)',
            
              ],
              borderColor: [
                  'rgba(155, 199, 132, 1)',
              ],
              borderWidth: 1
          }
      ]
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



// function savetolocalstorage() {
//   let data = JSON.stringify(Pimgs.allData);
//   localStorage.setItem('key1', data);
// }

// function fromLocalStorage() {
//   let returnData = localStorage.getItem('key1');
//   let returnObject = JSON.parse(returnData);
  
//   if (returnObject!== null) {
    
//       Pimgs.allData = returnObject;
    
//   }
//   else {
//     Pimgs.allData
//   }

// }

function savetolocalstorage(){
  let data = JSON.stringify(Products);
  localStorage.setItem('key1', data);}
  
  
  function fromLocalStorage() {
  
     let obj = JSON.parse(localStorage.getItem('key1'));
     if (obj !==null) {
      Products = obj
     }
     else {
      Products;
     }
  
      }
