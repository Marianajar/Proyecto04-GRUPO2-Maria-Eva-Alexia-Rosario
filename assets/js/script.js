$(document).ready(function () {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDMD47GoEaf1WgT_iNL5wvjopIBP8RHGSU",
    authDomain: "yanapay-87574.firebaseapp.com",
    projectId: "yanapay-87574",
    storageBucket: "yanapay-87574.appspot.com",
    messagingSenderId: "711565892883",
    appId: "1:711565892883:web:980a0e0dbdf13902410ee6",
    measurementId: "G-7JZ63W5H9M"
  };

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  // Inicializar Auth de Firebase
  const auth = firebase.auth();

  // Inicializar Auth de Google
  var provider = new firebase.auth.GoogleAuthProvider();


  $("#registrate").click(function (e) {
    e.preventDefault();
    var correo = $("#email").val();
    var contraseña = $("#password").val();
    $("#iniciaSesion").hide();
    $("#contraseñaolvidada").addClass("d-none");
    $(".input-label").addClass("d-none");
    $("#mensaje-inicio").hide();
    $("#mensaje-registro").removeClass("d-none");
    $("#mensaje-registro").addClass("d-block");
    $("#nombre").removeClass("d-none");
    $("#nombre").addClass("d-block");
    $("#titulo-registro").removeClass("d-none");
    $("#titulo-registro").addClass("d-block");
    $("#titulo-login").addClass("d-none");

    auth.createUserWithEmailAndPassword(correo, contraseña)
      .then((userCredential) => {
        // Signed in
        console.log("Usuario Creado");

        auth.signInWithEmailAndPassword(correo, contraseña)
          .then((userCredential) => {
            alert("registrado:)")
            // Signed in
            console.log("Usuario Logueado con email y contraseña");
            $("#IngresoEmailForm").trigger("reset");
            $("#alert-login").hide();
            $("#alert-login-2").hide();
            $("#alert-login-registro").hide();
            //$(location).attr('href',"/index02.html");
            location.href = "index02.html";

          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
            if (errorCode == 'auth/argument-error' || errorCode == "auth/wrong-password") {
              $("#alert-login").removeClass("d-none");
              $("#alert-login").addClass("d-block");
            } if (errorCode == "auth/user-not-found") {
              $("#alert-login-2").removeClass("d-none");
              $("#alert-login-2").addClass("d-block");
            }

          });

        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        // ..
        if (errorCode == 'auth/email-already-in-use') {
          $("#alert-login-registro").removeClass("d-none");
          $("#alert-login-registro").addClass("d-block");
        }
      });
  });

  $("#iniciaSesion").click(function (e) {
    e.preventDefault();
    var correo = $("#email").val();
    var contraseña = $("#password").val();

    auth.signInWithEmailAndPassword(correo, contraseña)
      .then((userCredential) => {
        // Signed in
        console.log("Usuario Logueado con email y contraseña");
        $("#IngresoEmailForm").trigger("reset");
        $("#alert-login").hide();
        $("#alert-login-2").hide();
        $("#alert-login-registro").hide();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
        if (errorCode == 'auth/argument-error' || errorCode == "auth/wrong-password") {
          $("#alert-login").removeClass("d-none");
          $("#alert-login").addClass("d-block");
        } if (errorCode == "auth/user-not-found") {
          $("#alert-login-2").removeClass("d-none");
          $("#alert-login-2").addClass("d-block");
        }

      });
  });

  //inicio con google
  $("#Iniciar-google-1").click(function (e) {
    //alert("hola")
    e.preventDefault();

    auth.signInWithPopup(provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  });
  auth.onAuthStateChanged((user) => {
    if (user) {
      // Si usuario esta conectado
      location.href = "index02.html";
    } else {
      
    }
  });

});

//Perfil de usuario

var settingsmenu = document.querySelector(".settings-menu")

function settingsMenuToggle(){
settingsmenu.classList.toggle("settings-menu-height")
}