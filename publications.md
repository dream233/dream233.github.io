---
layout: page
title: Publications
permalink: /publications/
description: "* denotes equal contribution"
---

{% assign pubs_by_year = site.data.publications | group_by: "year" %}
{% for year_group in pubs_by_year %}

<h2 class="pub-year">{{ year_group.name }}</h2>
{% include publication-list.html entries=year_group.items %}
{% endfor %}
