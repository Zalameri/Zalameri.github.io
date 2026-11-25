/* Case study page: project.html?p=<slug> */
(async function () {
  const { $, esc, bindPerson, loadRepos, mergeProjects, ago, reveal } = window.UI;
  const S = window.SITE;
  bindPerson();
  const slug = new URLSearchParams(location.search).get("p");
  const idx = S.projects.findIndex((p) => p.slug === slug);
  const main = $("#main");
  if (idx < 0) {
    main.innerHTML = `<section class="cs-hero"><div class="wrap"><a class="crumb" href="index.html#projects">← All projects</a><h1>Not found</h1><p class="one">That project isn't here. <a href="index.html#projects">Browse every project</a>.</p></div></section>`;
    return;
  }
  const initials = (n) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);

  function render(p) {
    document.title = p.title + " · Case study · " + S.person.name;
    document.querySelector('meta[name="description"]').content = p.oneLiner;
    document.querySelector('meta[property="og:title"]').content = p.title + " · " + S.person.name;
    document.body.className = "a-" + p.accent;
    const next = S.projects[(idx + 1) % S.projects.length], prev = S.projects[(idx - 1 + S.projects.length) % S.projects.length];
    const facts = [
      ["Type", p.label], ["When", p.when], p.course && ["Course", p.course], p.instructor && ["Instructor", p.instructor],
      ["Status", p.status], p.pushed && ["Last updated", ago(p.pushed)]
    ].filter(Boolean);
    let n = 0; const num = () => String(++n).padStart(2, "0");
    const row = (title, body) => `<section class="cs-row reveal"><h2><small>${num()}</small>${title}</h2><div>${body}</div></section>`;
    const cover = p.cover
      ? `<figure class="cs-cover"><div class="win"><div class="win-bar"><i></i><i></i><i></i><span>${esc(p.title)}</span></div><img src="${esc(p.cover)}" alt="${esc(p.coverAlt)}" width="1100" height="720"></div></figure>`
      : p.poster ? `<figure class="cs-cover"><div class="thumb" style="aspect-ratio:16/7;border-radius:18px"><div class="poster big" role="img" aria-label="${esc(p.poster.title)} ${esc(p.poster.sub)}"><span class="mono">Research · talk</span><b>${esc(p.poster.title)}</b><em>${esc(p.poster.sub)}</em><ol>${p.poster.steps.map((x, i) => `<li><small>0${i + 1}</small>${esc(x)}</li>`).join("")}</ol></div></div></figure>`
      : p.terminal ? `<pre class="term" style="background:#02070a;color:#cfe7e3" aria-label="Real terminal output from ${esc(p.title)}">${p.terminal.map((l) => l.startsWith("$") ? `<span class="p">$</span>${esc(l.slice(1))}` : esc(l)).join("\n")}</pre>`
      : p.classes ? `<figure class="cs-cover"><div class="thumb" style="aspect-ratio:16/7;border-radius:18px;border:1px solid var(--line)"><div class="uml" role="img" aria-label="Class structure from the report: ${esc(p.classes.join(", "))}"><span class="cls base">${esc(p.classes[0])}</span><span class="arrows"></span><span class="cls">${esc(p.classes[1])}</span><span class="cls">${esc(p.classes[2])}</span><span class="cls side">${esc(p.classes[3])} → ${esc(p.classes[0])} → ${esc(p.classes[4])}</span></div></div><figcaption class="mono" style="margin-top:10px;color:var(--ink3)">Class structure, as described in our report</figcaption></figure>` : "";
    const solo = (p.teamSize || 1) === 1;
    const team = `<div class="team"><span class="person me"><i>${esc(initials(S.person.name))}</i>${esc(S.person.name)}${/^I led/.test(p.role || "") ? " · Project lead" : ""}</span>${solo ? "" : `<span class="person"><i>+${p.teamSize - 1}</i>${p.teamSize - 1 === 1 ? "one classmate" : p.teamSize - 1 + " classmates"}</span>`}</div>`;
    const role = `<p style="margin-top:16px">${solo ? "Solo project: designed, built and tested by me." : `A ${p.course ? "course " : ""}team project of ${p.teamSize} students.`}${p.role && !/^solo/i.test(p.role) ? " " + esc(p.role) + "." : ""}</p>`;
    const gal = (p.gallery || []).filter((g) => g.src !== p.cover);
    main.innerHTML = `
      <section class="cs-hero">
        <div class="wrap">
          <a class="crumb" href="index.html#work">← All projects</a>
          <span class="mono lab">${esc(p.label)}</span>
          <h1>${esc(p.title)}</h1>
          <p class="one">${esc(p.oneLiner)}</p>
          <div class="cta-row">
            ${p.url ? `<a class="btn acc" href="${esc(p.url)}" rel="noopener">View source on GitHub ↗</a>` : ""}
            ${p.gh && p.gh.homepage ? `<a class="btn" href="${esc(p.gh.homepage)}" rel="noopener">Live demo ↗</a>` : ""}
          </div>
          <dl class="facts">${facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
        </div>
      </section>
      <div class="wrap">
        ${cover}
        <div class="cs-stats">${(p.stats || []).map((s) => `<div class="reveal"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join("")}</div>
        ${row("Problem", `<p>${esc(p.problem)}</p>`)}
        ${row("Solution", `<p>${esc(p.solution)}</p>`)}
        ${row("Features", `<ul class="flist">${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`)}
        ${gal.length ? row("Screenshots &amp; diagrams", `<div class="gallery">${gal.map((g, i) => `<figure class="${i > 0 || g.tall ? "half" : ""}"><img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy"><figcaption>${esc(g.caption)}</figcaption></figure>`).join("")}</div>`) : ""}
        ${row("Technologies", `<ul class="tags">${p.tech.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`)}
        ${row(solo ? "Built by" : "Team", team + role)}
        ${p.notes ? row("Limitations", `<p class="note">${esc(p.notes)}</p>`) : ""}
        <nav class="next" aria-label="More projects">
          <a class="a-${esc(prev.accent)}" href="project.html?p=${esc(prev.slug)}"><span>← Previous</span>${esc(prev.title)}</a>
          <a class="a-${esc(next.accent)}" href="project.html?p=${esc(next.slug)}"><span>Next →</span>${esc(next.title)}</a>
        </nav>
      </div>`;
    reveal();
  }

  render(mergeProjects([])[idx]);
  const { repos } = await loadRepos();
  render(mergeProjects(repos)[idx]);
})();
