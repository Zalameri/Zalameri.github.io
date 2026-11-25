/* Home page. All content comes from data.js + live GitHub. */
(async function () {
  const { $, $$, esc, bindPerson, loadRepos, loadEvents, mergeProjects, ago, hidden, LANG, reveal } = window.UI;
  const S = window.SITE;
  bindPerson();
  const caseUrl = (p) => "project.html?p=" + encodeURIComponent(p.slug);
  const split = (t) => { const w = t.split(" "); return w.length > 1 ? `${esc(w.slice(0, -1).join(" "))} <em>${esc(w.at(-1))}</em>` : esc(t); };



  /* ---------- featured ---------- */
  const widget = {
    aquagent: () => `<div class="widget flow" aria-hidden="true"><span>Sensors</span><i></i><span>Bayes</span><i></i><span>CSP</span><i></i><span>Plan</span></div>`,
    "plantcare-ai": () => `<span class="scan" aria-hidden="true"></span><div class="widget diag" aria-hidden="true"><span class="mono">Report fields · strict schema</span><b>Species · Disease · Severity</b><div class="meter">confidence<span><i style="width:72%"></i></span></div></div>`,
    "smart-study": () => `<div class="widget quiz" aria-hidden="true"><span class="mono">Quiz from your notes · EN / AR</span><p>Which quiz types are generated?</p><div class="opt">Essay only</div><div class="opt ok">MCQ · True/False · Fill-in</div></div>`
  };
  function renderFeatured(all) {
    $("#featured").innerHTML = all.filter((p) => p.featured).map((p, i) => `
      <article class="case reveal a-${esc(p.accent)}">
        <a class="case-visual" href="${caseUrl(p)}" tabindex="-1" aria-hidden="true">
          <div class="tag-top"><span>${String(i + 1).padStart(2, "0")} / ${esc(p.title)}</span><span>${esc(p.when)}</span></div>
          <figure class="win"><div class="win-bar"><i></i><i></i><i></i><span>${esc(p.title)}</span></div><img src="${esc(p.cover)}" alt="" loading="lazy" width="1100" height="720"></figure>
          ${p.phone ? `<figure class="phone case-phone"><span class="notch"></span><img src="${esc(p.phone)}" alt="" loading="lazy"></figure>` : ""}
        </a>
        <div class="case-body">
          <div class="case-meta"><span class="mono">${String(i + 1).padStart(2, "0")} — ${esc(p.label)}</span><span class="status">${esc(p.status)}</span></div>
          <h3>${split(p.title)}</h3>
          <p class="desc">${esc(p.oneLiner)}</p>
          ${p.course ? `<p class="meta-line">${esc(p.course)}${p.teamSize > 1 ? " · team of " + p.teamSize : ""}${/^I led/.test(p.role || "") ? " · Project lead" : ""}</p>` : ""}
          <div class="stats3">${(p.stats || []).slice(0, 3).map((s) => `<div><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("")}</div>
          <ul class="tags">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          <div class="cta-row">
            <a class="btn acc" href="${caseUrl(p)}">Read case study <span aria-hidden="true">→</span><span class="visually-hidden"> about ${esc(p.title)}</span></a>
            ${p.url ? `<a class="btn" href="${esc(p.url)}" rel="noopener">Source code ↗<span class="visually-hidden"> for ${esc(p.title)}</span></a>` : ""}
          </div>
        </div>
      </article>`).join("");
  }


  /* ---------- recognition ---------- */
  const [dl, xt] = S.recognition;
  $("#recog").innerHTML = `
    <article class="award deans reveal">
      <div class="top-row"><span class="mono">${esc(dl.kind)}</span><span class="seal" aria-hidden="true">✦</span></div>
      <h3>Dean's <em>List.</em></h3>
      <p class="org">${esc(dl.org)}</p><p class="when">${esc(dl.when)}</p>
      <p class="txt">${esc(dl.text)}</p>
      <figure class="photo" style="margin:0"><img src="${esc(dl.img)}" alt="${esc(dl.alt)}" loading="lazy" width="1120" height="752"></figure>
    </article>
    <article class="award xtreme reveal">
      <div class="top-row"><span class="mono">${esc(xt.kind)}</span><span class="seal" aria-hidden="true">20.0</span></div>
      <h3>IEEE<em>Xtreme</em></h3>
      <p class="org">${esc(xt.org)}</p><p class="when">${esc(xt.when)}</p>
      <div class="bigstat"><b>${esc(xt.big)}</b><span>${esc(xt.bigLabel)}</span></div>
      <p class="txt">${esc(xt.text)}</p>
      <div class="stack"><img class="s1" src="${esc(xt.img)}" alt="${esc(xt.alt)}" loading="lazy"><img class="s2" src="${esc(xt.img2)}" alt="${esc(xt.alt2)}" loading="lazy"></div>
    </article>`;

  /* ---------- grid ---------- */
  let ALL = [], filter = "all";
  const catName = (c) => (c === "new" ? "New on GitHub" : S.categories[c] || c);
  function renderFilters() {
    const cats = ["all", ...new Set(ALL.map((p) => p.category))];
    $("#filters").innerHTML = cats.map((c) => {
      const n = c === "all" ? ALL.length : ALL.filter((p) => p.category === c).length;
      return `<button class="filter" type="button" data-c="${esc(c)}" aria-pressed="${c === filter}">${c === "all" ? "All" : esc(catName(c))}</button>`;
    }).join("");
  }
  const termWin = (title, lines) => `<div class="tw"><div class="tw-bar"><i></i><i></i><i></i><span>${esc(title)}</span></div><pre>${lines.map((l) => l.startsWith("$") ? `<span class="p">$</span>${esc(l.slice(1))}` : esc(l)).join("\n")}</pre></div>`;
  function thumb(p) {
    if (p.cover) return `<img src="${esc(p.cover)}" alt="" loading="lazy" width="640" height="376">`;
    if (p.poster) return `<div class="poster" aria-hidden="true"><span class="mono">Research · talk</span><b>${esc(p.poster.title)}</b><em>${esc(p.poster.sub)}</em><ol>${p.poster.steps.map((x, i) => `<li><small>0${i + 1}</small>${esc(x)}</li>`).join("")}</ol></div>`;
    if (p.terminal) return termWin("zsh · " + (p.repo || p.slug), p.terminal);
    if (p.classes) return `<div class="uml" aria-hidden="true"><span class="cls base">${esc(p.classes[0])}</span><span class="arrows"></span><span class="cls">${esc(p.classes[1])}</span><span class="cls">${esc(p.classes[2])}</span><span class="cls side">${esc(p.classes[3])} → ${esc(p.classes[0])} → ${esc(p.classes[4])}</span></div>`;
    if (p.auto) return `<img class="auto-cover" src="${esc(p.autoCover || "https://opengraph.githubassets.com/1/" + S.person.github + "/" + p.gh.name)}" alt="" loading="lazy" data-repo="${esc(p.gh.name)}">`;
    return `<div class="gen">${esc(p.title.split(" ").map((w) => w[0]).join("").slice(0, 3))}</div>`;
  }
  /* New repositories: use the first screenshot in their README as the cover (their real interface). */
  const coverCache = {};
  async function findCover(repo) {
    if (repo in coverCache) return coverCache[repo];
    const base = `https://raw.githubusercontent.com/${S.person.github}/${repo}/HEAD/`;
    try {
      const md = await (await fetch(base + "README.md")).text();
      const imgs = [...md.matchAll(/!\[[^\]]*\]\(([^)\s]+)[^)]*\)/g), ...md.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1])
        .filter((u) => !/shields\.io|badge|workflows|readme-typing|\.svg(\?|$)/i.test(u));
      coverCache[repo] = imgs.length ? new URL(imgs[0], base).href : null;
    } catch (e) { coverCache[repo] = null; }
    return coverCache[repo];
  }
  async function upgradeAutoCovers() {
    for (const img of $$("img.auto-cover")) {
      const url = await findCover(img.dataset.repo);
      if (url) { img.src = url; const p = ALL.find((x) => x.gh && x.gh.name === img.dataset.repo); if (p) p.autoCover = url; }
    }
  }
  function renderGrid() {
    const q = $("#q").value.trim().toLowerCase();
    const list = ALL.filter((p) => (filter === "all" || p.category === filter) &&
      (!q || [p.title, p.oneLiner, p.label, ...(p.tech || [])].join(" ").toLowerCase().includes(q)));
    $("#grid").innerHTML = list.length ? list.map((p) => {
      const lang = p.gh && p.gh.language;
      const fresh = p.pushed && Date.now() - Date.parse(p.pushed) < 10 * 864e5;
      return `<li class="card reveal a-${esc(p.accent)}"><a href="${esc(p.slug ? caseUrl(p) : p.url)}" ${p.slug ? "" : 'rel="noopener"'}>
        <div class="thumb">${thumb(p)}${p.featured ? '<span class="badge">Featured</span>' : p.auto ? '<span class="badge new">New</span>' : ""}</div>
        <div class="card-body">
          <div class="card-meta"><span class="c">${esc(p.label)}</span><span>${esc(p.when || "")}</span></div>
          <h3>${esc(p.title)}</h3>
          <p>${esc(p.oneLiner)}</p>
          <ul class="tags">${(p.tech || []).slice(0, 4).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          <div class="card-foot"><span>${lang ? `<i class="lang-dot" style="background:${LANG[lang] || "#888"}"></i>${esc(lang)}` : p.deliverable ? `<i class="lang-dot" style="background:#8a6a4b"></i>${esc(p.deliverable)}` : ""}</span><span>${p.pushed ? `${fresh ? '<b>updated</b> ' : "updated "}${ago(p.pushed)}` : ""}</span></div>
        </div></a></li>`;
    }).join("") : `<li class="empty">No projects match “${esc(q)}” yet.</li>`;
    reveal(); upgradeAutoCovers();
  }
  $("#q").addEventListener("input", renderGrid);
  $("#filters").addEventListener("click", (e) => { const b = e.target.closest(".filter"); if (!b) return; filter = b.dataset.c; renderFilters(); renderGrid(); });

  /* ---------- bento: education, terminal ---------- */
  const E = S.education;
  $("#edu-when").textContent = E.when; $("#edu-school").textContent = E.school; $("#edu-degree").textContent = E.degree;
  $("#edu-courses").innerHTML = E.courses.map((c) => `<li>${esc(c)}</li>`).join("");
  (function typeTerm() {
    const lines = S.projects.find((p) => p.slug === "studybuddy-flashcards").terminal, el = $("#term");
    const html = (n, partial) => lines.slice(0, n).map((l) => l.startsWith("$") ? `<span class="p">$</span>${esc(l.slice(1))}` : esc(l)).join("\n") + (partial != null ? (n ? "\n" : "") + partial : "") + '<span class="cursor"></span>';
    el.innerHTML = html(lines.length).replace('<span class="cursor"></span>', ""); return;
    let started = false;
    new IntersectionObserver(([e], o) => {
      if (!e.isIntersecting || started) return; started = true; o.disconnect();
      let i = 0, c = 0;
      (function step() {
        if (i >= lines.length) { el.innerHTML = html(lines.length); return; }
        const l = lines[i];
        if (!l.startsWith("$")) { i++; el.innerHTML = html(i); return setTimeout(step, 260); }
        c++;
        el.innerHTML = html(i, `<span class="p">$</span>${esc(l.slice(1, c))}`);
        if (c >= l.length) { i++; c = 0; setTimeout(step, 320); } else setTimeout(step, 22);
      })();
    }, { threshold: .4 }).observe(el);
  })();

  /* ---------- timeline + experience ---------- */
  $("#timeline").innerHTML = S.journey.map((j) => `<li class="reveal"><time>${esc(j.when)}</time><h3>${esc(j.title)}</h3><p>${esc(j.text)}</p></li>`).join("");
  if (S.experience.length) {
    $("#experience-wrap").hidden = false;
    $("#experience").innerHTML = S.experience.map((x) => `<li class="reveal"><time>${esc(x.when)}</time><h3>${esc(x.title)}</h3><p><b>${esc(x.org)}</b><br>${esc(x.text)}</p></li>`).join("");
  }

  /* ---------- skills ---------- */
  const used = S.projects;
  $("#skillgrid").innerHTML = `
    <div class="legend" aria-label="Projects">${used.map((p) => `<a class="a-${esc(p.accent)}" href="${caseUrl(p)}" data-slug="${esc(p.slug)}"><i></i>${esc(p.title)}</a>`).join("")}</div>
    <div class="groups">${S.skillGroups.map((g) => `
      <section class="group reveal"><h3>${esc(g.name)}<span>${g.skills.length}</span></h3><ul>
      ${g.skills.map((s) => `<li><button class="skill" type="button" data-p="${esc(s.projects.join(" "))}" aria-label="${esc(s.name)}: used in ${esc(s.projects.map((x) => used.find((p) => p.slug === x).title).join(", "))}">
        <span>${esc(s.name)}</span><span class="dots">${s.projects.map((x) => `<i class="a-${esc(used.find((p) => p.slug === x).accent)}"></i>`).join("")}</span></button></li>`).join("")}
      </ul></section>`).join("")}</div>`;
  const sg = $("#skillgrid");
  function pick(btn) {
    const set = btn ? btn.dataset.p.split(" ") : [];
    $$(".skill", sg).forEach((b) => b.classList.toggle("on", b === btn));
    $$(".legend a", sg).forEach((a) => a.classList.toggle("lit", set.includes(a.dataset.slug)));
    sg.classList.toggle("picking", !!btn);
  }
  ["mouseover", "focusin", "click"].forEach((ev) => sg.addEventListener(ev, (e) => { const b = e.target.closest(".skill"); if (b) pick(b); }));
  sg.addEventListener("mouseleave", () => pick(null));

  /* ---------- certificates ---------- */
  $("#certs").innerHTML = S.certificates.map((c) => `
    <li class="cert reveal"><a href="${esc(c.url)}" rel="noopener">
      <div class="prev"><img src="${esc(c.img)}" alt="Certificate: ${esc(c.title)}" loading="lazy" width="900" height="695"></div>
      <div class="cb"><span class="mono">${esc(c.via)} · ${esc(c.date)}</span><h3>${esc(c.title)}</h3><p>${esc(c.issuer)}</p><span class="v">Verify credential ↗</span></div>
    </a></li>`).join("");

  /* ---------- contact ---------- */
  $("#copy-mail").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(S.person.email); e.target.textContent = "Copied ✓"; } catch (err) { e.target.textContent = S.person.email; }
    setTimeout(() => (e.target.textContent = "Copy email"), 2200);
  });

  /* ---------- first paint, then grow with GitHub ---------- */
  ALL = mergeProjects([]);
  renderFeatured(ALL); renderFilters(); renderGrid(); reveal();

  const { repos, source, at } = await loadRepos();
  ALL = mergeProjects(repos);
  renderFeatured(ALL); renderFilters(); renderGrid(); reveal();
  const visible = repos.filter((r) => !r.fork && !hidden().has(r.name.toLowerCase()));
  $("#sync").innerHTML = source === "none"
    ? `<span class="live-dot"></span>GitHub is temporarily unavailable; showing curated projects.`
    : `<span class="live-dot"></span>${source === "live" ? "Live from" : "Synced from"} github.com/${esc(S.person.github)} · updated ${source === "live" ? "just now" : ago(new Date(at).toISOString())}`;
  const latest = visible.slice().sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))[0];
  if (latest) {
    const gl = $("#gh-live"); if (gl) gl.textContent = "Last commit " + ago(latest.pushed_at) + " · " + latest.name;
    const fr = $("#float-repo"); if (fr) fr.textContent = "Last update " + ago(latest.pushed_at) + " · " + latest.name;
  } else { const fl = $("#float-live"); if (fl) fl.hidden = true; }

  /* languages tile */
  const counts = {};
  visible.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
  const langs = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const total = langs.reduce((n, [, c]) => n + c, 0) || 1;
  $("#langbar").innerHTML = langs.map(([l, c]) => `<span style="flex:${c};background:${LANG[l] || "#888"}" title="${esc(l)}"></span>`).join("");
  $("#langlist").innerHTML = langs.length ? langs.map(([l, c]) => `<li><i class="lang-dot" style="background:${LANG[l] || "#888"}"></i>${esc(l)}<b>${Math.round((c / total) * 100)}%</b></li>`).join("") : `<li>Waiting for GitHub…</li>`;

  /* activity feed */
  const events = (await loadEvents()).filter((e) => !hidden().has(e.repo.name.split("/")[1].toLowerCase()));
  const verb = { PushEvent: ["↑", "Pushed to"], CreateEvent: ["+", "Created"], PullRequestEvent: ["⇄", "Pull request in"], IssuesEvent: ["!", "Issue in"], WatchEvent: ["★", "Starred"], ReleaseEvent: ["◆", "Released"], PublicEvent: ["◎", "Open-sourced"] };
  const seen = new Set();
  const rows = events.filter((e) => { const k = e.type + e.repo.name; if (seen.has(k)) return false; seen.add(k); return true; }).slice(0, 5);
  $("#activity").innerHTML = rows.length ? rows.map((e) => {
    const [ic, v] = verb[e.type] || ["•", e.type.replace("Event", "")];
    const name = e.repo.name.split("/")[1];
    return `<li><span class="ic" aria-hidden="true">${ic}</span><span>${esc(v)} <b>${esc(name)}</b></span><time datetime="${esc(e.created_at)}">${ago(e.created_at)}</time></li>`;
  }).join("") : (latest ? visible.slice(0, 5).map((r) => `<li><span class="ic" aria-hidden="true">↑</span><span>Updated <b>${esc(r.name)}</b></span><time>${ago(r.pushed_at)}</time></li>`).join("") : `<li class="muted">GitHub activity is temporarily unavailable.</li>`);

  /* ---------- nav state ---------- */
  const links = $$(".nav a");
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id));
  }), { rootMargin: "-45% 0px -50% 0px" });
  $$("main section[id]").forEach((s) => io.observe(s));

  /* ---------- hero collage tilt ---------- */
  const col = $(".collage");
  if (col && matchMedia("(pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    col.addEventListener("pointermove", (e) => {
      const r = col.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      col.style.transform = `perspective(1200px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
    });
    col.addEventListener("pointerleave", () => (col.style.transform = ""));
  }
})();
