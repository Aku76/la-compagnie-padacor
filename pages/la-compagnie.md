---
layout: page
permalink: /la-compagnie/
title: "La compagnie"
eyebrow: "Qui sommes-nous"
intro: "Une troupe d'improvisation née en Normandie, réunie par le goût de l'imprévu et des soirs qui laissent des traces."
description: "L'histoire de la Compagnie Padacor, troupe d'improvisation normande : sa démarche poétique et guinguette, et l'équipe de comédien·nes qui la fait vivre."
---

## Notre histoire

La Compagnie Padacor est née d'une bande d'ami·es qui n'avaient qu'une idée en tête : monter
sur scène sans savoir ce qui allait s'y passer. De fil en aiguille — et de guirlande en
guirlande — le jeu est devenu une troupe, et la troupe est devenue une compagnie.

Depuis, on sillonne la Normandie pour offrir un théâtre **vivant, généreux et poétique**, où le
public n'est jamais spectateur passif : c'est lui qui souffle les mots, les lieux, les
émotions à partir desquels tout s'invente.

## Notre démarche

On croit à un théâtre qui rassemble. Un théâtre où l'on rit fort et où l'on s'émeut sans
prévenir, où l'erreur devient matière à jouer, où chaque soir est unique parce qu'il ne
pourra jamais se rejouer à l'identique.

Notre univers, c'est celui de la **guinguette** : chaleureux, un brin désuet, résolument
joyeux. On rallume les lumières, on tend la guirlande, et l'on invite chacun·e à passer un
moment hors du temps.

## L'équipe

Padacor, ce sont des comédien·nes improvisateur·rices qui se font confiance les yeux fermés :

<div class="membres-liste">
{%- for m in site.data.equipe -%}
<div class="carte membre membre--liste">
  {%- if m.photo and m.photo != "" -%}
    <img class="membre__portrait" src="{{ m.photo | relative_url }}" alt="Portrait de {{ m.nom }}" loading="lazy" width="72" height="72">
  {%- else -%}
    <div class="membre__initiale" aria-hidden="true">{{ m.nom | slice: 0 }}</div>
  {%- endif -%}
  <div>
    <p class="membre__nom">{{ m.nom }}</p>
    <p class="membre__role">{{ m.role }}</p>
    {%- if m.mot -%}<p class="membre__mot">{{ m.mot }}</p>{%- endif -%}
  </div>
</div>
{%- endfor -%}
</div>

## Nous inviter

Vous programmez une saison, un festival, une soirée d'entreprise ou une fête de village ?
La Compagnie Padacor se déplace et adapte ses formats à votre lieu et à votre public.

[Voir nos spectacles](/spectacles/) · [Nous contacter](/contact/)
