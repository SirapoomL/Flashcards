/*Main Block*/
export function createMainBlock(){
    const main = document.createElement("div");
    main.classList.add("main-block");
    main.appendChild(createDeleteBtn());
    main.appendChild(createEditBtn());
    main.appendChild(createLearnBtn());
    main.appendChild(createPracticeBtn());
	return main;
}


/*Each Block*/
function createBlock(){


}

/*Delete Button*/
function createDeleteBtn(){
    const button = document.createElement("button");
    button.insertAdjacentText("beforeend", "");
    button.addEventListener("click",(e) =>{
       // callBackDelBlock(button);
    });
    return button;
}

/*Edit Button*/
function createEditBtn(){
    const button = document.createElement("button");
    button.insertAdjacentText("beforeend", "");
    button.addEventListener("click",(e) =>{
        //vocabulary
    });
    return button;
}

/*Learn Button*/
function createLearnBtn(){
    const button = document.createElement("button");
    button.insertAdjacentText("beforeend", "");
    button.addEventListener("click",(e) =>{
        //learning
    });
    return button;
}

/*Practice Button*/
function createPracticeBtn(){
    const button = document.createElement("button");
    button.insertAdjacentText("beforeend", "");
    button.addEventListener("click",(e) =>{
        //practice
    });
    return button;
}


