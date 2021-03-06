/* Your code */

// fetch(`http://localhost:8000/options?question=5`, 
// {mode: 'cors'}).then(response => response.json()).then(data => {checkboxOptions=data;}).then(()=>{
    
// }).then(() => {fetch(`http://localhost:8000/options?question=6`, 
// {mode: 'cors'}).then(response => response.json()).then(data => {radioOptions=data;}).then(()=>{
   
// })}).then(()=>{fetch("http://localhost:8000/questions", 
// {mode: 'cors'}).then(response => response.json()).then(data => {questions=data;
    // console.log(data)
// }
//     ).then(() => ngForFunctionality())})

var questions = [
    { id: 1, title: 'Your name', type: 'text', mandatory: true, has_options: false },
    { id: 2, title: 'Your email', type: 'email', mandatory: true, has_options: false },
    { id: 3, title: 'Your contact number', type: 'number', mandatory: true, has_options: false },
    { id: 4, title: 'How likely is that you recommend this survey to a friend or a colleague?', type: 'rating', mandatory: true, has_options: false },
    { id: 5, title: 'Overall how satisfied or dissatisfied are you with this survey?', type: 'radio', mandatory: true, has_options: true },
    { id: 6, title: 'Which of the following words would you use to describe our product? Select all that apply', type: 'checkbox', mandatory: true, has_options: true },
    { id: 7, title: 'Do you have any comments or concerns?', type: 'textarea', mandatory: false, has_options: false },
  ];
  var checkboxOptions = [
    { value: 'reliable', label: 'Reliable' },
    { value: 'useful', label: 'Useful' },
    { value: 'unique', label: 'Unique' },
    { value: 'overpriced', label: 'Overpriced' },
    { value: 'impratical', label: 'Impractical' },
    { value: 'ineffective', label: 'Ineffective' },
  ];
  var radioOptions = [
    { value: 'satisfied', label: 'Satisfied' },
    { value: 'somewhat_safisfied', label: 'Somewhat satisfied' },
    { value: 'dissatisfied', label: 'Dissatisfied' },
    { value: 'somewhat_dissafisfied', label: 'Somewhat dissatisfied' },
    { value: 'neither', label: 'Neither satisfied not dissatisfied' }
  ];
    var flag = false;
    // var questions = []
    // var checkboxOptions = []
    var checkboxes = '';
    var radiobuttons ='';
    // var radioOptions = []
    var selectedRating= null;
    var arrayRating = [];
    var checkSelected = [];
    var selectedradio;


ngForFunctionality = () => {
    let value = '';
    let rating = '';
    radioOptions.forEach((one) =>{
        radiobuttons += `<span style="padding:5px;color:#444242;font-weight:150">
        <input type="radio" id=${one.value} name="radio" onclick="radioChange('${one.value}')"/>
        <label for=${one.value}>${one.label}</label><br>
        </span>`
    })
    console.log(radioOptions)
    checkboxOptions.forEach((one) =>{
        checkboxes += `<span style="padding:5px;color:#444242;font-weight:150">
        <input type="checkbox" id=${one.value}  name="check" onclick="checkChange('${one.value}')"/>
        <label for=${one.value}>${one.label}</label><br>
        </span>`
    })
    console.log(checkboxOptions)
    for(let i=1;i<11;i++){
        arrayRating.push(i);
    }
    arrayRating.forEach((one)=>{
        rating += `<span class="rating" id="${one}star" onclick="rateme('${one}star')">${one}</span>`
    })
    questions.forEach((post) => {
        if(post.mandatory)
            post.title = post.title + '*'
    
        if(!post.has_options && post.type!='rating' && post.type!="textarea"){
                value += `<div style="display:flex;justify-content:space-between;padding:20px;">
                <span style="font-weight:350" id="title${post.id}">${post.title}</span>
                <span>
                <input id="id${post.id}" name="id${post.id}" type=${post.type} placeholder='${post.title}' onchange="validator()" class="inputText"/>
                </span>
                </div>
                <br>`;      
        }
        else{
            if(post.type == 'rating'){
                value += `<div style="padding:20px;">
                <span>
                <span style="font-weight:350" id="title${post.id}">${post.title}</span>
                </span>
                <br><br><br>
                <span style="display:flex; justify-content:center; flex-direction:row;flex-wrap:wrap" id="id${post.id}" name="id${post.id}">
                ${rating}</span>
                </div>
                <br>`;
            }
            else if(post.type=="textarea"){
                value += `<div style="display:flex;justify-content:space-between;padding:20px;">
                <span style="font-weight:350" id="title${post.id}">${post.title}</span>
                <span>
                <textarea id="id${post.id}" name="id${post.id}" style="min-width:250px;min-height:100px" placeholder='${post.title}' class="inputText"></textarea>
                </span>
                </div>
                <br>`;
            }else if(post.type == 'checkbox'){
                    value += `<div style="padding:20px;">
                    <span style="font-weight:350" id="title${post.id}">${post.title}</span>
                    <br><br>
                    <span display:flex; justify-content:space-evenly; flex-direction:row; id="id${post.id}" name="id${post.id}">
                    ${checkboxes}</span>
                    </div>
                    <br>`;
            }else if(post.type == 'radio'){
                    value += `<div style="padding:20px;">
                    <span>
                    <span style="font-weight:350" id="title${post.id}">${post.title}</span>
                    </span>
                    <br><br>
                    <span display:flex; justify-content:space-evenly; flex-direction:row; id="id${post.id}" name="id${post.id}">
                    ${radiobuttons}</span>
                    </div>
                    <br>`;
                }
        }
        });
    document.getElementById("ques").innerHTML = `<form id="contact" name="contact">${value}
    
    </form>
   <div style="text-align: center;">  <button name="submit" id="submit" onclick="Submit(this)" class="submit">Submit</button></div>
    `;
}
rateme = (rating) => {
    selectedRating= rating;
    for(let temp of arrayRating){
    document.getElementById(`${temp}star`).style.backgroundColor =  'white';
    document.getElementById(`${temp}star`).style.color =  'black';
    }
    document.getElementById(rating).style.backgroundColor =  '#444242';
    document.getElementById(rating).style.color =  'white';
    validator();
    console.log(rating)
}

