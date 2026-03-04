const topics = [
    "Dante",
    "Petrarca",
    "Boccaccio",
    "Ariosto",
    "Machiavelli",
    "Guicciardini",
    "Tasso",
    "Galilei",
    "Goldoni",
    "Parini",
    "Beccaria",
    "Alfieri",
    "Foscolo",
    "Manzoni",
    "Leopardi",
    "Belli",
    "Porta",
    "Verga",
    "Collodi",
    "De Robertis",
    "Carducci",
    "Pascoli",
    "D'Annunzio",
    "Deledda",
    "Fare la carbonara",
    "Pirandello",
    "Svevo",
    "Rebora",
    "Campana",
    "Ungaretti",
    "Montale",
    "Primo Levi",
    "Gadda",
    "Moravia",
    "Calvino",
    "Fenoglio",
    "Sciascia",
    "Pasolini",
    "Meneghello",
    "Natalia Ginzburg",
    "Saba",
    "Quasimodo",
    "Pavese",
    "Vittorini",
    "Luzi",
    "Sereni",
    "Caproni",
    "Zanzotto",
    "Protezioni contro le arti oscure",
    "Morante",
    "La Commedia di Dante",
    "F. De Sanctis",
    "B. Croce",
    "A. Gramsci",
    "E. Auerbach",
    "M. Bachtin",
    "G. Contini",
    "G. Debenedetti",
    "C. Dionisotti",
    "Gli orcrux pro e contro rispetto la pietra filosofale",
    "F. Orlando",
    "C. Segre",
    "M. Corti",
    "Civilt\u00e0 dell'Antico vicino Oriente",
    "Civilt\u00e0 ebraica",
    "Civilt\u00e0 greca",
    "Civilt\u00e0 romana",
    "Nascita e diffusione del Cristianesimo",
    "Europa romano-barbarica",
    "Formazione dell'impero cinese",
    "Religioni, societ\u00e0 e cultura dell'India antica",
    "Societ\u00e0 ed economia nell'Alto Medioevo",
    "La Chiesa nell'Alto Medioevo",
    "Nascita e diffusione dell'Islam",
    "Impero e regni nell'Alto Medioevo",
    "Il feudalesimo",
    "La rinascita dell'XI secolo",
    "Papa e Imperatore",
    "I Comuni",
    "Le monarchie nel Basso Medioevo",
    "I movimenti religiosi nel Basso Medioevo",
    "La societ\u00e0 e l'economia nel Basso Medioevo",
    "Le Signorie",
    "Le monarchie territoriali nel Basso Medioevo",
    "I rapporti con il mondo bizantino nel Basso Medioevo",
    "Le Crociate",
    "La reconquista",
    "La formazione dell'impero mongolo",
    "La penetrazione musulmana in India",
    "Il Nuovo Mondo",
    "L'espansione europea in America, Asia e Africa e le sue conseguenze (storia moderna)",
    "La Riforma protestante",
    "Le guerre di religione nell'Et\u00e0 Moderna",
    "La costruzione dello Stato moderno e l'assolutismo",
    "L'impero Moghul",
    "La dinastina Manci\u00f9 (Quing)",
    "Le trasformazioni dell'agricoltura e la proto-industria tra XVI e XVIII secolo",
    "La tratta degli schiavi e il commercio transoceanico",
    "La rivoluzione inglese",
    "La rivoluzione americana",
    "La rivoluzione francese",
    "L'et\u00e0 napoleonica",
    "Il congresso di Vienna e la restaurazione",
    "L'indipendenza dell'America Latina",
    "La prima rivoluzione industriale e il movimento operaio",
    "Movimenti nazionali e Stati-nazione nell'Ottocento",
    "Il Risorgimento e l'Unit\u00e0",
    "La guerra civile negli Stati Uniti",
    "La nascita dello Stato tedesco",
    "L'Europa nella seconda met\u00e0 dell'Ottocento",
    "Colonialismo e imperialismo",
    "Le migrazioni transoceaniche",
    "Crisi e riforme nell'impero ottomano",
    "Crisi e riforme nell'impero russo",
    "La seconda rivoluzione industriale",
    "La societ\u00e0 di massa in Occidente nell'Ottocento",
    "Rivolte e riforme in Asia (XIX sec)",
    "Rivolte e riforme in Africa (XIX sec)",
    "Il nuovo nazionalismo (Novecento)",
    "La Prima Guerra Mondiale",
    "La rivoluzione e la guerra civile in Russia",
    "La crisi del '29",
    "I totalitarismi degli anni '30",
    "Il New Deal",
    "La Seconda Guerra Mondiale",
    "Il secondo dopoguerra",
    "La resistenza italiana e la nascita della Repubblica",
    "La Costituzione italiana (principi, valori, struttura)",
    "ONU e Dichiarazione universale dei diritti umani",
    "La guerra fredda",
    "L'integrazione europea dal trattato di Roma (1957) alla Carta dei diritti fondamentali dell'UE (Carta di Nizza)",
    "L'Italia dagli anni '50 agli anni '90",
    "La decolonizzazione dell'Africa",
    "India di Gandhi e Nehru",
    "La Cina dal grande balzo in avanti alle riforme Deng",
    "Lo sviluppo economico dell'Asia (Novecento)",
    "La crisi del sistema sovietico",
    "La caduta del Muro di Berlino",
    "La globalizzazione e la rivoluzione informatica",
    "Conflitti in Medio Oriente",
    "Andamento demografico, sviluppo diseguale, migrazioni di massa",
    "Cambiamento climatico oggi",
    "Cittadinanza globale",
    "Geografia della popolazione",
    "Geografia culturale",
    "Geografia economica",
    "Geografia politica",
    "Italia (geografia)",
    "Europa (geografia)",
    "Continenti Extraeuropei (geografia)",
    "La crisi delle risorse naturali",
    "Scuola Siciliana",
    "Il Dolce Stil Novo"
];

const gobletImg = document.getElementById("goblet");
const gobletLink = document.getElementById("goblet-link");
const topicText = document.getElementById("topic-text");

let animating = false;

function getRandomTopic() {
    return topics[Math.floor(Math.random() * topics.length)];
}

gobletLink.addEventListener("click", function () {
    if (animating) return;
    animating = true;

    gobletLink.classList.add("disabled");

    // Switch to transition GIF
    gobletImg.src = "img/calice-transizione.gif";

    // Show random topic with fade-in
    topicText.classList.remove("fade-in");
    // Force reflow to restart animation
    void topicText.offsetWidth;
    topicText.textContent = getRandomTopic();
    topicText.classList.add("fade-in");

    // After 2.1s, return to blue goblet
    setTimeout(function () {
        gobletImg.src = "img/calice-blu.gif";
        gobletLink.classList.remove("disabled");
        animating = false;
    }, 2100);
});
