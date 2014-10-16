# Continuous Delivery ohne Kopfschmerzen

Martin Reinhardt (Holisticon AG)

<!-- .slide: class="title" data-background="assets/brand/grass_footer.png" data-background-repeat="repeat-x" data-background-position="bottom center" data-background-size="inherit" -->

---

# Agenda

* Einführung / Build Pipeline
* Deployment
* Toogle Integration
* Testautomatisierung
* Ausblick
* Links

---

# Einführung

* Continuous Delivery ist die logische Fortsetzung von Continuous Integration
* Die Idee dahinter<!-- .element: class="fragment big-image no-border" -->
	* Software mit agilen Methoden kann nicht komplett (manuell) getestet werden
	* Alle 2 Wochen gesamten Funktionsumfang abtesten ist utopisch
	* Testumgebungen stehen meist nicht ausreichend zur Verfügung 

![img](assets/001_bigpicture.png)<!-- .element: class="fragment big-image no-border" -->

* Jobs = Bausteine der Stages ("Unit of Work")<!-- .element: class="fragment big-image no-border" -->
	* Bestehen aus Tasks wie Build, Deploy, Copy, Test

>NOTES:
* Eventuell mehrere Pipelines sinnvoll
* Stages
	* Commit Stage als zentrales Eingangs-Gate
	* Typische Stages: UAT, Performance Tests, Production Deployment
	* Stages verbunden durch Trigger (automatisch oder manuell)

---

# Warum Build Pipelines

* Agile Softwareentwicklung arbeitet kleinteilig<!-- .element: class="fragment no-border" -->
	* Software oft und zuverlässig in Produktion 
	* Nutzung der IDE != Automatisierung
	* Wesentlich ist dabei die Build Pipeline
* Wie?<!-- .element: class="fragment no-border" -->
	* Geschwindigkeit
	* Automatisierung

![img](assets/002_buildpipeline.png) <!-- .element: class="fragment big-image no-border" -->

>NOTES:
* Pipeline mehrmals durchlaufen
	* jeder einzelnen Schritt der Pipeline schnell und zuverlässig
    * wird durch **Automatisierung** erreicht
* Schritte
	* Entwicklung
    * Qualitätssicherung
    * Auslieferung
* Tests liefern schnelles Feedback über Seiteneffekte und Regressionen
* Deployment auf Knopfdruck und innerhalb von Minuten auf dem Produktionssystem
* Pipeline wird mit jeder Änderung durchlaufen
	* neuer Softwarestand hinein
	* qualitätsgesichertes, produktionsreifes und installierbares Softwarepaket

---

# Build Pipeline

* wesentliches Ziel ist schnelles Feedback, also Geschwigkeit<!-- .element: class="fragment no-border" -->
	* Einzelne Schritt schnell abarbeiten (5 - 10 Minuten)
	* Möglichst früh Fehler binden (**Unit-Tests**)
* unabhängig vom (Build-)Tool<!-- .element: class="fragment no-border" -->
	* Build muss reproduzierbar sein
* CI-Tools <!-- .element: class="fragment no-border" -->
	* Jenkins, Go, Travis CI, XCode Bots ... 
	* TestTools
* Quellcode muss Continous Delivery gerecht werden <!-- .element: class="fragment no-border" -->


>NOTES:
* Feature Toogles
* Einer der Grundsätze des Continuous Integration besagt, dass es lediglich einen Master-Branch und keine weiteren Feature-Branches geben soll, in den der Code eingecheckt und damit eben diese Merge-Hölle vermieden wird.

--

# Continous Delivery

* CI Server stellt dabei auch die finale Software auf dem Zielsystem bereit
	* "Infrastructure as code" (Puppet, Chef, Docker)
	* Deployment Pipeline
* Jeder gängige CI Server bietet Pipeline Bausteine an <!-- .element: class="fragment no-border" -->
 	* somit CD Server
 	* logische 1. Schritt ist Visualisierung 
 	* Übersicht aller Pipelines eines CD Servers
 	* Zeitliche Aktivitäten

