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
    // collection,
    // deleteDoc,
    // doc,
    // getDoc,
    // getDocs,
    // getFirestore,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";


const db = getFirestore();  
// const db = firebase.firestore();
const flashcards = collection(db, 'flashcards');

//--------------------------------------------------------------------------------------------------------------

export var check = [];

export async function gentable(name){
    const start = await getDocs(flashcards);
    let pos = 0;
    for(pos=0;((start.docs[i].data()).name) != name;i++);
    for(let i=0;i<start.docs.length;i++){
       var row = start.docs[pos].data();
      // console.log(tmp.data())
        addnewiteminit(row.word[i],row.owner,row.id)
        check.push("row")
    }
}

async function del(btn){
//     console.log('del');
//     var row = btn.parentNode.parentNode;
//         row.parentNode.removeChild(row);
}

export async function addItem(setid) {
// //     console.log('addItem');
    const wordset = await doc(db,`flashcards/${setid}`);
    let wordInstance = await getDoc(wordset);
    let Instance = wordInstance.data();
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

export async function deleteItem(setid,value) {
        let i = value;let x = i;
        const wordset = await doc(db,`flashcards/${setid}`);
        let wordInstance = await getDoc(wordset);
        let Instance = wordInstance.data();
        const k = Instance.length - 1;
        await updateDoc(wordset,{
            length : Instance.length - 1
        })
        while(i<k){
            x++;
            console.log(i);
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

async function addnewitem(){
    //เอาค่าจากที่กรอก
    let textinput1 = document.getElementById("word-to-add");
    let textinput2 = document.getElementById("meaning-to-add");
    let tables = document.getElementById("content");
    let rowid = document.getElementById("last");
    if(textinput1.value=="" && textinput2.value==""){return}
    
    //ใส่ค่าในfirebase และรอจนเสร็จ
    await addItem("5M1JLKmEGPnlwDOVNT9o");
    // let iddd = "5M1JLKmEGPnlwDOVNT9o";
    const wordset = await doc(db,`flashcards/5M1JLKmEGPnlwDOVNT9o`);
    let wordInstance = await getDoc(wordset);
    let Instance = wordInstance.data();
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
    deletebutton.value=Instance.length-1;//เป็น docid 
    
    deletebutton.onclick=function(){
        deleteItem('5M1JLKmEGPnlwDOVNT9o',deletebutton.value);//{//ตรงนี้เป็นฟังก์ชั่นลบrow+ลบข้อมูลในfirebase
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
         var row = this.parentNode.parentNode;
        row.parentNode.removeChild(row);
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

export async function addnewiteminit(word, meaning,docid){
    let tables = document.getElementById("content");
    let rowid = document.getElementById("last");
    var v= docid;
    let row = tables.insertRow( rowid.rowIndex);
    let newword = document.createElement("td");
    let newmeaning = document.createElement("td");
    let buttonbox  = document.createElement("td");
    let deletebutton  = document.createElement("button");
    deletebutton.innerText="delete"
    deletebutton.value=v
    deletebutton.onclick=function(){
        deleteItem(deletebutton.value);
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



window.addnewitem = addnewitem;