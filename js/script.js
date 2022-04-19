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
// const db = firebase.firestore();
const flashcards = collection(db, 'flashcards');

//----------------------------------------------My set-------------------------------------------------------------------------

async function genMySet(){
    const setList = await doc(db,`flashcards/LPGlXHRwJIOvjp3zg0sL`);
    let Instance = await getDoc(setList);
    Instance = Instance.data();
    const l = Instance.count;
    let name;let id;
    for(let i=0;i<l;i++){
        eval(`name = Instance.name`+i);
        eval(`id = Instance.id`+i);
        genSet(name,id);
        // document.getElementById(`container`).appendChild(genSet(name,id));
    }
    let div  = document.createElement(`div`);div.className = "addblock";div.id = "newblock";
    let text = document.createElement(`p`);text.className = "textInTextBox";text.innerText = "NEW SET";
    let input = document.createElement(`input`);input.type = "text";input.placeholder="Type here ...";
    input.id = "nameofset";input.style="width: 98%";
    let button = document.createElement(`button`);button.className = "btn-add-new-block";
    button.onclick=function(){createSet();};
    div.appendChild(text);
    div.appendChild(document.createElement(`br`));
    div.appendChild(document.createElement(`br`));
    div.appendChild(input);
    div.appendChild(button);
    document.getElementById(`container`).appendChild(div);
}

async function genSet(name,id){
    let div  = document.createElement(`div`);div.className = "addblock";div.id = "addblock";
    let del = document.createElement(`button`);del.className = "delSet";del.id = "delSet";
    del.value = id;del.onclick = function(){deleteSet(del.value);edit.parentNode.parentNode.removeChild(edit.parentNode);};
    let edit = document.createElement(`button`);edit.className = "editSet";del.id = "editSet";
    edit.value = id;edit.onclick = function(){editSet(edit.value);};
    let text = document.createElement(`p`);text.className = "textInTextBox";text.innerText = name;
    let learning = document.createElement(`button`);learning.className = "learningSet";
    learning.id = "learningSet";learning.innerText = "Learning";learning.value = id;
    let practice = document.createElement(`button`);practice.className = "practiceSet";
    practice.id = "practiceSet";practice.innerText = "Practice";practice.value = id;
    div.appendChild(del);
    div.appendChild(edit);
    div.appendChild(text);
    div.appendChild(learning);
    div.appendChild(practice);
    // return div;
    document.getElementById(`container`).appendChild(div);
}

async function createSet(){
    let tables = document.getElementById("content");
    tables.deleteTHead();
    const x = tables.rows.length;
    for(let i = 0;i < x;i++){
        tables.deleteRow(0);
    }
    const l = 0;
    const docRef = await addDoc(collection(db, "flashcards"), {
    name: document.getElementById(`nameofset`).value,
    length : l
    });
  
    const setList = await doc(db,`flashcards/LPGlXHRwJIOvjp3zg0sL`);
    let Instance = await getDoc(setList);
    Instance = Instance.data();
    const len = Instance.count;
    eval(`updateDoc(setList,{
        name`+len+` : document.getElementById("nameofset").value,
        id`+len+` : docRef.id,
        count : Instance.count+1
    })`)

    
    let div  = document.createElement(`div`);div.className = "addblock";div.id = "addblock";
    let del = document.createElement(`button`);del.className = "delSet";del.id = "delSet";
    del.value = docRef.id;del.onclick = function(){deleteSet(del.value);edit.parentNode.parentNode.removeChild(edit.parentNode);};
    let edit = document.createElement(`button`);edit.className = "editSet";del.id = "editSet";
    edit.value = docRef.id;edit.onclick = function(){editSet(edit.value);};
    let text = document.createElement(`p`);text.className = "textInTextBox";text.innerText = document.getElementById(`nameofset`).value;
    let learning = document.createElement(`button`);learning.className = "learningSet";
    learning.id = "learningSet";learning.innerText = "Learning";learning.value = docRef.id;
    let practice = document.createElement(`button`);practice.className = "practiceSet";
    practice.id = "practiceSet";practice.innerText = "Practice";practice.value = docRef.id;
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
    let tables = document.getElementById("content");
    tables.deleteTHead();
    const x = tables.rows.length;
    for(let i = 0;i < x;i++){
        tables.deleteRow(0);
    }
    const setList = await doc(db,`flashcards/LPGlXHRwJIOvjp3zg0sL`);
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
    i++;l--;
    while(k<l){
        i++;
        // console.log(i);
        eval(`updateDoc(setList,{
            name`+k+` : Instance.name`+i+`,
            id`+k+` : Instance.id`+i+`
        })`);
        k++;
    }
}

async function editSet(setid){
    let tables = document.getElementById("content");
    tables.deleteTHead();
    const x = tables.rows.length;
    for(let i = 0;i < x;i++){
        tables.deleteRow(0);
    }
    gentable(setid);
}
//----------------------------------------------Learning & Practice------------------------------------------------------------
//when click learning button in particular set on My Set
async function showLearning(setid){
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset).docs;

    if (Instance.length > 0) {
        let word = Instance.word[0];
        let meaning = Instance.meaning[0];
        document.getElementById("learning-vocab").value = word;
        document.getElementsById("learning-meaning").value = meaning;
    }
}

