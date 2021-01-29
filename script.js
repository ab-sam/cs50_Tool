
const tmdb_API='ccf679389a13f7cd8cfa4c0693d63931';
var Data;
var r_s;
var menu = {
    "TMDB" : ["title", "vote_average", "vote_count", "popularity"],
    "TWITTER" : ["Tweets", "Tweets_count", "Likes","favourites_count","retweet_count"]
}

window.onload = function(){
    var dd0 = document.getElementById("myList");
    var dd1 = document.getElementById("Column")
    for (var x in menu){
        dd0.options[dd0.options.length] = new Option(x,x);
    }
    dd0.onchange = function() {
        dd1.length = 1;
        var z = menu[this.value];
        for (var i = 0; i < z.length; i++){
            dd1.options[dd1.options.length] = new Option(z[i],z[i]);
        }
    }
}

const listValue=document.querySelector('#myList')
const keyword=document.querySelector('#Keyword')
const searchButton=document.querySelector('#fetch')
const column=document.querySelector('#Column')
const formula=document.querySelector('#Formula')
const statButton=document.querySelector('#Stats')

function fetcher(){
    // clearbox('op2');
    // document.getElementById('op2').innerHTML="Fetching data.........";
    const name=keyword.value;
    const select = listValue.value;
    console.log(name)
   
    if (select=='TMDB'){
        r_s='results';
        tmdb_url='https://api.themoviedb.org/3/search/movie?api_key='+tmdb_API+'&query='+name;
        fetch(tmdb_url)
            .then((res) => res.json())
            .then(function(data){
            console.log('Data: ' ,data);
            Data=data;
            document.getElementById('op2').innerHTML="Data Fetched using "+select+ " API and the keyword is "+name+". Choose Columns and Summary function";
            });
            clearbox('op2');
    }
    else{
        r_s='statuses';
        twitter_url='http://localhost:7890/1.1/search/tweets.json?q='+name+'&count=100';
        fetch(twitter_url)
            .then((res) => res.json())
            .then(function(data){
            console.log('Data: ' ,data);
            Data=data;
            document.getElementById('op2').innerHTML="Data Fetched using "+select+ " API and the keyword is "+name+". Choose Columns and Summary function";
            });
            clearbox('op2');
    }
        
}

statButton.onclick=function(event){
    const select2=column.value;
    const select3=formula.value;
    if (select3 == "Sum"){
        sum(Data,select2,select3,r_s);
    }else if(select3 == "Mean"){
        mean(Data,select2,select3,r_s);
    }else if(select3 == "Null Count"){
        nullCount(Data,select2,select3,r_s);
    }else if(select3 == "Median"){
        median(Data,select2,select3,r_s);
    }else if(select3 == "Count"){
        count(Data,select2,select3,r_s);
    }else if(select3 == "Standard Deviation"){
        standard(Data,select2,select3,r_s);
    }else if(select3 == "Count Distinct"){
        Ctd(Data,select2,select3,r_s);
    }else{
        let a = sum(Data,select2,select3,r_s);
        let b = count(Data,select2,select3,r_s);
        let c = mean(Data,select2,select3,r_s);
        let d = median(Data,select2,select3,r_s);
        let e = nullCount(Data,select2,select3,r_s);
        let f = standard(Data,select2,select3,r_s);
        createtable2(select2,a,b,c,d,e,f);
    }
}

function sum(data,x,y,z){
    var res = 0;
    for (var i = 0; i < data[z].length; i = i + 1){
        if(isNaN(data[z][i][x])){
            var add = 0;
        }else {
            var add = (data[z][i][x]);
            }res = res+add;
        }console.log(res);
        if(y == "All"){
            return res;
        }else{
            createtable(x,res,"sum");
        }
        //document.getElementById("op2").innerHTML = res;
}

function mean(data,x,y,z){
    var res = 0;
    for (var i = 0; i < data[z].length; i = i + 1){
        if(isNaN(data[z][i][x])){
            var add = 0;
        }else {
            var add = (data[z][i][x]);
            }res = res+add;
            avg = res / data[z].length;
        }console.log(avg);
        if(y == "All"){
            return avg;
        }else{
            createtable(x,avg,"Mean");
        }
        //document.getElementById("op2").innerHTML = avg;   
}

function median(data,x,y,z){
    var array = [];
    for (var i = 0; i < data[z].length; i = i + 1){
        if(isNaN(data[z][i][x])){
            array.push(0);
        }else {
            array.push(data[z][i][x]);
            }array.sort(function(a,b){return a - b});
            med = array[(data[z].length/2)];
        }console.log(med);
        if(y == "All"){
            return med;
        }else{
            createtable(x,med,"Median");
        }
        //document.getElementById("op2").innerHTML = med;
}

function standard(data,x,y,z){
    array = [];
    for(var i = 0; i < data[z].length; i = i + 1){
        array.push(data[z][i][x]);
    }
    var n = array.length;
    var mean = array.reduce((a, b) => a + b) / n;
    var res = Math.round(Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n));
    console.log(res);
    if(y == "All"){
       return res;
    }else{
        createtable(x,res,"Standard Deviation");
    }
}

function nullCount(data,x,y,z){
    var res = 0;
    for (var i = 0; i < data[z].length; i = i + 1){
        //console.log(data[z][i][x]);
        if(isNaN(data[z][i][x])){
            res = res + 1;
        }}console.log(res);
        if(y == "All"){
            return res;
        }else{
            createtable(x,res,"Null Count");
        }
        //document.getElementById("op2").innerHTML = res;  
}

function count(data,x,y,z){
    var ct = data[z].length;
    console.log(ct);
    if(y == "All"){
        return ct;
    }else{
        createtable(x,ct,"Count");
    }
    //document.getElementById("op2").innerHTML = ct;
}

function createtable(x,y,z){

    let h = ['Column Name', z ];
    let e = [{col:x,val:y}]
    let mytable = document.querySelector('#op2')
    var table = document.createElement("table");
    var header_row = document.createElement('tr');
    clearbox('op2');
    h.forEach(htext => {
        var header = document.createElement('th');
        let textNode = document.createTextNode(htext);
        header.appendChild(textNode);
        header_row.appendChild(header);
    });
    table.appendChild(header_row);
    e.forEach(emp =>{
        let row = document.createElement('tr');
        Object.values(emp).forEach(text =>{
            let cell = document.createElement('td');
            let textNode1 = document.createTextNode(text);
            cell.appendChild(textNode1);
            row.appendChild(cell);
        });
        table.appendChild(row);
    });
    mytable.appendChild(table);
}

function createtable2(x,a,b,c,d,f,g){
    clearbox('op2');
    let h = ['Column Name', 'sum', 'mean', 'Null count', 'Median','Count', 'Standard Deviation'];
     let e = [{col:x,sum:a,mean:b,nullcount:c,median:d,count:f,std:g}];
     let mytable = document.querySelector('#op2');
     var table = document.createElement("table");
     var header_row = document.createElement('tr');
     h.forEach(htext => {
     var header = document.createElement('th');
     let textNode = document.createTextNode(htext);
     header.appendChild(textNode);
     header_row.appendChild(header);
     });
     table.appendChild(header_row);
     e.forEach(emp =>{
     let row = document.createElement('tr');
     Object.values(emp).forEach(text =>{
     let cell = document.createElement('td');
     let textNode1 = document.createTextNode(text);
     cell.appendChild(textNode1);
     row.appendChild(cell);
     });
     table.appendChild(row);
     });
     mytable.appendChild(table);
}

function clearbox(elementID){
    document.getElementById(elementID).innerHTML="";
}