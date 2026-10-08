---
layout: page
permalink: /repos/
title: repos
description:
nav: true
nav_order: 6
---

<!--
{% if site.data.repositories.github_repos %}

<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}
-->


{% if site.data.repositories.general_repos %}

<div class="repositories d-flex flex-wrap flex-md-row flex-column align-items-center">
  {% for repo in site.data.repositories.general_repos %}
    <span style="margin-right:0.2em"><a href="{{ repo.url }}">{{ repo.name }}</a>
    ({{ repo.year }})<span style="margin-right:0.6em"></span></span>
  {% endfor %}
</div>
{% endif %}