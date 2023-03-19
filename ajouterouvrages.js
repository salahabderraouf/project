
$("#ajouterouvrage").click(function ()
{ 
  var typeouvrage=$("#t-o").val();
  var numéroouvrage=$("#n-o").val();
  var isbnouvrage=$("#isbn-o").val();
  var editeurcommercial=$("#ec-o").val();
  var annéeouvrage=$("#année-o").val();
  var nomrevue=$("#nr-o").val();
  var auteur=$("#auteur-o").val();
  var nbrauteur=$("#nbraut-o").val();
  var partauteur=$("#part-o").val();
  var indicedecollaboration=$("#icoll-o").val();
  var valeurouvrage=$("#val-o").val();
  var idOuvrage=numéroouvrage.value || Date.now();

  var rootRefOuvrage=firebase.database().ref().child("/Ouvrages");
  var userID=firebase.auth().currentUser.uid;
  var OuvragesRef=rootRefOuvrage.child(idOuvrage); 
  
  if(typeouvrage!="" && numéroouvrage!="" && isbnouvrage!="" && editeurcommercial!="" && annéeouvrage!=""&& 
  nomrevue!=""&& auteur!=""&& nbrauteur!=""&& partauteur!=""&& indicedecollaboration!="" && valeurouvrage!="")
  {
    OuvragesData=
    {
    "publieur":userID,
    "typeouvrage": typeouvrage,
    "numéroouvrage": numéroouvrage,
    "isbnouvrage": isbnouvrage,
    "editeurcommercial": editeurcommercial,
    "annéeouvrage": annéeouvrage,
    "nomrevue": nomrevue,
    "auteur": auteur,
    "nbrauteur": nbrauteur,
    "partauteur": partauteur,
    "indicedecollaboration": indicedecollaboration,
    "valeurouvrage": valeurouvrage,
    "créerà": firebase.database.ServerValue.TIMESTAMP
    };
    OuvragesRef.set(OuvragesData,function(error) 
   {
    if(error){ 
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log("errorCode");
      console.log("errorMessage");
      window.alert("Message:"+errorMessage);
             }
      else{
        window.alert("ok");
           }

});
}
else{
   window.alert("veuillez complétez les champs à fin d'enregistrer les informations.");
  }
});

//afficher les ouvrages pour l'utilisateur
const modalWrappero=document.querySelector('.modal-wrapper-o');
const editModalo = document.querySelector('.edit-modal-o');
const editModalFormo = document.querySelector('.edit-modal-o .form');

//afficher les ouvrages dans le tableau des ouvrages
const tableuserso = document.querySelector('.table-users-o');
let identifer;
const renderouv = dic =>{
const tr=`
<tr données-id='${dic.key}'>
          <td>${dic.child("typeouvrage").val()}</td>
          <td>${dic.child("numéroouvrage").val()}</td>
          <td>${dic.child("isbnouvrage").val()}</td>
          <td>${dic.child("editeurcommercial").val()}</td>
          <td>${dic.child("annéeouvrage").val()}</td>
          <td>${dic.child("nomrevue").val()}</td>
          <td>${dic.child("auteur").val()}</td>
          <td>${dic.child("nbrauteur").val()}</td>
          <td>${dic.child("partauteur").val()}</td>
          <td>${dic.child("indicedecollaboration").val()}</td>
          <td>${dic.child("valeurouvrage").val()}</td>
          <td>
          <button class="btn btn-edit-o">Modifier</button>
          <button class="btn btn-delete-o">Supprimer</button>      
          </td>
</tr>
`;
tableuserso.insertAdjacentHTML("beforeend",tr);
//modifier la publication dans la revue

const btnEdito=document.querySelector(`[données-id='${dic.key}'] .btn-edit-o`);
btnEdito.addEventListener('click', ()=>{
editModalo.classList.add('modal-show');
//changement
identifer=dic.key;
editModalFormo.numo.value = dic.child("numéroouvrage").val();
editModalFormo.isbno.value=dic.child("isbnouvrage").val();
editModalFormo.edito.value=dic.child("editeurcommercial").val();
editModalFormo.anneo.value=dic.child("annéeouvrage").val();
editModalFormo.nomrevo.value=dic.child("nomrevue").val();
editModalFormo.autero.value=dic.child("auteur").val();
editModalFormo.nbrao.value=dic.child("nbrauteur").val();
editModalFormo.pao.value=dic.child("partauteur").val();
editModalFormo.indco.value=dic.child("indicedecollaboration").val();
editModalFormo.vao.value=dic.child("valeurouvrage").val();
});
//supprimer une publication dans une revue
const btnDeleteo=document.querySelector(`[données-id='${dic.key}'] .btn-delete-o`);
btnDeleteo.addEventListener('click', ()=>{
firebase.database().ref("Ouvrages").child(dic.key).remove().then(()=>{
window.alert("L'ouvrage est supprimée");
}).catch(err=>{
  console.log("error",err);
});
});
}
firebase.database().ref().child("Ouvrages").on("value",function(snapshot)
{
  snapshot.forEach(dic => {
    renderouv(dic);
})
});

//Changer la base de données avec les nouvelles valeurs de l'ouvrage

editModalFormo.addEventListener("submit",e=>{
  e.preventDefault();
  var rootRefo=firebase.database().ref().child("/Ouvrages");
  var newto = $("#newto").val();
 const newDatao=
  {
  typeouvrage: newto,
  numéroouvrage : editModalFormo.numo.value,
  isbnouvrage : editModalFormo.isbno.value,
  editeurcommercial: editModalFormo.edito.value,
  annéeouvrage: editModalFormo.anneo.value,
  nomrevue : editModalFormo.nomrevo.value,
  auteur : editModalFormo.autero.value,
  nbrauteur : editModalFormo.nbrao.value,
  partauteur : editModalFormo.pao.value,
  indicedecollaboration: editModalFormo.pao.value,
  valeurouvrage : editModalFormo.indco.value
}
rootRefo.child(identifer).update(newDatao);
  editModalo.classList.remove('modal-show');
 });
