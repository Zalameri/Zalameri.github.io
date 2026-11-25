/* Shared helpers: theme, header, text binding, live GitHub data */
(function () {
  const S = window.SITE, P = S.person;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---- theme ---- */
  const root = document.documentElement;
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const labelTheme = () => { const b = $("#theme"); if (b) b.setAttribute("aria-label", isDark() ? "Switch to light mode" : "Switch to dark mode"); };
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#theme")) return;
    root.dataset.theme = isDark() ? "light" : "dark";
    store.set("theme", root.dataset.theme);
    labelTheme();
    window.dispatchEvent(new Event("themechange"));
  });
  labelTheme();

  /* ---- header state + progress bar ---- */
  const top = $(".top"), bar = $(".progress span");
  const onScroll = () => {
    top && top.classList.toggle("scrolled", scrollY > 20);
    if (bar) bar.style.width = (scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)) * 100 + "%";
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---- bind person facts ---- */
  function bindPerson() {
    $$("[data-github-link]").forEach((a) => { a.href = "https://github.com/" + P.github; a.rel = "me noopener"; });
    $$("[data-linkedin-link]").forEach((a) => { if (P.linkedin) { a.href = P.linkedin; a.rel = "me noopener"; } else a.remove(); });
    $$("[data-phone-link]").forEach((a) => { if (P.phone) { a.href = "tel:" + P.phone.tel; a.textContent = P.phone.display; } else { a.hidden = true; } });
    $$("[data-email-link]").forEach((a) => { a.href = "mailto:" + P.email; if (!a.textContent.trim()) a.textContent = P.email; });
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  }

  /* ---- GitHub: live API first, then the 6-hourly snapshot, then cache ---- */
  async function getJSON(url, ms = 6000) {
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), ms);
    try {
      const r = await fetch(url, { signal: ctl.signal, headers: { Accept: "application/vnd.github+json" } });
      if (!r.ok) throw new Error(r.status);
      return await r.json();
    } finally { clearTimeout(t); }
  }
  let repoPromise = null;
  function loadRepos() {
    return repoPromise || (repoPromise = (async () => {
      try {
        const repos = await getJSON("https://api.github.com/users/" + P.github + "/repos?per_page=100&sort=pushed");
        store.set("gh-repos", JSON.stringify({ at: Date.now(), repos }));
        return { repos, source: "live", at: Date.now() };
      } catch (e) {
        try {
          const r = await fetch("data/github.json", { cache: "no-cache" });
          if (r.ok) { const j = await r.json(); return { repos: j.repos, source: "snapshot", at: Date.parse(j.generated_at) }; }
        } catch (e2) {}
        const c = store.get("gh-repos");
        if (c) { const j = JSON.parse(c); return { repos: j.repos, source: "cache", at: j.at }; }
        return { repos: [], source: "none", at: 0 };
      }
    })());
  }
  async function loadEvents() {
    try { return await getJSON("https://api.github.com/users/" + P.github + "/events/public?per_page=40"); }
    catch (e) { return []; }
  }

  const hidden = () => new Set(S.hiddenRepos.map((n) => n.toLowerCase()));

  /* Merge curated projects with whatever is on GitHub right now */
  function mergeProjects(repos) {
    const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
    const curated = S.projects.map((p) => {
      const gh = p.repo ? byName.get(p.repo.toLowerCase()) : null;
      return { ...p, gh, url: gh ? gh.html_url : null, pushed: gh ? gh.pushed_at : null };
    });
    const known = new Set(S.projects.filter((p) => p.repo).map((p) => p.repo.toLowerCase()));
    const hide = hidden();
    const accents = ["aqua", "leaf", "coral", "violet", "sun"];
    const auto = repos
      .filter((r) => !r.fork && !r.archived && !known.has(r.name.toLowerCase()) && !hide.has(r.name.toLowerCase()) && (!S.showTopic || (r.topics || []).includes(S.showTopic)))
      .map((r, i) => ({
        slug: null, auto: true, category: "new",
        title: r.name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        oneLiner: r.description || "A new repository, freshly pushed to GitHub.",
        label: "New on GitHub", accent: accents[i % accents.length],
        tech: [r.language, ...(r.topics || [])].filter(Boolean),
        url: r.html_url, pushed: r.pushed_at, gh: r
      }));
    return curated.concat(auto);
  }

  function ago(iso) {
    if (!iso) return "";
    const d = (Date.now() - Date.parse(iso)) / 1000;
    const u = [[31536000, "y"], [2592000, "mo"], [604800, "w"], [86400, "d"], [3600, "h"], [60, "min"]];
    for (const [s, n] of u) if (d >= s) return Math.floor(d / s) + " " + n + " ago";
    return "just now";
  }

  const LANG = { Python: "#3572A5", TypeScript: "#3178c6", JavaScript: "#e0c22c", PHP: "#8892bf", HTML: "#e34c26", CSS: "#7f52c9", "Jupyter Notebook": "#DA5B0B", Shell: "#89e051", Java: "#b07219", "C++": "#f34b7d" };

  function reveal() {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  }

  window.UI = { $, $$, esc, store, bindPerson, loadRepos, loadEvents, mergeProjects, ago, isDark, hidden, LANG, reveal };
})();
