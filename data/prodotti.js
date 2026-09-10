const prodotti = [

  // =========================================================
  // VOLUME & PLUMP
  // =========================================================

  {
    id: "volume-plump-shampoo",
    codice: "V&P 01",
    nome: "Volume & Plump Shampoo",
    nomeBreve: "Shampoo",
    linea: "volume-plump",
    categoria: "capelli",
    tipologia: "Detersione",

    descrizione:
      "Shampoo volumizzante dalla texture cremosa e leggera. Deterge delicatamente senza appesantire e dona corpo, morbidezza e luminosità ai capelli.",

    ingredienti: [
      "Acido ialuronico cationico → aiuta a trattenere l’idratazione sulla fibra capillare",
      "Proteine del riso → contribuiscono a dare corpo e sostegno ai capelli",
      "Estratto di fico bianco italiano → completa la formula ad azione condizionante"
    ],

    benefici: [
      "Effetto volume e plump",
      "Capelli più morbidi",
      "Aumento della luminosità",
      "Migliore pettinabilità",
      "Riduzione della fragilità"
    ],

    levaCliente:
      "Da proporre a chi sente i capelli piatti, fini o privi di corpo e vuole iniziare la routine volume già dalla detersione senza appesantire.",

    utilizzo:
      "Applicare sul cuoio capelluto e sui capelli bagnati, massaggiare delicatamente e risciacquare. Ripetere se necessario."
  },

  {
    id: "volume-plump-leave-in",
    codice: "V&P 02",
    nome: "Volume & Plump Leave-In Conditioner",
    nomeBreve: "Leave-In Conditioner",
    linea: "volume-plump",
    categoria: "capelli",
    tipologia: "Trattamento",
    termoprotezione: true,

    descrizione:
      "Balsamo senza risciacquo volumizzante. Districa, ammorbidisce e dona luminosità senza togliere corpo ai capelli.",

    ingredienti: [
      "Acido ialuronico cationico → favorisce il mantenimento dell’idratazione sulla fibra",
      "Proteine del riso → aiutano a dare corpo e sostegno",
      "Estratto di fico bianco italiano → contribuisce alla morbidezza del capello"
    ],

    benefici: [
      "Effetto volume e plump",
      "Districa più facilmente",
      "Capelli più luminosi",
      "Riduce visibilmente l’effetto crespo",
      "Aiuta a ridurre la fragilità",
      "Azione termoprotettiva"
    ],

    levaCliente:
      "Perfetto per chi vuole districare e ammorbidire i capelli senza utilizzare un balsamo che rischi di appesantire il volume.",

    utilizzo:
      "Dopo lo shampoo applicare sui capelli umidi senza risciacquare. Procedere con l’asciugatura. Il prodotto svolge anche azione termoprotettiva."
  },

  {
    id: "volume-plump-root-spray",
    codice: "V&P 03",
    nome: "Volume & Plump Root Spray",
    nomeBreve: "Root Spray",
    linea: "volume-plump",
    categoria: "capelli",
    tipologia: "Styling",

    descrizione:
      "Spray volumizzante da applicare alle radici per creare un effetto volume immediato senza appesantire né ungere.",

    ingredienti: [
      "Acido ialuronico cationico → aiuta a mantenere la fibra idratata",
      "Proteine del riso → contribuiscono al corpo e alla struttura del capello",
      "Estratto di fico bianco italiano → supporta morbidezza e condizionamento"
    ],

    benefici: [
      "Volume immediato alle radici",
      "Effetto plump",
      "Capelli più morbidi",
      "Texture leggera",
      "Non lascia residui",
      "Non appesantisce"
    ],

    levaCliente:
      "Ideale per chi sente i capelli piatti soprattutto alla radice e vuole concentrare il volume esattamente dove serve.",

    utilizzo:
      "Applicare direttamente sulle radici dei capelli umidi o asciutti. Massaggiare e distribuire, quindi procedere allo styling."
  },

  {
    id: "volume-plump-hair-spray",
    codice: "V&P 04",
    nome: "Volume & Plump Hair Spray",
    nomeBreve: "Hair Spray",
    linea: "volume-plump",
    categoria: "capelli",
    tipologia: "Styling",
    termoprotezione: true,

    descrizione:
      "Lacca volumizzante senza gas dalla texture leggera. Fissa la piega mantenendo un risultato naturale e dona volume a lunga durata.",

    ingredienti: [
      "Proteine del riso → contribuiscono a dare struttura e corpo",
      "Estratto di fico bianco italiano → completa la formula mantenendo il capello piacevole al tatto"
    ],

    benefici: [
      "Volume immediato e a lunga durata",
      "Tenuta modulabile",
      "Effetto disciplinante",
      "Texture impalpabile",
      "Formula senza gas",
      "Finish naturale"
    ],

    levaCliente:
      "Da proporre a chi vuole fissare la piega e mantenere il volume senza un effetto rigido o pesante.",

    utilizzo:
      "Vaporizzare sui capelli asciutti dopo lo styling, modulando la quantità in base al livello di tenuta desiderato."
  },

  {
    id: "volume-plump-hair-mousse",
    codice: "V&P 05",
    nome: "Volume & Plump Hair Mousse",
    nomeBreve: "Hair Mousse",
    linea: "volume-plump",
    categoria: "capelli",
    tipologia: "Styling",

    descrizione:
      "Mousse leggera per mettere in piega, ravvivare o ritoccare i capelli e ottenere volume senza rinunciare alla morbidezza.",

    ingredienti: [
      "Proteine del riso → aiutano a dare corpo e sostegno",
      "Estratto di fico bianco italiano → contribuisce alla morbidezza della fibra"
    ],

    benefici: [
      "Volume immediato e a lunga durata",
      "Effetto disciplinante",
      "Texture leggera",
      "Non secca i capelli",
      "Azione termoprotettiva",
      "Utilizzabile anche sui capelli asciutti"
    ],

    levaCliente:
      "Ideale per chi vuole costruire volume durante la piega oppure ravvivarlo nei giorni successivi.",

    utilizzo:
      "Agitare prima dell’uso. Applicare una piccola quantità sui capelli umidi o asciutti e distribuire, quindi procedere allo styling."
  },

  {
    id: "volume-plump-dry-shampoo",
    codice: "V&P 06",
    nome: "Volume & Plump Dry Shampoo",
    nomeBreve: "Dry Shampoo",
    linea: "volume-plump",
    categoria: "capelli",
    tipologia: "Refresh",

    descrizione:
      "Shampoo secco volumizzante che rinfresca i capelli tra un lavaggio e l’altro, assorbe il sebo alla radice e restituisce volume.",

    ingredienti: [
      "Proteine del riso → contribuiscono a dare corpo al capello",
      "Estratto di fico bianco italiano → completa la formula della linea Volume & Plump"
    ],

    benefici: [
      "Assorbe il sebo alla radice",
      "Riduce visibilmente l’aspetto oleoso",
      "Capelli più puliti e freschi",
      "Effetto volume immediato",
      "Non lascia residui visibili"
    ],

    levaCliente:
      "Ottimo per chi tende ad avere la radice grassa o piatta già il giorno dopo lo shampoo.",

    utilizzo:
      "Agitare bene e vaporizzare sulle radici asciutte. Lasciare agire qualche istante, massaggiare e rimuovere l’eventuale eccesso."
  },


  
    // =========================================================
  // NOURISH & PROTECT
  // =========================================================

  {
    id: "nourish-protect-shampoo",
    codice: "",
    nome: "Nourish & Protect Shampoo",
    nomeBreve: "Shampoo",
    linea: "nourish-protect",
    categoria: "capelli",
    tipologia: "Detersione",

    descrizione:
      "Shampoo nutriente pensato per capelli tendenzialmente secchi e danneggiati. Deterge delicatamente aiutando a restituire morbidezza, idratazione e un aspetto più sano alla fibra.",

    ingredienti: [
      "Acido ialuronico → aiuta a mantenere l’idratazione del capello",
      "Estratto di noce italiana → contribuisce a nutrire e rendere il capello più morbido",
      "Acido ialuronico e noce lavorano sull’idratazione della fibra, aiutando a mantenere le squame più compatte e il capello dall’aspetto sano"
    ],

    benefici: [
      "Deterge senza seccare",
      "Aiuta a mantenere l’idratazione",
      "Capelli più morbidi",
      "Capelli dall’aspetto più sano",
      "Ideale per capelli secchi o danneggiati"
    ],

    levaCliente:
      "Da proporre quando la cliente descrive capelli secchi, spenti, ruvidi o danneggiati e cerca una detersione che non li impoverisca ulteriormente.",

    utilizzo:
      "Applicare sui capelli bagnati, massaggiare delicatamente il cuoio capelluto e le lunghezze e risciacquare. Ripetere se necessario."
  },

  {
    id: "nourish-protect-conditioner",
    codice: "",
    nome: "Nourish & Protect Conditioner",
    nomeBreve: "Conditioner",
    linea: "nourish-protect",
    categoria: "capelli",
    tipologia: "Trattamento",

    descrizione:
      "Balsamo nutriente che aiuta a districare e ammorbidire i capelli secchi o danneggiati, rendendoli più gestibili e piacevoli al tatto.",

    ingredienti: [
      "Acido ialuronico → contribuisce a mantenere l’idratazione della fibra",
      "Estratto di noce italiana → aiuta a nutrire e ammorbidire il capello",
      "Acido ialuronico e noce lavorano sull’idratazione della fibra, aiutando a mantenere le squame più compatte e il capello dall’aspetto sano"
    ],

    benefici: [
      "Districa i capelli",
      "Dona morbidezza",
      "Aiuta a ridurre la sensazione di secchezza",
      "Migliora la gestibilità",
      "Lascia il capello più disciplinato"
    ],

    levaCliente:
      "Ideale per chi dopo lo shampoo sente i capelli ruvidi, difficili da districare o poco gestibili e ha bisogno di nutrimento senza complicare la routine.",

    utilizzo:
      "Applicare dopo lo shampoo sulle lunghezze e sulle punte. Lasciare agire e risciacquare accuratamente."
  },

  {
    id: "nourish-protect-hair-mask",
    codice: "",
    nome: "Nourish & Protect Hair Mask",
    nomeBreve: "Hair Mask",
    linea: "nourish-protect",
    categoria: "capelli",
    tipologia: "Trattamento intensivo",

    descrizione:
      "Maschera nutriente intensiva per capelli secchi e danneggiati. Completa la routine quando il capello necessita di un trattamento più ricco rispetto al balsamo.",

    ingredienti: [
      "Acido ialuronico → aiuta a preservare l’idratazione del capello",
      "Estratto di noce italiana → contribuisce al nutrimento e alla morbidezza della fibra",
      "Acido ialuronico e noce lavorano sull’idratazione della fibra, aiutando a mantenere le squame più compatte e il capello dall’aspetto sano"
    ],

    benefici: [
      "Nutrimento intensivo",
      "Capelli più morbidi",
      "Aiuta a migliorare l’aspetto dei capelli danneggiati",
      "Riduce la sensazione di ruvidità",
      "Migliora la gestibilità delle lunghezze"
    ],

    levaCliente:
      "Da proporre quando balsamo e shampoo da soli non sono sufficienti: capelli molto secchi, trattati, stressati o che risultano ruvidi soprattutto sulle lunghezze.",

    utilizzo:
      "Applicare sui capelli lavati e tamponati, concentrandosi su lunghezze e punte. Lasciare agire e risciacquare accuratamente."
  },

  {
    id: "nourish-protect-daily-hair-serum",
    codice: "",
    nome: "Nourish & Protect Daily Hair Serum",
    nomeBreve: "Daily Hair Serum",
    linea: "nourish-protect",
    categoria: "capelli",
    tipologia: "Trattamento senza risciacquo",

    descrizione:
      "Siero quotidiano senza risciacquo pensato per mantenere morbidezza e nutrimento sulle lunghezze, particolarmente utile per capelli secchi o danneggiati.",

    ingredienti: [
      "Acido ialuronico → contribuisce al mantenimento dell’idratazione",
      "Estratto di noce italiana → aiuta a nutrire e ammorbidire il capello",
      "Acido ialuronico e noce lavorano sull’idratazione della fibra, aiutando a mantenere le squame più compatte e il capello dall’aspetto sano"
    ],

    benefici: [
      "Nutrimento quotidiano",
      "Capelli più morbidi",
      "Aiuta a mantenere le lunghezze più gestibili",
      "Texture adatta all’utilizzo senza risciacquo",
      "Completa la routine tra un lavaggio e l’altro"
    ],

    levaCliente:
      "Perfetto per chi sente soprattutto le lunghezze secche durante la giornata e vuole mantenere morbidezza e nutrimento anche tra un lavaggio e l’altro.",

    utilizzo:
      "Applicare una piccola quantità sulle lunghezze e sulle punte, su capelli umidi o asciutti, senza risciacquare. Se successivamente si utilizzano phon, piastra o altri strumenti a caldo, applicare anche un termoprotettore."
  },

  {
    id: "nourish-protect-hair-spray",
    codice: "",
    nome: "Nourish & Protect Hair Spray",
    nomeBreve: "Hair Spray",
    linea: "nourish-protect",
    categoria: "capelli",
    tipologia: "Protezione",
    termoprotezione: true,

    descrizione:
      "Spray protettivo pensato per completare la routine dei capelli secchi e danneggiati e proteggerli durante lo styling a caldo.",

    ingredienti: [
      "Acido ialuronico → aiuta a mantenere l’idratazione della fibra",
      "Estratto di noce italiana → contribuisce a mantenere il capello morbido e nutrito"
    ],

    benefici: [
      "Azione termoprotettiva",
      "Aiuta a proteggere i capelli durante lo styling",
      "Mantiene il capello più morbido",
      "Completa la routine Nourish & Protect",
      "Indicato prima dell’utilizzo di strumenti a caldo"
    ],

    levaCliente:
      "Fondamentale da collegare alla vendita quando la cliente utilizza abitualmente phon, piastra o altri strumenti a caldo, soprattutto su capelli già secchi o danneggiati.",

    utilizzo:
      "Distribuire sui capelli prima di procedere con lo styling a caldo, concentrandosi sulle lunghezze e sulle zone maggiormente esposte al calore."
  },


  // =========================================================
  // SILKY GLOSS
  // =========================================================


  {
    id: "silky-gloss-shampoo",
    codice: "",
    nome: "Silky Gloss Shampoo",
    nomeBreve: "Shampoo",
    linea: "silky-gloss",
    categoria: "capelli",
    tipologia: "Detersione",

    descrizione:
      "Shampoo pensato per detergere delicatamente i capelli lisci, aiutandoli a risultare più morbidi, luminosi e facili da gestire.",

    ingredienti: [
      "Proteine vegetali → aiutano a migliorare l’aspetto e la morbidezza della fibra",
      "Pantenolo → contribuisce a mantenere il capello idratato, morbido e flessibile",
      "Estratto di arancia italiana → completa la formula contribuendo alla luminosità del capello"
    ],

    benefici: [
      "Deterge delicatamente",
      "Capelli più morbidi",
      "Aiuta a migliorare la luminosità",
      "Favorisce la pettinabilità",
      "Rende i capelli lisci più gestibili"
    ],

    levaCliente:
      "Da proporre a chi ha capelli lisci che tendono a risultare spenti, poco morbidi o difficili da gestire e desidera una routine che ne esalti setosità e luminosità.",

    utilizzo:
      "Applicare sui capelli bagnati, massaggiare delicatamente il cuoio capelluto e le lunghezze e risciacquare. Ripetere se necessario."
  },

  {
    id: "silky-gloss-conditioner",
    codice: "",
    nome: "Silky Gloss Conditioner",
    nomeBreve: "Conditioner",
    linea: "silky-gloss",
    categoria: "capelli",
    tipologia: "Trattamento",

    descrizione:
      "Balsamo pensato per districare e ammorbidire i capelli lisci, aiutandoli a risultare più setosi, luminosi e semplici da mettere in piega.",

    ingredienti: [
      "Proteine vegetali → contribuiscono a migliorare l’aspetto e la morbidezza della fibra",
      "Pantenolo → aiuta a mantenere idratazione, morbidezza e flessibilità",
      "Estratto di arancia italiana → contribuisce alla luminosità del capello"
    ],

    benefici: [
      "Districa i capelli",
      "Dona morbidezza",
      "Migliora la pettinabilità",
      "Aiuta a rendere i capelli più setosi",
      "Favorisce un aspetto più luminoso",
      "Rende la piega più facile da gestire"
    ],

    levaCliente:
      "Ideale per chi dopo lo shampoo sente i capelli lisci poco scorrevoli, difficili da districare o spenti e vuole ottenere maggiore morbidezza senza complicare la routine.",

    utilizzo:
      "Applicare dopo lo shampoo sulle lunghezze e sulle punte. Lasciare agire e risciacquare accuratamente."
  },

  {
    id: "silky-gloss-hair-serum",
    codice: "",
    nome: "Silky Gloss Hair Serum",
    nomeBreve: "Hair Serum",
    linea: "silky-gloss",
    categoria: "capelli",
    tipologia: "Trattamento senza risciacquo",

    descrizione:
      "Siero senza risciacquo pensato per completare la routine dei capelli lisci, donando morbidezza, luminosità e un aspetto più setoso alle lunghezze.",

    ingredienti: [
      "Proteine vegetali → aiutano a migliorare l’aspetto della fibra capillare",
      "Pantenolo → contribuisce a mantenere il capello morbido, idratato e flessibile",
      "Estratto di arancia italiana → contribuisce alla luminosità del capello"
    ],

    benefici: [
      "Dona morbidezza",
      "Esalta la luminosità",
      "Aiuta a rendere i capelli più setosi",
      "Migliora la gestibilità delle lunghezze",
      "Completa la routine dei capelli lisci"
    ],

    levaCliente:
      "Perfetto per chi vuole dare il tocco finale alla piega e ottenere capelli lisci dall’aspetto più morbido, luminoso e curato.",

    utilizzo:
      "Applicare una piccola quantità sulle lunghezze e sulle punte, su capelli umidi o asciutti, senza risciacquare. Se successivamente si utilizza il calore, applicare prima anche un prodotto termoprotettivo."
  },


   // =========================================================
  // SPIRAL SHINE
  // =========================================================

  {
    id: "spiral-shine-hair-cleansing-balm",
    codice: "",
    nome: "Spiral Shine Hair Cleansing Balm",
    nomeBreve: "Hair Cleansing Balm",
    linea: "spiral-shine",
    categoria: "capelli",
    tipologia: "Detersione",

    descrizione:
      "Balsamo detergente pensato per capelli ricci e mossi. Deterge delicatamente rispettando la naturale forma del riccio e aiuta a lasciare i capelli morbidi e disciplinati.",

    ingredienti: [
      "Preziosi oli vegetali → contribuiscono a nutrire e ammorbidire la fibra capillare",
      "Pantenolo → aiuta a mantenere il capello idratato, morbido e flessibile",
      "Estratto di mandorla italiana → completa la formula contribuendo alla morbidezza del capello"
    ],

    benefici: [
      "Deterge delicatamente",
      "Aiuta a mantenere morbidezza e idratazione",
      "Rispetta la naturale forma del riccio",
      "Aiuta a controllare l’effetto crespo",
      "Capelli più disciplinati e gestibili"
    ],

    levaCliente:
      "Da proporre a chi ha capelli ricci o mossi e cerca una detersione delicata che non lasci il capello secco e aiuti a preservarne definizione e morbidezza.",

    utilizzo:
      "Applicare sui capelli bagnati, massaggiare delicatamente il cuoio capelluto e distribuire sulle lunghezze. Risciacquare accuratamente."
  },

  {
    id: "spiral-shine-hair-enhancer-cream",
    codice: "",
    nome: "Spiral Shine Hair Enhancer Cream",
    nomeBreve: "Hair Enhancer Cream",
    linea: "spiral-shine",
    categoria: "capelli",
    tipologia: "Styling",

    descrizione:
      "Crema senza risciacquo pensata per esaltare la naturale forma di ricci e onde, aiutando a definirli e a controllare l’effetto crespo.",

    ingredienti: [
      "Preziosi oli vegetali → aiutano a nutrire e ammorbidire il capello",
      "Pantenolo → contribuisce a mantenere idratazione, morbidezza e flessibilità",
      "Estratto di mandorla italiana → contribuisce alla morbidezza della fibra"
    ],

    benefici: [
      "Esalta la naturale forma di ricci e onde",
      "Aiuta a definire il riccio",
      "Contrasta l’effetto crespo",
      "Dona morbidezza",
      "Migliora la gestibilità dei capelli"
    ],

    levaCliente:
      "Ideale per chi vuole definire ricci e onde durante lo styling, soprattutto quando il capello tende a perdere forma o a diventare crespo.",

    utilizzo:
      "Applicare sui capelli umidi distribuendo il prodotto sulle lunghezze e modellando ricci e onde con le mani. Non risciacquare e procedere con lo styling."
  },

  {
    id: "spiral-shine-hair-oil",
    codice: "",
    nome: "Spiral Shine Hair Oil",
    nomeBreve: "Hair Oil",
    linea: "spiral-shine",
    categoria: "capelli",
    tipologia: "Trattamento",

    descrizione:
      "Olio per capelli ricci e mossi pensato per nutrire le lunghezze, donare morbidezza e brillantezza e valorizzare la naturale texture del capello.",

    ingredienti: [
      "Preziosi oli vegetali → contribuiscono a nutrire, ammorbidire e lucidare la fibra",
      "Pantenolo → aiuta a mantenere il capello morbido e flessibile",
      "Estratto di mandorla italiana → completa la formula contribuendo alla morbidezza del capello"
    ],

    benefici: [
      "Nutre le lunghezze",
      "Dona morbidezza",
      "Esalta la brillantezza",
      "Aiuta a controllare l’effetto crespo",
      "Valorizza la texture naturale di ricci e onde"
    ],

    levaCliente:
      "Da proporre a chi ha ricci o onde che appaiono secchi, opachi o crespi e vuole aggiungere nutrimento, morbidezza e brillantezza alla routine.",

    utilizzo:
      "Applicare una piccola quantità sulle lunghezze e sulle punte, distribuendo il prodotto in modo uniforme. Se successivamente si utilizza il calore, applicare anche un prodotto termoprotettivo."
  },

  {
    id: "spiral-shine-hair-biphasic-definer-spray",
    codice: "",
    nome: "Spiral Shine Hair Biphasic Definer Spray",
    nomeBreve: "Biphasic Definer Spray",
    linea: "spiral-shine",
    categoria: "capelli",
    tipologia: "Styling",

    descrizione:
      "Spray bifasico pensato per ravvivare e definire ricci e onde, aiutando a contrastare l’effetto crespo e a valorizzare la texture naturale dei capelli.",

    ingredienti: [
      "Preziosi oli vegetali → contribuiscono a nutrire e ammorbidire la fibra",
      "Pantenolo → aiuta a mantenere morbidezza e flessibilità",
      "Estratto di mandorla italiana → contribuisce alla morbidezza del capello"
    ],

    benefici: [
      "Ravviva ricci e onde",
      "Aiuta a migliorare la definizione",
      "Contrasta l’effetto crespo",
      "Dona morbidezza",
      "Valorizza la texture naturale",
      "Ideale anche per rinfrescare il riccio"
    ],

    levaCliente:
      "Perfetto per chi vuole ravvivare ricci e onde e recuperare definizione quando la forma tende a perdersi, anche tra un lavaggio e l’altro.",

    utilizzo:
      "Agitare prima dell’uso per miscelare le due fasi. Vaporizzare sui capelli e distribuire modellando ricci e onde con le mani. Non risciacquare. Se successivamente si utilizza il calore, applicare anche un prodotto termoprotettivo."
  }

];