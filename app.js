const categoryCards = document.querySelectorAll(".category-card");
const resultsSection = document.getElementById("resultsSection");
const productGrid = document.getElementById("productGrid");
const resultsTitle = document.getElementById("resultsTitle");
const backButton = document.getElementById("backButton");
const searchInput = document.getElementById("searchInput");

// =========================================================
// CONFIGURAZIONE SESSIONI GIORNALIERE
// =========================================================

const DAILY_SESSION_LIMIT = 2;

const STORAGE_KEY_DAILY_SESSIONS =
  "learninghub_daily_sessions";

// =========================================================
// LINEE HAIRCARE
// =========================================================

const lineeCapelli = [
  {
    id: "volume-plump",
    nome: "Volume & Plump",
    descrizione: "Volume, corpo e sostegno per capelli fini e piatti."
  },
  {
    id: "nourish-protect",
    nome: "Nourish & Protect",
    descrizione: "Nutrimento, riparazione e protezione."
  },
  {
    id: "silky-gloss",
    nome: "Silky Gloss",
    descrizione: "Morbidezza, luminosità e capelli più setosi."
  },
  {
    id: "spiral-shine",
    nome: "Spiral Shine",
    descrizione: "Definizione, controllo e brillantezza per ricci e onde."
  }
];

// =========================================================
// STATO QUIZ
// =========================================================

let sessioneQuiz = [];
let indiceQuiz = 0;
let risposteCorrette = 0;
let rispostaBloccata = false;

// =========================================================
// SESSIONI GIORNALIERE
// =========================================================

function dataLocaleOggi() {
  const oggi = new Date();

  const anno = oggi.getFullYear();

  const mese = String(
    oggi.getMonth() + 1
  ).padStart(2, "0");

  const giorno = String(
    oggi.getDate()
  ).padStart(2, "0");

  return `${anno}-${mese}-${giorno}`;
}

function creaRegistroSessioniVuoto() {
  return {
    data: dataLocaleOggi(),
    aree: {}
  };
}

function caricaSessioniGiornaliere() {
  const datiSalvati =
    localStorage.getItem(
      STORAGE_KEY_DAILY_SESSIONS
    );

  if (!datiSalvati) {
    return creaRegistroSessioniVuoto();
  }

  try {
    const dati =
      JSON.parse(datiSalvati);

    if (
      dati.data !==
      dataLocaleOggi()
    ) {
      const nuovoRegistro =
        creaRegistroSessioniVuoto();

      salvaSessioniGiornaliere(
        nuovoRegistro
      );

      return nuovoRegistro;
    }

    if (!dati.aree) {
      dati.aree = {};
    }

    return dati;

  } catch (errore) {
    return creaRegistroSessioniVuoto();
  }
}

function salvaSessioniGiornaliere(
  registro
) {
  localStorage.setItem(
    STORAGE_KEY_DAILY_SESSIONS,
    JSON.stringify(registro)
  );
}

function sessioniCompletateOggi(
  area
) {
  const registro =
    caricaSessioniGiornaliere();

  return registro.aree[area] || 0;
}

function sessioniDisponibiliOggi(
  area
) {
  return Math.max(
    0,
    DAILY_SESSION_LIMIT -
      sessioniCompletateOggi(area)
  );
}

function limiteSessioniRaggiunto(
  area
) {
  return (
    sessioniCompletateOggi(area) >=
    DAILY_SESSION_LIMIT
  );
}

function registraSessioneCompletata(
  area
) {
  const registro =
    caricaSessioniGiornaliere();

  const completate =
    registro.aree[area] || 0;

  registro.aree[area] =
    Math.min(
      DAILY_SESSION_LIMIT,
      completate + 1
    );

  salvaSessioniGiornaliere(
    registro
  );

  return registro.aree[area];
}

// =========================================================
// PROGRESSO HAIR
// =========================================================

const STORAGE_KEY_HAIR =
  "learninghub_hair_progress";

function caricaProgressiHair() {
  const datiSalvati =
    localStorage.getItem(
      STORAGE_KEY_HAIR
    );

  if (!datiSalvati) {
    return {
      concepts: {}
    };
  }

  try {
    return JSON.parse(
      datiSalvati
    );
  } catch (errore) {
    return {
      concepts: {}
    };
  }
}

function salvaProgressiHair(
  progressi
) {
  localStorage.setItem(
    STORAGE_KEY_HAIR,
    JSON.stringify(progressi)
  );
}

// =========================================================
// KNOWLEDGE SCORE
// =========================================================

function aggiornaConcept(
  domanda,
  corretta
) {
  const progressi =
    caricaProgressiHair();

  const concept =
    domanda.concept;

  if (
    !progressi.concepts[concept]
  ) {
    progressi.concepts[concept] = {
      tentativi: 0,
      corrette: 0,
      errori: 0,
      mastery: 0,
      ultimaDomanda: null,
      ultimaRisposta: null,
      serieCorrette: 0
    };
  }

  const stato =
    progressi.concepts[concept];

  stato.tentativi += 1;

  if (corretta) {
    stato.corrette += 1;

    stato.ultimaRisposta =
      "corretta";

    stato.serieCorrette =
      (stato.serieCorrette || 0) + 1;

    if (
      stato.tentativi === 1
    ) {
      stato.mastery = 70;
    } else {
      stato.mastery =
        stato.mastery +
        (100 - stato.mastery) *
          0.35;
    }

  } else {
    stato.errori += 1;

    stato.ultimaRisposta =
      "errata";

    stato.serieCorrette = 0;

    if (
      stato.tentativi === 1
    ) {
      stato.mastery = 25;
    } else {
      stato.mastery =
        stato.mastery * 0.6;
    }
  }

  stato.mastery =
    Math.round(
      stato.mastery
    );

  stato.ultimaDomanda =
    domanda.id;

  salvaProgressiHair(
    progressi
  );
}

