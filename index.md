---
layout: default
title: Home
---

Hello. Welcome to my digital garden of thoughts, ideas & notes!

## All notes

{% for note in collections.notes %}
{% if note.url != "/" %}[]()<a href="{{ note.url }}">{{ note.data.title }}</a>{% endif %}
{% endfor %}