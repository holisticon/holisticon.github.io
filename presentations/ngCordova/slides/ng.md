# Hybride Apps mit Cordova & AngularJS
Martin Reinhardt (Holisticon AG)


<!-- .slide: class="title" data-background="assets/brand/grass_footer.png" data-background-repeat="repeat-x" data-background-position="bottom center" data-background-size="inherit" -->

---

# Agenda

* Basics
* JavaScript & HTML5 für Apps
* Beispiel
* Continous Integration
* Best Practices 
* Zukunft
* Links

---

# Basics
## Mobile First

* Rich Internet Applications (RIA) sind überall <!-- .element: class="fragment" -->
* UI-Berechnungen erfolgen nicht mehr auf dem Server, wie in JSF, Wicket etc <!-- .element: class="fragment" -->
* Mehr und mehr Client-Logik <!-- .element: class="fragment" -->
* JEE 7 zeigt diesen Trend, z.B. JSON und WebSockets <!-- .element: class="fragment" -->
* Zuerst wird für mobile Geräte wie Smartphones und Tablets geplant <!-- .element: class="fragment" -->

>NOTES:
* Wer hat schon Erfahrungen
	* Apps?
    * AngularJS

--

# App gehts?

1. Apps benötigen wenig Speicherplatz<!-- .element: class="fragment" -->
2. Apps sind schnell heruntergeladen und blitzschnell installiert<!-- .element: class="fragment" -->
3. Apps sind präzise Werkzeuge, die in der Regel genau die Funktionen bieten, die man braucht<!-- .element: class="fragment" -->
4. Apps sind einfach zu bedienen und benötigen wenig Einarbeitungszeit<!-- .element: class="fragment" -->
5. Apps lassen sich leicht auf den neuesten Stand bringen<!-- .element: class="fragment" -->
6. Apps sind preiswert<!-- .element: class="fragment" -->
7. Apps lassen sich leicht deinstallieren und gegen andere austauschen<!-- .element: class="fragment" -->
8. Apps bieten die Möglichkeit, auch exotische oder ungewöhnliche Aufgaben zu lösen<!-- .element: class="fragment" -->
9. Apps sind ein Vertriebskanal, den sich viele Unternehmen erstmal lange und mühsam erarbeiten müsse<!-- .element: class="fragment" -->
10. Apps bieten ein direkten Monetarisierungsansatz <!-- .element: class="fragment" -->

>NOTES:
* Warum Apps
* Entwickler können schnell Nutzer auch Mobil erreichen und neue Geschäftsmodelle ohne eigene Infrastruktur bereitstellen
* Nutzer haben geringe Einstiegshürde
* Entwickler können direkt Geld für ihre Arbeit erhalten

--


# Technische Typen von Mobile Apps
|                       | Native        			| Hybrid						| Web        				|
|:---------------------:|:-------------------------:|:-----------------------------:|:-------------------------:|
|*GPU*					|Direkte API    			|Canvas, SVG   					|Canvas, SVG   				|
|*Native UI*			|Ja							|Emuliert						|Emuliert				 	|
|*Verteilung*			|AppStore/Market			|AppStore/Market				|Web 						|
|*Kamera*				|Ja							|Ja	mit Plugins					|Teilweise 				    |
|*Notifications*		|Ja							|Nur lokal						|Nur lokal					|
|*Kalender & Kontake*	|Ja							|Ja	mit Plugins					|Nein						|
|*Speicher*				|Dateisystem				|HTML5 & Dateisystem			|HTML5						|
|*Konnektivität*		|Online/Offline				|Online/Offline					|Meist nur online			|
|*Entwicklung*			|Aufwendige Pflege/Wartung	|Moderate Pflege/Wartung		|Moderate Pflege/Wartung	|
|*Sprache*				|Hochsprachen 				|Hochsprachen <br> Web-Sprachen | Web-Sprachen 				|

--

![img](assets/app_types.png) <!-- .element: class="big-image no-border" -->

--

# Apache Cordova

* Open-Source Framework um hybride Apps, basiert auf PhoneGap
* PhoneGap Framework 2011 an Apache Software Foundation übertragen, aus markenrechtlichen Gründen wurde das Framework zu diesem Zeitpunkt in Apache Cordova umbenannt, PhoneGap Projekt wird derweil von Adobe weitergeführt und weiterentwickelt
* Interaktion mit nativen Biblotheken über Plugins

