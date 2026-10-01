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
      attenzione: "Un solo omaggio per scontrino. Se il GWP è esaurito, offrire un prodotto alternativo dello stesso valore secondo le indicazioni della Weekly. Processo automatico alla cassa e non cumulativo con lo sconto dipendenti."
    },

    {
      id: "plus-one",
      tipo: "promo",
      titolo: "Plus One",
      dataInizio: "2026-09-29",
      dataFine: "2026-10-18",
      priorita: 99,
      ricordatiChe: "Proponi i prodotti Plus One come aggiunta allo scontrino: il prezzo promozionale si attiva solo se acquistati insieme ad altri prodotti.",
      cosaComprende: "Kissable Lip Scrub 01 a 5 €, Kissable Lip Balm 01 a 5 € e Party Saver Mascara a 6 €.",
      comeFunziona: "La promozione viene applicata automaticamente in cassa quando si verificano le condizioni previste.",
      attenzione: "Non cumulativa con lo sconto dipendenti."
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
      cosaFare: "Controlla tutti i Calendari dell'Avvento prima del lancio del 1° ottobre, compresi quelli ricevuti con la seconda spedizione.",
      attenzione: "Se manca un prodotto, segnala tempestivamente ad AM numero di lotto e articolo mancante. Il calendario difettoso va accantonato fino a nuovo avviso, senza scaricarlo."
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
      ricordatiChe: "La vendita in store parte il 1° ottobre.",
      cosaFare: "Negli store selezionati utilizza il floorstand dedicato. Negli store senza floorstand esponi la comunicazione A5 nel punto più visibile della cassa e conserva lo stock in magazzino senza esporlo in sala vendita."
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
      cosaFare: "Dal 1° ottobre sostituisci il pannello di comunicazione con quello promozionale.",
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
      ricordatiChe: "Il lancio dei Gift Set Fragrances parte il 1° ottobre.",
      cosaFare: "Esponi il totem Gift Set nuove fragranze + linea previsto dal 1° ottobre, secondo il materiale assegnato allo store."
    },

    {
      id: "nuovi-prodotti-es-ottobre",
      tipo: "visual",
      titolo: "Nuovi prodotti ES",
      dataInizio: "2026-10-01",
      priorita: 96,
      ricordatiChe: "Dal 1° ottobre alcuni prodotti passano ES e vengono scontati del 30%.",
      cosaComprende: "Matte Fusion Powders, linea Sublime Skincare, Bright Lift Skincare, Unlimited Blush 07, 08 e 12 e Skin Tint.",
      cosaFare: "Rimuovi questi prodotti dalle CVT e inseriscili nelle boules.",
      attenzione: "I prodotti ES sono esclusi dalla promo Face & Skin 2+1. Per gli SKU interessati fai riferimento al listino prezzi della Weekly."
    },

    {
      id: "reason-to-come-back-xmas",
      tipo: "attivita",
      titolo: "Motivo per tornare",
      dataInizio: "2026-09-28",
      dataFine: "2026-10-04",
      priorita: 75,
      ricordatiChe: "Durante il check-out, dopo aver emesso lo scontrino, condividi con tutti i clienti il motivo per tornare.",
      cosaFare: "Anticipa l'arrivo della nuova collezione Natale dal 22 ottobre e invita il cliente a tornare in store per scoprirla.",
      cosaComprende: "La collezione Holiday prevede 20 nuove formule e 12 gift set, con prodotti e cofanetti pensati anche per il gifting."
    }
  ]
};