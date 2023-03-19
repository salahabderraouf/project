$("#ajouter-work").click(function ()
{ 
  var typeworkshop=$("#t-work").val();
  var nomWorkshop=$("#nom-work").val();
  var titredeworkshop=$("#titre-work").val();
  var annéeworkshop=$("#année-work").val();
  var urlworkshop=$("#url-work").val();
  var nompartworkshop=$("#nomparticipant-work").val();
  var partworkshop=$("#part-work").val();
  var valeurworkshop=$("#valeur-work").val();
  var idworkshop=typeworkshop.value || Date.now();

  var rootRefWorkshop=firebase.database().ref().child("/Workshops");
  var userID=firebase.auth().currentUser.uid;
  var WorkRef=rootRefWorkshop.child(idworkshop); 
  
  if(typeworkshop!="" && nomWorkshop!="" && titredeworkshop!="" && annéeworkshop!="" && urlworkshop!=""&& 
  nompartworkshop!=""&& partworkshop!=""&& valeurworkshop!="")
  {
    WorkshopData=
    {
    "propriétaire":userID,
    "typeworkshop": typeworkshop,
    "nomWorkshop": nomWorkshop,
    "titredeworkshop": titredeworkshop,
    "annéeworkshop": annéeworkshop,
    "urlworkshop": urlworkshop,
    "nompartworkshop": nompartworkshop,
    "partworkshop": partworkshop,
    "valeurworkshop": valeurworkshop,
    "créerà": firebase.database.ServerValue.TIMESTAMP
    };
    WorkRef.set(WorkshopData,function(error) 
   {
    if(error){ 
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log("errorCode");
      console.log("errorMessage");
      window.alert("Message:"+errorMessage);
             }
      else{
        window.alert("Workshop ajouté");
           }

});
}
else{
   window.alert("veuillez complétez les champs à fin d'enregistrer les informations.");
  }
});

//afficher les Conférence pour l'utilisateur
const modalWrapperw=document.querySelector('.modal-wrapper-w');
const editModalw = document.querySelector('.edit-modal-w');
const editModalFormw = document.querySelector('.edit-modal-w .form');

//afficher les conférences dans le tableau des conférences
const tableusersw =document.querySelector('.table-users-w');
let un;
const renderwork = duco =>{
const tr=`
<tr do-id='${duco.key}'>
          <td>${duco.child("typeworkshop").val()}</td>
          <td>${duco.child("nomWorkshop").val()}</td>
          <td>${duco.child("titredeworkshop").val()}</td>
          <td>${duco.child("annéeworkshop").val()}</td>
          <td>${duco.child("urlworkshop").val()}</td>
          <td>${duco.child("nompartworkshop").val()}</td>
          <td>${duco.child("partworkshop").val()}</td>
          <td>${duco.child("valeurworkshop").val()}</td>
          <td>
             <button class="btn btn-edit-w">Modifier</button>
             <button class="btn btn-delete-w">Supprimer</button>
          </td>
</tr>
`;
tableusersw.insertAdjacentHTML("beforeend",tr);
//modifier la publication dans la revue
const btnEditw=document.querySelector(`[do-id='${duco.key}'] .btn-edit-w`);
btnEditw.addEventListener('click', ()=>{
editModalw.classList.add('modal-show');
//changement
un=duco.key;
editModalFormw.nnomw.value=duco.child("nomWorkshop").val();
editModalFormw.ntitrew.value=duco.child("titredeworkshop").val();
editModalFormw.nannéw.value=duco.child("annéeworkshop").val();                                          
editModalFormw.nurlw.value=duco.child("urlworkshop").val();
editModalFormw.nnomsparw.value=duco.child("nompartworkshop").val();
editModalFormw.npartw.value=duco.child("partworkshop").val();
editModalFormw.nvaleurw.value=duco.child("valeurworkshop").val();
});
//supprimer une publication dans une revue
const btnDeletew=document.querySelector(`[do-id='${duco.key}'] .btn-delete-w`);
btnDeletew.addEventListener('click', ()=>{
firebase.database().ref("Workshops").child(duco.key).remove().then(()=>{
window.alert("Le Workshop est supprimé");
}).catch(err=>{
  console.log("error",err);
});
});
}
firebase.database().ref().child("Workshops").on("value",function(snapshot)
{
  snapshot.forEach(duco => {
    renderwork(duco);
})
});

//Changer la base de données avec les nouvelles valeurs de l'ouvrage

editModalFormw.addEventListener("submit",e=>{
  e.preventDefault();
  var rootRefWo=firebase.database().ref().child("/Workshops");
  var newtw = $("#newtw").val();

const newDataw=
  {
    typeworkshop:newtw,
    nomWorkshop:editModalFormw.nnomw.value,
    titredeworkshop:editModalFormw.ntitrew.value,
    annéeworkshop:editModalFormw.nannéw.value,
    urlworkshop:editModalFormw.nurlw.value,
    nompartworkshop:editModalFormw.nnomsparw.value,
    partworkshop:editModalFormw.npartw.value,
    valeurworkshop:editModalFormw.nvaleurw.value
  }
    rootRefWo.child(un).update(newDataw);
    editModalw.classList.remove('modal-show');
 });