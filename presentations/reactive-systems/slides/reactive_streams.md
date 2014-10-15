# Queue-Boundaries und Back-Pressure

Szenario: Ein Nachrichten-Produzent ist schneller als ein Konsument

Beispiel: Web-Service erhält mehr Anfragen als er verarbeiten kann

Thread-basiert: der Produzent wird blockiert oder wird abgewiesen

---

# Queue-Boundaries und Back-Pressure (2)

Message-basiert: Der Produzent flutet die Eingangswarteschlange des Konsumenten

- Unbeschränkte Queues führen zum Speicherüberlauf
- Beschränkte Queues müssen Nachrichten verwerfen oder den Aufrufer blockieren

Blockieren wollen wir eben gerade nicht (resource-hugging), verwerfen ist auch mist

→ Der Konsument muss dem Produzenten empfangsbereitschaft signalisieren

---

# Reactive Streams

Netflix/ RX, IBM

Standard der eine  die asynchrones, Streaming mit demand-driven nicht-blockierenden Back-Pressure auf der JVM API/SPI beschreibt.

Konzeptionell auch Applikations-übergreifend

Implementierungen:

- Akka
- Reactor (Library)
- Ratpack
- RxJava
- vert.x

---
