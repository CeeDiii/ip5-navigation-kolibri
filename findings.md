# Wissensammlung für IP5

TODO: Introduction

## Browser Navigation - Web API
### History / State
#### Aufbau
Dieser Ansatz nutzt die native Browserhistorie und fügt Einträge auch direkt dort ein. Einträge sind in diesem Kontekt Zustandsobjekte, die global verfügbar gemacht werden. Ein Zustandsobjekt kann Veränderungen in der View verursachen. Zustände werden auf einem Stack gespeichert direkt im Browser gespeichert. Browserbuttons navigieren anhand der Zustände auf diesem History-Stack. 
#### Vorteile
* native Browserunterstützung
* Nutzung von komplexen States (z.B. Modell möglich)
* State ist global verfügbar
* Speicherung der Historie direkt im Speicher
* kein Zusatzlogik für Browserbuttons
#### Nachteile
* Grösse von Zustandsobjekten ist Browser-abhängig und beschränkt
* Historie hat Browser-abhängige eine Maximallänge
* jedes neue Navigationselement muss in Routinglogik eingebunden werden
### Hash / onhashchange()
#### Aufbau
Der Zweite Ansatz hat als Ziel, nicht direkt von auf der Browserhistorie aufzubauen. Die Navigationspunkte werden im Script in einem Array abgelegt. Das Array wird beim klicken auf Navigationspunkte befüllt. Die navigationsrichtung wird duche abgleichen der bestehenden History festgestellt.
#### Vorteile
* Unabhängiges verwalten der Navigationshistorie
* Historie kann als Cookie abgelegt werden
#### Nachteile
* Das verhalten der Navigationsrichtung kann von der Erwartung des Nutzers abweichen
* Trotzdem abhängig vom window.location.hash
* Nach refresh bleibt die Browservative Historie, die Applikationseigene wird aber verworfen
### Quellen
#### Allgemeines
Route Handling on single page applications:
https://medium.com/@george.norberg/understanding-single-page-application-routing-without-a-library-or-framework-ac781b649995

History and Location API - Routing Example:
https://morioh.com/p/7704489a34d0

#### Window.history
Window.history:
https://developer.mozilla.org/de/docs/Web/API/Window/history

Window History state:
https://medium.com/@george.norberg/history-api-getting-started-36bfc82ddefc

--- https://jsfiddle.net/ax9qLe7r/

Maximum size of a state object:
https://stackoverflow.com/questions/6460377/html5-history-api-what-is-the-max-size-the-state-object-can-be

#### Window.location
Window.location:
https://developer.mozilla.org/en-US/docs/Web/API/Window/location

Catch browser back:
https://stackoverflow.com/questions/25806608/how-to-detect-browser-back-button-event-cross-browser


