# Reactive Systems

Vier Traits für die Architektur von Morgen?

<br />
Daniel Wegener<br />
![img](assets/tweet_logo.png) <!-- .element: class="inline" style="max-height:32px; vertical-align:center" --> [@dwegener](https://twitter.com/dwegener) / [@holisticon](https://twitter.com/holisticon)<br />
<!-- iSAQB Architekturtage (Oktober 2014) -->


<!-- .slide: class="title" data-background="assets/brand/grass_footer.png" data-background-repeat="repeat-x" data-background-position="bottom center" data-background-size="inherit" -->

---

<!-- .slide: data-background="assets/Motivation.svg" data-background-size="100%" -->

---

<!-- .slide: data-background="assets/reactive_manifesto.png" -->

---

# Das Reactive Manifesto

Was sind _reactive systems_?

Das Reactive Manifesto definiert vier Eigenschaften:

 - <!-- .element: class="fragment" --> __Responsive__ <br> Anwendungen reagieren und antworten _zeitnah_
 - <!-- .element: class="fragment" --> + __Resilient__ <br> Umgang mit Teilausfällen und Fehlern
 - <!-- .element: class="fragment" --> + __Scaleable__ <br> Umgang mit mehr Nutzern und mehr Daten
 - <!-- .element: class="fragment" --> + __Event-Driven__ <br> Asynchrones, nicht-blockierendes Verarbeitungsmodell
 - <!-- .element: class="fragment" --> = __Reactive__ <br>

---

# Das Reactive Manifesto (2)

Das Reactive Manifesto _2.0_ (September 2014) verfeinert diese Anforderungen

- <!-- .element: class="fragment" --> __~~Scaleable~~__ __Elastic__<br>Anpassung von Hardware-Ressourcen zur Laufzeit
- <!-- .element: class="fragment" --> __~~Event-Driven~~__ __Message-Driven__

---

# Warum Responsive?

- User-Experience
- Benutzer erwarten eine zeitnahe Reaktion des Systems
- Mobile Nutzung ist netzwerkbedingt bereits langsam
- Latenzsstarke Anwendungen sind ggf. nutzlos
 - Echtzeit-Auktionen
 - Instant-Messaging


---

# How-To Responsive

Antwortzeiten minimieren!

- Langsame Anfragen werden abgebrochen und wiederholt
- Zeitintensive Aufgaben werden nachgelagert ausgeführt
  - Erstellung einer PDF-Rechnung
  - E-Mail-Versand
  - (Schreiben in eine Datenbank)
- SLA eingehen und einhalten


---

# Warum Skalierbarkeit?

- Ökonomischer Betrieb
- Geplantes Wachstum
- Ungeplantes / spontanes Wachstum
- Internet of Things?
 - eher doch: mehr Interaktivität

---

# Skalierbarkeit

Skalieren mit:

- Anzahl simultaner Nutzer
 - die etwas im System tun
 - die darauf warten, dass sich im System etwas tut
- Größe der Wissensbasis / Datenmenge
- Mehr Benutzer -> mehr Daten

---

# Skalierbarkeit (2)

Wege, um mit Hardware-Ressourcen zu skalieren:

- __vertikal__ _(scale-up)_
  - Schnellere Prozessoren, mehr Arbeitsspeicher
  - __Moores Law is dead__
  - Multi-Core Server ≈ Verteiltes System
- __horizontal__ _(scale-out)_
  - Mehr Maschinen ...
  - __concurrent__: die sich gemeinsam die selbe Arbeit teilen
  - __partitioned/sharded__: die unabhängig gleichartig auf verschiedenen Daten arbeiten

---

# Skalierbarkeit (3)

![img](assets/AmdahlsLaw.png) <!-- .element: class="no-border" style="text-align:center" title="By Jgonion (Own work) [Public domain], via Wikimedia Commons" --> <!-- NOTE: Wikimedia Public Domain -->

- Serielle System-Abschnitte limitieren die Skalierbarkeit

---

# Thread Contention durch blocking-IO

![img](assets/ThreadContention1.svg) <!-- .element: class="no-border" style="text-align:center" title="By Jgonion (Own work) [Public domain], via Wikimedia Commons" --> <!-- NOTE: Wikimedia Public Domain -->

- Standard: _synchronous blocking IO_
 - Request Limit = Thread-Pool-Size
- Mehr parallele Requests gewünscht?
 - Thread-Pool vergrößern?
 - Threads sind teuer
 - Thread-Scheduling ist teuer

---

# Thread Contention durch blocking-IO (2)

- Besser: _asynchronous non-blocking IO_
- Anzahl Threads = Anzahl CPUs
- Anfragen werden _beiseite gelegt_
- Neues Concurrency-Limit
 - Anzahl Netzwerk-Sockets
 - Heap-Speicher
- Das widerspricht gängigen EE-Verarbeitungsmodellen
 - Ausnahme: _Servlet3 Async_

---

# Lokale Thread Contention

- Auch lokal: Thread-Synchronisierung hat Kosten
- Synchronisierung auf gemeinsamen Speicher limitiert Skalierbarkeit
- Maximale Utilisation
 - Trading-Systeme
 - LMAX Disruptor
- Mechanical Sympathy Group

---

# Global-State Contention

Bei der Synchronisierung mit _Shared Mutable State_ muss das System angehalten werden

Lösungsansätze:

- Veränderbaren Zustand nicht linearisieren
 - Eventual Consistency
 - Invarianten zulassen und nachgelagert Kompensieren
- Verteilt erreichbaren Zustand nicht verändern
 - Shared Immutable State
- Event-Sourcing

---

# Elastizität

- Hardware _bei Bedarf_ zur Laufzeit skalieren
- Reagieren auf Lastspitzen
- _Cloud Readyness_
- Ökonomisches Hosting

---

# Warum Resilienz?

- Downtime vergrault Benutzer
- _Zero Downtime_ ist erstrebenswert
- Fehler passieren
 - Auswirkungen sollten begrenzt werden
 - Kaskadierung durch _Bulkheading_ verhindern

---

# Resilienz

Ursachen für Fehler:

- (Programmcode enthält Fehler)
- (der Benutzer macht Eingabefehler)
- Netzwerk
- Betriebssystem
- Hardware

---

# Resilienz (2)

- Ein Benutzer sollte über Fehler informiert werden
- Die Behandlung des Fehlers sollte aber nicht durch den Aufrufer erfolgen müssen

---

# Resilienz (3)

- Systeme sollten Fault-Tolerance-Mechanismen besitzen
  - Replikation von Daten und Services
  - _Hot-Spare_ vs. _Failover_
- Typische Cluster-Funktionalität

---

# How-To Resilienz

- Middleware und DBMS mit Fault-Tolerance nutzen
- Fault-Tolerance des Gesamtsystems kontinuierlich testen!
- Netflix _Simian Army_
 - Chaos Monkey
 - Latency Monkey
 - Chaos Gorilla

---

# Message-Driven

- Stack-Driven vs. Message-Driven
- Komponenten des Systems kommunizieren über Nachrichten
- Die Verarbeitung von Nachrichten erfolgt asynchron
- Nachrichten haben einen Sender und einen Empfänger
- Message-Driven abstrahiert von
 - _Ort_ (location-transparency)
 - _Zeit_

---

# Message Delivery Semantics

![img](assets/MessageDelivery.svg) <!-- .element: class="no-border" style="height:140px" -->

__Zustellungsgarantie:__

- _at most once / fire and forget_
- _at least once_
- _exact once delivery_


---

# Message Delivery Semantics (2)

![img](assets/MessageOrder.svg) <!-- .element: class="no-border" style="height:170px" -->

__Zustellungsreihenfolge:__

- chronological order
- sharded order
- ordered per sender/receiver pair

---

# Reactive Concurrency Models

- Callbacks
- Futures
- Functional Reactive Programming (FRP)
- Distributed Stream Processing
- Actor Model

---

<!-- .slide: data-background="assets/SmoothieStreaming.svg" -->

---

# Functional Reactive Programming

- _Functional_ wie in funktionaler Programmierung
- Komposition von _Funktionen höherer Ordnung_
  - _map_,_fold_, _filter_, _bind_, _..._
- Streams werden mit funktionalen Stream-Kombinatoren verschaltet
- Observable = Push-Based Iterables
- single-machine, single-threaded
- Eignet sich besonders für UI-Part

---

# Functional Reactive Programming (2)

Implementierungen:

- ![img](assets/rx_logo.png) <!-- .element: class="inline" style="max-height:40px" --> Reactive Extensions
 - Rx.NET, RxJS (Microsoft, Erik Meijer)
 - RxJava (Netflix)
- Sodium (JVM/Haskell/.net)
-  ![img](assets/reactive_banana_logo.png) <!-- .element: class="inline" style="width:40px; height:40px" --> ReactiveBanana (Haskell)

---

# Verteiltes Stream Processing

- Verteiltes und fehler-tolerantes Functional Reactive Programming
- Abbildung der Fachlichkeit als statische Stream-Topologie
- Datenströme werden mit funktionalen Stream-Kombinatoren verschaltet
- Verteilung, Ausfallsicherheit und Konsistenz werden von der Plattform sichergestellt

Gut bei:

- Streaming-artige Fachlichkeit
    - Nachrichtensysteme (Twitter, Reddit)
- BI / Monitoring

---

# Stream Processing (2): Implementierungen

- Apache ![img](assets/apache_storm_logo.png) <!-- .element: class="inline" style="max-height:40px" -->
- Apache ![img](assets/apache_spark_logo.png) <!-- .element: class="inline" style="max-height:40px" --> Streaming


---

# Actor Model

- 1973 von Carl Hewitt entwickelt
- Ericsson nutzt es für Telekommunikationshardware
- Verteilt und Fehler-Tolerant _by Design_


---

<!-- .slide: data-background="assets/ActorSystem_1.svg" data-background-size="100%" -->

---

<!-- .slide: data-background="assets/ActorSystem_2.svg" data-background-size="100%" -->

---

<!-- .slide: data-background="assets/ActorSystem_3.svg" data-background-size="100%" -->


---

<!-- .slide: data-background="assets/ActorSystem_4.svg" data-background-size="100%" -->


---

<!-- .slide: data-background="assets/ActorSystem_5.svg" data-background-size="100%" -->

---

# Actor Model (2) - Implementierungen

- Erlang VM
 - ![img](assets/erlang_logo.png) <!-- .element: class="inline" style="max-height:40px" -->
 - ![img](assets/elixir_logo.png) <!-- .element: class="inline" style="max-height:40px" -->
- Java Virtual Machine (JVM)
 - ![img](assets/akka_logo.png) <!-- .element: class="inline" style="max-height:40px" -->
 - ![img](assets/vertx_logo.png) <!-- .element: class="inline" style="max-height:40px" -->
- Common Language Runtime (CLR)
 - ![img](assets/akka_net_logo.png) <!-- .element: class="inline" style="max-height:40px" --> akka.net


---

# Fazit

- Ein optimales Reactive System
 - Nutzt Hardware-Ressourcen effizient (hohe _utilisation_)
 - Ist nahezu linear skalierbar
 - Antwortet immer innerhalb einer festgelegten Reaktionszeit (SLA)
 - Kann sich von Fehlerzuständen erholen
 - Kann zur Laufzeit seine Hardware-Dimensionierung anpassen
- Reactive ist kein _afterthought_ für bestehende Architekturen
- __no silver bullet__


---

# Fazit (2)

- Reactive ist kein Mainstream
- Auch wenn wir kein _reactive System_ entwickeln:
 - Fachliche Konsistenzanforderungen kritisch hinterfragen
 - Entscheidungen möglichst mit lokalem Wissen und ohne Koordination treffen
 - _bring the algorithm to the data_ (~Hadoop)
 - Anwendungen als Transformation von Datenströmen betrachten

---

# Leseempfehlungen

- [A new way to develop for the cloud (interview with jboner)](http://readwrite.com/2014/09/19/reactive-programming-jonas-boner-typesafe)
- [Reactive Programming - vom Hype zum Praxiseinsatz](http://www.heise.de/developer/artikel/Reactive-Programming-vom-Hype-zum-Praxiseinsatz-2059533.html)
- [Introduction to Rx](http://www.introtorx.com/)
- [Coursera-Kurs _Principles of Reactive Programming_](https://www.coursera.org/course/reactive)
- [The Netflix Simian Army](http://techblog.netflix.com/2011/07/netflix-simian-army.html)


---

# Reactive Systems

Die Folien zu diesem Vortrag finden Sie unter

[http://holisticon.github.io/presentations/reactive-systems/](http://holisticon.github.io/presentations/reactive-systems/)
