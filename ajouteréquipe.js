$("#ae").click(function ()
{ 
  var code=$("#coe").val();
  var intitulé=$("#ine").val();
  var chef=$("#che").val();
  var accronyme=$("#ace").val();
  var granddomaine=$("#gde").val();
  var sousdomaine=$("#soe").val();
  var ja=$("#mdpe").val();

  var ideq=code.value || Date.now();

  var rootReféquipe=firebase.database().ref().child("/équipes");
  var userID=firebase.auth().currentUser.uid;
  var équipeRef=rootReféquipe.child(ideq); 
  
  if(code!="" && intitulé!="" && chef!="" && granddomaine!=""&& 
  sousdomaine!=""&& ja!="")
  {
    eqData=
    {
    "propriétaire":userID,
    "code": code,
    "intitulé": intitulé,
    "chef": chef,
    "accronyme": accronyme,
    "granddomaine": granddomaine,
    "sousdomaine": sousdomaine,
    "ja": ja,
    "créerà": firebase.database.ServerValue.TIMESTAMP
    };
    équipeRef.set(eqData,function(error) 
   {
    if(error){ 
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log("errorCode");
      console.log("errorMessage");
      window.alert("Message:"+errorMessage);
             }
      else{
        window.alert("équipe ajouté");
           }

});
}
else{
   window.alert("veuillez complétez les champs à fin d'enregistrer les informations.");
  }
});

//afficher les équipes pour l'admin
const modalWrappere=document.querySelector('.modal-wrapper-e');
const editModale = document.querySelector('.edit-modal-e');
const editModalForme = document.querySelector('.edit-modal-e .form');

//afficher les ouvrages dans le tableau des ouvrages
const tableuserse =document.querySelector('.table-users-e');
let primary;
const renderéquipe = admin =>{
const tr=`
<tr e-id='${admin.key}'>
          <td>${admin.child("code").val()}</td>
          <td>${admin.child("intitulé").val()}</td>
          <td>${admin.child("chef").val()}</td>
          <td>${admin.child("accronyme").val()}</td>
          <td>${admin.child("granddomaine").val()}</td>
          <td>${admin.child("sousdomaine").val()}</td>
          <td>${admin.child("ja").val()}</td>
          <td>
             <button class="btn btn-edit-e">Modifier</button>
             <button class="btn btn-delete-e">Supprimer</button>
          </td>
</tr>
`;
tableuserse.insertAdjacentHTML("beforeend",tr);
//modifier les equipes
const btnEdite=document.querySelector(`[e-id='${admin.key}'] .btn-edit-e`);
btnEdite.addEventListener('click', ()=>{
editModale.classList.add('modal-show');
//changement

primary=admin.key;
editModalForme.ncde.value=admin.child("code").val();
editModalForme.nine.value=admin.child("intitulé").val();
editModalForme.nche.value=admin.child("chef").val();
editModalForme.nace.value=admin.child("accronyme").val();
editModalForme.ngde.value=admin.child("granddomaine").val();
editModalForme.nsde.value=admin.child("sousdomaine").val();
editModalForme.nja.value=admin.child("ja").val();
});
//supprimer une équipe
const btnDeletee=document.querySelector(`[e-id='${admin.key}'] .btn-delete-e`);
btnDeletee.addEventListener('click', ()=>{
firebase.database().ref("équipes").child(admin.key).remove().then(()=>{
window.alert("L'équipe est supprimée");
}).catch(err=>{
  console.log("error",err);
});
});
}
firebase.database().ref().child("équipes").on("value",function(snapshot)
{
  snapshot.forEach(admin => {
    renderéquipe(admin);
})
});

//Changer la base de données avec les nouvelles valeurs de l'ouvrage

editModalForme.addEventListener("submit",e=>{
  e.preventDefault();
  var rootRefe=firebase.database().ref().child("/équipes");
 const newDatae=
  {
    code:editModalForme.ncde.value,
    intitulé:editModalForme.nine.value,
    chef:editModalForme.nche.value,
    accronyme:editModalForme.nace.value,
    granddomaine:editModalForme.ngde.value,
    sousdomaine:editModalForme.nsde.value,
    ja:editModalForme.nja.value,
  }
    rootRefe.child(primary).update(newDatae);
    editModale.classList.remove('modal-show');
 });