function calcolaKnowledgeScore() {
  const progressi =
    caricaProgressiHair();

  const concepts =
    Object.values(
      progressi.concepts
    );

  if (
    concepts.length === 0
  ) {
    return 0;
  }

  const totale =
    concepts.reduce(
      (
        somma,
        concept
      ) =>
        somma +
        concept.mastery,
      0
    );

  return Math.round(
    totale /
      concepts.length
  );
}

function contaConceptValutati() {
  const progressi =
    caricaProgressiHair();

  return Object.keys(
    progressi.concepts
  ).length;
}

// =========================================================
// RIEPILOGO PERCORSO HAIRCARE
// =========================================================

function riepilogoPercorsoHair() {
  const progressi =
    caricaProgressiHair();

  const concepts = [
    ...new Set(
      quizCapelli
        .filter(
          domanda =>
            domanda.tipo ===
            "principale"
        )
        .map(
          domanda =>
            domanda.concept
        )
    )
  ];

  const riepilogo = {
    recupero: 0,
    consolidamento: 0,
    solido: 0,
    nuovo: 0,
    totale: concepts.length
  };

  concepts.forEach(
    concept => {

      const stato =
        classificaConcept(
          concept,
          progressi
        );

      riepilogo[stato] += 1;

    }
  );

  riepilogo.valutati =
    riepilogo.totale -
    riepilogo.nuovo;

  return riepilogo;
}

// =========================================================
// TESTO PRODOTTO
// =========================================================

function testoCompletoProdotto(
  prodotto
) {
  return `
    ${prodotto.codice || ""}
    ${prodotto.nome || ""}
    ${prodotto.nomeBreve || ""}
    ${prodotto.linea || ""}
    ${prodotto.categoria || ""}
    ${prodotto.tipologia || ""}
    ${prodotto.descrizione || ""}
    ${(prodotto.ingredienti || []).join(" ")}
    ${(prodotto.benefici || []).join(" ")}
    ${prodotto.levaCliente || ""}
    ${prodotto.utilizzo || ""}
  `.toLowerCase();
}

// =========================================================
// MOSTRA LINEE HAIRCARE
// =========================================================

function mostraLineeCapelli() {
  resultsTitle.textContent =
    "Capelli";

  const knowledgeScore =
    calcolaKnowledgeScore();

  const conceptsValutati =
    contaConceptValutati();

  const percorsoHair =
    riepilogoPercorsoHair();

  const sessioniOggi =
    sessioniCompletateOggi(
      "haircare"
    );

  const limiteRaggiunto =
    limiteSessioniRaggiunto(
      "haircare"
    );

  productGrid.innerHTML = `

    <div class="hair-lines-grid">

      ${lineeCapelli
        .map(
          linea => {

            const prodottiLinea =
              prodotti.filter(
                prodotto =>
                  prodotto.linea ===
                  linea.id
              );

            let prodottiHTML = "";

            if (
              prodottiLinea.length > 0
            ) {

              prodottiHTML =
                prodottiLinea
                  .map(
                    prodotto => `

                      <button
                        class="hair-product-link"
                        data-id="${prodotto.id}"
                      >

                        <span>
                          ${prodotto.nomeBreve}
                        </span>

                        <span class="hair-arrow">
                          →
                        </span>

                      </button>

                    `
                  )
                  .join("");

            } else {

              prodottiHTML = `

                <div class="hair-line-empty">
                  Prodotti da inserire
                </div>

              `;
            }

            return `

              <section class="hair-line-card">

                <div class="hair-line-header">

                  <h4>
                    ${linea.nome}
                  </h4>

                  <p>
                    ${linea.descrizione}
                  </p>

                </div>

                <div class="hair-products-list">
                  ${prodottiHTML}
                </div>

              </section>

            `;
          }
        )
        .join("")}

    </div>

    <section class="hair-training-section">

      <div class="hair-training-content">

        <p class="hair-training-label">
          FORMAZIONE
        </p>

        <h4>
          ${
            limiteRaggiunto
              ? "Allenamento di oggi completato"
              : "Allenati"
          }
        </h4>

        <p class="hair-training-description">

          ${
            limiteRaggiunto
              ? `
                Hai completato le 2 sessioni
                Haircare di oggi.
                Torna domani: LearningHub
                ripartirà dai concetti da
                rafforzare e continuerà
                il tuo percorso.
              `
              : `
                Hai studiato le quattro linee Haircare?
                Ora metti alla prova quello che hai imparato.
              `
          }

        </p>

        ${
          conceptsValutati > 0
            ? `

              <div class="hair-score-preview">

                <span>
                  KNOWLEDGE SCORE
                </span>

                <strong>
                  ${knowledgeScore}%
                </strong>

              </div>

            `
            : ""
        }

        ${
          limiteRaggiunto
            ? `

              <div class="hair-daily-complete">
                2/2 sessioni completate oggi
              </div>

            `
            : `

              <button
                class="hair-training-button"
                id="hairTrainingButton"
              >
                Inizia il quiz Haircare →
              </button>

            `
        }

      </div>

    </section>

    ${
      conceptsValutati > 0
        ? `

          <section class="hair-path-section">

            <div class="hair-path-heading">

              <p class="hair-path-label">
                PERCORSO HAIRCARE
              </p>

              <h4>
                Il tuo percorso
              </h4>

              <p>
                LearningHub utilizza le tue risposte
                per capire cosa consolidare nelle
                prossime sessioni.
              </p>

            </div>

            <div class="hair-path-grid">

              <div
                class="
                  hair-path-card
                  hair-path-recovery
                "
              >

                <span class="hair-path-status">
                  DA RAFFORZARE
                </span>

                <strong>
                  ${percorsoHair.recupero}
                </strong>

                <p>
                  concetti
                </p>

              </div>

              <div
                class="
                  hair-path-card
                  hair-path-learning
                "
              >

                <span class="hair-path-status">
                  IN APPRENDIMENTO
                </span>

                <strong>
                  ${percorsoHair.consolidamento}
                </strong>

                <p>
                  concetti
                </p>

              </div>

              <div
                class="
                  hair-path-card
                  hair-path-solid
                "
              >

                <span class="hair-path-status">
                  SOLIDI
                </span>

                <strong>
                  ${percorsoHair.solido}
                </strong>

                <p>
                  concetti
                </p>

              </div>

            </div>

            <div class="hair-path-footer">

              <span>
                ${percorsoHair.valutati}
                di
                ${percorsoHair.totale}
                concetti valutati
              </span>

              ${
                percorsoHair.nuovo > 0
                  ? `
                    <span>
                      ${percorsoHair.nuovo}
                      ancora da esplorare
                    </span>
                  `
                  : `
                    <span>
                      Tutti i concetti sono stati esplorati
                    </span>
                  `
              }

            </div>

          </section>

        `
        : ""
    }

  `;

  resultsSection
    .classList
    .remove(
      "hidden"
    );

  document
    .querySelectorAll(
      ".hair-product-link"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const prodotto =
              prodotti.find(
                item =>
                  item.id ===
                  button.dataset.id
              );

            if (prodotto) {
              apriSchedaProdotto(
                prodotto
              );
            }

          }
        );

      }
    );

  const trainingButton =
    document.getElementById(
      "hairTrainingButton"
    );

  if (trainingButton) {
    trainingButton.addEventListener(
      "click",
      () => {
        avviaQuizHaircare();
      }
    );
  }

  resultsSection.scrollIntoView({
    behavior: "smooth"
  });
}

