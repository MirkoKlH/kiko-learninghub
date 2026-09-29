// Test notifica automatica Weekly
window.WEEKLY_DATA = {
  settimane: [
    { id: "w39", numero: 39, dal: "2026-09-21", al: "2026-09-27" },
    { id: "w40", numero: 40, dal: "2026-09-28", al: "2026-10-04" },
    { id: "w41", numero: 41, dal: "2026-10-05", al: "2026-10-11" }
  ],

  eventi: [
    {
      id: "face-skin-2plus1",
      tipo: "promo",
      titolo: "Face & Skin 2+1",
      dataInizio: "2026-09-24",
      dataFine: "2026-10-25",
      priorita: 90,
      preparazioni: [
        {
          data: "2026-09-23",
          momento: "sera",
          titolo: "Prepara Face & Skin 2+1",
          azione: "Inserisci i frame arancioni in tutte le CVT coinvolte nella promo."
        },
        {
          data: "2026-10-01",
          titolo: "Aggiorna la comunicazione Face & Skin",
          azione: "Inserisci il pannello di comunicazione promo al posto di quello di comunicazione."
        }
      ],
      ricordatiChe: "Il meno caro è in omaggio e la promo si applica a ogni multiplo di 3 prodotti idonei.",
      comeFunziona: "Acquista 3 prodotti idonei tra make-up viso, accessori viso, skincare, haircare e prodotti Face & Skin Care della Fall. Il processo è automatico alla cassa.",
      cosaComprende: "È incluso anche il lancio Animation Full Coverage.",
      attenzione: "Non cumulativa con lo sconto dipendenti."
    },
    {
      id: "voucher-ottobre",
      tipo: "promo",
      titolo: "Voucher 15 €",
      priorita: 100,
      fasi: [
        {
          id: "emissione",
          titolo: "Emissione Voucher",
          dataInizio: "2026-09-15",
          dataFine: "2026-10-05",
          ricordatiChe: "Con 30 € di spesa il cliente riceve un voucher da 15 €.",
          attenzione: "Il voucher è cartaceo: dopo il pagamento va richiesta la stampa. Non viene stampato automaticamente e non può essere associato successivamente allo scontrino."
        },
        {
          id: "riscatto",
          titolo: "Riscatto Voucher",
          dataInizio: "2026-10-06",
          dataFine: "2026-11-02",
          ricordatiChe: "Il voucher da 15 € è riscattabile con una spesa minima di 25 €."
        }
      ],
      comeFunziona: "Meccanica automatica alla cassa secondo la fase attiva.",
      attenzione: "Non cumulativa con lo sconto dipendenti."
    },
    {
      id: "gwp-maxi-mod",
      tipo: "promo",
      titolo: "GWP Maxi Mod",
      dataInizio: "2026-09-28",
      dataFine: "2026-10-12",
      priorita: 92,
      ricordatiChe: "Riservato ai possessori KIKO ME.",
      comeFunziona: "Con almeno 2 prodotti Maxi Mod, incluso almeno 1 mascara Maxi Mod, il cliente riceve Pure Clean Eyes & Lips 01.",
      attenzione: "Un solo omaggio per scontrino. Se il GWP è esaurito, seguire l'alternativa indicata nella Weekly. Processo automatico alla cassa e non cumulativo con lo sconto dipendenti."
    },
    {
      id: "kiko-me-new",
      tipo: "attivita",
      titolo: "Nuovo programma KIKO ME",
      dataInizio: "2026-09-28",
      dataFine: "2027-01-31",
      priorita: 70,
      ricordatiChe: "Dal 28 settembre sono attive le nuove ricompense KIKO ME.",
      cosaComprende: "Il programma prevede ricompense differenziate per livello e nuove logiche per compleanno e anniversario."
    },
    {
      id: "bday-offer",
      tipo: "promo",
      titolo: "BDay Offer",
      dataInizio: "2026-09-28",
      dataFine: "2026-10-30",
      priorita: 80,
      comeFunziona: "20% di sconto sull'intero ordine, con le esclusioni previste dalla Weekly.",
      cosaFare: "La BA deve attivare l'offerta inserendo il codice BDAYREC20.",
      attenzione: "Non cumulativa con lo sconto dipendenti."
    },
    {
      id: "career-day-end",
      tipo: "scadenza",
      titolo: "Fine promo Career Day",
      dataInizio: "2026-09-30",
      dataFine: "2026-09-30",
      priorita: 55,
      ricordatiChe: "La promo Career Day termina il 30 settembre."
    },
    {
      id: "suncare-end",
      tipo: "scadenza",
      titolo: "Fine promo Suncare -50%",
      dataInizio: "2026-09-30",
      dataFine: "2026-09-30",
      priorita: 55,
      ricordatiChe: "La promo Suncare -50% termina il 30 settembre."
    },
    {
      id: "advent-calendar-qc",
      tipo: "attivita",
      titolo: "Controllo Calendari Avvento",
      finestraAzione: { dal: "2026-09-28", entro: "2026-09-30" },
      priorita: 98,
      cosaFare: "Controlla tutti i Calendari dell'Avvento prima del lancio del 1° ottobre.",
      attenzione: "Se manca un prodotto, segnala ad AM numero di lotto e articolo mancante. Il calendario difettoso va messo da parte senza scaricarlo."
    },
    {
      id: "advent-calendar-launch",
      tipo: "lancio",
      titolo: "Calendario dell'Avvento",
      dataInizio: "2026-10-01",
      priorita: 86,
      preparazioni: [
        {
          data: "2026-09-30",
          momento: "sera",
          titolo: "Prepara Calendario dell'Avvento",
          azione: "Completa i controlli e prepara esposizione/floorstand per l'apertura del 1° ottobre."
        }
      ],
      ricordatiChe: "La vendita in store parte il 1° ottobre."
    },
    {
      id: "full-coverage",
      tipo: "lancio",
      titolo: "Full Coverage",
      dataInizio: "2026-10-01",
      priorita: 94,
      preparazioni: [
        {
          data: "2026-09-30",
          momento: "sera",
          titolo: "Prepara Full Coverage",
          azione: "Predisponi il cambio per l'esposizione dal 1° ottobre e verifica il materiale previsto per il tuo store."
        }
      ],
      ricordatiChe: "Esposizione dal 1° ottobre. Il lancio rientra nella promo Face & Skin 2+1.",
      attenzione: "Per disposizione e dettagli SKU fai riferimento al planogramma ufficiale della Weekly."
    },
    {
      id: "skin-renaissance-trainer-layout",
      tipo: "visual",
      titolo: "Skin Renaissance + Skin Trainer",
      dataInizio: "2026-10-01",
      priorita: 93,
      preparazioni: [
        {
          data: "2026-09-30",
          momento: "sera",
          titolo: "Aggiorna layout Skincare",
          azione: "Prepara il nuovo layout Skin Renaissance / Skin Trainer per essere pronto all'apertura del 1° ottobre e verifica le etichette aggiornate su iLabels."
        }
      ],
      ricordatiChe: "L'esposizione parte il 1° ottobre e il layout varia in base al cluster.",
      attenzione: "Couvette e componenti vanno puliti con panno umido, senza solvente."
    },
    {
      id: "gift-set-fragrances",
      tipo: "lancio",
      titolo: "Gift Set Fragrances",
      dataInizio: "2026-10-01",
      priorita: 60,
      ricordatiChe: "Il lancio dei Gift Set Fragrances parte il 1° ottobre."
    }
  ]
};
