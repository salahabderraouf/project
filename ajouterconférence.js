$("#ajouterconf").click(function ()
{ 
  var typeconférence=$("#t-conf").val();
  var nomconférence=$("#nom-conf").val();
  var titredeprésentation=$("#titre-présen").val();
  var annéeconf=$("#année-conf").val();
  var url=$("#url-c").val();
  var nomparticipants=$("#nomparticipant-c").val();
  var partconférence=$("#part-conf").val();
  var valeurconférence=$("#valeur-conf").val();
  var idConférence=typeconférence.value || Date.now();

  var rootRefConférence=firebase.database().ref().child("/Conférences");
  var userID=firebase.auth().currentUser.uid;
  var ConfRef=rootRefConférence.child(idConférence); 
  
  if(typeconférence!="" && nomconférence!="" && titredeprésentation!="" && annéeconf!="" && url!=""&& 
  nomparticipants!=""&& partconférence!=""&& valeurconférence!="")
  {
    ConférenceData=
    {
    "propriétaire":userID,
    "typeconférence": typeconférence,
    "nomconférence": nomconférence,
    "titredeprésentation": titredeprésentation,
    "annéeconf": annéeconf,
    "url": url,
    "nomparticipants": nomparticipants,
    "partconférence": partconférence,
    "valeurconférence": valeurconférence,
    "créerà": firebase.database.ServerValue.TIMESTAMP
    };
    ConfRef.set(ConférenceData,function(error) 
   {
    if(error){ 
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log("errorCode");
      console.log("errorMessage");
      window.alert("Message:"+errorMessage);
             }
      else{
        window.alert("Conférence ajouté");
           }

});
}
else{
   window.alert("veuillez complétez les champs à fin d'enregistrer les informations.");
  }
});

//afficher les Conférence pour l'utilisateur
const modalWrapperc=document.querySelector('.modal-wrapper-c');
const editModalc = document.querySelector('.edit-modal-c');
const editModalFormc = document.querySelector('.edit-modal-c .form');

//afficher les conférences dans le tableau des conférences
const tableusersc =document.querySelector('.table-users-c');
let unique;
const renderconf = ducs =>{
const tr=`
<tr donné-id='${ducs.key}'>
          <td>${ducs.child("typeconférence").val()}</td>
          <td>${ducs.child("nomconférence").val()}</td>
          <td>${ducs.child("titredeprésentation").val()}</td>
          <td>${ducs.child("annéeconf").val()}</td>
          <td>${ducs.child("url").val()}</td>
          <td>${ducs.child("nomparticipants").val()}</td>
          <td>${ducs.child("partconférence").val()}</td>
          <td>${ducs.child("valeurconférence").val()}</td>
          <td>
             <button class="btn btn-edit-c">Modifier</button>
             <button class="btn btn-delete-c">Supprimer</button>
          </td>
</tr>
`;
tableusersc.insertAdjacentHTML("beforeend",tr);
//modifier la publication dans la revue
const btnEditc=document.querySelector(`[donné-id='${ducs.key}'] .btn-edit-c`);
btnEditc.addEventListener('click', ()=>{
editModalc.classList.add('modal-show');
//changement
unique=ducs.key;
editModalFormc.nnomc.value=ducs.child("nomconférence").val();
editModalFormc.ntitrec.value=ducs.child("titredeprésentation").val();
editModalFormc.nannéc.value=ducs.child("annéeconf").val();
editModalFormc.nurlc.value=ducs.child("url").val();
editModalFormc.nnomsparc.value=ducs.child("nomparticipants").val();
editModalFormc.npartc.value=ducs.child("partconférence").val();
editModalFormc.nvaleurc.value=ducs.child("valeurconférence").val();
});
//supprimer une publication dans une revue
const btnDeletec=document.querySelector(`[donné-id='${ducs.key}'] .btn-delete-c`);
btnDeletec.addEventListener('click', ()=>{
firebase.database().ref("Conférences").child(ducs.key).remove().then(()=>{
window.alert("La conférence est supprimée");
}).catch(err=>{
  console.log("error",err);
});
});
}
firebase.database().ref().child("Conférences").on("value",function(snapshot)
{
  snapshot.forEach(ducs => {
    renderconf(ducs);
})
});

//Changer la base de données avec les nouvelles valeurs de l'ouvrage

editModalFormc.addEventListener("submit",e=>{
  e.preventDefault();
  var rootRefCo=firebase.database().ref().child("/Conférences");
  var newtc = $("#newtc").val();

const newDatac=
  {
    typeconférence:newtc,
    nomconférence:editModalFormc.nnomc.value,
    titredeprésentation:editModalFormc.ntitrec.value,
    annéeconf:editModalFormc.nannéc.value,
    url:editModalFormc.nurlc.value,
    nomparticipants:editModalFormc.nnomsparc.value,
    partconférence:editModalFormc.npartc.value,
    valeurconférence:editModalFormc.nvaleurc.value
  }
    rootRefCo.child(unique).update(newDatac);
    editModalc.classList.remove('modal-show');
 });