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

// export async function addItem() {
//     console.log('addItem');
//     const start = await getDocs(flashcards);
//     let pos = 0;
//     for(pos=0;((start.docs[i].data()).name) != name;i++);
//     const word = document.getElementById('word-to-add').value;
//     const meaning = document.getElementById('meaning-to-add').value;
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
// }

// export async function deleteItem(bookmark) {
//     console.log('deleteItem');
//     const it = await getDocs(booksRef);
//     const docId =""+ bookmark

//     const docRef = doc(db, `items/${docId}`);

//     await deleteDoc(docRef);
// }

export async function addnewitem(){
    //เอาค่าจากที่กรอก
    let textinput1 = document.getElementById("word-to-add");
    let textinput2 = document.getElementById("meaning-to-add");
    let tables = document.getElementById("content");
    let rowid = document.getElementById("last");
    if(textinput1.value=="" && textinput2.value==""){return}
    
    //ใส่ค่าในfirebase และรอจนเสร็จ
    await addItem();

    //สร้างelementต่างๆในตาราง พวก row (trมั้ง?) ช่องข้อมูลในrow (td?) ปุ่ม
   
//     let row = tables.insertRow( rowid.rowIndex);
//     let newgood = document.createElement("td");
//     let newprice = document.createElement("td");
//     let newname = document.createElement("td");
//     let newbuttonbox  = document.createElement("td");
//     let newbutton  = document.createElement("button");
//     newbutton.innerText="ลบ"
//     newbutton.value=check[check.length-1]//เป็น docid 
    
//     newbutton.onclick=function(){//ตรงนี้เป็นฟังก์ชั่นลบrow+ลบข้อมูลในfirebase
//         deleteItem(newbutton.value);
//         var row = this.parentNode.parentNode;
//         row.parentNode.removeChild(row);
        
//     }
//     newbutton.setAttribute("class","delete-row")
//     newbuttonbox.appendChild(newbutton);
//     //เติมค่าในแถวใหม่
//     newgood.innerText=textinput1.value;
//     newprice.innerText=textinput2.value;
//     newname.innerText=dropdown.value;
//     row.appendChild(newgood);
//     row.appendChild(newname);
//     row.appendChild(newprice);
//     row.appendChild(newbuttonbox);
//     //reset ค่าที่กรอกไป
//    textinput1.value=""
//    textinput2.value=""
//    dropdown.value="--เลือกชิ่อผู้ฝากซื้อ--"
   
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
    newbuttonbox.appendChild(deletebutton);
    newword.innerText=word;
    newmeaning.innerText=meaning;
    row.appendChild(newword);
    row.appendChild(newmeaning);
    row.appendChild(newbuttonbox);
}   