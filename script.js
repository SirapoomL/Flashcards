// Import the functions you need from the SDKs you need
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBp3pvUwAble03XywPcMWNv1mGHkkY5Gt4",
   authDomain: "flashcards-22550.firebaseapp.com",
   projectId: "flashcards-22550",
   storageBucket: "flashcards-22550.appspot.com",
   messagingSenderId: "619643608848",
   appId: "1:619643608848:web:8751fc0ea1dbcef65b0f95"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

// import 'package:firebase_core/firebase_core.dart';

// Initialize Firebase
// initializeApp(firebaseConfig);
// await Firebase.initializeApp();

import {
	getFirestore,
	doc,
	getDoc,
	getDocs,
	collection,
	query,
	setDoc,
	deleteDoc,
    addDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";


const db = getFirestore();
const flashcards = collection(db, 'flashcards');
var alertsound = document.getElementById('alert-sound');
var loginok = document.getElementById('login-ok');

//----------------------------------------------Login--------------------------------------------------------------------------

async function login(){
    let div = document.getElementById('logincontainer');
    let user = document.getElementById('userid').value;
    let password = document.getElementById('userpassword').value;
    if(user.length > 12 || password.length >12){
        alertsound.play();
        alert('Username and password are limited to 12 characters.');
        document.getElementById('userid').value = "";
        document.getElementById('userpassword').value = "";
        return;
    }
    let inform = document.getElementById('inform');
    let x = -1;let idd;
    const idList = await doc(db,`user/alluser`);
    let Instance = await getDoc(idList);
    Instance = Instance.data();
    const len = Instance.len;
    for(let i=0;i<len;i++){
        eval(`  if(Instance.user`+i+`.normalize()===user.normalize()){
            x = 0;
            if(Instance.password`+i+`.normalize()===password.normalize()){x=1;idd = Instance.userid`+i+`;}
        };`);
    }
    console.log(x);
    if(x > 0){
        loginok.play();
        div.parentNode.removeChild(div);
        document.getElementById(`container`).value = idd;
        genMySet(user);
    }else if(x > -1){
        inform.innerText = "Wrong username or password";
        alertsound.play();  
        document.getElementById('userid').value = "";
        document.getElementById('userpassword').value = "";
    }else {
        loginok.play();
        div.parentNode.removeChild(div);
        const docRef = await addDoc(collection(db, "user"), {
            count : 0
        });
        eval(`updateDoc(idList,{
            user`+len+` : user,
            password`+len+` : password,
            userid`+len+` : docRef.id,
            len : Instance.len+1
        })`)
        document.getElementById(`container`).value = docRef.id;
        genMySet(user);
    }
}

//----------------------------------------------My set-------------------------------------------------------------------------

async function genMySet(user){
    const setList = await doc(db,`user/${document.getElementById(`container`).value}`);
    document.getElementById('mysettextbox').innerText = "My Set";
    let Instance = await getDoc(setList);
    Instance = Instance.data();
    const l = Instance.count;
    let name;let id;
    for(let i=0;i<l;i++){
        eval(`name = Instance.name`+i);
        eval(`id = Instance.id`+i);
        genSet(name,id);
    }
    let div  = document.createElement(`div`);div.className = "addblock";div.id = "newblock";
    let text = document.createElement(`p`);text.className = "textInTextBox";text.innerText = "NEW SET";
    let input = document.createElement(`input`);input.type = "text";input.placeholder="Type here ...";
    input.id = "nameofset";input.style="width: 98%";
    let button = document.createElement(`button`);button.className = "btn-add-new-block";
    button.value = user;
    button.onclick=function(){createSet(user);};
    div.appendChild(text);
    div.appendChild(document.createElement(`br`));
    div.appendChild(document.createElement(`br`));
    div.appendChild(input);
    div.appendChild(button);
    document.getElementById(`container`).appendChild(div);
}

// document.addEventListener('DOMContentLoaded', (event) => {

//     function handleDragStart(e) {
//       this.style.opacity = '0.4';
//     }
  
//     function handleDragEnd(e) {
//       this.style.opacity = '1';
  
//       div.forEach(function (div) {
//         div.classList.remove('over');
//       });
//     }
  
//     function handleDragOver(e) {
//       e.preventDefault();
//       return false;
//     }
  
//     function handleDragEnter(e) {
//       this.classList.add('over');
//     }
  
//     function handleDragLeave(e) {
//       this.classList.remove('over');
//     }
// });
// function handleDrop(e) {
//     e.stopPropagation(); // stops the browser from redirecting.
//     return false;
//   }
  
async function genSet(name,id){
    let div  = document.createElement(`div`);div.className = "addblock";div.id = "addblock"; 
    // div.draggable = "true";
    // div.forEach(function(item) {
    //     div.addEventListener('dragstart', handleDragStart);
    //     div.addEventListener('dragover', handleDragOver);
    //     div.addEventListener('dragenter', handleDragEnter);
    //     div.addEventListener('dragleave', handleDragLeave);
    //     div.addEventListener('dragend', handleDragEnd);
    //     div.addEventListener('drop', handleDrop);
    //   });
    let del = document.createElement(`button`);del.className = "delSet";del.id = "delSet";
    del.value = id;del.onclick = function(){deleteSet(del.value);edit.parentNode.parentNode.removeChild(edit.parentNode);};
    let edit = document.createElement(`button`);edit.className = "editSet";del.id = "editSet";
    edit.value = id;edit.onclick = function(){editSet(edit.value);};
    let text = document.createElement(`p`);text.className = "textInTextBox";text.innerText = name;
    
    let learning = document.createElement(`button`);learning.className = "learningSet";
    learning.id = "learningSet";learning.innerText = "Learning";learning.value = id;
    learning.onclick=function(){genLearningSection(learning.value);};

    let practice = document.createElement(`button`);practice.className = "practiceSet";
    practice.id = "practiceSet";practice.innerText = "Practice";practice.value = id;
    practice.onclick=function(){genPracticeSection(practice.value);};

    div.appendChild(del);
    div.appendChild(edit);
    div.appendChild(text);
    div.appendChild(learning);
    div.appendChild(practice);
    // return div;
    document.getElementById(`container`).appendChild(div);
}

async function createSet(user){
    changeState();
    let x = document.getElementById(`nameofset`).value;
    if(x.length > 10){
        alert('The name is limited to 12 characters.');
        document.getElementById(`nameofset`).value = "";
        return;
    }
    let topic = document.createElement("h2");topic.innerText = "Vocabulary";topic.id = "topic";
    document.getElementById("topic").parentNode.replaceChild(topic,document.getElementById("topic"));
    const l = 0;

    const docRef = await addDoc(collection(db, "flashcards"), {
        name: document.getElementById(`nameofset`).value,
        length : l
    });
  
    const setList = await doc(db,`user/${document.getElementById(`container`).value}`);
    let Instance = await getDoc(setList);
    Instance = Instance.data();
    const len = Instance.count;
    eval(`updateDoc(setList,{
        name`+len+` : document.getElementById("nameofset").value,
        id`+len+` : docRef.id,
        count : Instance.count+1
    })`)

    
    let div  = document.createElement(`div`);div.className = "addblock";div.id = "addblock";
    // div.draggable = "true";
    // div.forEach(function(item) {
    //     div.addEventListener('dragstart', handleDragStart);
    //     div.addEventListener('dragover', handleDragOver);
    //     div.addEventListener('dragenter', handleDragEnter);
    //     div.addEventListener('dragleave', handleDragLeave);
    //     div.addEventListener('dragend', handleDragEnd);
    //     div.addEventListener('drop', handleDrop);
    //   });
    let del = document.createElement(`button`);del.className = "delSet";del.id = "delSet";
    del.value = docRef.id;del.onclick = function(){deleteSet(del.value);edit.parentNode.parentNode.removeChild(edit.parentNode);};
    let edit = document.createElement(`button`);edit.className = "editSet";del.id = "editSet";
    edit.value = docRef.id;edit.onclick = function(){editSet(edit.value);};
    let text = document.createElement(`p`);text.className = "textInTextBox";text.innerText = document.getElementById(`nameofset`).value;
    let learning = document.createElement(`button`);learning.className = "learningSet";
    learning.id = "learningSet";learning.innerText = "Learning";learning.value = docRef.id;
    learning.onclick=function(){genLearningSection(learning.value);};
    let practice = document.createElement(`button`);practice.className = "practiceSet";
    practice.id = "practiceSet";practice.innerText = "Practice";practice.value = docRef.id;
    practice.onclick=function(){genPracticeSection(practice.value);};
    div.appendChild(del);
    div.appendChild(edit);
    div.appendChild(text);
    div.appendChild(learning);
    div.appendChild(practice);
    document.getElementById(`container`).insertBefore(div,document.getElementById(`newblock`));
    document.getElementById(`nameofset`).value = "";
    gentable(docRef.id);
}

async function deleteSet(setid){
    let topic = document.createElement("h2");topic.innerText = "";topic.id = "topic";
    document.getElementById("topic").parentNode.replaceChild(topic,document.getElementById("topic"));
    changeState();

    const setList = await doc(db,`user/${document.getElementById(`container`).value}`);
    let Instance = await getDoc(setList);
    Instance = Instance.data();
    let l = Instance.count;
    let i = 0;let k = -1;
    for(i = 0;i<l;i++){
        if(eval(`setid.normalize()===Instance.id`+i+`.normalize()`)){k = i;}
        if(k!=-1)break;
    }
    eval(`deleteDoc(doc(db,"flashcards",Instance.id`+k+`))`);
    await updateDoc(setList,{
        count : Instance.count - 1
    })
    l--;
    while(k<l){
        i++;
        // console.log(i);
        eval(`updateDoc(setList,{
            name`+k+` : Instance.name`+i+`,
            id`+k+` : Instance.id`+i+`,
        })`);
        k++;
    }
}

async function editSet(setid){
    changeState();
    let topic = document.createElement("h2");topic.innerText = "Vocabulary";topic.id = "topic";
    document.getElementById("topic").parentNode.replaceChild(topic,document.getElementById("topic"));
    gentable(setid);
}

async function changeState(){
    let tables = document.getElementById("content");
    let topic = document.createElement("h2");topic.innerText = "";topic.id = "topic";

    if(document.getElementById(`practice`)){
        document.getElementById(`practice`).parentNode.removeChild(document.getElementById(`practice`));
    }

    if(document.getElementById(`learning`)){
        document.getElementById(`learning`).parentNode.removeChild(document.getElementById(`learning`));
    }

    document.getElementById("topic").parentNode.replaceChild(topic,document.getElementById("topic"));
    tables.deleteTHead();
    const x = tables.rows.length;
    for(let i = 0;i < x;i++){
        tables.deleteRow(0);
    }
}
//---------------------------------------Generate Learning & Practice HTML-----------------------------------------------------
async function genLearningSection(setid){
    const wordSetRef = await doc(db,`flashcards/` + setid);
    let Instance = await getDoc(wordSetRef);
    Instance = Instance.data();
    const setLength = Instance.length;
    const index = 0;

    changeState();
    let topic = document.createElement("h2");topic.innerText = "Learning";topic.id = "topic";
    if(setLength==0){
        topic.innerText = "No word in the selected set.";topic.style = "color: red;font-size: 20px;font-weight: 400;";
        document.getElementById("topic").parentNode.replaceChild(topic,document.getElementById("topic"));
        return;
    }
    
    document.getElementById("topic").parentNode.replaceChild(topic,document.getElementById("topic"));
    let outerDiv = document.createElement(`div`);
    outerDiv.className = "learning";
    outerDiv.id = "learning";

    let div  = document.createElement(`div`);
    div.className = "board";
    div.id = "learning-card";

    let name = document.createElement(`p`);
    name.className = "name";
    name.id = "learning-set-name";
    name.innerText = Instance.name;

    let number = document.createElement(`p`);
    number.className = "number";
    number.id = "learning-number";
    number.value = index;
    number.innerText = `${index + 1}/${setLength}`;

    let vocab = document.createElement(`p`);
    vocab.className = "vocab";
    vocab.id = "learning-vocab";
    vocab.innerText = eval(`Instance.word${index}`);

    let meaning = document.createElement(`p`);
    meaning.className = "mean";
    meaning.id = "learning-meaning";
    meaning.innerText = eval(`Instance.meaning${index}`);

    let prevBut = document.createElement(`button`);
    prevBut.className = "previous";
    prevBut.onclick = function() {prevItem(setid, number.value);}
    
    let nextBut = document.createElement(`button`);
    nextBut.className = "next";
    nextBut.onclick = function() {nextItem(setid, number.value);}

    div.appendChild(name);
    div.appendChild(number);
    div.appendChild(vocab);
    div.appendChild(meaning);
    div.appendChild(prevBut);
    div.appendChild(nextBut);
    outerDiv.appendChild(div);
    document.getElementById(`topicbody`).appendChild(outerDiv);
}

async function genPracticeSection(setid){
    const wordSetRef = await doc(db,`flashcards/` + setid);
    let Instance = await getDoc(wordSetRef);
    Instance = Instance.data();
    const setLength = Instance.length;
    const index = 0;

    changeState();
    let topic = document.createElement("h2");topic.innerText = "Practice";topic.id = "topic";
    if(setLength==0){
        topic.innerText = "No word in the selected set.";topic.style = "color: red;font-size: 20px;font-weight: 400;";
        document.getElementById("topic").parentNode.replaceChild(topic,document.getElementById("topic"));
        return;
    }

    document.getElementById("topic").parentNode.replaceChild(topic,document.getElementById("topic"));
    let outerDiv = document.createElement(`div`);
    outerDiv.className = "practicing";
    outerDiv.id = "practice";
    
    let div  = document.createElement(`div`);
    div.className = "board";
    div.id = "practice-card";

    let name = document.createElement(`p`);
    name.className = "name";
    name.id = "practice-set-name";
    name.innerText = Instance.name;

    let number = document.createElement(`p`);
    number.className = "number";
    number.id = "practice-number";
    number.value = index;
    number.innerText = `${index + 1}/${setLength}`;

    // let correct = document.createElement(`p`);
    // correct.className = "correct";
    let correct_img = document.createElement(`img`);
    correct_img.className = "correct-img";
    correct_img.id = "correct-img";
    correct_img.src = "/resource/correct.png"; correct_img.alt = "";
    let correct_score = document.createElement(`span`);
    correct_score.id = "score-correct";
    correct_score.className = "score-correct";

    correct_score.innerHTML = 0;
    // correct.appendChild(correct_img);
    // correct.appendChild(correct_score);

    let incorrect = document.createElement(`p`);
    incorrect.className = "incorrect";
    let incorrect_img = document.createElement(`img`);
    incorrect_img.className = "incorrect-img";
    incorrect_img.id = "incorrect-img";
    incorrect_img.src = "/resource/incorrect.png"; correct_img.alt = "";
    let incorrect_score = document.createElement(`span`);
    incorrect_score.className="score-incorrect";
    incorrect_score.id = "score-incorrect";
    incorrect_score.innerHTML = 0;
    // incorrect.appendChild(incorrect_img);
    // incorrect.appendChild(incorrect_score);

    let question = document.createElement(`p`);
    question.className = "question";
    question.id = "practice-question";
    question.innerText = eval(`Instance.word${index}`);

    let answerBox = document.createElement(`input`);
    answerBox.className = "ans";
    answerBox.type = "text";
    answerBox.id = "practice-answer";
    answerBox.placeholder = "Type here ...";

    let enterBtn = document.createElement(`button`);
    enterBtn.className = "btn-enter";
    enterBtn.id = "btn-enter";
    enterBtn.innerText = "Enter";   
    enterBtn.onclick = function() {checkAnswer(setid, number.value);}
    
    div.appendChild(name);
    div.appendChild(number);
    
    div.appendChild(correct_img);
    div.appendChild(correct_score);

    div.appendChild(incorrect_img);
    div.appendChild(incorrect_score);


    div.appendChild(question);
    div.appendChild(answerBox);
    div.appendChild(enterBtn);
    outerDiv.appendChild(div);
    document.getElementById(`topicbody`).appendChild(outerDiv);
}

//-------------------------------------Learning & Practice onCLick function----------------------------------------------------
//when click next item button in learning section
async function nextItem(setid, index){
    const wordSetRef = await doc(db,`flashcards/` + setid);
    let Instance = await getDoc(wordSetRef);
    Instance = Instance.data();
    const setLength = Instance.length;

    let nextIndex = index + 1;
    if (nextIndex === setLength) {
        nextIndex = 0;
    }
    let word = eval(`Instance.word${nextIndex}`);
    let meaning = eval(`Instance.meaning${nextIndex}`);
    document.getElementById("learning-number").value = nextIndex;
    document.getElementById("learning-number").innerText = `${nextIndex + 1}/${setLength}`;
    document.getElementById("learning-vocab").innerText = word;
    document.getElementById("learning-meaning").innerText = meaning;
}

//when click previous item button in learning section
async function prevItem(setid, index){
    const wordSetRef = await doc(db,`flashcards/` + setid);
    let Instance = await getDoc(wordSetRef);
    Instance = Instance.data();
    const setLength = Instance.length;

    let prevIndex = index - 1;
    if (prevIndex < 0) {
        prevIndex = setLength - 1;
    }
    let word = eval(`Instance.word${prevIndex}`);
    let meaning = eval(`Instance.meaning${prevIndex}`);
    document.getElementById("learning-number").value = prevIndex;
    document.getElementById("learning-number").innerText = `${prevIndex + 1}/${setLength}`;
    document.getElementById("learning-vocab").innerText = word;
    document.getElementById("learning-meaning").innerText = meaning;
}

//when click enter to check answer in practice section
function checkAnswer(setid, index){
    calculateScore(setid, index);
    nextQuestion(setid, index);
}

//checkAnswer function automatically call this function immediately
async function calculateScore(setid, index){
    const wordSetRef = await doc(db,`flashcards/` + setid);
    let Instance = await getDoc(wordSetRef);
    Instance = Instance.data();

    let correctAnswer = eval(`Instance.meaning${index}`);
    let userAnswer = document.getElementById("practice-answer").value;
    if (userAnswer.normalize() === correctAnswer.normalize()) {
        let score_correct = document.getElementById("score-correct").innerHTML;
        let new_score = parseInt(score_correct) + 1;
        document.getElementById("score-correct").innerHTML = new_score.toString();
    }
    else {
        let score_incorrect = document.getElementById("score-incorrect").innerHTML;
        let new_score = parseInt(score_incorrect) + 1;
        document.getElementById("score-incorrect").innerHTML = new_score.toString();
    }
}

//invoked automatically after checkAnswer function done
async function nextQuestion(setid, index){
    const wordSetRef = await doc(db,`flashcards/` + setid);
    let Instance = await getDoc(wordSetRef);
    Instance = Instance.data();
    const setLength = Instance.length;

    let nextIndex = index + 1;
    if (nextIndex === setLength) {
        practiceDone(setLength);
    }
    else {
        document.getElementById("practice-number").value = nextIndex;
        document.getElementById("practice-number").innerText = `${nextIndex + 1}/${setLength}`;
        document.getElementById("practice-question").innerText = eval(`Instance.word${nextIndex}`);
        document.getElementById("practice-answer").value = "";
    }
}

//invoked when practice set last item is done
async function practiceDone(fullscore) {
    let button = document.getElementById("btn-enter");
    button.parentNode.removeChild(button);
    let score = document.createElement("p");
    score.className =  "show-score";
    score.innerText = document.getElementById("score-correct").innerHTML + ' / ' + fullscore.toString();
    document.getElementById("practice-question").innerText = "Your Score";
    document.getElementById("practice-answer").parentNode.replaceChild(score,document.getElementById("practice-answer"));
    let cr = document.getElementById("score-correct").parentNode;
    document.getElementById("score-correct").innerText="   ";
    cr.removeChild(document.getElementById("correct-img"));
    let incr = document.getElementById("score-incorrect").parentNode;
    document.getElementById("score-incorrect").innerText="  ";
    incr.removeChild(document.getElementById("incorrect-img"));
}

//----------------------------------------------Table-------------------------------------------------------------------------
async function gentable(setid){
    let tables = document.getElementById("content");
    let head = document.createElement("thead");head.id = "newcontenthead";
    let headtr = document.createElement("tr");
    let word = document.createElement("th");word.innerText = "Word";
    let meaning = document.createElement("th");meaning.innerText = "Meaning";
    let buttonbox = document.createElement("th");
    headtr.appendChild(word);headtr.appendChild(meaning);headtr.appendChild(buttonbox);head.appendChild(headtr);
    if(document.getElementById("contenthead")){
        let old = document.getElementById("contenthead");
        head.id = "contenthead";
        tables.replaceChild(head,old);
    }
    else {
        head.id = "contenthead";
        tables.appendChild(head);
    }
    let lastrow = document.createElement("tr");lastrow.id = "newlast";
    let input1 = document.createElement("input");input1.type = "text";input1.id = "word-to-add";
    let wordtoadd = document.createElement("td");wordtoadd.appendChild(input1);
    let input2 = document.createElement("input");input2.type = "text";input2.id = "meaning-to-add";
    let meaningtoadd = document.createElement("td");meaningtoadd.appendChild(input2);
    let buttontoadd  = document.createElement("button");buttontoadd.id = "add-newrow";buttontoadd.innerText = "Add";
    buttontoadd.value = setid;
    buttontoadd.onclick =function(){addnewitem(buttontoadd.value);};
    let buttonboxtoadd  = document.createElement("td");buttonboxtoadd.appendChild(buttontoadd);
    lastrow.appendChild(wordtoadd);lastrow.appendChild(meaningtoadd);lastrow.appendChild(buttonboxtoadd);
    if(document.getElementById("last")){
        let old = document.getElementById("last");
        lastrow.id = "last";
        tables.replaceChild(lastrow,old);
    }
    else {
        lastrow.id = "last";
        tables.appendChild(lastrow);
    }

    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset);
    Instance = Instance.data();
    const l = Instance.length;
    for(let i=0;i<l;i++){
        eval(`addnewiteminit(setid,Instance.word`+i+`,Instance.meaning`+i+`,`+i+`)`);
    }
}

