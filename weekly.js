(() => {
  const data = window.WEEKLY_DATA;
  if (!data) return;

  const DAY = 86400000;
  const parseDate = (value) => {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d, 12, 0, 0, 0);
  };
  const iso = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const today = () => iso(new Date());
  const diffDays = (from, to) => Math.round((parseDate(to) - parseDate(from)) / DAY);
  const between = (d, start, end) => d >= start && (!end || d <= end);
  const fmt = (value, long = false) => {
    if (!value) return "";
    return new Intl.DateTimeFormat("it-IT", long
      ? { day: "numeric", month: "long" }
      : { day: "numeric", month: "short" }
    ).format(parseDate(value)).replace(".", "").toUpperCase();
  };

  function settimanaPer(dataIso) {
    return data.settimane.find((w) => between(dataIso, w.dal, w.al)) ||
      [...data.settimane].reverse().find((w) => w.dal <= dataIso) || data.settimane[0];
  }

  function faseAttiva(evento, d) {
    return evento.fasi?.find((f) => between(d, f.dataInizio, f.dataFine)) || null;
  }

  function azioniOggi(d) {
    const out = [];
    data.eventi.forEach((e) => {
      (e.preparazioni || []).forEach((p) => {
        if (p.data === d) out.push({ evento: e, azione: p, kind: "today", priorita: e.priorita || 0 });
      });
      if (e.finestraAzione && between(d, e.finestraAzione.dal, e.finestraAzione.entro)) {
        out.push({ evento: e, azione: { titolo: e.titolo, azione: e.cosaFare }, kind: "window", priorita: e.priorita || 0 });
      }
    });
    return out.sort((a, b) => b.priorita - a.priorita);
  }

  function attivi(d) {
    return data.eventi
      .filter((e) => faseAttiva(e, d) || (e.dataInizio && between(d, e.dataInizio, e.dataFine)))
      .filter((e) => e.tipo !== "scadenza" || e.dataInizio === d)
      .sort((a, b) => (b.priorita || 0) - (a.priorita || 0));
  }

  function inArrivo(d, giorni = 7) {
    return data.eventi
      .filter((e) => e.dataInizio && e.dataInizio > d && diffDays(d, e.dataInizio) <= giorni)
      .sort((a, b) => a.dataInizio.localeCompare(b.dataInizio) || (b.priorita || 0) - (a.priorita || 0));
  }

  function statusEvento(e, d) {
    const f = faseAttiva(e, d);
    const start = f?.dataInizio || e.dataInizio;
    const end = f?.dataFine || e.dataFine;
    if (start === d && end === d) return "OGGI";
    if (start === d) return "PARTE OGGI";
    if (end === d) return "ULTIMO GIORNO";
    if (start && between(d, start, end)) return "ATTIVO";
    if (start && start > d) return "IN ARRIVO";
    return "";
  }

  function detailData(e, d) {
    const f = faseAttiva(e, d);
    return {
      ricordatiChe: f?.ricordatiChe || e.ricordatiChe,
      comeFunziona: f?.comeFunziona || e.comeFunziona,
      cosaFare: f?.cosaFare || e.cosaFare,
      cosaComprende: f?.cosaComprende || e.cosaComprende,
      attenzione: f?.attenzione || e.attenzione
    };
  }

  function descrizioneTemporale(e, d) {
    if (e.tipo !== "scadenza" || !e.dataInizio) return null;
    const giorni = diffDays(d, e.dataInizio);
    if (giorni === 0) return `${e.titolo.replace(/^Fine promo /i, "La promo ")} termina oggi.`;
    if (giorni === 1) return `${e.titolo.replace(/^Fine promo /i, "La promo ")} termina domani.`;
    if (giorni > 1) return `${e.titolo.replace(/^Fine promo /i, "La promo ")} termina il ${fmt(e.dataInizio, true).toLowerCase()}.`;
    return null;
  }

  function card(item, status, dateLabel, referenceDate = today()) {
    const e = item.evento || item;
    const title = item.azione?.titolo || e.titolo;
    const desc = item.azione?.azione || descrizioneTemporale(e, referenceDate) || detailData(e, referenceDate).ricordatiChe || "Apri per i dettagli.";
    return `<button class="weekly-card" type="button" data-weekly-id="${e.id}">
      <span class="weekly-card-status">${status}</span>
      ${dateLabel ? `<span class="weekly-card-date">${dateLabel}</span>` : ""}
      <strong>${title}</strong>
      <span class="weekly-card-copy">${desc}</span>
      <span class="weekly-card-arrow">→</span>
    </button>`;
  }

function renderHome() {
  const mount = document.getElementById("weeklyHome");
  if (!mount) return;

  const d = today();
  const week = settimanaPer(d);
  const actions = azioniOggi(d);
  const active = attivi(d);
  const upcoming = inArrivo(d, 7);

  const promoAttive = active.filter((e) => e.tipo === "promo");

  function cardEventoAttivo(evento) {
    const f = faseAttiva(evento, d);
    const start = f?.dataInizio || evento.dataInizio;
    const end = f?.dataFine || evento.dataFine;

    return card(
      evento,
      statusEvento(evento, d),
      end ? `${fmt(start)} → ${fmt(end)}` : fmt(start)
    );
  }

  const homeCards = [];
  const idsMostrati = new Set();

  // Se c'è un'attività operativa oggi, occupa il primo spazio.
  if (actions.length > 0) {
    const action = actions[0];

    homeCards.push(
      card(
        action,
        action.kind === "window" ? "DA FARE" : "DA FARE OGGI",
        action.kind === "window"
          ? `ENTRO ${fmt(action.evento.finestraAzione.entro)}`
          : fmt(d)
      )
    );

    if (action.evento?.id) {
      idsMostrati.add(action.evento.id);
    }
  }

  // Riempi gli spazi disponibili con le promo attive.
  for (const evento of promoAttive) {
    if (homeCards.length >= 3) break;
    if (idsMostrati.has(evento.id)) continue;

    homeCards.push(cardEventoAttivo(evento));
    idsMostrati.add(evento.id);
  }

  // Se ci sono meno di 3 card, usa altri eventi attivi.
  for (const evento of active) {
    if (homeCards.length >= 3) break;
    if (idsMostrati.has(evento.id)) continue;

    homeCards.push(cardEventoAttivo(evento));
    idsMostrati.add(evento.id);
  }

  // Ultimo fallback: eventi in arrivo.
  for (const evento of upcoming) {
    if (homeCards.length >= 3) break;
    if (idsMostrati.has(evento.id)) continue;

    homeCards.push(
      card(
        evento,
        "IN ARRIVO",
        fmt(evento.dataInizio)
      )
    );

    idsMostrati.add(evento.id);
  }

  mount.innerHTML = `
    <div class="weekly-heading">
      <div>
        <span class="weekly-kicker">WEEKLY · W${week.numero}</span>
        <span class="weekly-range">
          ${fmt(week.dal, true)} – ${fmt(week.al, true)}
        </span>
      </div>

      <button
        type="button"
        class="weekly-all-button"
        id="weeklyOpenAll"
      >
        Vedi tutta la Weekly →
      </button>
    </div>

    <div class="weekly-home-grid">
      ${homeCards.join("")}
    </div>
  `;
}

  function ensureOverlay() {
    let overlay = document.getElementById("weeklyOverlay");
    if (overlay) return overlay;
    overlay = document.createElement("div");
    overlay.id = "weeklyOverlay";
    overlay.className = "weekly-overlay hidden";
    overlay.innerHTML = `<div class="weekly-panel"><div id="weeklyPanelContent"></div></div>`;
    document.body.appendChild(overlay);
    return overlay;
  }

  function openDetail(id) {
    const e = data.eventi.find((x) => x.id === id);
    if (!e) return;
    const d = today();
    const details = detailData(e, d);
    const blocks = [
      ["COSA FARE", details.cosaFare],
      ["ATTENZIONE", details.attenzione],
      ["RICORDATI CHE", details.ricordatiChe],
      ["COME FUNZIONA", details.comeFunziona],
      ["COSA COMPRENDE", details.cosaComprende]
    ].filter(([, value]) => value);
    const overlay = ensureOverlay();
    overlay.querySelector("#weeklyPanelContent").innerHTML = `<button class="weekly-close" type="button" data-weekly-close>← Torna alla Weekly</button>
      <p class="weekly-detail-type">${e.tipo.toUpperCase()}</p>
      <h2>${e.titolo}</h2>
      <p class="weekly-detail-status">${statusEvento(e, d)}</p>
      <div class="weekly-detail-grid">${blocks.map(([label, value]) => `<section><span>${label}</span><p>${value}</p></section>`).join("")}</div>`;
    overlay.classList.remove("hidden");
    document.body.classList.add("weekly-open");
  }

  function openAll() {
    const d = today();
    const week = settimanaPer(d);
    const relevant = data.eventi.filter((e) => {
      const end = e.dataFine || e.dataInizio || e.finestraAzione?.entro;
      const start = e.dataInizio || e.finestraAzione?.dal;
      return (start && start <= week.al && (!end || end >= week.dal)) || (start && start > week.al && diffDays(week.al, start) <= 7);
    });
    const overlay = ensureOverlay();
    overlay.querySelector("#weeklyPanelContent").innerHTML = `<button class="weekly-close" type="button" data-weekly-close>← Torna alla Home</button>
      <div class="weekly-full-heading"><p>WEEKLY · W${week.numero}</p><h2>${fmt(week.dal, true)} – ${fmt(week.al, true)}</h2><span>Operatività, attività attive e prossimi appuntamenti.</span></div>
      <div class="weekly-full-list">${relevant.map((e) => {
        if (e.finestraAzione && between(d, e.finestraAzione.dal, e.finestraAzione.entro)) {
          return card(
            { evento: e, azione: { titolo: e.titolo, azione: e.cosaFare } },
            "DA FARE",
            `ENTRO ${fmt(e.finestraAzione.entro)}`,
            d
          );
        }
        return card(
          e,
          statusEvento(e, d) || "IN ARRIVO",
          e.dataInizio ? fmt(e.dataInizio) : "",
          d
        );
      }).join("")}</div>`;
    overlay.classList.remove("hidden");
    document.body.classList.add("weekly-open");
  }

  document.addEventListener("click", (ev) => {
    const detail = ev.target.closest("[data-weekly-id]");
    if (detail) return openDetail(detail.dataset.weeklyId);
    if (ev.target.closest("#weeklyOpenAll")) return openAll();
    if (ev.target.closest("[data-weekly-close]")) {
      document.getElementById("weeklyOverlay")?.classList.add("hidden");
      document.body.classList.remove("weekly-open");
    }
  });

  renderHome();
  window.LearningHubWeekly = { renderHome, openAll, openDetail };
})();