// =========================================================
// SELEZIONE DOMANDE QUIZ
// =========================================================

function mescolaArray(
  array
) {
  const copia =
    [...array];

  for (
    let i =
      copia.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );

    [
      copia[i],
      copia[j]
    ] = [
      copia[j],
      copia[i]
    ];

  }

  return copia;
}

// =========================================================
// STATO DI APPRENDIMENTO DEL CONCETTO
// =========================================================

function classificaConcept(
  concept,
  progressi
) {
  const stato =
    progressi.concepts[
      concept
    ];

  if (!stato) {
    return "nuovo";
  }

  if (
    stato.ultimaRisposta ===
      "errata" ||
    stato.mastery < 50
  ) {
    return "recupero";
  }

  if (
    stato.mastery < 80
  ) {
    return "consolidamento";
  }

  return "solido";
}

// =========================================================
// RACCOGLIE LE DOMANDE DELLO STESSO CONCETTO
// =========================================================

function domandePerConcept(
  concept
) {
  return quizCapelli.filter(
    domanda =>
      domanda.concept ===
      concept
  );
}

// =========================================================
// SCEGLIE LA DOMANDA MIGLIORE PER UN CONCETTO
// =========================================================

function scegliDomandaPerConcept(
  concept,
  categoria,
  progressi
) {
  const domande =
    domandePerConcept(
      concept
    );

  const stato =
    progressi.concepts[
      concept
    ];

  const ultimaDomanda =
    stato
      ? stato.ultimaDomanda
      : null;

  let alternative =
    domande.filter(
      domanda =>
        domanda.id !==
        ultimaDomanda
    );

  if (
    alternative.length === 0
  ) {
    alternative =
      [...domande];
  }

  if (
    categoria ===
      "recupero" &&
    quizCapelliConfig
      .usaVariantiComeSpacedRepetition
  ) {

    const varianti =
      alternative.filter(
        domanda =>
          domanda.tipo ===
          "variante"
      );

    if (
      varianti.length > 0
    ) {
      return mescolaArray(
        varianti
      )[0];
    }
  }

  const principali =
    alternative.filter(
      domanda =>
        domanda.tipo ===
        "principale"
    );

  if (
    principali.length > 0
  ) {
    return mescolaArray(
      principali
    )[0];
  }

  return mescolaArray(
    alternative
  )[0];
}

// =========================================================
// CREA I POOL DI CONCETTI
// =========================================================

function creaPoolConcept() {
  const progressi =
    caricaProgressiHair();

  const concepts = [
    ...new Set(
      quizCapelli.map(
        domanda =>
          domanda.concept
      )
    )
  ];

  const pool = {
    recupero: [],
    consolidamento: [],
    nuovo: [],
    solido: []
  };

  concepts.forEach(
    concept => {

      const categoria =
        classificaConcept(
          concept,
          progressi
        );

      const domanda =
        scegliDomandaPerConcept(
          concept,
          categoria,
          progressi
        );

      if (!domanda) {
        return;
      }

      pool[categoria].push({
        concept: concept,
        domanda: domanda
      });

    }
  );

  return pool;
}

// =========================================================
// SELEZIONE BILANCIATA
// =========================================================