async function addItem(setid) {
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset);
    Instance = Instance.data();
    let word = document.getElementById('word-to-add').value;
    let meaning = document.getElementById('meaning-to-add').value;
    let toUpdate;
    eval('toUpdate = { word'+Instance.length+' : word , meaning'+Instance.length+' : meaning, length : Instance.length+1};');
    updateDoc(wordset, toUpdate);
}

async function deleteItem(setid,value) {
        const wordset = await doc(db,`flashcards/${setid}`);
        let Instance = await getDoc(wordset);
        Instance = Instance.data();
        let i = 0;
        let x;
        let b = 1;
        while(b){
            eval(`x = Instance.word`+i+`+Instance.meaning`+i);
            eval(`if(x.normalize()===value.normalize())b=0;`);
            i++;
            if(i >= Instance.length){i = Instance.length;b=0;}
        }
        i--;
        x = i;
        const k = Instance.length - 1;
        await updateDoc(wordset,{
            length : Instance.length - 1
        })
        while(i<k){
            x++;
            eval(`updateDoc(wordset,{
                word`+i+` : Instance.word`+x+`,
                meaning`+i+` : Instance.meaning`+x+`
            })`);
            i++;
        }
}

async function addnewitem(setid){
    //เอาค่าจากที่กรอก
    let textinput1 = document.getElementById("word-to-add");
    let textinput2 = document.getElementById("meaning-to-add");
    let tables = document.getElementById("content");
    let rowid = document.getElementById("last");
    if(textinput1.value=="" && textinput2.value==""){return}
    if(textinput1.value.length > 16 || textinput2.value.length > 16){
        alert("Word and meaning are limited to 16 characters.");
        textinput1.value=""
        textinput2.value=""
        return;
    }
    await addItem(setid);
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset);
    Instance = Instance.data();
    
    let row = tables.insertRow( rowid.rowIndex);
    let newword = document.createElement("td");
    let newmeaning = document.createElement("td");
    let buttonbox  = document.createElement("td");
    let deletebutton  = document.createElement("button");

    deletebutton.innerText="delete"
    deletebutton.value=textinput1.value+textinput2.value;//เป็น docid 
    
    deletebutton.onclick=function(){
        deleteItem(setid,deletebutton.value);
        var row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
    deletebutton.setAttribute("class","delete-row");
    buttonbox.appendChild(deletebutton);
    newword.innerText=textinput1.value;
    newmeaning.innerText=textinput2.value;
    row.appendChild(newword);
    row.appendChild(newmeaning);
    row.appendChild(buttonbox);
   textinput1.value=""
   textinput2.value=""
   
}

async function addnewiteminit(setid,word, meaning,docid){
    let tables = document.getElementById("content");
    let rowid = document.getElementById("last");
    var v= docid;
    let row = tables.insertRow( rowid.rowIndex);
    let newword = document.createElement("td");
    let newmeaning = document.createElement("td");
    let buttonbox  = document.createElement("td");
    let deletebutton  = document.createElement("button");
    deletebutton.innerText="delete";
    deletebutton.value=word+meaning;
    buttonbox.value = setid;
    deletebutton.onclick=function(){
        deleteItem(buttonbox.value,deletebutton.value);
        var row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
    }
    deletebutton.setAttribute("class","delete-row")
    buttonbox.appendChild(deletebutton);
    newword.innerText=word;
    newmeaning.innerText=meaning;
    row.appendChild(newword);
    row.appendChild(newmeaning);
    row.appendChild(buttonbox);
}   

window.login = login;