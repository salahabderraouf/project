
$("#enregistrer").click(function ()
 { 
  var nom=$("#nom").val();
  var prénom=$("#prénom").val();
  var numtel=$("#numtel").val();
  var adresse=$("#adresse").val();
  var genre=$("#genre").val();
  var codeéquipe=$("#codeéquipe").val();
  var option=$("#option").val();
  

  var r=firebase.database().ref().child("/Users");
  var userID=firebase.auth().currentUser.uid;
  var uf=r.child(userID);

  if(nom!="" && prénom!="" &&numtel!="" && adresse!="" && genre!="" && codeéquipe!="" && option!="")
  {
    var us=
    {
    "nom": nom,
    "prénom": prénom,
    "numtel": numtel,
    "adresse": adresse,
    "genre": genre,
    "codeéquipe":codeéquipe,
    "option": option,
    };
    uf.set(us,function(error)
  {
    if(error){ 
      var errorCode=error.code;
      var errorMessage=error.message;
      console.log("errorCode");
      console.log("errorMessage");
      window.alert("Message:"+errorMessage);
             }
      else{
          window.alert("enregistré avec succées");
          }
});
}
else{
   window.alert("veuillez complétez les champs à fin d'enregistrer les informations.");
  }
});