function aggiungiDomandeBilanciate(
  sorgente,
  numero,
  selezionate,
  conceptsUsati,
  conteggiLinea,
  conteggiArea
) {
  let disponibili =
    sorgente.filter(
      item =>
        !conceptsUsati.has(
          item.concept
        )
    );

  for (
    let i = 0;
    i < numero;
    i++
  ) {

    if (
      disponibili.length ===
      0
    ) {
      break;
    }

    disponibili =
      mescolaArray(
        disponibili
      );

    disponibili.sort(
      (a, b) => {

        const lineaA =
          conteggiLinea[
            a.domanda.linea
          ] || 0;

        const lineaB =
          conteggiLinea[
            b.domanda.linea
          ] || 0;

        if (
          lineaA !== lineaB
        ) {
          return (
            lineaA -
            lineaB
          );
        }

        const areaA =
          conteggiArea[
            a.domanda.area
          ] || 0;

        const areaB =
          conteggiArea[
            b.domanda.area
          ] || 0;

        return (
          areaA -
          areaB
        );

      }
    );

    const scelto =
      disponibili[0];

    selezionate.push(
      scelto.domanda
    );

    conceptsUsati.add(
      scelto.concept
    );

    conteggiLinea[
      scelto.domanda.linea
    ] =
      (
        conteggiLinea[
          scelto.domanda.linea
        ] || 0
      ) + 1;

    conteggiArea[
      scelto.domanda.area
    ] =
      (
        conteggiArea[
          scelto.domanda.area
        ] || 0
      ) + 1;

    disponibili =
      disponibili.filter(
        item =>
          item.concept !==
          scelto.concept
      );
  }
}

// =========================================================
// CREA SESSIONE ADATTIVA
// =========================================================

function creaSessioneQuiz() {
  const totaleSessione =
    quizCapelliConfig
      .domandePerSessione;

  const pool =
    creaPoolConcept();

  const selezionate = [];

  const conceptsUsati =
    new Set();

  const conteggiLinea = {};
  const conteggiArea = {};

  const massimoAdattive =
    Math.min(
      10,
      totaleSessione
    );

  const quotaRecupero =
    Math.min(
      6,
      pool.recupero.length,
      massimoAdattive
    );

  const spazioConsolidamento =
    massimoAdattive -
    quotaRecupero;

  const quotaConsolidamento =
    Math.min(
      spazioConsolidamento,
      pool.consolidamento.length
    );

  aggiungiDomandeBilanciate(
    pool.recupero,
    quotaRecupero,
    selezionate,
    conceptsUsati,
    conteggiLinea,
    conteggiArea
  );

  aggiungiDomandeBilanciate(
    pool.consolidamento,
    quotaConsolidamento,
    selezionate,
    conceptsUsati,
    conteggiLinea,
    conteggiArea
  );

  let postiRimanenti =
    totaleSessione -
    selezionate.length;

  aggiungiDomandeBilanciate(
    pool.nuovo,
    postiRimanenti,
    selezionate,
    conceptsUsati,
    conteggiLinea,
    conteggiArea
  );

  postiRimanenti =
    totaleSessione -
    selezionate.length;

  if (
    postiRimanenti > 0
  ) {

    aggiungiDomandeBilanciate(
      pool.consolidamento,
      postiRimanenti,
      selezionate,
      conceptsUsati,
      conteggiLinea,
      conteggiArea
    );

  }

  postiRimanenti =
    totaleSessione -
    selezionate.length;

  if (
    postiRimanenti > 0
  ) {

    aggiungiDomandeBilanciate(
      pool.recupero,
      postiRimanenti,
      selezionate,
      conceptsUsati,
      conteggiLinea,
      conteggiArea
    );

  }

  postiRimanenti =
    totaleSessione -
    selezionate.length;

  if (
    postiRimanenti > 0
  ) {

    aggiungiDomandeBilanciate(
      pool.solido,
      postiRimanenti,
      selezionate,
      conceptsUsati,
      conteggiLinea,
      conteggiArea
    );

  }

  return mescolaArray(
    selezionate
  ).slice(
    0,
    totaleSessione
  );
}

// =========================================================
// AVVIO QUIZ
// =========================================================

function avviaQuizHaircare() {

  if (
    limiteSessioniRaggiunto(
      "haircare"
    )
  ) {
    mostraLineeCapelli();
    return;
  }

  sessioneQuiz =
    creaSessioneQuiz();

  indiceQuiz = 0;
  risposteCorrette = 0;
  rispostaBloccata = false;

  mostraDomandaQuiz();
}

// =========================================================
// MOSTRA DOMANDA
// =========================================================

function mostraDomandaQuiz() {
  const domanda =
    sessioneQuiz[
      indiceQuiz
    ];

  const numeroDomanda =
    indiceQuiz + 1;

  const totaleDomande =
    sessioneQuiz.length;

  const avanzamento =
    Math.round(
      (
        indiceQuiz /
        totaleDomande
      ) * 100
    );

  resultsTitle.textContent =
    "Quiz Haircare";

  productGrid.innerHTML = `

    <section class="hair-quiz">

      <div class="quiz-top">

        <div>

          <p class="quiz-label">
            HAIRCARE TRAINING
          </p>

          <p class="quiz-counter">
            Domanda
            ${numeroDomanda}
            di
            ${totaleDomande}
          </p>

        </div>

        <button
          class="quiz-exit-button"
          id="quizExitButton"
        >
          Esci
        </button>

      </div>

      <div class="quiz-progress">

        <div
          class="quiz-progress-bar"
          style="
            width:
            ${avanzamento}%;
          "
        ></div>

      </div>

      <div class="quiz-meta">

        <span>
          ${domanda.area}
        </span>

        <span>
          ${
            domanda.difficolta ===
              "B"
              ? "Base"
              : domanda.difficolta ===
                  "I"
                ? "Intermedia"
                : "Avanzata"
          }
        </span>

      </div>

      <h4 class="quiz-question">
        ${domanda.domanda}
      </h4>

      <div class="quiz-options">

        ${domanda.opzioni
          .map(
            (
              opzione,
              index
            ) => `

              <button
                class="quiz-option"
                data-index="${index}"
              >

                <span
                  class="
                    quiz-option-letter
                  "
                >
                  ${String.fromCharCode(
                    65 + index
                  )}
                </span>

                <span>
                  ${opzione}
                </span>

              </button>

            `
          )
          .join("")}

      </div>

      <div
        id="quizFeedback"
        class="
          quiz-feedback-container
        "
      ></div>

    </section>

  `;

  rispostaBloccata =
    false;

  document
    .querySelectorAll(
      ".quiz-option"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            verificaRisposta(
              Number(
                button.dataset
                  .index
              )
            );

          }
        );

      }
    );

  document
    .getElementById(
      "quizExitButton"
    )
    .addEventListener(
      "click",
      () => {
        mostraLineeCapelli();
      }
    );
}