radioChange = (radioselection) =>{
    console.log(radioselection)
    selectedradio=radioselection;
    validator();
}

checkChange = (checkboxed) => {
    if(!checkSelected.includes(checkboxed))
    checkSelected.push(checkboxed);

    else
    checkSelected.splice(checkSelected.indexOf(checkboxed),1)
    
    validator();
    console.log(checkSelected)
}

ngForFunctionality();

Submit = () =>{
    flag = true;
    validator();
    if(!document.getElementById("id1").value)
        {alert("Please enter your name"); return;}
    
    if(!(document.getElementById("id2").value.includes('@') && document.getElementById("id2").value.includes('.')))
        {alert("Please enter a valid E-mail"); return;}

    if(document.getElementById("id3").value.length<10)
        {alert("Please enter a valid phone number"); return;}
    if(!selectedRating)
        {alert("Please give a rating on the scale of ten"); return;}
    if(!selectedradio)
        {alert("Please choose one option about your experience"); return;}
    if(checkSelected.length==0)
        {alert("Please check atleast one option about the product"); return;}
    
    alert("Successfully Submitted! Please check the console for sample output. Thankyou for your time");
    console.log([
        {'id':'1', 'value':document.getElementById("id1").value},
        {'id':'2', 'value':document.getElementById("id2").value},
        {'id':'3', 'value':document.getElementById("id3").value},
        {'id':'4', 'value':selectedRating},
        {'id':'5', 'value':selectedradio},
        {'id':'6', 'value':checkSelected.sort().join()},
        {'id':'7', 'value':document.getElementById("id7").value},
    ])

    location.reload();
}

validator = () => {
    if(!flag){
        return;
    }
    if(!document.getElementById("id1").value)
        {document.getElementById("id1").style.border = "red 1px solid";
        document.getElementById("title1").style.color = "red";}
    else{document.getElementById("id1").style.border = "black 1px solid";
        document.getElementById("title1").style.color = "black";}

    if(!(document.getElementById("id2").value.includes('@') && document.getElementById("id2").value.includes('.')))
        {document.getElementById("id2").style.border = "red 1px solid";
        document.getElementById("title2").style.color = "red";}
    else{document.getElementById("id2").style.border = "black 1px solid";
         document.getElementById("title2").style.color = "black";}   

    if(document.getElementById("id3").value.length<10)
        {document.getElementById("id3").style.border = "red 1px solid";
        document.getElementById("title3").style.color = "red";}
    else{document.getElementById("id3").style.border = "black 1px solid";
        document.getElementById("title3").style.color = "black";}

    if(!selectedRating)
        document.getElementById("title4").style.color = "red";
    else
        document.getElementById("title4").style.color = "black";
        
    if(!selectedradio)
        document.getElementById("title5").style.color = "red";
    else
        document.getElementById("title5").style.color = "black";
            
    if(checkSelected.length==0)
        document.getElementById("title6").style.color = "red";
    else
        document.getElementById("title6").style.color = "black";
            
}