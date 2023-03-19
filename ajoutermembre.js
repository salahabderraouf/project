//afficher les équipes pour l'admin
const modalWrappermembre=document.querySelector('.modal-wrapper-m');
const editModalmembre = document.querySelector('.edit-modal-m');
const editModalFormmembre = document.querySelector('.edit-modal-m .form');

//afficher les ouvrages dans le tableau des ouvrages
const tableusersmembre =document.querySelector('.table-users-m');
let primarykey;
const rendermembre = adm =>{
const tr=`
<tr m-id='${adm.key}'>
          <td>${adm.child("adresse").val()}</td>
          <td>${adm.child("genre").val()}</td>
          <td>${adm.child("nom").val()}</td>
          <td>${adm.child("prénom").val()}</td>
          <td>${adm.child("numtel").val()}</td>
          <td>${adm.child("option").val()}</td>
          <td>
             <button class="btn btn-edit-m">Modifier</button>
             <button class="btn btn-delete-m">Supprimer</button>
          </td>
</tr>
`;
tableusersmembre.insertAdjacentHTML("beforeend",tr);
//modifier les equipes
const btnEditmembre=document.querySelector(`[m-id='${adm.key}'] .btn-edit-m`);
btnEditmembre.addEventListener('click', ()=>{
editModalmembre.classList.add('modal-show');
//changement

primarykey=adm.key;
editModalFormmembre.emailmem.value=adm.child("adresse").val();
editModalFormmembre.genremem.value=adm.child("genre").val();
editModalFormmembre.nommem.value=adm.child("nom").val();
editModalFormmembre.prénommem.value=adm.child("prénom").val();
editModalFormmembre.numtelmem.value=adm.child("numtel").val();
editModalFormmembre.optionmem.value=adm.child("option").val();
});
//supprimer une équipe
const btnDeletemembre=document.querySelector(`[m-id='${adm.key}'] .btn-delete-m`);
btnDeletemembre.addEventListener('click', ()=>{
firebase.database().ref("Users").child(adm.key).remove().then(()=>{
window.alert("Le membre est supprimé");
}).catch(err=>{
  console.log("error",err);
});
});
}
firebase.database().ref().child("Users").on("value",function(snapshot)
{
  snapshot.forEach(adm => {
    rendermembre(adm);
})
});

//Changer la base de données avec les nouvelles valeurs de l'ouvrage

editModalFormmembre.addEventListener("submit",e=>{
  e.preventDefault();
  var rootRefmem=firebase.database().ref().child("/Users");
  const newDatam=
  {
    adresse: editModalFormmembre.emailmem.value,
    genre: editModalFormmembre.genremem.value,
    nom: editModalFormmembre.nommem.value,
    prénom: editModalFormmembre.prénommem.value,
    numtel: editModalFormmembre.numtelmem.value,
    option: editModalFormmembre.optionmem.value,
   }
    rootRefmem.child(primarykey).update(newDatam);
    editModalmembre.classList.remove('modal-show');
 });