// =========================================================
// VERIFICA RISPOSTA
// =========================================================

function verificaRisposta(
  indiceRisposta
) {
  if (
    rispostaBloccata
  ) {
    return;
  }

  rispostaBloccata = true;

  const domanda =
    sessioneQuiz[
      indiceQuiz
    ];

  const corretta =
    indiceRisposta ===
    domanda.corretta;

  if (corretta) {
    risposteCorrette += 1;
  }

  aggiornaConcept(
    domanda,
    corretta
  );

  const buttons =
    document.querySelectorAll(
      ".quiz-option"
    );

  buttons.forEach(
    (
      button,
      index
    ) => {

      button.disabled =
        true;

      if (
        index ===
        domanda.corretta
      ) {

        button.classList.add(
          "quiz-option-correct"
        );

      }

      if (
        index ===
          indiceRisposta &&
        !corretta
      ) {

        button.classList.add(
          "quiz-option-wrong"
        );

      }

    }
  );

  const feedbackContainer =
    document.getElementById(
      "quizFeedback"
    );

  feedbackContainer.innerHTML = `

    <div
      class="
        quiz-feedback
        ${
          corretta
            ? "quiz-feedback-correct"
            : "quiz-feedback-wrong"
        }
      "
    >

      <p
        class="
          quiz-feedback-result
        "
      >
        ${
          corretta
            ? "✓ Risposta corretta"
            : "✕ Risposta non corretta"
        }
      </p>

      <p
        class="
          quiz-feedback-text
        "
      >
        ${domanda.feedback}
      </p>

    </div>

    ${
      domanda.ricorda
        ? `

          <div
            class="
              quiz-remember
            "
          >

            <p>
              RICORDA
            </p>

            <span>
              ${domanda.ricorda}
            </span>

          </div>

        `
        : ""
    }

    <button
      id="quizNextButton"
      class="quiz-next-button"
    >
      ${
        indiceQuiz ===
        sessioneQuiz.length - 1
          ? "Vedi risultato →"
          : "Domanda successiva →"
      }
    </button>

  `;

  document
    .getElementById(
      "quizNextButton"
    )
    .addEventListener(
      "click",
      () => {

        indiceQuiz += 1;

        if (
          indiceQuiz >=
          sessioneQuiz.length
        ) {
          mostraRisultatoQuiz();
        } else {
          mostraDomandaQuiz();
        }

      }
    );
}

// =========================================================
// RISULTATO QUIZ
// =========================================================

function mostraRisultatoQuiz() {
  const totale =
    sessioneQuiz.length;

  const percentuale =
    Math.round(
      (
        risposteCorrette /
        totale
      ) * 100
    );

  const knowledgeScore =
    calcolaKnowledgeScore();

  const conceptsValutati =
    contaConceptValutati();

  const sessioniOggi =
    registraSessioneCompletata(
      "haircare"
    );

  const limiteRaggiunto =
    sessioniOggi >=
    DAILY_SESSION_LIMIT;

  let titoloRisultato = "";

  if (
    percentuale >= 90
  ) {

    titoloRisultato =
      "Ottima padronanza.";

  } else if (
    percentuale >= 75
  ) {

    titoloRisultato =
      "Buona preparazione.";

  } else if (
    percentuale >= 60
  ) {

    titoloRisultato =
      "Base solida, continuiamo.";

  } else {

    titoloRisultato =
      "Abbiamo trovato cosa rafforzare.";

  }

  resultsTitle.textContent =
    "Risultato";

  productGrid.innerHTML = `

    <section class="quiz-result">

      <p
        class="
          quiz-result-label
        "
      >
        MISSIONE COMPLETATA
      </p>

      <h4>
        ${titoloRisultato}
      </h4>

      <div
        class="
          quiz-result-score
        "
      >

        <strong>
          ${risposteCorrette}/${totale}
        </strong>

        <span>
          risposte corrette
        </span>

      </div>

      <div
        class="
          quiz-result-grid
        "
      >

        <div
          class="
            quiz-result-card
          "
        >

          <span>
            RISULTATO SESSIONE
          </span>

          <strong>
            ${percentuale}%
          </strong>

        </div>

        <div
          class="
            quiz-result-card
          "
        >

          <span>
            KNOWLEDGE SCORE
          </span>

          <strong>
            ${knowledgeScore}%
          </strong>

        </div>

      </div>

      <p
        class="
          quiz-result-note
        "
      >
        Il Knowledge Score è calcolato
        sulle conoscenze già valutate.
        Al momento LearningHub ha
        analizzato
        ${conceptsValutati}
        concetti Hair.
      </p>

      ${
        limiteRaggiunto
          ? `

            <div
              class="
                quiz-daily-limit
              "
            >

              <strong>
                Allenamento di oggi completato
              </strong>

              <p>
                Hai completato le 2 sessioni
                Haircare di oggi.
                Torna domani per ripassare,
                rafforzare i concetti
                e continuare il tuo percorso.
              </p>

            </div>

          `
          : `

            <p
              class="
                quiz-session-status
              "
            >
              ${sessioniOggi}/2
              sessioni completate oggi
            </p>

          `
      }

      <div
        class="
          quiz-result-actions
        "
      >

        ${
          !limiteRaggiunto
            ? `

              <button
                id="quizRestartButton"
                class="quiz-next-button"
              >
                Nuova sessione →
              </button>

            `
            : ""
        }

        <button
          id="quizReturnButton"
          class="
            quiz-secondary-button
          "
        >
          Torna alle linee Haircare
        </button>

      </div>

    </section>

  `;

  const restartButton =
    document.getElementById(
      "quizRestartButton"
    );

  if (restartButton) {
    restartButton.addEventListener(
      "click",
      () => {
        avviaQuizHaircare();
      }
    );
  }

  document
    .getElementById(
      "quizReturnButton"
    )
    .addEventListener(
      "click",
      () => {
        mostraLineeCapelli();
      }
    );
}

