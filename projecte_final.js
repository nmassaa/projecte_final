// Funció simple per escriure errors. 
// Si missatge és "", esborra l'error.
function posarError(idElement, missatge) {
    document.getElementById(idElement).innerHTML = missatge;
}

// 1.1 NOM I COGNOMS: Posar majúscules automàticament
document.getElementById("nom").onblur = function() {
    var camp = document.getElementById("nom");
    var text = camp.value;
    
    // Si està buit
    if (text === "") {
        posarError("errorNom", "Has d'escriure un nom.");
        return;
    }

    // Separem les paraules per espais
    var paraules = text.split(" ");
    var textNou = "";

    // Recorrem cada paraula
    for (var i = 0; i < paraules.length; i++) {
        var paraula = paraules[i];
        if (paraula.length > 0) {
            // Agafem la primera lletra, la fem gran, i hi sumem la resta
            var majuscula = paraula[0].toUpperCase();
            var resta = paraula.slice(1); // slice(1) agafa de la lletra 1 al final
            textNou = textNou + majuscula + resta + " ";
        }
    }
    
    // Guardem el text arreglat (trim treu l'espai final sobrant)
    camp.value = textNou.trim();
    posarError("errorNom", ""); // Tot correcte
};

// 1.2 EDAT: Comprovar que s'ha triat opció
document.getElementById("edat").onchange = function() {
    var valor = document.getElementById("edat").value;
    if (valor === "") {
        posarError("errorEdat", "Selecciona una edat.");
    } else {
        posarError("errorEdat", "");
    }
};

// 1.3 CODI POSTAL: 5 números exactes
document.getElementById("codipostal").onblur = function() {
    var valor = document.getElementById("codipostal").value;
    // isNaN vol dir "No és un Número"
    if (valor.length !== 5 || isNaN(valor)) {
        posarError("errorCP", "El codi ha de tenir 5 dígits.");
    } else {
        posarError("errorCP", "");
    }
};

// 1.4 EMAIL: Arrova i punt després
document.getElementById("email").onblur = function() {
    var valor = document.getElementById("email").value;
    var posicioArrova = valor.indexOf("@");
    var posicioPunt = valor.lastIndexOf(".");

    // L'arrova ha d'existir (> -1) i el punt ha d'estar després de l'arrova
    if (posicioArrova > -1 && posicioPunt > posicioArrova) {
        posarError("errorEmail", "");
    } else {
        posarError("errorEmail", "L'email ha de tenir @ i un punt després.");
    }
};

// 1.5 CONTRASENYA: Validació llarga sense RegExp
document.getElementById("contrasenya").oninput = function() {
    var clau = document.getElementById("contrasenya").value;
    
    // Definim quins caràcters busquem
    var majuscules = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var minuscules = "abcdefghijklmnopqrstuvwxyz";
    var numeros = "0123456789";
    var especials = "$!(@#%*()_+[]-={};:|,.<>/?"; // Els símbols de l'enunciat

    // Comptadors
    var teMaj = false;
    var teMin = false;
    var qtatNum = 0;
    var teEsp = false;

    // Mirem lletra per lletra
    for (var i = 0; i < clau.length; i++) {
        var lletra = clau[i];
        
        if (majuscules.includes(lletra)) { teMaj = true; }
        else if (minuscules.includes(lletra)) { teMin = true; }
        else if (numeros.includes(lletra)) { qtatNum++; }
        else if (especials.includes(lletra)) { teEsp = true; }
    }

    // Comprovem les regles
    if (clau.length < 8) {
        posarError("errorContra", "Mínim 8 caràcters.");
    } else if (teMaj === false) {
        posarError("errorContra", "Falta majúscula.");
    } else if (teMin === false) {
        posarError("errorContra", "Falta minúscula.");
    } else if (qtatNum < 2) {
        posarError("errorContra", "Falten 2 números.");
    } else if (teEsp === false) {
        posarError("errorContra", "Falta caràcter especial.");
    } else {
        posarError("errorContra", ""); // Tot bé
    }
};

// Checkbox per mostrar/amagar contrasenya 1
document.getElementById("veureContra").onchange = function() {
    var camp = document.getElementById("contrasenya");
    if (document.getElementById("veureContra").checked) {
        camp.type = "text";
    } else {
        camp.type = "password";
    }
};

// 1.6 REPETIR CONTRASENYA
document.getElementById("repetir").onblur = function() {
    var clau1 = document.getElementById("contrasenya").value;
    var clau2 = document.getElementById("repetir").value;

    if (clau1 !== clau2) {
        posarError("errorRepetir", "Les contrasenyes no coincideixen.");
    } else {
        posarError("errorRepetir", "");
    }
};

// Checkbox per mostrar/amagar contrasenya 2 (Requisit PDF)
document.getElementById("veureRepetir").onchange = function() {
    var camp = document.getElementById("repetir");
    if (document.getElementById("veureRepetir").checked) {
        camp.type = "text";
    } else {
        camp.type = "password";
    }
};

// 1.7 CHECKBOX (Es comprova al final)

// 1.8 BOTÓ ESBORRAR
document.getElementById("btnEsborrar").onclick = function() {
    // 1. Esborrem els camps
    document.getElementById("elMeuFormulari").reset();
    
    // 2. Esborrem els missatges vermells
    posarError("errorNom", "");
    posarError("errorEdat", "");
    posarError("errorCP", "");
    posarError("errorEmail", "");
    posarError("errorContra", "");
    posarError("errorRepetir", "");
    posarError("errorAcceptar", "");

    // 3. Amaguem el missatge final si estava visible
    document.getElementById("missatgeFinal").className = "ocult";
};

// 1.9 BOTÓ ENVIAR (Validació Final)
document.getElementById("elMeuFormulari").onsubmit = function(event) {
    // Això evita que la pàgina es recarregui
    event.preventDefault();

    // 1. Comprovem si hi ha errors visible en algun span
    // Agafem el text de tots els errors
    var e1 = document.getElementById("errorNom").innerHTML;
    var e2 = document.getElementById("errorEdat").innerHTML;
    var e3 = document.getElementById("errorCP").innerHTML;
    var e4 = document.getElementById("errorEmail").innerHTML;
    var e5 = document.getElementById("errorContra").innerHTML;
    var e6 = document.getElementById("errorRepetir").innerHTML;

    // 2. Comprovem checkbox
    var acceptat = document.getElementById("acceptar").checked;

    // 3. Comprovem que els camps no estiguin buits (per si l'usuari clica Enviar directament sense escriure res)
    var nomBuit = document.getElementById("nom").value === "";
    
    if (e1 !== "" || e2 !== "" || e3 !== "" || e4 !== "" || e5 !== "" || e6 !== "") {
        alert("Encara tens errors en vermell al formulari.");
    } else if (nomBuit) {
        alert("El formulari està buit!");
    } else if (acceptat === false) {
        posarError("errorAcceptar", "Has d'acceptar la política.");
        alert("Accepta la política de privacitat.");
    } else {
        // SI TOT ESTÀ BÉ:
        posarError("errorAcceptar", ""); // Treiem error checkbox
        
        // Mostrem la caixa verda
        var caixaFinal = document.getElementById("missatgeFinal");
        caixaFinal.className = ""; // Treiem la classe "ocult"
        
        // Escrivim les dades a dins
        var nom = document.getElementById("nom").value;
        var edat = document.getElementById("edat").value;
        var mail = document.getElementById("email").value;

        document.getElementById("resultatText").innerHTML = 
            "Nom: " + nom + "<br>" + 
            "Edat: " + edat + "<br>" + 
            "Email: " + mail;
    }
};