$("#ajouter-br").click(function ()
{ 
  var typebrevet=$("#t-b").val();
  var numérobrevet=$("#num-b").val();
  var numérodépot=$("#num-dépot").val();
  var titrebrevet=$("#titre-b").val();
  var annéebrevet=$("#année-b").val();
  var auteursbrevet=$("#auteur-b").val();
  var institutiondedépot=$("#inst-b").val();
  var valeurdebrevet=$("#valeur-b").val();
 
  var idBrevet=numérobrevet.value || Date.now();

  var rootRefBrevet=firebase.database().ref().child("/Brevet");
  var userID=firebase.auth().currentUser.uid;
  var BrevetRef=rootRefBrevet.child(idBrevet); 
  
  if(typebrevet!="" && numérobrevet!="" && numérodépot!="" && titrebrevet!="" && annéebrevet!=""&& 
  auteursbrevet!=""&& institutiondedépot!=""&& valeurdebrevet!="")
  {
    BrevetData=
    {
    "propriétaire":userID,
    "typebrevet": typebrevet,
    "numérobrevet": numérobrevet,
    "numérodépot": numérodépot,
    "titrebrevet": titrebrevet,
    "annéebrevet": annéebrevet,
    "auteursbrevet": auteursbrevet,
    "institutiondedépot": institutiondedépot,
    "valeurdebrevet": valeurdebrevet,
    "créerà": firebase.database.ServerValue.TIMESTAMP
    };
    BrevetRef.set(BrevetData,function(error) 
   {
    if(error){ 
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log("errorCode");
      console.log("errorMessage");
      window.alert("Message:"+errorMessage);
             }
      else{
        window.alert("Brevet ajouté");
           }

});
}
else{
   window.alert("veuillez complétez les champs à fin d'enregistrer les informations.");
  }
});

//afficher les ouvrages pour l'utilisateur
const modalWrapperb=document.querySelector('.modal-wrapper-b');
const editModalb = document.querySelector('.edit-modal-b');
const editModalFormb = document.querySelector('.edit-modal-b .form');

//afficher les ouvrages dans le tableau des ouvrages
const tableusersb =document.querySelector('.table-users-b');
let identifers;
const renderbrev = dics =>{
const tr=`
<tr donnée-id='${dics.key}'>
          <td>${dics.child("typebrevet").val()}</td>
          <td>${dics.child("numérobrevet").val()}</td>
          <td>${dics.child("numérodépot").val()}</td>
          <td>${dics.child("titrebrevet").val()}</td>
          <td>${dics.child("annéebrevet").val()}</td>
          <td>${dics.child("auteursbrevet").val()}</td>
          <td>${dics.child("institutiondedépot").val()}</td>
          <td>${dics.child("valeurdebrevet").val()}</td>
          <td>
             <button class="btn btn-edit-b">Modifier</button>
             <button class="btn btn-delete-b">Supprimer</button>
          </td>
</tr>
`;
tableusersb.insertAdjacentHTML("beforeend",tr);
//modifier la publication dans la revue

const btnEditb=document.querySelector(`[donnée-id='${dics.key}'] .btn-edit-b`);
btnEditb.addEventListener('click', ()=>{
editModalb.classList.add('modal-show');
//changement
identifers=dics.key;
editModalFormb.nnumb.value=dics.child("numérobrevet").val();
editModalFormb.nndb.value=dics.child("numérodépot").val();
editModalFormb.ntb.value=dics.child("titrebrevet").val();
editModalFormb.nab.value=dics.child("annéebrevet").val();
editModalFormb.naub.value=dics.child("auteursbrevet").val();
editModalFormb.nidpb.value=dics.child("institutiondedépot").val();
editModalFormb.nvab.value=dics.child("valeurdebrevet").val();
});
//supprimer une publication dans une revue
const btnDeleteb=document.querySelector(`[donnée-id='${dics.key}'] .btn-delete-b`);
btnDeleteb.addEventListener('click', ()=>{
firebase.database().ref("Brevet").child(dics.key).remove().then(()=>{
window.alert("Le brevet est supprimée");
}).catch(err=>{
  console.log("error",err);
});
});
}
firebase.database().ref().child("Brevet").on("value",function(snapshot)
{
  snapshot.forEach(dics => {
    renderbrev(dics);
})
});

//Changer la base de données avec les nouvelles valeurs de l'ouvrage

editModalFormb.addEventListener("submit",e=>{
  e.preventDefault();
  var rootRefb=firebase.database().ref().child("/Brevet");
  var newtb = $("#newtb").val();
 const newDatab=
  {
    typebrevet:newtb,
    numérobrevet:editModalFormb.nnumb.value,
    numérodépot:editModalFormb.nndb.value,
    titrebrevet:editModalFormb.ntb.value,
    annéebrevet:editModalFormb.nab.value,
    auteursbrevet:editModalFormb.naub.value,
    institutiondedépot:editModalFormb.nidpb.value,
    valeurdebrevet:editModalFormb.nvab.value
  }
    rootRefb.child(identifers).update(newDatab);
    editModalb.classList.remove('modal-show');
 });