// =========================================================
// MOSTRA PRODOTTI
// =========================================================

function mostraProdotti(
  listaProdotti,
  titolo = "Prodotti"
) {
  productGrid.innerHTML = "";

  resultsTitle.textContent =
    titolo;

  if (
    listaProdotti.length ===
    0
  ) {

    productGrid.innerHTML = `

      <div
        class="
          empty-state
        "
      >

        <h4>
          Nessun prodotto trovato
        </h4>

        <p>
          Prova con un'altra ricerca.
        </p>

      </div>

    `;

  } else {

    listaProdotti.forEach(
      prodotto => {

        const card =
          document.createElement(
            "article"
          );

        card.classList.add(
          "product-card"
        );

        card.innerHTML = `

          <div
            class="
              product-code
            "
          >
            ${
              prodotto.codice ||
              prodotto.nomeBreve
            }
          </div>

          <p
            class="
              product-type
            "
          >
            ${prodotto.tipologia}
          </p>

          <h4>
            ${prodotto.nome}
          </h4>

          <p
            class="
              product-card-description
            "
          >
            ${prodotto.descrizione}
          </p>

          <button
            class="
              product-button
            "
            data-id="${prodotto.id}"
          >
            Apri scheda →
          </button>

        `;

        productGrid.appendChild(
          card
        );

      }
    );

    document
      .querySelectorAll(
        ".product-button"
      )
      .forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              const prodotto =
                prodotti.find(
                  item =>
                    item.id ===
                    button.dataset.id
                );

              if (prodotto) {
                apriSchedaProdotto(
                  prodotto
                );
              }

            }
          );

        }
      );
  }

  resultsSection
    .classList
    .remove(
      "hidden"
    );

  resultsSection.scrollIntoView({
    behavior: "smooth"
  });
}

// =========================================================
// SCHEDA PRODOTTO
// =========================================================

function apriSchedaProdotto(
  prodotto
) {
  const ingredientiHTML =
    (
      prodotto.ingredienti ||
      []
    )
      .map(
        ingrediente =>
          `<li>${ingrediente}</li>`
      )
      .join("");

  const beneficiHTML =
    (
      prodotto.benefici ||
      []
    )
      .map(
        beneficio =>
          `<li>${beneficio}</li>`
      )
      .join("");

  productGrid.innerHTML = `

    <article
      class="
        product-detail
      "
    >

      <button
        class="
          detail-back-button
        "
        id="detailBackButton"
      >
        ← Torna ai capelli
      </button>

      <div
        class="
          detail-header
        "
      >

        ${
          prodotto.codice
            ? `

              <p
                class="
                  product-code
                "
              >
                ${prodotto.codice}
              </p>

            `
            : ""
        }

        <p
          class="
            product-type
          "
        >
          ${prodotto.tipologia}
        </p>

        <h4>
          ${prodotto.nome}
        </h4>

        <p
          class="
            detail-description
          "
        >
          ${prodotto.descrizione}
        </p>

      </div>

      <div
        class="
          detail-grid
        "
      >

        <section
          class="
            detail-block
          "
        >

          <p
            class="
              detail-label
            "
          >
            INGREDIENTI CHIAVE
          </p>

          <ul>
            ${ingredientiHTML}
          </ul>

        </section>

        <section
          class="
            detail-block
          "
        >

          <p
            class="
              detail-label
            "
          >
            BENEFICI
          </p>

          <ul>
            ${beneficiHTML}
          </ul>

        </section>

        <section
          class="
            detail-block
          "
        >

          <p
            class="
              detail-label
            "
          >
            LEVA CLIENTE
          </p>

          <p>
            ${prodotto.levaCliente}
          </p>

        </section>

        <section
          class="
            detail-block
          "
        >

          <p
            class="
              detail-label
            "
          >
            COME SI USA
          </p>

          <p>
            ${prodotto.utilizzo}
          </p>

        </section>

      </div>

    </article>

  `;

  resultsTitle.textContent =
    prodotto.nome;

  document
    .getElementById(
      "detailBackButton"
    )
    .addEventListener(
      "click",
      () => {
        mostraLineeCapelli();
      }
    );
}

// =========================================================
// CATEGORIE
// =========================================================

categoryCards.forEach(
  card => {

    card.addEventListener(
      "click",
      () => {

        const categoria =
          card.dataset.category;

        if (
          categoria ===
          "capelli"
        ) {
          mostraLineeCapelli();
          return;
        }

        const prodottiFiltrati =
          prodotti.filter(
            prodotto =>
              prodotto.categoria ===
              categoria
          );

        const nomeCategoria =
          categoria
            .charAt(0)
            .toUpperCase() +
          categoria.slice(1);

        mostraProdotti(
          prodottiFiltrati,
          nomeCategoria
        );

      }
    );

  }
);