<!-- .slide: data-background="assets/cordova_architecture.png" data-background-repeat="repeat-no" data-background-position="bottom center" data-background-size="30%" -->

>NOTES:
* für Android, Windows Phone, Blackberry, Firefox OS, Amazon FireOS und Ubuntu
* mithilfe von Webtechnologien wie HTML, CSS und Javascript

---


# Ist JavaScript schnell genug für RIA?

![img](assets/javascript.png) <!-- .element: class="big-image no-border" -->

> JavaScript != jQuery

> "jQuery = die schmerzfreie Art mit JavaScript zu arbeiten"

>NOTES:
* So wird jQuery vielen erklärt
* Problem ist viele verstehen es nicht es richtig und zielgerichtet einzusetzen
* Viele schlechte Plugins

--

## jQuery

* Java-Projekten nutzen jQuery zur "Beschleunigung"
* jQuery-Selektoren haben Performance-Probleme

![http://jsperf.com/jquery-cache-no-cache/13](assets/jquery_performance.png) <!-- .element: class="big-image no-border" -->

* Kein Problem von JavaScript, Problem der Konzeption
* JavaScript ist Enterprise-ready mit Frameworks wie z.B. AngularJS

>NOTES:
* Java-Projekten nutzen jQuery, um Fehler in grundlegenden Architekturentscheidung abzumildern
* bequeme Selektoren sind echte Performance-Fresser
* jQuery.width() ist extrem langsam, eher jQuery.css()

--

![https://angularjs.org](https://angularjs.org/img/AngularJS-large.png) <!-- .element: class="big-image no-border"  -->


* Framework von Google zur Entwicklung von Web Apps (2009)
* basiert auf einer “Model View Controller” (MVC) Architektur
* läuft komplett im Browser ab
* Features:
	* Dependency Injection
	* Routing
	* Data Binding
	* Templates (HTML-Views)
	* Modularisierung
* Ideal zur Entwicklung von grossen “Enterprise” Anwendungen


>NOTES:
Framework von Google zur Entwicklung von Web Apps - basiert auf einer “Model View Controller” (MVC) Architektur. Diese Architektur erlaubt eine Strukturierung des Quellencodes, welche auch die Entwicklung von grossen “Enterprise” Anwendungen ermöglicht ohne die Kontrolle über den Quellencode zu verlieren - ein Problem von reinen JavaScript Anwendungen.

--

## Angular Basics

* niemals DOM aus Controller manipulieren
* Module können andere Module wieder benutzen
* Präsentation der Daten im “View” mit Hilfe von HTML
	* Direktiven
	* Templates
* Direktive übernimmt eine klar umrissene Aufgabe
	* nötige Code ist in der Direktive gekapselt (Wiederverwendbarkeit)
	* Manipulation nur innerhalb der Direktove ($scope)
	* Lesbarkeit (kein Boilerplate Code im HTML)
* Modell enthalt Daten, die mit Services befüllt werden
* Services werden zur Kommunikation mit Außenwelt genutzt
	* Backend-Kommunikation
	* typischerweise REST
* Controller verbindet View mit "Databinding" am Modell

>NOTES:

Direktiven können auch selber kreiert werden, um so HTML Attribute nach Bedarf zu erstellen. Dieses Konzept macht auch den Markt für Drittanbieter interessant, welche ihre “Widgets” über Direktiven zur Verfügung stellen.
Der Einstieg in AngularJS bereitet in der Anfangsphase etwas Schwierigkeiten - das Arbeiten mit “Factories”, “Services” und “Providern” ist ungewohnt. Ebenso muss man sich an die Verwendung von “Promises” gewöhnen. “Promises” werden dazu verwendet, Funktionen asynchron aufzurufen; diese werden dann aber wie synchrone Aufrufe behandelt, ohne dass der Browser während dem Funktionsaufruf blockiert wird. Sind die ersten Hürden beim Einstieg in AngularJS überwunden, nimmt die Produktivität rapide zu, und man möchte nicht mehr auf AngularJS verzichten.


--

## [Mobile AngularUI](http://mobileangularui.com)

* Bootstrap 3 für mobile Webanwendungen
* HTML5-basierendes UI Framework, dass AngularJS und Bootstrap 3 verbindet
* schlank und schlicht
* Für komplexere Apps (mit nativen Look-and-Feel)
	* [Ionic Framework](http://ionicframework.com)
	* [Onsen UI](http://onsen.io)
	* [KendoUI](http://www.telerik.com/kendo-ui)

<!-- .slide: data-background="http://mobileangularui.com/assets/img/phone.png" data-background-repeat="repeat-no" data-background-position="bottom center" data-background-size="30%" -->


---

# Beispiel-App

![img](assets/app_dev.png) <!-- .element: class="big-image no-border"  -->

* Die Beispiel-App nutzt ein JEE-Backend
	* REST-Service für Nutzerabfrage
	* WebSocket für Nachrichten
	* JAAS für Login (HTTP-Authentication)

--

## Aufbau

![img](assets/app_screenflow.png) <!-- .element: class="big-image no-border"  -->

* Architektur für das Beispiel

![img](assets/app_architecture.png) <!-- .element: class="fragment big-image no-border"  -->


--

## Projektstruktur

* Grundstruktur der Beispiel-App (angular_cordova_app)
![img](assets/app_folder_structure.png) <!-- .element: class="fragment big-image no-border"  -->

## Lokale Einrichtung <!-- .element: class="fragment"  -->

1. (sudo) gem install compas <!-- .element: class="fragment"  -->
2. (sudo) npm install -g grunt-cli <!-- .element: class="fragment"  -->
3. (sudo) npm install -g bower <!-- .element: class="fragment"  -->
4. npm install <!-- .element: class="fragment"  -->
5. bower install <!-- .element: class="fragment"  -->
6. grunt build <!-- .element: class="fragment"  -->

>NOTES:
* config.xml ist die Konfiguration einer Cordova-App
* www Ordner wird immer von Cordova genutzt
* grunt build schreibt Ausgabedateien in www-Ordner
* Benötigen NPM und Ruby lokal + XCode
* NPM vs Bower
	* npm = Verwaltung der Entwicklungstools, wie Cordova und Grunt
    * Bower =  Komponenten der eigentlichen Webanwendung
* Gruntfile.js verbindet alle einzelnen JavaScript-Dateien
	* Einzelne JS-Datein für Controller und Services ...


--

## App gehts 

* Unsere App nutzt nur wenige Module

```javascript
￼var app = angular.module('angularCordovaApp', [ 
	'ngRoute',
	'ngTouch',
	'mobile-angular-ui',
	'LocalStorageModule', ]);
```

* Vom Screenflow können zunächst die Views angelegt werden

```javascript
app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'AppController'
    }).when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsController'
    }).when('/users', {
      templateUrl: 'views/users.html',
      controller: 'UsersController'
    }).when('/users/:username', {
      templateUrl: 'views/chat.html',
      controller: 'ChatController'
    }).otherwise({
      redirectTo: '/home'
    });
});
```

>NOTES:
* Views werden in Angular direkt per URL angesprochen


--

## JRebel? – Ich hab grunt server
* Einstellungsseite guter Einstiegspunkt

```xml
<div content-for="title">
  <span>Settings</span>
</div>
<div class="scrollable">
  <div class="scrollable-content">
    <form id="settingsForm" name="settingsForm" novalidate ng-submit="save()">
        <div class="section container-fluid">
            <div class="panel-heading"><h2 class="panel-title">Login details</h2></div>
            <div class="panel">
              <div class="form-control-wrapper col-xs-12 col-sm-12 col-lg-12">
                  <input ng-model="settings.username" type="text" bs-form-control name="username" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"                       label="Username" label-class="col-xs-12 col-sm-4 col-lg-4" class="col-xs-12 col-sm-8 col-lg-8 form-control"                       placeholder="Your username" ng-required="true">
                  <input ng-model="settings.password" label="Password" bs-form-control name="password" type="password" autocomplete="on" autocorrect="on" autocapitalize="on" spellcheck="false" label-class="col-xs-12 col-sm-4 col-lg-4" class="col-xs-12 col-sm-8 col-lg-8 form-control" placeholder="Your Password" ng-required="true">
              </div>
           </div>
           <div class="form-actions panel" bs-panel>
              <div class="panel-body"><button type="submit" ng-disabled="settingsForm.$invalid" class="btn btn-primary"><i class="fa fa-save"></i>  Save</button>
              </div>
           </div>
        </div>
    </form>
  </div>
</div>
```
> Beide  Eingabefelder als Pflichtenfelder markiert  haben **(ng-required=true)**
> Submit-Button ist deaktiviert , solange das Formular Validierungsfehler 19 aufweist **(ng-disabled)**
> Submit ruft save-Funktion im Controller auf


>NOTES:
* Demo mit Änderungen in UI (Edtior + Browser Split)

--

## Datenspeicherung - Services

* App-Einstellung werden im HTML5 LocalStorage abgelegt
* Vorhandes Angular-Modul **localStorageService** genutzt

```javascript
app.service('SettingsService', function($rootScope, $http, $q, Base64, localStorageService, APP_CONFIG) {
    "use strict";
    var configURL = APP_CONFIG.config;
    return {
        save: function(config) {
            var deferred = $q.defer();
            localStorageService.remove('ngJEE_app.settings');
            if (config.username && config.password) {
                var basicAuth = Base64.encode(config.username + ":" + config.password),
                    timeout = settings.timeout,
                    httpHeader = {
                        'Authorization': 'Basic ' + basicAuth,
                        'Access-Control-Allow-Origin': 'localhost',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    };
                $http({ method: 'GET', url: configURL, timeout: timeout, xhrFields: {  withCredentials: true  },
                    headers: httpHeader
                }).then(function(response) {
                    angular.forEach(response.data, function(value, key) {
                        config[key] = value;
                    });
                    config.valid = true;
                    config.timeout = 2000;
                    localStorageService.add('ngJEE_app.settings', config);
                    deferred.resolve(config);
                }, function(error) {
                    config = { valid: false }
                    deferred.reject(config);
                });
            } else {
                deferred.reject(config);
            }
            return deferred.promise;
        },
        load: function() {
            var settings = localStorageService.get('ngJEE_app.settings');
            if (settings) {
                if (settings.valid) {
                    console.log("Found valid settings");
                }
            } else {
                settings = {};
                settings.valid = false;
            }
            return settings;
        }
    };
});
```

* Speichern ruft auch beim Server die Einstellungen ab
* Base64-Encoder-Service, um Login-Daten im HTTP-Header zu setzen
* Daten als JSON-String abgelegt

>NOTES:
* Auch SQLite nutzbar
* PouchDB als Alternative

--

## Datenspeicherung - Controller

* Controller nutzt Settings-Service
* UI-Interaktion (Ladeverhalten + Fehlerbehandlung)

```javascript
app.controller('SettingsController', function($rootScope, $scope, $location, $route, SettingsService, ConfigService) {
  "use strict";
  function loadSettings() {
    $scope.settings = SettingsService.load();
  }
  function saveSettings() {
    $rootScope.loading = true;
    SettingsService.save($scope.settings).then(function() {
      $rootScope.$broadcast('handleConfigUpdate', $scope.settings);
      // redirect
      $location.path("/").replace();
      $route.reload();
      // update config
      ConfigService.configureServices();
      $rootScope.loading = false;
    }, function(reason) {
      $rootScope.loading = false;
      navigator.notification.alert('Server did not show valid response.', null, 'Server Error');
    });
  }
  // public methods
  $scope.load = loadSettings;
  $scope.save = saveSettings;
  // auto init
  loadSettings();
});
````

>NOTES:
* Service per Injection aufgerufen
* navigator.notification = cordova plugin (fallback auf altert in cordova_plugins)

--

## Nutzer abrufen

* Controller nutzt UserService (analog Settings)
* Liste der Nutzer wird in lokalen Scope abgelegt

```javascript
app.controller('UsersController', function($rootScope, $scope, SettingsService, UserService) {
  "use strict";
  $scope.settings = SettingsService.load();
  function loadUsers() {
    $rootScope.loading = true;
    UserService.listAllUsers().then(
      function(response) {
        var allUsers = response.data, users = [];
        var count = 0;
        for (var itemIndex in allUsers) {
          var user = allUsers[itemIndex];
          // don't show current user in list
          if (user.username != $scope.settings.username) {
            $scope.users;
            users.push(user);
          }
        }
        $scope.users = users;
        $rootScope.loading = false;
      }, function(errorResponse) {
        console.error('Server error during reading users');
        navigator.notification.alert('Server did not show valid response.', null, 'Server Error');
        $rootScope.loading = false;
      }
    );
  }
  // public methods
  $scope.allUsers = loadUsers;
  // auto init
  loadUsers();
});
```


>NOTES:
*  View einfach, lediglich ng-repeat

--

## Chat - Service

* Service nutzt "ReconnectionWebSocket" Objekt
* komplex wg. Fehlerbehandlung und Callbacks

```javascript
app.service('ChatService', function($rootScope, $log) {
    "use strict";
    var wsBackend, sender, socket, url;
    function createSocket() {
        url = wsBackend + '/' + sender;
        socket = new ReconnectingWebSocket(url);
        socket.onopen = function() {
            var args = arguments;
            if (service.handlers.connected) {
                $rootScope.$apply(function() {
                    service.handlers.connected.apply(socket, args)
                })
            }
        }
        socket.onmessage = function(data) {
            var args = arguments;
            	args[0].data = JSON.parse(args[0].data);
            if (service.handlers.receive) {
                $rootScope.$apply(function() {
                    service.handlers.receive.apply(socket, args);
                })
            }
        }
        socket.onconnecting = function() {
            var args = arguments;
            if (service.handlers.connecting) {
                $rootScope.$apply(function() {
                    service.handlers.connecting.apply(socket, args)
                })
            }
        }
        socket.onerror = function() {
            var args = arguments;
            if (service.handlers.error) {
                $rootScope.$apply(function() {
                    service.handlers.error.apply(socket, args)
                })
            }
        }
    }
    var service = {
        handlers: {},
        config: function(settings) {
            wsBackend = settings.wsBackend;
            sender = settings.username;
        },
        open: function() {
            createSocket();
        },
        receive: function(callback) {
            this.handlers.receive = callback;
        },
        send: function(data) {
            var msg = typeof(data) == "object" ? JSON.stringify(data) : data;
            var status = socket.send(msg);
        },
        connected: function(callback) {
            this.handlers.connected = callback;
        },
        connecting: function(callback) {
            this.handlers.connecting = callback;
        },
        error: function(callback) {
            this.handlers.error = callback;
        }
    };
    return service;
});
```

>NOTES:
*  Service kapselt weitesgehend Komplexität


--

## Chat - Controller

* Controller definiert Callbacks für Senden, Empfangen und Fehlerbehandlung
* Verlauf existiert nur im Controller-Scope

```javascript
app.controller('ChatController', function($rootScope, $scope, $routeParams, SettingsService, ChatService) {
  "use strict";
  var recipient = $routeParams.username, settings = SettingsService.load(), sender = settings.username, connection;
  function initChat() {
    $rootScope.loading = true;
    var self = this;
    $scope.messages = [];
    $scope.sender = sender;
    $scope.recipient = recipient;
    ChatService.open();
    ChatService.receive(function(event) {
      $rootScope.loading = true;
      var msg = angular.fromJson(event.data);
      $scope.messages.push(msg);
      $rootScope.loading = false;
    });
    ChatService.connected(function() {
      $rootScope.loading = false;
    });
    ChatService.error(function() {
      $rootScope.loading = false;
      console.error('Server error during reading connectiong to WebSocket');
      navigator.notification.alert('Server did not respond.', null, 'Messaging Error');
    });
  }
  function sendMessage() {
    $rootScope.loading = true;
    var msg = { to: recipient, from: sender, text: $scope.message };
    ChatService.send(JSON.stringify(msg));
    $scope.message = '';
    $rootScope.loading = false;
  }
  $scope.load = initChat;// public methods
  $scope.send = sendMessage;
  initChat();  // auto init
});
```

--

## Chat - View

* View sorgt für Anordnung der Teilnehmer:

```xml
<div content-for="title">
  <span> Chat with {{recipient}}</span>
</div>
<div class="scrollable">
  <div class="scrollable-content">
	<form name="chatForm" novalidate ng-submit="send()">
      <div class="list-group">        
        <a ng-repeat="msg in messages" class="list-group-item media">
          <div ng-class="msg.to === sender ? 'pull-right': 'pull-left'">
            <i class="fa fa-user chat-user-avatar"></i>
          </div>
          <div class="media-body">
            {{ msg.from === sender? 'me': msg.from }} : {{msg.text}}
          </div>
        </a>
        <div class="panel">
            <textarea name="message" class="form-control"
               data-ng-model="message" placeholder="Text ..." ng-required="true">
            </textarea>
            <button type="submit" ng-disabled="chatForm.$invalid" class="btn btn-primary">
              Send
            </button>
            </div>
        </div>
    </form>
  </div>
</div>
```

* Submit nur möglich, wenn Eingabe erfolgt

>NOTES:
* Demo App
* Flynn

---

# Continous Integration

* App wird bei CI nicht immer localhost als Backend nutzen können
* Konfiguration generell wunschenswert (Branding etc...)
* Beispielsweise Abfrage der Konfiguration per REST möglich

```javascript
  var $http = angular.injector(['ng']).get('$http'),
  	  $rootScope = angular.injector(['ng']).get('$rootScope');
  $rootScope.loading = true;
  $http.get('config.json').success(function(data, status, headers, config) {
      var config = data;
      app.constant("APP_CONFIG", config);
      angular.bootstrap(document, ['angularCordovaApp']);
      $rootScope.loading = false;
    }).error(function(data, status, headers, config) {
      console.error('Server error during reading users');
      navigator.notification.alert('Server did not show valid response.', 
      								null, 'Server Error');
      $rootScope.loading = false;
    });
```

* Konfiguration wird im Backend als JSON String abgelegt

--

# Testing

* Deployment auf Webserver notig (XSS ...)
* Normale UI-Integrations-Tests

```java
@RunWith(ThucydidesRunner.class)
public class UsersIT {

	@Managed(uniqueSession = true)
	public WebDriver webdriver;

	@ManagedPages
	public Pages pages;

	@Steps
	public AppSteps appSteps;

	public final static String LS_APP_SETTINGS_KEY = "ls.ngJEE_app.settings";
	public final static String LS_APP_SETTINGS_VALUE = "{\"username\":\"user1\",\"password\":\"user1\"}";

	@Test
	@Issues({ "#5", "#6" })
	public void userListingWithoutErrors() {
		setupLS();
		appSteps.goToUserListing();
		appSteps.should_see_user_listings();
	}

	@Test
	@Issues({ "#5", "#6" })
	public void shouldShowAllUsers() {
		setupLS();
		appSteps.goToUserListing();
		appSteps.should_show_correct_user_count(3);
	}

	public void setupLS() {
		try {
			appSteps.goToSettings();
			JavascriptExecutor js = (JavascriptExecutor) webdriver;
			js.executeScript("window.localStorage.clear()");
			js.executeScript(String.format(
			    "window.localStorage.setItem('%s','%s');", LS_APP_SETTINGS_KEY, LS_APP_SETTINGS_VALUE));
			webdriver.navigate().refresh();
			appSteps.goToSettings();
			appSteps.saveSettings();
		} catch (Exception e) {
		}
	}

}
```

* LocalStorage muss immer wieder gesetzt werden!

>NOTES:
* Alternativ auch Protractor nutzbar


--

# Chrome für lokales Debugging

```java
public class MyChromeDriver extends ChromeDriver implements DriverSource {
	@Override
	public WebDriver newDriver() {
		ChromeOptions options = new ChromeOptions();
		options.addArguments("--ignore-certificate-errors");
		options.addArguments("--disable-web-security");
		return new ChromeDriver(ChromeDriverService.createDefaultService(),
        	options);
	}

	@Override
	public boolean takesScreenshots() {
		return true;
	}
}
```

* Eigene Treiberimplementierung um lokal im Chrome UI Tests zu debuggen

>NOTES:
* Eigener Driver ohne CORS errors

--

## Build

 * App nutzt grunt, im Java Umfeld wird meist Maven genutzt
 * [Frontend-Maven-Plug-in](https://github.com/eirslett/frontend-maven-plugin) kann man beide Welten sanft verbinden

```xml
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>${frontend-maven-plugin.version}</version>
    <executions>
        <execution>
            <id>install node and npm</id>
            <goals>
                <goal>install-node-and-npm</goal>
            </goals>
            <configuration>
                <nodeVersion>v0.10.18</nodeVersion>
                <npmVersion>1.3.8</npmVersion>
            </configuration>
        </execution>
        <execution>
            <id>npm install</id>
            <goals>
                <goal>npm</goal>
            </goals>
            <configuration>
                <arguments>install</arguments>
            </configuration>
        </execution>
        <execution>
            <id>bower</id>
            <goals>
                <goal>grunt</goal>
            </goals>
            <configuration>
                <arguments>bower:install</arguments>
            </configuration>
        </execution>
        <execution>
            <id>grunt build</id>
            <goals>
                <goal>grunt</goal>
            </goals>
            <configuration>
                <arguments>--no-color</arguments>
            </configuration>
        </execution>
        <execution>
            <id>javascript tests</id>
            <goals>
                <goal>karma</goal>
            </goals>
            <phase>test</phase>
            <!-- <phase>integration-test</phase> -->
            <configuration>
                <karmaConfPath>src/test/webapp/karma.conf.ci.js</karmaConfPath>
            </configuration>
        </execution>
    </executions>
</plugin>
```
* einfache Integration in Jenkins, nur NPM muss installiert sein
* Alle Tests über Maven direkt aufrufbar, aber grunt unabhängig nutzbar

--

## Beispiel für automatisierten Build Report

<div style="position: fixed; width: 120%; height: 700%;" class="big-image no-border">
	<iframe style=" display: block;   width: 100%;    height: 100%;    border: none;" src="https://martinreinhardt-online.de/jenkins/job/AngularCordovaApp_webtest/thucydides/" width="80%" height="100%">
</div>


---

# Best Practises


* Manueller Bootstrap <!-- .element: class="fragment"  -->
	* Einfacher zur debuggen
    * Mehr Flexibiliät
* AngularJS<!-- .element: class="fragment"  -->
	* Verschachtelung (Scope in Controller vs. Directive)
	* Event-Handling (Änderungen für an andere Komponenten geben)
	* Daten zwischen Komponenten teilen
	* Nutzung von Promises nicht trivial
* Plugin-Auswahl mit Bedacht <!-- .element: class="fragment"  -->
	* Erschwert Testen
	* Nur beschränkte Auswahl (meist iOS und Android)
	* nicht alle mit AngularJS kompatibel, besser http://ngcordova.com/

>NOTES:
* Verschachtelte $scopes (z.B. Welche Direktive und welcher Controller hat wie Zugriff auf die Modell-Objekte?)
* Event Handling (z.B. Wie erfahren die einzelnen Komponenten, wo sich was geändert hat?)
* $emit und $broadcast senden Nachrichten an über- und untergeordnete Kontexte
* $emit und $broadcast unterscheiden sich dabei in einem kleinen, aber wichtigen Detail: $emit sendet eine Nachricht an alle übergeordneten Kontexte, $broadcast an alle untergeordneten. Die Kommunikation funktioniert also zunächst nur für Controller, die ineinander verschachtelt sind – nicht jedoch für Controller auf der gleichen Ebene oder gar für Services
* Funktionsweise von Promises manchmal nicht direkt vorhersehbar, aber elegante Lösung für asynchrone Aufgaben

* Notes: Trailing slash in config raus
    * Kein Fehler lokal
    * aber in App
    * Per Debugger verbinden und über Konsole Initialisierung erledigen
    * Flynn als Demo mit lokaler DB

<!-- .slide: data-background="https://docs.angularjs.org/img/guide/concepts-startup.png" data-background-repeat="repeat-no" data-background-position="top right" data-background-size="30%" -->


---

# Ausblick

* App <!-- .element: class="fragment"  -->
	* Kunde will eine App, weil jeder eine hat
	* AngularJS und Cordova gut geeignet für effektive und qualitative Apps erstellen
	* Testaufwand auf Geräten bleibt!
* AngularJS eignet  gut für kleine und große Webprojekte <!-- .element: class="fragment"  -->
	* Entwicklung von Desktop Web Apps
	* Entwicklung von mobilen Web Apps
    * lokale Datenbank mit PouchDB
* Version 2.0 folgt dem “Mobile First” Ansatz <!-- .element: class="fragment"  -->
* AngularJS eignet sich ebenfalls für die Entwicklung von Hybrid Apps <!-- .element: class="fragment"  -->
	* Look & Feel von native Apps kann über spezialisierte Frameworks erreicht werden
	* kaum Performance-Unterschieder auf modernen Geräten


---

# Links

* [jQuery Selektoren Performance](http://jsperf.com/jquery-cache-no-cache/13)
* [Depedency Injection](http://martinfowler.com/articles/injection.html)
* [Beispiel auf GitHub](https://github.com/hypery2k/angular_cordova_app) 
* [Flynn](https://github.com/hypery2k/angular_cordova_app) App mit PouchDB
* [I18n in AngularJS Anwendungen](http://angularjs.de/artikel/angularjs-i18n-ng-translate)


---

# About me

* Martin Reinhardt (Holisticon AG)

![img](https://pbs.twimg.com/profile_images/488919098240139264/KRAs7ITF.png)<!-- .element: class="big-image no-border" style="width:40%;height:40%"-->

* [github.com/hypery2k](https://github.com/hypery2k)
* [twitter.com/mreinhardt](https://twitter.com/mreinhardt)