//when click practice button in particular set on My Set
async function showPractice(setid){
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset).docs;

    if (Instance.length > 0) {
        let word = Instance.word[0];
        document.getElementById("practice-question").value = word;
        document.getElementsById("learning-meaning").value = meaning;
    }
}

//when click next item button in learning section
async function nextItem(setid, index){
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset).docs;

    let nextIndex = index + 1;
    if (nextIndex === Instance.length) {
        nextIndex = 0;
    }
    let word = Instance.word[nextIndex];
    let meaning = Instance.meaning[nextIndex];
    document.getElementById("learning-number").value = nextIndex + 1;
    document.getElementById("learning-vocab").value = word;
    document.getElementsById("learning-meaning").value = meaning;
}

//when click previous item button in learning section
async function prevItem(setid, index){
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset).docs;

    let prevIndex = index - 1;
    if (prevIndex < 0) {
        prevIndex = Instance.length - 1;
    }
    let word = Instance.word[prevIndex];
    let meaning = Instance.meaning[prevIndex];
    document.getElementById("learning-number").value = prevIndex + 1;
    document.getElementById("learning-vocab").value = word;
    document.getElementsById("learning-meaning").value = meaning;
}

//when click enter to check answer in practice section
async function checkAnser(setid, index){
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset).docs;

    let correctAnser = Instance.meaning[index];
    let userAnswer = document.getElementById("practice-answer").value;
    if (userAnswer === correctAnser) {
        let score_correct = document.getElementById("score-correct").value;
        let new_score = parseInt(score_correct) + 1;
        document.getElementById("score-correct").value = new_score.toString();
    }
    else {
        let score_incorrect = document.getElementById("score-incorrect").value;
        let new_score = parseInt(score_incorrect) + 1;
        document.getElementById("score-incorrect").value = new_score.toString();
    }
    nextQuestion(setid, index);
}

//invoked automatically after checkAnswer function done
async function nextQuestion(setid, index){
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset).docs;

    let nextIndex = index + 1;
    if (nextIndex === Instance.length) {
        practiceDone();
    }

    let word = Instance.word[nextIndex];
    document.getElementById("practice-number").value = nextIndex + 1;
    document.getElementById("practice-question").value = word;
    document.getElementById("practice-answer").value = "";
}

//invoked when practice set last item is done
async function practiceDone() {
    
}
//----------------------------------------------Table-------------------------------------------------------------------------

// export var check = [];

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
        // console.log('replace');
    }
    else {
        head.id = "contenthead";
        tables.appendChild(head);
        // console.log('new');
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
        // console.log('replace');
    }
    else {
        lastrow.id = "last";
        tables.appendChild(lastrow);
        // console.log('new');
    }

    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset);
    Instance = Instance.data();
    const l = Instance.length;
    for(let i=0;i<l;i++){
        eval(`addnewiteminit(Instance.word`+i+`,Instance.meaning`+i+`,`+i+`)`);
    }
    // const start = await getDocs(flashcards);
    // let pos = 0;
    // for(pos=0;((start.docs[i].data()).name) != name;i++);
    // for(let i=0;i<start.docs.length;i++){
    //    var row = start.docs[pos].data();
    //   // console.log(tmp.data())
    //     addnewiteminit(row.word[i],row.owner,row.id)
    //     // check.push("row")
    // }
}

async function addItem(setid) {
// //     console.log('addItem');
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset);
    Instance = Instance.data();
    let word = document.getElementById('word-to-add').value;
    let meaning = document.getElementById('meaning-to-add').value;
    let toUpdate;
    eval('toUpdate = { word'+Instance.length+' : word , meaning'+Instance.length+' : meaning, length : Instance.length+1};');
    updateDoc(wordset, toUpdate);
    // const collectionn = collection(db, `flashcards/${setid}`);
    // let pos = 0;
    // for(pos=0;((start.docs[i].data()).name) != name;i++);
    // eval("var word"+Instance.length) = document.getElementById('word-to-add').value;
    // window['word'+Instance.length]= document.getElementById('word-to-add').value;
    // window['meaning'+Instance.length]= document.getElementById('meaning-to-add').value;
    // eval("var word"+Instance.length + "= 'cat';");
    // eval("var meaning"+Instance.length + "= document.getElementById('meaning-to-add').value;");
    // const word = document.getElementById('word-to-add').value;
    // const meaning = document.getElementById('meaning-to-add').value;
    // if(database.docs[setid].data().length == 50)return;
    // database.docs[setid].data().word[length] = word;
    // database.docs[setid].data().meaning[length] = meaning;
    // database.docs[setid].data().length = database.docs[setid].data().length+1;
    // updateDoc(Instance.length,Instance.length+1);
    // Instance = await getDoc(wordset);
    // addDoc(flashcards,word);
    // eval("updateDoc(wordset,{word["+Instance.length+"] : word"+Instance.length+",meaning["+Instance.length+"] : meaning"+Instance.length+"});");
