# Thucydides

Oberflächentests mit Stil

<br />
Martin Reinhardt 
<br />
![img](assets/tweet_logo.png) <!-- .element: class="inline no-border" style="max-height:32px; vertical-align:center" --> [@mreinhardt](https://twitter.com/mreinhardt) / [@holisticon](https://twitter.com/holisticon)<br />

<!-- .slide: class="title" data-background="assets/brand/grass_footer.png" data-background-repeat="repeat-x" data-background-position="bottom center" data-background-size="inherit" -->

---

# Thucydides

* Tool für ATDD (acceptance test driven development)
* Macht Oberflächen-Tests lesbarer, wartbarer und wiederwendbar
* Nutzt Selenium als technische Basis
* Kann als Java und JBehave-Variante genutzt werden
* Nutzt Page-Object-Pattern
    * Page als Model der Webseite mit allen Elemente. 
    * Steps als Gruppierung der möglichen Interaktionsmöglickeiten, z.B. Klicken
    * Test ist eine Kollektion von Tests die Benutzereingaben reflektieren und das Ergebnis verifizieren
* Stellt Reporting für Tracking & Fehlersuche zur Verfügung

---

# Thucydides 

* Projekt erstellen
```markdown
$ mvn archetype:generate
....
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 
        net.thucydides:thucydides-simple-archetype
Choose archetype:
1: remote -> net.thucydides:thucydides-simple-archetype 
        (Thucydides automated acceptance ...)
Choose a number or apply filter (format: [groupId:]artifactId, case sensitive contains): 1
...
...
29: 0.9.256
Choose a number: 29:
...
Define value for property 'groupId': : thucydides.demo
Define value for property 'artifactId': : webtest
Define value for property 'version':  1.0-SNAPSHOT: :
Define value for property 'package':  thucydides.demo: : demo
Confirm properties configuration:
groupId: thucydides.demo
artifactId: webtest
version: 1.0-SNAPSHOT
package: jar
 Y: :
...
[INFO] ----------------------------------------------------------------------------
[INFO] Using following parameters for creating project from Archetype: thucydides-simple-archetype:0.9.256
[INFO] ----------------------------------------------------------------------------
[INFO] Parameter: groupId, Value: thucydides.demo
[INFO] Parameter: artifactId, Value: webtest
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] Parameter: package, Value: jar
[INFO] Parameter: packageInPathFormat, Value: jar
[INFO] Parameter: package, Value: jar
[INFO] Parameter: version, Value: 1.0-SNAPSHOT
[INFO] Parameter: groupId, Value: thucydides.demo
[INFO] Parameter: artifactId, Value: webtest
[INFO] project created from Archetype in dir: /Users/mreinhardt/Documents/Programmierung/repositories/git/thucydides_sample/webtest
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2:49.453s
[INFO] Finished at: Wed Sep 03 23:01:40 CEST 2014
[INFO] Final Memory: 12M/245M
[INFO] ------------------------------------------------------------------------
Martins-MacBook-Pro:thucydides_sample mreinhardt$
```

---

# Thucydides 

* Projektstruktur

![img](assets/thucydides_demo_1.png) <!-- .element: class="big-image no-border" -->

* 

---

# Thucydides - Beispiel

* Anforderung: Als Nutzer möchte zum Ergebnis meiner Suche navigieren
* Testfall:    
    * Starte Google-Suche
    * Tippe Suchbegriff ein
    * Suche Ergebnis in Trefferliste
    * Navigiere zu Ergebnis
    * Validiere Ergebnis

---

# Thucydides - Seitenstruktur


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


```java
public class GoogleSearchPage extends PageObject {

    @FindBy(id = "gbqfq")
    private WebElement searchInput;

    @FindBy(id = "gbqfbw")
    private WebElement searchButton;

    public GoogleSearchPage(WebDriver driver) {
        super(driver);
    }

    public void inputTerm(String searchTerm) {
        element(searchInput).waitUntilVisible();
        searchInput.sendKeys(searchTerm);
    }

    public void clickOnSearch(String searchTerm) {
        element(searchButton).waitUntilVisible();
        searchButton.click();
    }
}
```

--

* Neue Seite anlegen für die Ergebnisse


![img](assets/thucydides_demo_3.png) <!-- .element: class="big-image no-border" -->

--

* Seitenstruktur in Page-Klasse hinterlegen

![img](assets/thucydides_demo_4.png) <!-- .element: class="big-image no-border" -->

--

* Link für Suchergebnis

![img](assets/thucydides_demo_5.png) <!-- .element: class="big-image no-border" -->

--

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
   List<WebElement> resultList = searchResults.findElements(By.cssSelector("li.g"));

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

---

# Thucydides - Interaktion über Steps

* Jegliche Benutzerinteraktion wird in Steps abgebildet
* Steps werden im Report aufgezeigt
* Parameter werden im Report angezeigt
* Methodennamen werden CamelCase gesplittet

```java
public class GoogleSteps extends ScenarioSteps{

    public GoogleSteps(Pages pages){
        super(pages);
    }

    public GoogleSearchPage googleSearchPage(){
        return getPages.currentPageAt(GoogleSearchPage.class);
    }

    public GoogleResultsPage googleResultsPage(){
        return getPages.currentPageAt(GoogleResultsPage.class);
    }
}   
```

--

* Steps hinzufügen

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

--

* Steps nutzen um Inhalte zu verifizieren
* Wichtig für Reporting

```java
public class GoogleSteps extends ScenarioSteps{
    ...

    @Step
    public void findSearchResult(String search){
        googleResultsPage().findResult(search);
    }

    @Step
    public void verifyUrl(String url){
        assertThat("Url pattern does not match! ", 
            getDriver().getCurrentUrl().contains(url));
    }
} 
```
>NOTES:
* Fehler von Assertions werden nur in Steps ausgewertet

--

# Step Report Beispiel

![img](assets/thucydides_demo_6.png)

---

# Tests anlegen

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

---

# Thucydides -  Konfiguraion

* Tests ausführen


    mvn integration-test

* Einzelnen Test ausführen


    mvn integration-test –Dtest=[TEST_NAME]

* Browser für Test setzen


    mvn integration-test –Dwebdriver.driver=chrome      

>NOTES:
* Einige Browser benötigen weitere Konfiguration, z.B. ChromeDriver

--

# properties-Datei

```
# more details on http://thucydides.info/docs/thucydides-one-page/thucydides.html#_running_thucydides_tests_from_the_command_line
thucydides.browser.width = 1280
thucydides.browser.height = 1024
webdriver.timeouts.implicitlywait = 500
thucydides.timeout=2000
thucycides.step.delay = 300
webdriver.driver = firefox
thucydides.store.html.source = true
thucydides.reports.show.step.detail=true
thucydides.report.show.manual.tests=false
thucydides.report.show.releases=false
thucydides.verbose.steps = true
thucydides.take.screenshots = FOR_EACH_ACTION
```

---

# Thucydides - Reporting

* Wenn Report erstellt wurde, wird er unter target/site abgelegt
* Kann auch in Maven-Site eingebunden werden

![img](assets/thucydides_demo_7.png)

--

* Testdetails direkt in Tabelle auch sichtbar

![img](assets/thucydides_demo_8.png)

* [Beispiel-Report](https://martinreinhardt-online.de/jenkins/job/thucydides_sample/thucydides/)

---

# Thucydides - Testdaten

* Testdaten über CSV einlesen


| keyword       | definition    |
| ------------- |:-------------:|
| banana        | "An elongated curved fruit, which grows in bunches, and has a sweet creamy flesh and a smooth yellow skin." | 
| orange        | "An evergreen tree of the genus Citrus such as Citrus aurantium." | 
| blueberry     | "An evergreen tree of the genus Citrus such as Citrus aurantium." | 

--

* Spalten in CSV müssen zu Properties passen

```java
@Story(Wikipedia.Search.SearchByMultipleKeywords.class)
@RunWith(ThucydidesParameterizedRunner.class)
@UseTestDataFrom("searchData.csv")
public class CsvSearchByKeywordStoryTest {

    String keyword;
    String definition;

    @Qualifier
    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getDefinition() {
        return definition;
    }
```

* Qualify legt fest welche Spalte als Id genutzt werden soll

--

* Testdaten werden in Schritten berücksichtigt

![img](assets/thucydides_demo_9.png)


---

# Thucydides - BDD

* Anforderungen werden auf Tests verteilt

![img](assets/thucydides_demo_10.png)

--

* Anforderungen werden dann auch im Report auf den Tests verlinkt

![img](assets/thucydides_demo_11.png)

* Es können auch direkt Tickts (z.B. in JIRA an Tests verlinkt werden), siehe [Doku](http://thucydides.info/docs/thucydides-one-page/thucydides.html#_advanced_jira_integration)
* Können auch [Tags](http://thucydides.info/docs/thucydides-one-page/thucydides.html#_adding_tags_to_test_cases) genutzt werden.



---

# Ausblick

* Gradle-Support 
* JBehave, siehe [Wiki](https://github.com/thucydides-webtests/thucydides/wiki)
* Links
    * [GitHub-Projekt](https://github.com/holisticon/thucydides_sample/)
    * [Jenkins-Beispiel](https://server.holisticon.de/jenkins/buildStatus/icon?job=thucydides_sample)

