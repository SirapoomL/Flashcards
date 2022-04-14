export function initVocabSet(){
    input_container = document.querySelectorAll(".container")[0];
    add_block = document.querySelector(".addblock");
    add_block.querySelector('.addnewblock').addEventListener("click", function (event) {
        callBackAddMainBlock();
    });
}

export function addNewMainBlock() {

    input_container.insertBefore(element, add_block);
}

export function callBackAddMainBlock() {
	const key = add_block.querySelector(".input-name").value;
	if (key == "") return;
    
	element = createBlock();
	input_container.insertBefore(element, add_block);
	// createPerson()
	// addPerson()
}

