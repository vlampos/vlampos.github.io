---
layout: page
permalink: /repos/
title: repos
description:
nav: true
nav_order: 6
---

{% comment %}
Edit project names, years, URLs and optional descriptions in _data/repositories.yml.
Descriptions are displayed only when supplied in YAML. Optional GitHub API
enrichment adds public statistics; links remain usable when it is unavailable.
{% endcomment %}

<style>
  .omega-repos {
    --repo-accent: var(--global-theme-color, #176b80);
    --repo-border: var(--global-divider-color, rgba(128, 128, 128, .25));
    color: var(--global-text-color, inherit);
    margin: 1.5rem 0 3rem;
  }
  .omega-repos .repo-intro {
    display: flex; align-items: baseline; justify-content: space-between;
    flex-wrap: wrap; gap: .5rem 1rem; margin-bottom: 1.5rem;
  }
  .omega-repos .repo-intro p { margin: 0; }
  .omega-repos .repo-count, .omega-repos .repo-owner {
    color: var(--global-text-color-light, #777); font-size: .85rem;
  }
  .omega-repos .repo-grid {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem; align-items: start;
  }
  .omega-repos .repo-card {
    min-width: 0; padding: 1.4rem;
    border: 1px solid var(--repo-border); border-top: 3px solid var(--repo-accent);
    border-radius: 12px;
    background: var(--global-card-bg-color, var(--global-bg-color, transparent));
    transition: box-shadow .2s ease, border-color .2s ease;
  }
  .omega-repos .repo-card:hover, .omega-repos .repo-card:focus-within {
    border-color: var(--repo-accent); box-shadow: 0 8px 24px rgba(0, 0, 0, .08);
  }
  .omega-repos .repo-meta {
    display: flex; align-items: baseline; justify-content: space-between;
    gap: 1rem; margin-bottom: .8rem; font-size: .8rem;
  }
  .omega-repos .repo-owner { overflow-wrap: anywhere; }
  .omega-repos .repo-year {
    flex-shrink: 0; padding: .15rem .55rem;
    border: 1px solid var(--repo-border); border-radius: 999px;
    font-variant-numeric: tabular-nums;
  }
  .omega-repos .repo-title {
    margin: 0 0 .65rem; font-size: 1.25rem; line-height: 1.35;
    font-weight: 600; overflow-wrap: anywhere;
  }
  .omega-repos .repo-title a { color: inherit; }
  .omega-repos .repo-description { margin: 0 0 1rem; line-height: 1.6; }
  .omega-repos .repo-stats {
    display: flex; flex-wrap: wrap; gap: .5rem 1rem;
    border-top: 1px solid var(--repo-border); padding-top: .85rem;
    margin-top: 1rem; font-size: .8rem;
  }
  .omega-repos [hidden] { display: none !important; }
  .omega-repos a:focus-visible {
    outline: 2px solid var(--repo-accent); outline-offset: 4px; border-radius: 2px;
  }
  @media (max-width: 640px) {
    .omega-repos .repo-grid { grid-template-columns: minmax(0, 1fr); }
    .omega-repos .repo-card { padding: 1.15rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .omega-repos .repo-card { transition: none; }
  }
</style>

{% assign projects = site.data.repositories.general_repos | sort: 'year' | reverse %}
<section class="omega-repos" aria-label="Research repositories">
{% if projects.size > 0 %}
  <div class="repo-intro">
    <p>Explore the code behind our research.</p>
    <span class="repo-count">{{ projects.size }} projects · Newest first</span>
  </div>
  <div class="repo-grid">
  {% for repo in projects %}
    {% assign repo_path = repo.url | remove: 'https://github.com/' | remove: 'http://github.com/' | split: '/' %}
    {% assign repo_owner = repo_path[0] %}
    {% assign repo_slug = repo_owner | append: '/' | append: repo_path[1] %}
    {% assign is_github = false %}
    {% if repo.url contains 'https://github.com/' or repo.url contains 'http://github.com/' %}
      {% assign is_github = true %}
    {% endif %}
    <article class="repo-card" {% if is_github %}data-github-repo="{{ repo_slug | escape }}"{% endif %} aria-labelledby="repo-title-{{ forloop.index }}">
      <div class="repo-meta">
        <span class="repo-owner">{% if is_github %}{{ repo_owner | escape }}{% else %}Research software{% endif %}</span>
        {% if repo.year %}<span class="repo-year">{{ repo.year | escape }}</span>{% endif %}
      </div>
      <h2 class="repo-title" id="repo-title-{{ forloop.index }}"><a href="{{ repo.url | escape }}">{{ repo.name | escape }}</a></h2>
      {% assign project_description = repo.description | default: '' | strip %}
      {% if project_description != empty %}
      <p class="repo-description">{{ project_description | escape }}</p>
      {% endif %}
      <div class="repo-stats" aria-label="Repository information" hidden></div>
    </article>
  {% endfor %}
  </div>
{% elsif site.data.repositories.github_repos.size > 0 %}
  <div class="repo-grid">
  {% for repo in site.data.repositories.github_repos %}
    <article class="repo-card" data-github-repo="{{ repo | escape }}">
      <h2 class="repo-title"><a href="https://github.com/{{ repo | escape }}">{{ repo | split: "/" | last | escape }}</a></h2>
      <div class="repo-stats" aria-label="Repository information" hidden></div>
    </article>
  {% endfor %}
  </div>
{% else %}
  <p>Research repositories will appear here soon.</p>
{% endif %}
</section>

<script>
(() => {
  // Progressive enhancement: static content is usable without API access.
  if (!window.fetch || !window.AbortController) return;
  const number = new Intl.NumberFormat();
  document.querySelectorAll('.omega-repos [data-github-repo]').forEach(async (card) => {
    const slug = card.dataset.githubRepo;
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(slug)) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 6000);
    try {
      const response = await fetch('https://api.github.com/repos/' + slug, {
        headers: { Accept: 'application/vnd.github+json' },
        signal: controller.signal,
        credentials: 'omit'
      });
      if (!response.ok) return;
      const repo = await response.json();
      const stats = card.querySelector('.repo-stats');
      const labels = [];
      if (repo.language) labels.push(repo.language);
      if (Number.isFinite(repo.stargazers_count)) labels.push(number.format(repo.stargazers_count) + ' stars');
      if (Number.isFinite(repo.forks_count)) labels.push(number.format(repo.forks_count) + ' forks');
      if (repo.license && repo.license.spdx_id && repo.license.spdx_id !== 'NOASSERTION') labels.push(repo.license.spdx_id);
      if (repo.archived) labels.push('Archived');
      labels.forEach((label) => {
        const span = document.createElement('span');
        span.textContent = label;
        stats.appendChild(span);
      });
      stats.hidden = !labels.length;
    } catch (_) {
      // Offline, rate-limited or blocked requests leave the static card intact.
    } finally {
      window.clearTimeout(timeout);
    }
  });
})();
</script>
