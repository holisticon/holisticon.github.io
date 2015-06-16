
### holisticon-presentation-template 0.0.1

Diese Präsentation starten:

```shell
/holisticon-template $ grunt
```

---

## Bedienung

* Slides durschalten: Pfeiltasten oder Space
* Fullscreen: `f` oder `F11`
* Präsentation ausblenden: `b`
* Folien-Übersicht: `ESC`
* Präsentationsmodus: `s`

---

## Folien erstellen

Its markdown!

Einfach diese Datei bearbeiten:

`slides/slides.md`

---

## Formatierungen

```markdown
# Überschrift 1
## Überschrift 2
### Überschrift 3
```

# Überschrift 1
## Überschrift 2
## Überschrift 3

---

## Formatierungen (2)

```markdown
_kursiv_ oder *kursiv*
__fett__ oder **fett**
___fett und kursiv___ oder ***fett und kursiv ***
`diktengleich`
```

_kursiv_ oder *kursiv*

__fett__ oder **fett**

___fett und kursiv___ oder ***fett und kursiv ***

`diktengleich`

---

## Formatierungen (3)

Zitate
```markdown
> Lorem ipsum dolor sit amet, consetetur sadipscing elitr
>
> Mit mehreren Absätzen
Max,Mustermann
```

> Lorem ipsum dolor sit amet, consetetur sadipscing elitr
>
> Mit mehreren Absätzen
Max,Mustermann

---

## Formatierungen (4)

Quellcode
    ```[sprache]
    dies ist mein code beispiel
    mit allen Mögl!ch>n bekl?ppten S``der#eichen
    ```
Mögliche Sprachen: [siehe hier](https://github.com/isagalaev/highlight.js/tree/master/src/languages),
weglassen für Auto-Erkennung.

---

## Formatierungen (5)

Listen
```[markdown]
* Kekse
* Kuchen
    * Mit Sahne!
* ...
```

* Kekse
* Kuchen
    * Mit Sahne!
* ...

---

## Formatierungen (6)

Sollten die Standardformatierungen einmal nicht reichen, kann man jedes Block-Element mit CSS nachstylen:

```markdown
das muss man schon wissen! <!-- .element: style="font-variant:small-caps;" -->
```

das muss man schon wissen! <!-- .element: style="font-variant:small-caps;" -->

---

## Formatierungen (7)

... und wenn das noch immer nicht reicht, hilft immer noch HTML

```markdown
Das ist eine <del>hirnrissige</del> interessante Idee!
Alles geht <sup>drüber</sup> und <sub>drunter</sub>
Erst leise anschleichen und dann <big>BUUUH</big> rufen!
```

Das ist eine <del>hirnrissige</del> interessante Idee!

Alles geht <sup>drüber</sup> und <sub>drunter</sub>

Erst leise anschleichen und dann <big>BUUUH</big> rufen!



---

## Grafiken

Grafiken werden irgendwo im Ordner `assets` abgelegt.

Einbinden von Grafiken

```markdown
![img](assets/brand/holisticon-logo-standard.png)
```

![img](assets/brand/holisticon-logo-standard.png)

---

## Grafiken (2)

Grafiken auf Foliengröße skalieren:

```markdown
![img](assets/baustelle.jpg) <!-- .element: class="stretch no-border" -->
```

Sieht wie folgt aus: ⇩

--

![img](assets/baustelle.jpg) <!-- .element: class="big-image no-border" -->

---

## Grafiken (3)

Grafiken auf vollen Bildschirm als Hintegrundbild skalieren:

```markdown
<!-- .slide: data-background="assets/baustelle.jpg" -->
```

Sie wie folgt aus: ⇩

--

<!-- .slide: data-background="assets/baustelle.jpg" -->

---

## Tabellen

```markdown
| Tables        | Are           | Cool  |
|:------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

---

## Seitenübergänge

Nächste Seite
```markdown
(Leerzeile)
---
(Leerzeile)
```

---

## Vertikale Slides

Idee: Der _Standardpfad_ durch eine Präsentation ist horizontal.

Optionale Detailinformationen (ausführliche Grafiken, Code-Beispiele) können durch vertikale Slides an eine Standard-Slide
angehängt und dann _bei Bedarf_ gezeigt werden.

---

## Vertikale Slides (2)

Vertikaler Slide (darunter) ⇩

```markdown
(Leerzeile)
--
(Leerzeile)
Unten angekommen
```

--

Unten angekommen

---

## Fragmente

Fragment (Blöcke _nachladen_)

```markdown
## Folgendes:

* Wer A sagt <!-- .element: class="fragment" -->
* muss auch B sagen! <!-- .element: class="fragment" -->
```

Sieht wie folgt aus: ⇩

--

## Folgendes:

* Wer A sagt <!-- .element: class="fragment" -->
* muss auch B sagen! <!-- .element: class="fragment" -->

---

## Präsentationsnotizen

```markdown
    >NOTES:
    * Alles bis zum folgenden Seitenumbruch landet in den Speakers-Notes.
    * Einfach mit der Taste `s` ausprobieren!

```

>NOTES:
* Alles bis zum folgenden Seitenumbruch landet in den Speakers-Notes.
* Einfach mit der Taste `s` ausprobieren!

---

## Funktionen An-/Abschalten

In der `index.html` (ab `// Configure Reveal`) können einzelne Features von reveal.js konfiguriert werden.
Ein Feature lässt sich durch setzen des entsprechenden Schalters

```
controls: true,
progress: true,
history: true,
center: true
```

bzw. ein- oder auskommentieren des Plugins konfigurieren.

---

## PDF-Export

Präsentation im Browser starten und mittels Print-Dialog als PDF abspeichern.
Klappt am hübschesten im Chrome.

---

## Mehr...

Für mehr gestalterische Möglichkeiten einfach mal die [reveal.js](http://lab.hakim.se/reveal-js/#/)-Demo durchklicken.