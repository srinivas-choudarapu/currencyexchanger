
const baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const dis=document.querySelector(".display");

// for(code in countryList){
//     console.log(countryList[code]
//     )
// }
window.addEventListener("load",()=>{
    process();
    
})

for(select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from"&&currcode==="USD"){
            newOption.selected="selected";
        }
        if(select.name==="to"&&currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        flag(evt.target);
    })
}
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    process();
});

const process = async ()=>{
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    if(amountVal===""||amountVal<1){
        amountVal=1;
        amount.value="1";
    }
    // console.log(fromCurr.value , toCurr.value);
    const url=`${baseurl}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data1=await response.json();
    const fromcode=fromCurr.value.toLowerCase();
    const tocode =toCurr.value.toLowerCase();
    let exchangeRate = data1[fromcode][tocode];
    let finalrate = amountVal*exchangeRate.toFixed(4);
    dis.innerText=`${amountVal} ${fromCurr.value}     =     ${finalrate}    ${toCurr.value}`;

}
const flag = (element)=>{
    let currcycode=element.value;
    
    let countrycode = countryList[currcycode];
    console.log(countrycode);
    let link=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src=link;
    process();

}