// =========================================================
// TORNA ALLE CATEGORIE
// =========================================================

backButton.addEventListener(
  "click",
  () => {

    resultsSection
      .classList
      .add(
        "hidden"
      );

    searchInput.value = "";

    document
      .querySelector(
        ".categories"
      )
      .scrollIntoView({
        behavior: "smooth"
      });

  }
);

// =========================================================
// RICERCA
// =========================================================

searchInput.addEventListener(
  "input",
  () => {

    const ricerca =
      searchInput.value
        .toLowerCase()
        .trim();

    if (
      ricerca === ""
    ) {

      resultsSection
        .classList
        .add(
          "hidden"
        );

      return;
    }

    const risultati =
      prodotti.filter(
        prodotto => {

          const testoProdotto =
            testoCompletoProdotto(
              prodotto
            );

          return testoProdotto.includes(
            ricerca
          );

        }
      );

    mostraProdotti(
      risultati,
      `Ricerca: "${searchInput.value}"`
    );

  }
);

// =========================================================
// AUTENTICAZIONE E CONTROLLO ACCESSO
// =========================================================

const APP_URL =
  "https://mirkoklh.github.io/kiko-learninghub/";

const authScreen =
  document.getElementById("authScreen");

const forgotPasswordScreen =
  document.getElementById("forgotPasswordScreen");

const updatePasswordScreen =
  document.getElementById("updatePasswordScreen");

const pendingScreen =
  document.getElementById("pendingScreen");

const appContent =
  document.getElementById("appContent");

const loginTab =
  document.getElementById("loginTab");

const registerTab =
  document.getElementById("registerTab");

const loginForm =
  document.getElementById("loginForm");

const registerForm =
  document.getElementById("registerForm");

const forgotPasswordButton =
  document.getElementById("forgotPasswordButton");

const forgotPasswordForm =
  document.getElementById("forgotPasswordForm");

const backToLoginButton =
  document.getElementById("backToLoginButton");

const updatePasswordForm =
  document.getElementById("updatePasswordForm");

const authMessage =
  document.getElementById("authMessage");

const forgotPasswordMessage =
  document.getElementById("forgotPasswordMessage");

const updatePasswordMessage =
  document.getElementById("updatePasswordMessage");

let modalitaRecuperoPassword = false;


// =========================================================
// SCHERMATE
// =========================================================

function nascondiTutteLeSchermate() {

  if (authScreen) {
    authScreen.classList.add("hidden");
  }

  if (forgotPasswordScreen) {
    forgotPasswordScreen.classList.add("hidden");
  }

  if (updatePasswordScreen) {
    updatePasswordScreen.classList.add("hidden");
  }

  if (pendingScreen) {
    pendingScreen.classList.add("hidden");
  }

  if (appContent) {
    appContent.classList.add("hidden");
  }
}


function mostraSchermataAccesso() {

  nascondiTutteLeSchermate();

  if (authScreen) {
    authScreen.classList.remove("hidden");
  }
}


function mostraSchermataPasswordDimenticata() {

  nascondiTutteLeSchermate();

  if (forgotPasswordScreen) {
    forgotPasswordScreen.classList.remove("hidden");
  }
}


function mostraSchermataNuovaPassword() {

  nascondiTutteLeSchermate();

  if (updatePasswordScreen) {
    updatePasswordScreen.classList.remove("hidden");
  }
}


function mostraSchermataAttesa() {

  nascondiTutteLeSchermate();

  if (pendingScreen) {
    pendingScreen.classList.remove("hidden");
  }
}


function mostraLearningHub() {

  nascondiTutteLeSchermate();

  if (appContent) {
    appContent.classList.remove("hidden");
  }
}


// =========================================================
// TAB ACCEDI / REGISTRATI
// =========================================================

function mostraLogin() {

  loginTab.classList.add("active");
  registerTab.classList.remove("active");

  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");

  if (authMessage) {
    authMessage.textContent = "";
  }
}


function mostraRegistrazione() {

  registerTab.classList.add("active");
  loginTab.classList.remove("active");

  registerForm.classList.remove("hidden");
  loginForm.classList.add("hidden");

  if (authMessage) {
    authMessage.textContent = "";
  }
}


if (loginTab) {
  loginTab.addEventListener(
    "click",
    mostraLogin
  );
}


if (registerTab) {
  registerTab.addEventListener(
    "click",
    mostraRegistrazione
  );
}


// =========================================================
// PASSWORD DIMENTICATA
// =========================================================

if (forgotPasswordButton) {

  forgotPasswordButton.addEventListener(
    "click",
    () => {

      if (forgotPasswordMessage) {
        forgotPasswordMessage.textContent = "";
      }

      mostraSchermataPasswordDimenticata();
    }
  );
}


if (backToLoginButton) {

  backToLoginButton.addEventListener(
    "click",
    () => {

      mostraSchermataAccesso();
      mostraLogin();
    }
  );
}


if (forgotPasswordForm) {

  forgotPasswordForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const email =
        document
          .getElementById("forgotPasswordEmail")
          .value
          .trim();

      if (forgotPasswordMessage) {
        forgotPasswordMessage.textContent =
          "Invio del link in corso...";
      }

      const { error } =
        await supabaseClient.auth
          .resetPasswordForEmail(
            email,
            {
              redirectTo: APP_URL
            }
          );

      if (error) {

        console.error(
          "Errore recupero password:",
          error
        );

        if (forgotPasswordMessage) {
          forgotPasswordMessage.textContent =
            "Non è stato possibile inviare il link. " +
            error.message;
        }

        return;
      }

      forgotPasswordForm.reset();

      if (forgotPasswordMessage) {
        forgotPasswordMessage.textContent =
          "Link inviato. Controlla la tua email.";
      }
    }
  );
}