//     //ตรงนี้เอาไว้เช็คว่าidไหนคืออันล่าสุดที่ยังไม่ใส่
//     for(let i=0;i<start.docs.length;i++){
//         let x =false
//         for(let j=0;j<check.length;j++){
//             if(check[j]==(""+start.docs[i].id)){
//                 x=true;
//                 break;
//             }
//         }
//         if(x==false){
//             check.push(""+start.docs[i].id)
//             console.log(check[check.length-1])
//             break
//         }
//     }
}

async function deleteItem(setid,value) {
        const wordset = await doc(db,`flashcards/${setid}`);
        let Instance = await getDoc(wordset);
        Instance = Instance.data();
        let i = 0;
        console.log(value);
        let x;
        let b = 1;
        while(b){
            eval(`x = Instance.word`+i+`+Instance.meaning`+i);
            console.log(x);
            eval(`if(x.normalize()===value.normalize())b=0;`);
            i++;
            if(i >= Instance.length){i = Instance.length;b=0;}
        }
        i--;
        // eval(`while(i<Instance.length && Instance.word`+i+`+Instance.meaning`+i+`!=value){i++;console.log(i);}`);
        x = i;
        const k = Instance.length - 1;
        await updateDoc(wordset,{
            length : Instance.length - 1
        })
        while(i<k){
            x++;
            // console.log(i);
            eval(`updateDoc(wordset,{
                word`+i+` : Instance.word`+x+`,
                meaning`+i+` : Instance.meaning`+x+`
            })`);
            i++;
        }
        // var row = this.parentNode.parentNode;
        // row.parentNode.removeChild(row);
//     console.log('deleteItem');
//     const it = await getDocs(booksRef);
//     const docId =""+ bookmark

//     const docRef = doc(db, `items/${docId}`);

//     await deleteDoc(docRef);
}

async function addnewitem(setid){
    //เอาค่าจากที่กรอก
    let textinput1 = document.getElementById("word-to-add");
    let textinput2 = document.getElementById("meaning-to-add");
    let tables = document.getElementById("content");
    let rowid = document.getElementById("last");
    if(textinput1.value=="" && textinput2.value==""){return}
    
    //ใส่ค่าในfirebase และรอจนเสร็จ
    await addItem(setid);
    // let iddd = "5M1JLKmEGPnlwDOVNT9o";
    const wordset = await doc(db,`flashcards/${setid}`);
    let Instance = await getDoc(wordset);
    Instance = Instance.data();
    // let word = document.getElementById('word-to-add').value;
    // let meaning = document.getElementById('meaning-to-add').value;
    // let toUpdate;
    // eval('toUpdate = { word'+Instance.length+' : word , meaning'+Instance.length+' : meaning, length : Instance.length+1};');
    //สร้างelementต่างๆในตาราง พวก row (trมั้ง?) ช่องข้อมูลในrow (td?) ปุ่ม
    
    let row = tables.insertRow( rowid.rowIndex);
    let newword = document.createElement("td");
    let newmeaning = document.createElement("td");
    let buttonbox  = document.createElement("td");
    let deletebutton  = document.createElement("button");

    deletebutton.innerText="delete"
    deletebutton.value=textinput1.value+textinput2.value;//เป็น docid 
    
    deletebutton.onclick=function(){
        deleteItem(setid,deletebutton.value);//{//ตรงนี้เป็นฟังก์ชั่นลบrow+ลบข้อมูลในfirebase
        var row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
        // deleteItem(newbutton.value);
    //     let i = value;
    //     const wordset = await doc(db,`flashcards/${setid}`);
    //     let wordInstance = await getDoc(wordset);
    //     let Instance = wordInstance.data();
    //     updateDoc(wordset,{
    //         length : length - 1
    //     })
    //     while(i!=Instance.length){
    //         eval(`updateDoc(wordset,{
    //             word`+i+` : word`+i+1+`,
    //             meaning`+i+` : meaning`+i+1+`
    //         })`);
    //         i = i+1;
    //     }
    }
    deletebutton.setAttribute("class","delete-row");
    buttonbox.appendChild(deletebutton);
    //เติมค่าในแถวใหม่
    newword.innerText=textinput1.value;
    newmeaning.innerText=textinput2.value;
    row.appendChild(newword);
    row.appendChild(newmeaning);
    row.appendChild(buttonbox);
    //reset ค่าที่กรอกไป
    
//    updateDoc(wordset, toUpdate);
   textinput1.value=""
   textinput2.value=""
   
}

async function addnewiteminit(word, meaning,docid){
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
    deletebutton.onclick=function(){
        deleteItem('5M1JLKmEGPnlwDOVNT9o',deletebutton.value);//{//ตรงนี้เป็นฟังก์ชั่นลบrow+ลบข้อมูลในfirebase
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

genMySet();

window.addnewitem = addnewitem;