>NOTES:
* Konkrete Namen können variieren
	* Teils historische Gründe, teils Abgrenzung zur Konkurrenz
    * Jenkins: Build Jobs, Build Steps, Post-build Actions, diverse Plugins
    * Go: Go Pipelines, Stages, Jobs, Tasks
* Bisherige Aktivitäten einer Pipeline

--

# Build Pipeline sinnvoll nutzen

* 3 Grundprinzipien
	* Zeit - Schritte schnell abgeschlossen (3 - 5 min)
	* Automatisierung
	* Reproduzierbarkeit
* Tests müssen schnell gefixt werden und stabil sein
* Tests gruppieren & parallelisieren
* Kritische Tests immer in Pipeline laufen lassen
* weitere Teststrecken aufbauen
	* Code Quality
	* Migrationstests
	* Nightly Builds
	* Weitere Pipelines



>NOTES:
* Integrations-Tests aufsplitten
* Neben der Optimierung der Tests kann Selektion von Tests helfen (Gruppierung)
* Integrations-Tests parallelisieren (gerade UI tests)

--

## Jenkins Build Pipeline Plugin

* Deployment Pipeline Erzeugung in Jenkins benötigt viele Plugins
* Build Pipeline Ansicht bietet detailiierten Überblick über einzelne Schritte der Pipeline

<div style="position: fixed; width: 120%; height: 800%;" class="big-image no-border">
	<iframe style=" display: block;   width: 100%;    height: 75%;    border: none;" src="https://martinreinhardt-online.de/jenkins/view/BMP_%20AngularCordovaApp/" width="80%" height="100%">
</div>

>NOTES:
* Deployment Pipeline Erzeugung in Jenkins benötigt viele Plugins
	* Build Pipeline, Copy Artifact, Parameterized Trigger, Promoted Builds
    * Plugins arbeiten nicht ideal zusammen
* Jenkins ist nicht auf Pipeline Erstellung ausgelegt
* üblichen Verdächtigen
	* Selektives „Überspringen“ von Stages, z.B. Deployen auf Produktion aber nicht auf Test Umgebung (z.B. bei Hotfix)
    * Erneutes Ausführen einzelner Stages


--

## Continous Delivery Plugin

* Reine Darstellung 
* gute Aggregationsmöglichkeit

<div style="position: fixed; width: 120%; height: 800%;" class="big-image no-border">
	<iframe style=" display: block;   width: 100%;    height: 75%;    border: none;" src="https://martinreinhardt-online.de/jenkins/view/CD_AngularCordova/" width="80%" height="100%">
</div>

---

## Deployment

* Wichtiger Punkt bei Planung
* Versionierung meist zu grob (1.0.3-SNAPSHOT)
    
```
mvn package -Dversion=20140325092556-d4dafcd-2341
```

* Einfaches Groovy Script (EnvInject-Plugin in Jenkins)

```groovy
def date = new Date()
def datestring = date.format("yyyyMMddHHmmss")
def version = datestring + "-" + SHA + "-" + BUILD_NUMBER;
return [VERSION: version]
```
* Verschiedene Arten neue Version bereitzustellen<!-- .element: class="fragment no-border" -->
	* Big Bang
	* Feature-Toogle (nur eine Version)
    * simultane Versionen (Blue/Green im Cluster)
	* Beta-Release für Nutzergruppen
* Gerade letzten beiden Versionen erfordern vom Backend mehrere Versionen in DB etc. zu unterstützen<!-- .element: class="fragment no-border" -->


>NOTES:
* recht trivial erscheinenden Änderung steckt eine grundsätzlich andere Herangehensweise an den Entwicklungsprozess
    * kein unnwichtigen Development Branch (fehlerhafter oder unfertiger Code eingecheckt)
    * keine wichtige Release Branches (jede Änderung nur mit großer Sorgfalt vorgenommen wird)
    * im Hauptenwicklungszweig jeder Commit = potenzielles Release 
* Anfügen eines Zeitstempels wg. zeitlich aufeinanderfolgende Builds auch aufsteigende Versionsnummern
* Feature Toogles prinzipiell bei allen Arten genutzt werden

--

# Toggle-Integration