// =========================================================
// NUOVA PASSWORD
// =========================================================

if (updatePasswordForm) {

  updatePasswordForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const nuovaPassword =
        document
          .getElementById("newPassword")
          .value;

      const confermaPassword =
        document
          .getElementById("confirmNewPassword")
          .value;

      if (
        nuovaPassword !==
        confermaPassword
      ) {

        updatePasswordMessage.textContent =
          "Le due password non coincidono.";

        return;
      }

      if (nuovaPassword.length < 6) {

        updatePasswordMessage.textContent =
          "La password deve contenere almeno 6 caratteri.";

        return;
      }

      updatePasswordMessage.textContent =
        "Aggiornamento password in corso...";

      const { error } =
        await supabaseClient.auth
          .updateUser({
            password: nuovaPassword
          });

      if (error) {

        console.error(
          "Errore aggiornamento password:",
          error
        );

        updatePasswordMessage.textContent =
          "Non è stato possibile aggiornare la password. " +
          error.message;

        return;
      }

    updatePasswordForm.reset();

await supabaseClient.auth.signOut();

modalitaRecuperoPassword = false;

mostraSchermataAccesso();
mostraLogin();

authMessage.textContent =
  "Password aggiornata. Ora puoi accedere con la nuova password.";

// =========================================================
// CONTROLLO PROFILO
// =========================================================

async function controllaProfiloUtente(user) {

  if (!user) {
    mostraSchermataAccesso();
    return;
  }

  const {
    data: profilo,
    error
  } =
    await supabaseClient
      .from("profiles")
      .select(
        "id, nome, cognome, email, stato, ruolo"
      )
      .eq("id", user.id)
      .single();

  if (error) {

    console.error(
      "Errore lettura profilo:",
      error
    );

    mostraSchermataAccesso();

    if (authMessage) {
      authMessage.textContent =
        "Non è stato possibile verificare il tuo profilo.";
    }

    return;
  }

  if (
    profilo.stato ===
    "approvato"
  ) {

    mostraLearningHub();
    return;
  }

  mostraSchermataAttesa();
}


// =========================================================
// REGISTRAZIONE
// =========================================================

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const nome =
        document
          .getElementById("registerNome")
          .value
          .trim();

      const cognome =
        document
          .getElementById("registerCognome")
          .value
          .trim();

      const email =
        document
          .getElementById("registerEmail")
          .value
          .trim();

      const password =
        document
          .getElementById("registerPassword")
          .value;

      authMessage.textContent =
        "Registrazione in corso...";

      const {
        data,
        error
      } =
        await supabaseClient.auth.signUp({

          email: email,

          password: password,

          options: {

            emailRedirectTo:
              APP_URL,

            data: {
              nome: nome,
              cognome: cognome
            }
          }
        });

      if (error) {

        console.error(
          "Errore registrazione:",
          error
        );

        authMessage.textContent =
          "Non è stato possibile completare la registrazione. " +
          error.message;

        return;
      }

      console.log(
        "Registrazione completata:",
        data
      );

      registerForm.reset();

      authMessage.textContent =
        "Registrazione completata. Controlla la tua email e conferma l'indirizzo. Dopo la verifica, il tuo account resterà in attesa di approvazione.";
    }
  );
}


// =========================================================
// LOGIN
// =========================================================

if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async event => {

      event.preventDefault();

      const email =
        document
          .getElementById("loginEmail")
          .value
          .trim();

      const password =
        document
          .getElementById("loginPassword")
          .value;

      authMessage.textContent =
        "Accesso in corso...";

      const {
        data,
        error
      } =
        await supabaseClient.auth
          .signInWithPassword({
            email: email,
            password: password
          });

      if (error) {

        console.error(
          "Errore accesso:",
          error
        );

        authMessage.textContent =
          "Non è stato possibile accedere. Controlla email e password.";

        return;
      }

      authMessage.textContent = "";

      await controllaProfiloUtente(
        data.user
      );
    }
  );
}


// =========================================================
// EVENTI SUPABASE
// =========================================================

supabaseClient.auth.onAuthStateChange(
  (event, session) => {

    setTimeout(
      async () => {

        if (
          event ===
          "PASSWORD_RECOVERY"
        ) {

          modalitaRecuperoPassword = true;

          mostraSchermataNuovaPassword();

          return;
        }

        if (modalitaRecuperoPassword) {

          mostraSchermataNuovaPassword();

          return;
        }

        if (!session) {

          mostraSchermataAccesso();

          return;
        }

        await controllaProfiloUtente(
          session.user
        );
      },
      0
    );
  }
);


// =========================================================
// CONTROLLO SESSIONE ALL'APERTURA
// =========================================================

async function inizializzaAutenticazione() {

  nascondiTutteLeSchermate();

  // Se siamo entrati dal link di recupero password,
  // lasciamo a onAuthStateChange la gestione della schermata.
  const hash =
    window.location.hash;

  const query =
    window.location.search;

  if (
    hash.includes("type=recovery") ||
    query.includes("type=recovery")
  ) {

    modalitaRecuperoPassword = true;

    mostraSchermataNuovaPassword();

    return;
  }

  const {
    data,
    error
  } =
    await supabaseClient.auth.getSession();

  if (error) {

    console.error(
      "Errore controllo sessione:",
      error
    );

    mostraSchermataAccesso();

    return;
  }

  if (modalitaRecuperoPassword) {

    mostraSchermataNuovaPassword();

    return;
  }

  if (!data.session) {

    mostraSchermataAccesso();

    return;
  }

  await controllaProfiloUtente(
    data.session.user
  );
}

// =========================================================
// AVVIO
// =========================================================

inizializzaAutenticazione();