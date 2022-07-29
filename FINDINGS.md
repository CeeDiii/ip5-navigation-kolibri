# Wissensammlung für IP5
## Browser Navigation - Web API
### History / State
#### Aufbau
Dieser Ansatz nutzt die native Browserhistorie und fügt Einträge auch direkt dort ein. Einträge sind in diesem Kontekt Zustandsobjekte, die global verfügbar gemacht werden. Ein Zustandsobjekt kann Veränderungen in der View verursachen. Zustände werden auf einem Stack gespeichert und direkt im Browser gespeichert. Browserbuttons navigieren anhand der Zustände auf diesem History-Stack. 
#### Vorteile
* native Browserunterstützung
* Nutzung von komplexen States (z.B. Modell möglich)
* State ist global verfügbar
* Speicherung der Historie direkt im Speicher
* kein Zusatzlogik für Browserbuttons
#### Nachteile
* Grösse von Zustandsobjekten ist Browser-abhängig und beschränkt
* Historie hat Browser-abhängige Maximallänge
* jedes neue Navigationselement muss in Routinglogik eingebunden werden
### Hash / onhashchange()
#### Aufbau
Der zweite Ansatz hat als Ziel, nicht direkt auf der Browserhistorie aufzubauen. Die Navigationspunkte werden im Script in einem Array abgelegt. Das Array wird beim Klicken auf Navigationspunkte befüllt. Die Navigationsrichtung wird durch Abgleichen der bestehenden History festgestellt.
#### Vorteile
* Unabhängiges Verwalten der Navigationshistorie
* Historie kann als Cookie abgelegt werden
#### Nachteile
* Das Verhalten der Navigationsrichtung kann von der Erwartung des Nutzers abweichen
* Trotzdem abhängig vom window.location.hash
* Nach Refresh bleibt die browsernative Historie, die Applikationseigene wird aber verworfen
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
* User muss ein Addon installieren und Permissions für Browserzugriff erteilen
* Navigationslogik müsste Teil von Addon sein -> starke Koppelung zwischen Navigations- und Applikationslogik
#### Bookmarklets
* Jeglicher Javascript-Code kann "inline" als Bookmark ausgeführt werden, wenn er mit `javascript:` annotiert wird
* Dadurch das Code in `href` verpackt wird, kann er auch als Lesezeichen gespeichert werden
* User muss lernen, wie Bookmarklets verwendet bzw. gespeichert werden
* Inline-Javascript könnte von Sicherheitsrichtlinien blockiert werden
#### localStorage
* Bis zu 10 MB Speicherkapazität
* Kann nur Strings hinter einem beliebigen key speichern (JSON.stringify als Lösung für komplexere Strukturen)
* Von allen üblichen Browsern nativ nutzbar
* Straight forward ohne Konfigurationsaufwand
### Browser Buttons
* Grundsätzlich ist es eine extrem schlechte Idee das Standardverhalten der Browsernavigation zu manipulieren
#### Forward-Back-Loop
* Es ist möglich nach jedem Back-Aufruf eine Forward zu erzwingen, sodass die vorherige Seite nicht mehr angezeigt wird
* User ist in einem Loop gefangen
* User kann Verhalten durchbrechen, wenn er schnell 2x Back drückt
* User sieht sieht unter Umständen die alte Seite, zu der er eigentlich zurück möchte
#### webRequest-API-catch-back
* User muss unser Addon installieren
* Je nach Browser andere Syntax (Firefox-Object = browser, Crome-Object = chrome)
* Die 'blockierten' Seiten müssen definiert sein
* Weitere, installierte Extensions mit webRequest-Lifecycles können zu Fehlverhalten im Browser führen
#### Service-Worker
* installiert einen Serivce Worker im Browser, der Requests abfangen und manipulieren kann
* nützlich für Progressive Web Apps (PWA) um offline-Kompatibilitäten für Web-Appplikationen einzubauen
* ermöglicht eigenes Load Balancing
* kann genutzt werden um Bandbreite zu sparen, da Anfragen direkt vom Cache bedient werden können
* wird nur von Firefox und Chrome vollumfänglich unterstützt
* globaler Zustand geht mit Navigation verloren
* Zustand muss manuell gespeichert und verwaltet werden
#### Web-Worker
* ermöglicht Multithreading im Browser
* nützlich für rechenintensive Tasks
### Functional history
#### javascript function + eval
* `eval()` erlaubt einen String als Javascript-Funktion auszuführen
* somit haben wir die Möglichkeit die Renderfunktion eines Zustands direkt in der Browserhistory abzulegen
#### bookmarklet + window.location
* siehe Erklärung javascript function + eval, funktioniert mit Bookmarklets
#### Function-Constructor
* siehe Erklärung javascript function + eval
* sauberste Lösung der drei Genannten

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

Not allowed to delete a history entry:
https://stackoverflow.com/questions/28028297/js-window-history-delete-a-state

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

Bookmarklets:
https://support.mozilla.org/de/kb/bookmarklets-verwenden

#### Browser Buttons
Forward-Back-Loop:
https://www.geeksforgeeks.org/how-to-stop-browser-back-button-using-javascript/

#### Catch Browser requests
webRequest-API-catch-back:
https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Intercept_HTTP_requests

#### Service Worker
Fetch API: https://livebook.manning.com/book/progressive-web-apps/chapter-4/1

Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

#### Web Worker
Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
