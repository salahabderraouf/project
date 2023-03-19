


// utilisateur click anywhere to exit the model of publications dans des revues
window.addEventListener('click',n=>{
  if(n.target===editModal){
  editModal.classList.remove('modal-show');
}
});
//utilisateur clickanywhere to exit the model of Ouvrages

window.addEventListener('click',n=>{
  if(n.target===editModalo){
  editModalo.classList.remove('modal-show');
}
});

// user click anywhere to exit the brevet modal
window.addEventListener('click',n=>{
  if(n.target===editModalb){
  editModalb.classList.remove('modal-show');
}
});

//user click anywhere to exit the conference modal
window.addEventListener('click',n=>{
if(n.target===editModalc){
  editModalc.classList.remove('modal-show');
}
});

//user click anywhere to exit the Workshop modal
window.addEventListener('click',n=>{
  if(n.target===editModalw){
    editModalw.classList.remove('modal-show');
  }
  });

  //admin click anywhere to exit the equipe modal
window.addEventListener('click',n=>{
  if(n.target===editModale){
    editModale.classList.remove('modal-show');
  }
  });

    //chef équipe click anywhere to exit the membre modal
window.addEventListener('click',n=>{
  if(n.target===editModalmembre){
    editModalmembre.classList.remove('modal-show');
  }
  });
  