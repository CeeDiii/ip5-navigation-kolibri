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
### URI vs. URL (& URN)
(siehe Grafik: https://danielmiessler.com/images/url-structure-and-scheme-2022.png)
#### URI
* Uniform Resource Identifier
* String, der eindeutig eine Ressource identifiziert 
* nutzt Namen, Location oder beides zur Identifikation
* Superset von URL und URN
#### URL
* Untergruppe von URI
* spezifziert das Protokoll, wie eine Ressource erreichbar ist (z.B. http://)
#### URN
* Untergruppe von URI
* URI mit spezifischen Namensschema zur Identifikation einer Ressource (z.B. isbn:)
### Bookmarks - Chrome Bookmarks API vs localStorage
#### Bookmarks API
* Benötigt Manifest Konfigurationen
* Nicht unterstützt durch Opera und Safari (Chromium basierte API)
* Relativ aufwändig
#### localStorage
* Bis zu 10 MB Speicherkapazität
* Kann nur Strings hinter einem beliebigen key speichern (JSON.stringify als Lösung für komplexere Strukturen)
* Von allen üblichen Browsern nativ nutzbar
* Straight forward ohne Konfigurationsaufwand
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

#### URI vs. URL
Differences:
https://danielmiessler.com/study/difference-between-uri-url/

#### Browser Bookmarks
Bookmark API:
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/bookmarks


