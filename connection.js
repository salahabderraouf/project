
var firebaseConfig = {
  apiKey: "AIzaSyCAbj_XoBZlmGkdZ2BoVNdM9alME_vgH4M",
  authDomain: "projet-c53ca.firebaseapp.com",
  databaseURL: "https://projet-c53ca-default-rtdb.firebaseio.com",
  projectId: "projet-c53ca",
  storageBucket: "projet-c53ca.appspot.com",
  messagingSenderId: "1057490269533",
  appId: "1:1057490269533:web:81c872663fd45bd214e4b4",
  measurementId: "G-G5TLYXCGR7"
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.analytics();

//login

$("#btn1").click(function (e) { 
  e.preventDefault();
  var mailc=$("#mailc").val();
  var mdpc=$("#mdpc").val();
  var result=firebase.auth().signInWithEmailAndPassword(mailc,mdpc);
  result.catch(function(error){
    var errorCode=error.code;
    var errorMessage=error.message;
    console.log("errorCode");
    console.log("errorMessage");
    window.alert("Message:"+errorCode);
    window.alert("Message:"+errorMessage);
  });
});
//logout
$("#logout").click(function () { 
  firebase.auth().signOut();
});
//reset password
$("#btnr").click(function () { 
  var auth= firebase.auth();
  var mailr=$("#mailr").val();
  auth.sendPasswordResetEmail(mailr).then(function(){
    window.alert("Un mail est envoyé à votre adresse email,veuillez entrer et terminer la modification. ");
}).catch(function(error){
    var errorCode=error.code;
    var errorMessage=error.message;
    console.log("errorCode");
    console.log("errorMessage");
    window.alert("Message:"+errorCode);
    window.alert("Message:"+errorMessage);
  });
 });

 //signup
$("#btn").click(function (e) { 
  e.preventDefault();
  var mail=$("#mail").val();
  var mdp=$("#mdp").val();
  var result=firebase.auth().createUserWithEmailAndPassword(mail,mdp);
  result.catch(function(error){
    var errorCode=error.code;
    var errorMessage=error.message;
    console.log("errorCode");
    console.log("errorMessage");
    window.alert("Message:"+errorCode);
    window.alert("Message:"+errorMessage);
  });
});
