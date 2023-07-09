const dataClass = document.querySelector('.data');
const mainBodyData = document.querySelector('.mainBody');
const filterData = document.querySelector('.filterData');
const timeFrames = {
  city: 'Place',
  state: 'State',
  center: 'name',
  filtered: 'none'
};
let timeStamp = timeFrames['filtered'];
function setTimeFrame(time) {
  timeStamp = timeFrames[time];
  // console.log(timeStamp);
}
function toggleActive(event){
  clearActive();
  event.target.classList.toggle("btn-active")
}
function clearActive(){
  document.querySelectorAll(".btn").forEach(elem =>{
    elem.classList.remove("btn-active");
  
  })

}
function clearFilter(event){
  if(event.target.value === null || event.target.value.trim() === ""){
    clearActive();
    filterData.textContent = '';
  
    mainBodyData.classList.remove("fade");
    const tdCells = mainBodyData.getElementsByTagName('td');
    for(var i = 0;i<tdCells.length;i++){
      tdCells[i].classList.remove("fade");
    }
    mainBodyData.style.display = 'block';  
    
  }
}

async function getData() {
  const resp = await fetch('https://isro.vercel.app/api/centres');
  const data = await resp.json();
  data.centres.forEach((element) => {
    delete element['id'];
  });
  appendData(data.centres);
}
getData();
appendData = (data) => {
  data.forEach((element) => {
    const obj = Object.keys(element);
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    obj.forEach((key) => {
      const divSec=document.createElement('div');
      divSec.classList.add('info');
      const divtHead = document.createElement('div');
      divtHead.classList.add('info-title');

      const divData = document.createElement('div');
      divData.classList.add('info-text');
      divtHead.textContent = key === 'name' ? 'Center' : key === 'Place' ? 'City' : 'State';
      divData.textContent = element[key];
      divSec.append(divtHead, divData);

      td.append(divSec);

      tr.append(td);
      mainBodyData.append(tr);
    });
  });
};

async function searchInput() {
  const inputData = document
    .getElementById('inp')
    .value.toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
  // mainBodyData.style.visiblity = 'hidden';
  mainBodyData.classList.add("fade");
  const tdCells = mainBodyData.getElementsByTagName('td');
  mainBodyData.style.display = 'none';
    for(var i = 0;i<tdCells.length;i++){
      tdCells[i].classList.add("fade");
    }
  const resp = await fetch('https://isro.vercel.app/api/centres');
  const data = await resp.json();
  data.centres.forEach((element) => {
    delete element['id'];
  });
  if (timeStamp === 'Place') {

    const filtData = data.centres.filter((center) => center.Place.toLowerCase().includes(inputData.toLowerCase()));
   // console.log(filtData);
    filteredData(filtData);
  } else if (timeStamp === 'State') {
    const filtData = data.centres.filter((center) => center.State.toLowerCase().includes(inputData.toLowerCase()));
  //  console.log(filtData);
    filteredData(filtData);
  } else if (timeStamp === 'name') {
    const filtData = data.centres.filter((center) => center.name.toLowerCase().includes(inputData.toLowerCase()));
 //   console.log(filtData);
    filteredData(filtData);

  }
  else{
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const divSec=document.createElement('div');
    divSec.classList.add('info-error');
    divSec.textContent = 'Please select city/state/center';
    td.append(divSec);
    tr.append(td);
    filterData.append(tr);

  }
}

const filteredData = (data) => {
  filterData.textContent = '';
  if (data.length) {
    data.forEach((element) => {
      const obj = Object.keys(element);
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      obj.forEach((key) => {
        const divSec=document.createElement('div');
        divSec.classList.add('info');
        const divtHead = document.createElement('div');
        divtHead.classList.add('info-title');
        const divData = document.createElement('div');

        divtHead.textContent = key === 'name' ? 'Center' : key === 'Place' ? 'City' : 'State';
        divData.textContent = element[key];
        divSec.append(divtHead, divData);

        td.append(divSec);
        // td.append(divtHead, divData);
        tr.append(td);
        filterData.append(tr);
      });
    });
  } else {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    const divSec=document.createElement('div');
    divSec.classList.add('info-error');
    divSec.textContent = 'NO DATA AVAILABLE FOR THE SELECTED SEARCH, PLEASE TRY AGAIN';
    td.append(divSec);
    tr.append(td);
    filterData.append(tr);
  }
};