* praxis-bewährtes Konzept - [FeatureToggle Pattern](http://martinfowler.com/bliki/FeatureToggle.html)
* Features nicht nur nach ihrem Fertigstellungsgrad nutzbar, sondern abhängig von<!-- .element: class="fragment no-border" -->
	* Benutzer
	* Umgebung
	* ...
* Togglz<!-- .element: class="fragment no-border" -->
	* Bibliothek für Java
	* Integration in Spring, JEE, CDI, JSF
	* Flexible [Persistierung](http://www.togglz.org/documentation/repositories.html) (Datei, Datenbank, ...)
	* Admin-Konsole zu Verwaltung


>NOTES:
* Nach Finalisierung der neuen Funktionen lässt es sich in allen Umgebungen aktivieren und damit in der Software zur Verfügung stellen.

--

## Togglz (1)

* Verschiedene Module integrierbar

```xml
<dependency><!-- Togglz core module (mandatory) -->
  <groupId>org.togglz</groupId>
  <artifactId>togglz-core</artifactId>
</dependency>
<dependency><!-- Togglz for Servlet environments (mandatory for webapps) -->
  <groupId>org.togglz</groupId>
  <artifactId>togglz-servlet</artifactId>
</dependency>
<dependency><!-- CDI integration (optional) -->
  <groupId>org.togglz</groupId>
  <artifactId>togglz-cdi</artifactId>
</dependency>
```
* Admin-Konsole kann ebenso optional integriert werden

--

## Togglz (2)

* Admin-Konsole

![img](assets/togglz-admin-console.png)


--

## Togglz (3)

* Features als Enum-Klassen

```java
public enum AppFeatures implements Feature {
  @Label("Portal")
  PORTAL,

  @EnabledByDefault
  @Label("Enable project support in CV")
  FEATURE_CV_PROJECT_SUPPORT;

  public boolean isActive() {
    return FeatureContext.getFeatureManager().isActive(this);
  }
```

* Direkte Nutzung in Code

```java
    if (AppFeatures.PORTAL.isActive()) {
    ...
```

--

## Togglz (4)

* Nutzung in [Tests](http://www.togglz.org/documentation/testing.html)

```java
public class AuthFilterTest {
  @Rule
  public TogglzRule togglzRule = TogglzRule.allEnabled(AppFeatures.class);

  @Test
  public void testNoRedirectToLoginWithUser() throws Exception{
    final StringBuffer requestURL = new StringBuffer("abc/xyz");
    final User user = new User.Builder().withUsername("test")...

    final UserSession userSession = mock(UserSession.class);
    final HttpSession httpSession = mock(HttpSession.class);
    final FilterChain chain = mock(FilterChain.class);
    request = mock(HttpServletRequest.class);
    response = new HttpServletResponse();
    when(request.getRequestURL()).thenReturn(requestURL);
    when(request.getSession()).thenReturn(httpSession);
    when(userSession.getUser()).thenReturn(user);
    // all features are active by default
    assertTrue(AppFeatures.PORTAL.isActive());
    AuthFilter filter = new AuthFilter();
    filter.setUserSession(userSession);
    filter.doFilter(request, response, chain);

    verify(chain).doFilter(request, response);
    assertThat(response.getStatus(), 
    	is(not(HttpServletResponse.SC_NOT_FOUND)));
  }

  @Test
  public void testRedirectToLoginWithNoUser() throws Exception{
    final StringBuffer requestURL = new StringBuffer("abc/xyz");

    final UserSession userSession = mock(UserSession.class);
    final HttpSession httpSession = mock(HttpSession.class);
    final FilterChain chain = mock(FilterChain.class);
    request = mock(HttpServletRequest.class);
    response = new HttpServletResponse();
    when(request.getRequestURL()).thenReturn(requestURL);
    when(request.getSession()).thenReturn(httpSession);
    // all features are active by default
    assertTrue(AppFeatures.PORTAL.isActive());
    AuthFilter filter = new AuthFilter();
    filter.setUserSession(userSession);
    filter.doFilter(request, response, chain);
    // then
    verifyZeroInteractions(chain);
    assertThat(response.getStatus(), 
    	is(not(HttpServletResponse.SC_NOT_FOUND)));
  }

  @Test // toggle off
  public void testRedirectWithInactivePortalToggle() throws Exception{
    final StringBuffer requestURL = new StringBuffer("abc/xyz");
    togglzRule.disable(AppFeatures.PORTAL);

    final UserSession userSession = mock(UserSession.class);
    final HttpSession httpSession = mock(HttpSession.class);
    final FilterChain chain = mock(FilterChain.class);
    request = mock(HttpServletRequest.class);
    response = new HttpServletResponse();
    when(request.getRequestURL()).thenReturn(requestURL);
    when(request.getSession()).thenReturn(httpSession);

    assertFalse(AppFeatures.PORTAL.isActive());
    AuthFilter filter = new AuthFilter();
    filter.setUserSession(userSession);
    filter.doFilter(request, response, chain);

    verifyZeroInteractions(chain);
    assertThat(response.getStatus(), 
    		is(HttpServletResponse.SC_NOT_FOUND));
  }
}
```


---

# Testautomatisierung

* Anchluss der Unit-Tests erzeugten Artefakte weiter testen
	* Ablage in Repository
    * Deployment in Test-Umgebung
* Testumgebungen problemebehaftet
	* Dedizierte Slaves (Labels)
    * Docker Images
* Docker besonders hilfreich (lokales Testen, Ressourcennutzung)
	* [Maven-Plugin](https://github.com/rhuss/docker-maven-plugin) verfügbar
* Feedback ist ein Muss
	* TestTools müssen aussaugekräftige Reports liefern
    * reproduzierbar & nachvollziehbar
    * gerade bei Oberflächen-Tests



--

## Responsive Testing mit Galen

* Automatisierung von Regressionstests des Layouts
* Defintion von Devices und Specs für diese
* Nutzt Spec-DSL (angelegt an CSS)

```
==============================================================
app-entry-*         css     a.list-group-item 
app-entry-logo-*    css     a.list-group-item div.pull-left i.fa

==============================================================
# common layout checks
@@ import shared/commonLayout.spec

# concrete layout tests

@ Each app entry should have a logo| *
[ 1 - 4 ]
app-entry-logo-@
    near: app-entry-@ -79 px left
```

* Nutzt Selenium zur Ausführung
* Gutes Reporting
* Stetige Weiterentwicklung als OSS-Projekt

--

## Galen Demo

* Einfaches Report-Beispiel


<div style="position: fixed; width: 120%; height: 800%;" class="big-image no-border">
	<iframe style=" display: block;   width: 100%;    height: 75%;    border: none;" src="https://martinreinhardt-online.de/jenkins/view/Galen/" width="80%" height="100%">
</div>

--

# Oberflächen Testing mit Stil - Thucydides

* Tool für ATDD (acceptance test driven development)
* Macht Oberflächen-Tests lesbarer, wartbarer und wiederwendbar
* Nutzt Selenium als technische Basis
* Kann als Java und JBehave-Variante genutzt werden
* Nutzt PagePattern
    * Page als Model der Webseite mit allen Elemente. 
    * Steps als Gruppierung der möglichen Interaktionsmöglickeiten, z.B. Klicken
    * Test ist eine Kollektion von Tests die Benutzereingaben reflektieren und das Ergebnis verifizieren
* Stellt Reporting für Tracking & Fehlersuche zur Verfügung
* Verbindung mit Ticket-System
* Anforderungen auf Tests mappen


>NOTES:
* Passt zum CD Gedanken
* WebDriver is a browser automation API
    * Used for UI Functional testing
* Thucydides is a Testing framework using WebDriver
    * Used for running tests, advanced reporting

--

# Thucydides (2) -  Page-Object Pattern

* Testautomatisierungspattern für effiziente und lesbare Tests
* Jede UI Seite wird auf eine Page-Klasse gemappt
* Interaktion wird über Steps-Klassen umgesetzt
* Tests nutzen Steps um Anwendungsverhalten zu simulieren

![img](assets/thucydides_page_pattern.png) <!-- .element: class="big-image no-border" -->

>NOTES:
* Wartung der Tests ist einfacher, z.B. kann Vererbung in Seiten/Pages genutzt werden um gemeinsame Elemente, wie Navigation abzubilden
* Testcode wird sehr leicht lesbar
* Komponenten können wieder verwendet werde
* Testerstellung einfacher
* Umsetzungen für verschiedene Plattformen
     * IDE: Visual Studio, Eclipse, IntelliJ, Visual Studio
     * Sprachen: C#, Java, Ruby, Python, Perl, JavaScript, ObjectiveC

--

# Thucydides (3) - Beispiel

* Anforderung: Als Nutzer möchte zum Ergebnis meiner Suche navigieren
* Testfall:    
    * Starte Google-Suche
    * Tippe Suchbegriff ein
    * Suche Ergebnis in Trefferliste
    * Navigiere zu Ergebnis
    * Validiere Ergebnis


--

# Thucydides (4) - Seitenstruktur


```java
public class GoogleSearchPage extends PageObject {
    private WebElement searchInput;    //add your WebElement to the Page
    
    public GoogleSearchPage (WebDriver driver){
        super(driver);//add constructor due to PageObject
    }
}
```

![img](assets/thucydides_demo_2.png) <!-- .element: class="fragment big-image no-border" -->

>NOTES:
* Support für ng-data Attribute

--

# Thucydides (5) - Seitenstruktur

* Suchergebnisse werden in Page-Klasse extrahiert

```java
public class GoogleResultsPage extends PageObject{
  ...
  @FindBy(id="search")
  private WebElement searchResults;
    
  public void findResult(String resultsTerm){
   element(searchResults).waitUntilVisible();
   waitFor(ExpectedConditions.presenceOfAllElementsLocatedBy(
                                    By.cssSelector("div#search li.g")));
   List<WebElement> resultList = searchResults.findElements(
   									By.cssSelector("li.g"));

   theFor:
    for(WebElement elementNow:resultList)
        if(elementNow.getText().contains(resultsTerm)){
            element(elementNow).waitUntilPresent();
            elementNow.findElement(By.cssSelector("h3.r a")).click();
            break theFor;
        }
  }
}
```

--

# Thucydides (6) - Interaktion über Steps

* Jegliche Benutzerinteraktion wird in Steps abgebildet
* Steps werden im Report aufgezeigt
* Parameter werden im Report angezeigt
* Methodennamen werden CamelCase gesplittet

```java
public class GoogleSteps extends ScenarioSteps{
    ...

    @Step
    public void inputSearchTerm(String search){
        googleSearchPage().inputTerm(search);
    }

    @Step
    public void clickOnSearch(){
        googleSearchPage(). clickOnSearch();
    }

    @StepGroup
    public void performSearch(String search){
        inputSearchTerm(search);
        clickOnSearch();
    }
} 
```

>NOTES: 
* Steps nutzen um Inhalte zu verifizieren
* Wichtig für Reporting
* Fehler von Assertions werden nur in Steps ausgewertet

--

# Thucydides (7) - Tests

* Anforderungen werden im Test abgeglichen
* BDD-like:

```java
@RunWith(ThucydidesRunner.class)
public class GoogleSearchTest {
    @Managed(uniqueSession = true)
    public WebDriver webdriver;

    @ManagedPages(defaultUrl = "https://www.google.com")
    public Pages pages;

    @Steps
    public GoogleSteps googleSteps;

    @Test
    public void googleSearchTest(){
        googleSteps.performSearch(“evozon”);
        googleSteps.findSearchResult(“on Twitter”);
        googleSteps.verifyUrl(“twitter.com/evozon”);
    }
}
```

* CSV-Dateien für Testdaten nutzbar 


>NOTES: 
* Pro Umgebung auch andere Testdaten nutzbar

--

# Thucydides (8) - Report Beispiel

![img](assets/thucydides_demo_6.png)

>NOTES: 
* Weitere Testdaten in Report einbindbar

--

# Thucydides (9) - Demo

<div style="position: fixed; width: 120%; height: 800%;" class=" big-mage no-border">
	<iframe style=" display: block;   width: 100%;    height: 70%;    border: none;" src="https://martinreinhardt-online.de/jenkins/job/thucydides_sample/" width="80%" height="100%">
</div>

>NOTES: 
* Angular-Beispiel mit GitHub Tags
* Anforderungen werden auf Tests verteilt
![img](assets/thucydides_demo_10.png)
* Anforderungen werden dann auch im Report auf den Tests verlinkt
![img](assets/thucydides_demo_11.png)
* Es können auch direkt Tickts (z.B. in JIRA an Tests verlinkt werden), siehe [Doku](http://thucydides.info/docs/thucydides-one-page/thucydides.html#_advanced_jira_integration)
* Können auch [Tags](http://thucydides.info/docs/thucydides-one-page/thucydides.html#_adding_tags_to_test_cases) genutzt werden.

---


# Fazit & Ausblick

* Feedback ist ein Muss
	* Teststufen kontinuierlich Feedback über aktuellen Qualitätsstand
    * Tools müssen das unterstützen
* Im Bereich von CD viele Tools im Bereich Testing & Automatisierung <!-- .element: class="fragment" -->
* Gefahr von "Over-Engineering" der Schritte in Pipeline<!-- .element: class="fragment" -->
* Bewegung im Tool-Bereich (Thoughtworks Go, Docker ...)<!-- .element: class="fragment" -->
* Jenkins Workflow<!-- .element: class="fragment" -->
	* Entwicklungs- und Workflow-Prozesse definieren und Abläufe über verschiedene Build-Projekte hinweg koordinieren
    * Groovy DSL zur Stepbeschreibung
    * besserer Koordination und mehr Einblick über die Continuous-Delivery-Kette
    * schlanke Definition von Jobs
    * Parellisierung von Schritten
    * Wiederholung von Schritten


>NOTES:
* Tools lösen nicht alle Probleme

--

# Beispiel für Jenkins Workflow

* Schritt werden in [Step Syntax](https://github.com/jenkinsci/workflow-plugin/blob/master/basic-steps/CORE-STEPS.md) beschrieben


```groovy
node { // grab a slave and allocate a workspace
  try {
    git url: 'https://github.com/hypery2k/angular_cordova_app.git'
    stage 'package'
    sh 'mvn clean package -DskipTests=true'
    stage 'unit-test'
    sh 'mvn test'
    stage 'archive'
    step $class: 'hudson.tasks.ArtifactArchiver', artifacts: '**/target/**/*SNAPSHOT.jar', fingerprint: true
    step $class: 'hudson.tasks.junit.JUnitResultArchiver', testResults: ' **/target/surefire-reports/TEST*.xml'
  } catch (e) {
    step $class: 'hudson.tasks.Mailer', recipients: 'dev@martinreinhardt-online.de'
    throw e
  }
}
```

* parallele Ausführung möglich
* Noch keine direkute UI für Konfiguration

--

# Demo

<div style="position: fixed; width: 120%; height: 800%;" class="big-image no-border">
	<iframe style=" display: block;   width: 100%;    height: 80%;    border: none;" src="https://martinreinhardt-online.de/jenkins/job/BMP_workflow-plugin_sample1/" width="80%" height="100%">
</div>

---

# Links

* [FeatureToggle Pattern](http://martinfowler.com/bliki/FeatureToggle.html)
* [GitHub-Projekt tThucydides](https://github.com/hypery2k/thucydides_sample/)
* [Beispiel Thucydides-Report](https://martinreinhardt-online.de/jenkins/job/thucydides_sample/thucydides/)
* Jenkins
	* [Docker image for workflow demo](https://github.com/jenkinsci/workflow-plugin/blob/master/demo/README.md)
    * [Workflow-Beispiel Job](https://martinreinhardt-online.de/jenkins/job/BMP_workflow-plugin_sample1/6/)

---

> There is no one-size-fits-all solution to the complex problem of 
implementing a deployment pipeline.”
   *Continuous Delivery*, J. Humble, D. Farley


---

# About me

* Martin Reinhardt (Holisticon AG)

![img](https://pbs.twimg.com/profile_images/488919098240139264/KRAs7ITF.png)<!-- .element: class="big-image no-border" style="width:40%;height:40%"-->

* [github.com/hypery2k](https://github.com/hypery2k)
* [twitter.com/mreinhardt](https://twitter.com/mreinhardt)