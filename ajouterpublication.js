$("#ajoutpub").click(function ()
{ 
  var typepub=$("#typepub").val();
  var npublication=$("#npublication").val();
  var issnp=$("#issnp").val();
  var nr=$("#nr").val();
  var articletitre=$("#articletitre").val();
  var annéepub=$("#annéepub").val();
  var nbraut=$("#nbraut").val();
  var paut=$("#paut").val();
  var ic=$("#ic").val();
  var valeurdepub=$("#valeurdepub").val();
  var id=npublication.value || Date.now();

  var rootRefPub=firebase.database().ref().child("/PublicationsDansLesRevues");
  var userID=firebase.auth().currentUser.uid;
  var PubRevRef=rootRefPub.child(id); 
  
  if(typepub!="" && npublication!="" && issnp!="" && nr!="" && articletitre!=""&& 
  annéepub!=""&& nbraut!=""&& paut!=""&& ic!=""&& valeurdepub!="")
  {
    PubRevData=
    {
    "utilisateur":userID,
    "typepub": typepub,
    "npublication": npublication,
    "issnp": issnp,
    "nr": nr,
    "articletitre": articletitre,
    "annéepub": annéepub,
    "nbraut": nbraut,
    "paut": paut,
    "ic": ic,
    "valeurdepub": valeurdepub,
    "créerà": firebase.database.ServerValue.TIMESTAMP
    };
    PubRevRef.set(PubRevData,function(error) 
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


//Ajouter le modèle de modification en ce qui concerne les publication dans les revues
const modalWrapper=document.querySelector('.modal-wrapper');
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

//afficher les publications dans les revues dans le tableau

const tableusers =document.querySelector(".table-users") ;
let id;
const renderpub = doc =>{
const tr=`
<tr data-id='${doc.key}'>
          <td>${doc.child("typepub").val()}</td>
          <td>${doc.child("npublication").val()}</td>
          <td>${doc.child("issnp").val()}</td>
          <td>${doc.child("nr").val()}</td>
          <td>${doc.child("articletitre").val()}</td>
          <td>${doc.child("annéepub").val()}</td>
          <td>${doc.child("nbraut").val()}</td>
          <td>${doc.child("paut").val()}</td>
          <td>${doc.child("ic").val()}</td>
          <td>${doc.child("valeurdepub").val()}</td>
          <td>
                      <button class="btn btn-edit">Modifier</button>
                      <button class="btn btn-delete">Supprimer</button>
          </td>
</tr>
`;
tableusers.insertAdjacentHTML("beforeend",tr);

//modifier la publication dans la revue

const btnEdit=document.querySelector(`[data-id='${doc.key}'] .btn-edit`);
btnEdit.addEventListener('click', ()=>{
editModal.classList.add('modal-show');
//changement
id=doc.key;
editModalForm.Numéro.value=doc.child("npublication").val();
editModalForm.Issn.value=doc.child("issnp").val();
editModalForm.Nom.value=doc.child("nr").val();
editModalForm.Article.value=doc.child("articletitre").val();
editModalForm.Nbrdauteurs.value=doc.child("nbraut").val();
editModalForm.annéepub.value=doc.child("annéepub").val();
editModalForm.Partdauteurs.value=doc.child("paut").val();
editModalForm.Indicedecollaboration.value=doc.child("ic").val();
editModalForm.valeur.value=doc.child("valeurdepub").val();
});
//supprimer une publication dans une revue
const btnDelete=document.querySelector(`[data-id='${doc.key}'] .btn-delete`);
btnDelete.addEventListener('click', ()=>{
firebase.database().ref("PublicationsDansLesRevues").child(doc.key).remove().then(()=>{
window.alert("La publication est supprimée");
}).catch(err=>{
  console.log("error",err);
});
});
}

firebase.database().ref().child("PublicationsDansLesRevues").on("value",function(snapshot)

{
  snapshot.forEach(doc => {
    renderpub(doc);
})
});
//Changer la base de données avec les nouvelles valeurs de la publication dans la revue
editModalForm.addEventListener("submit",e=>{
  e.preventDefault();
  var rootRefPub=firebase.database().ref().child("/PublicationsDansLesRevues");
  var newtypepub=$("#newtypepub").val();
 const newData=
  {
  typepub: newtypepub,
  npublication : editModalForm.Numéro.value,
  issnp : editModalForm.Issn.value,
  nr : editModalForm.Nom.value,
  articletitre : editModalForm.Article.value,
  annéepub : editModalForm.annéepub.value,
  nbraut : editModalForm.Nbrdauteurs.value,
  paut : editModalForm.Partdauteurs.value,
  ic : editModalForm.Indicedecollaboration.value,
  valeurdepub : editModalForm.valeur.value
}
rootRefPub.child(id).update(newData);

  editModal.classList.remove('modal-show');
  });

