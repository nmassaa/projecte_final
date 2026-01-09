// Funció per posar els errors
function posarError(id, text) {
    document.getElementById(id).innerHTML = text;
}

// Mostrar contrasenyes
document.getElementById("veureContra").onchange = function() {
    var camp = document.getElementById("contrasenya");
    if (this.checked) { camp.type = "text"; } else { camp.type = "password"; }
};

document.getElementById("veureRepetir").onchange = function() {
    var camp = document.getElementById("repetir");
    if (this.checked) { camp.type = "text"; } else { camp.type = "password"; }
};

// Botó Esborrar
document.getElementById("btnEsborrar").onclick = function() {
    document.getElementById("elMeuFormulari").reset();
    document.getElementById("missatgeFinal").className = "ocult";
    // Netegem els textos d'error manualment
    posarError("errorNom", "");
    posarError("errorEdat", "");
    posarError("errorCP", "");
    posarError("errorEmail", "");
    posarError("errorContra", "");
    posarError("errorRepetir", "");
    posarError("errorAcceptar", "");
};

// Botó Enviar 
document.getElementById("elMeuFormulari").onsubmit = function(event) { //onsubmit = en el moment d'envair
    event.preventDefault(); // Aturem l'enviament per revisar

    var hiHaErrors = false;

    // NOM I COGNOMS 
    var nomOriginal = document.getElementById("nom").value;
    var nomArreglat = "";
    if (nomOriginal === "") {
        posarError("errorNom", "El nom és obligatori.");
        hiHaErrors = true;
    } else {
        // si és la primera lletra o ve després d'un espai es posa majuscula
        for (var i = 0; i < nomOriginal.length; i++) {
            if (i === 0 || nomOriginal[i - 1] === " ") {
                nomArreglat += nomOriginal[i].toUpperCase();
            } else {
                nomArreglat += nomOriginal[i];
            }
        }
        document.getElementById("nom").value = nomArreglat;
        posarError("errorNom", "");
    }

    // edat
    var edat = document.getElementById("edat").value;
    if (edat === "") {
        posarError("errorEdat", "Selecciona una opció.");
        hiHaErrors = true;
    } else {
        posarError("errorEdat", "");
    }

    // codi postal
    var cp = document.getElementById("codipostal").value;
    if (cp.length !== 5 || isNaN(cp)) {
        posarError("errorCP", "Han de ser 5 números.");
        hiHaErrors = true;
    } else {
        posarError("errorCP", "");
    }

    // email 
    var email = document.getElementById("email").value;
    var posArrova = email.indexOf("@");
    var ultimPunt = email.lastIndexOf(".");           
    
    // Mirem si hi ha @, si només hi ha una, i si el punt va després
    var comptadorArroves = 0;
    for (var j = 0; j < email.length; j++) {
        if (email[j] === "@") comptadorArroves++;
    }

    if (comptadorArroves !== 1 || ultimPunt <= posArrova) {
        posarError("errorEmail", "Email incorrecte (ex: usuari@domini.com).");
        hiHaErrors = true;
    } else {
        posarError("errorEmail", "");
    }

    // CONTRASENYA (8 caràcters, Maj, Min, 2 Núms, Símbol)
    var p = document.getElementById("contrasenya").value;
    var majus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var minus = "abcdefghijklmnopqrstuvwxyz";
    var nums = "0123456789";
    var sims = "!@#$%^&*()_+[]={};:|,.<>/?";
    
    var teMaj = false, teMin = false, teSim = false, countNum = 0;

    for (var k = 0; k < p.length; k++) {
        if (majus.indexOf(p[k]) !== -1) teMaj = true;
        else if (minus.indexOf(p[k]) !== -1) teMin = true;
        else if (nums.indexOf(p[k]) !== -1) countNum++;
        else if (sims.indexOf(p[k]) !== -1) teSim = true;
    }

    if (p.length < 8 || !teMaj || !teMin || countNum < 2 || !teSim) {
        posarError("errorContra", "Contrasenya insegura.");
        hiHaErrors = true;
    } else {
        posarError("errorContra", "");
    }

    // repetir contra
    var repetir = document.getElementById("repetir").value;
    if (repetir !== p || repetir === "") {
        posarError("errorRepetir", "No coincideixen.");
        hiHaErrors = true;
    } else {
        posarError("errorRepetir", "");
    }

    // checkbox acceptar 
    if (!document.getElementById("acceptar").checked) { //amb el checked mira com esta el botó
        posarError("errorAcceptar", "Has d'acceptar.");
        hiHaErrors = true;
    } else {
        posarError("errorAcceptar", "");
    }

    // --- 1.9 RESULTAT FINAL ---
    if (!hiHaErrors) {
        document.getElementById("missatgeFinal").className = ""; // Mostrem el div de resultats
        document.getElementById("resultatText").innerHTML = 
            "Nom: " + document.getElementById("nom").value + "<br>" + //escribim el nom al requadre
            "Edat: " + document.getElementById("edat").value + "<br>" + //escribim l'edat al requadre
            "Email: " + document.getElementById("email").value + "<br>" + //escribim l'email al requadre
            "Codi Postal: " + document.getElementById("codipostal").value; //escribim el CP al requadre
    } else {
        alert("Revisa els camps marcats en vermell.");
    }
};