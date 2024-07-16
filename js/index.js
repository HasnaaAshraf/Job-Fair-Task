import { apiInformation } from "./information.js";

let informationObject = {};
let informationContainerArray = [];

function allData(){
  for(let  x = 0 ; x < apiInformation.customers.length ; x++){
    for (let y = 0; y < apiInformation.transactions.length; y++) {
      if(apiInformation.customers[x].id == apiInformation.transactions[y].customer_id){ 
        informationObject = Object.assign({},apiInformation.customers[x] ,apiInformation.transactions[y]);
        console.log(informationObject);
        informationContainerArray.push(informationObject)
    } 
  }
  }
}
allData()

function display(){
    var cartona = ``;
    for (var i = 0 ; i < informationContainerArray.length ; i++){
        cartona += `
                  <tr>
                    <th scope="row">${informationContainerArray[i].id}</th>
                    <td>${informationContainerArray[i].name}</td>
                    <td>${informationContainerArray[i].amount}</td>
                    <td>${informationContainerArray[i].date}</td>
                  </tr>
        `
    }
    document.querySelector('.Tbody').innerHTML = cartona ;

}

display()

// console.log(diplay());

function sortByName() {
  informationContainerArray.sort((a, b) => {
      return a.id - b.id;
  });
  display();
}
sortByName()

function sortAll(key) {

  informationContainerArray.sort(function(a, b){
      if (key === 'name') {
          return a[key].localeCompare(b[key]);
      } else {
          return a[key] - b[key];
      }
  });
  display();
}

$('.cusName').on('click', function(){
  sortAll('name')
})
$('.cusAmount').on('click', function(){
  sortAll('amount')
})

$('input').on('input',function(){
  
  let cartona = '';
  let inputValue = $('input').val();
  for(let i = 0 ; i<informationContainerArray.length; i++){
      if(informationContainerArray[i].name.toLowerCase().includes(inputValue.toLowerCase())){
          cartona+=`
      <tr>
          <th scope="row">${informationContainerArray[i].id}</th>
          <td>${informationContainerArray[i].name}</td>
          <td>${informationContainerArray[i].amount}</td>
          <td>${informationContainerArray[i].date}</td>
      </tr>
      `
      document.querySelector('.Tbody').innerHTML = cartona;
      }
  }
})

const ctx = document.getElementById('myChart'); 

fetch('data.json')
.then(function(response){

  if (response.ok == true){
    return response.json();
  }
})

.then(function(data){
  createChart(data , 'line');
});

function createChart(data,type){
 
 new Chart(ctx, {
  type: type,
  data: {
    labels: ['Ahmed Ali D(01-01)', 'Ahmed Ali D(01-02)', 'Aya Elsayed D(01-01)', 'Aya Elsayed D(01-02)', 'Mina Adel D(01-01)', 'Mina Adel D(01-02)' , 'Sarah Reda' , 'Mohamed Sayed D(01-01)' , 'Mohamed Sayed D(01-02)'] ,
     datasets: [{
      label: '# of Votes',
      data: data.map(row=>row.amount),
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    maintainAspecRatio :false
  }
});
}


