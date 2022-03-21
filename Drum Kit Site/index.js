numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (i = 0; i < numberOfDrumButtons; i++){

    document.querySelectorAll(".drum")[i].addEventListener("click", function(){

        var drumButton = this.innerHTML;
        makeSound(drumButton);
        buttonAnimation(drumButton);
    });
}


//event tem várias propriedades, entre elas saber qual letra do teclado foi clicada.
document.addEventListener("keydown", function(event){
    console.log(event);
    makeSound(event.key);
    buttonAnimation(event.key);
});



function makeSound(key){

    switch (key) {
        case "w":
            var audio1 = new Audio("sounds/tom-1.mp3");
            audio1.play();
            break;
        case "a":
            var audio2 = new Audio("sounds/tom-2.mp3");
            audio2.play();
            break;                
        case "s":
            var audio3 = new Audio("sounds/tom-3.mp3");
            audio3.play();
            break;
        case "d":
            var audio4 = new Audio("sounds/tom-4.mp3");
            audio4.play();
            break;
        case "j":
            var audio5 = new Audio("sounds/snare.mp3");
            audio5.play();
            break;
        case "k":
            var audio6 = new Audio("sounds/crash.mp3");
            audio6.play();
            break;
        case "l":
            var audio7 = new Audio("sounds/kick-bass.mp3");
            audio7.play();
            break;
        default:
            break;
    }


}

function buttonAnimation(currentKey) {

    //vamos selecionar por classe do botão
   var activeButton =  document.querySelector("." + currentKey);

   activeButton.classList.add("pressed");

   //queremos que, após 1 seg, o estilo volte ao normal para parecer uma animação:
   setTimeout(function(){
       activeButton.classList.remove("pressed");
   }, 100);

}