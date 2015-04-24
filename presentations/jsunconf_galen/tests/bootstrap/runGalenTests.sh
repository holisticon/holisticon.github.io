#!/bin/bash

currentDir=$( pwd )
websiteUrl='http://getbootstrap.com'

galen test homePage.test -DwebsiteUrl=${websiteUrl} --htmlreport ../../reports/bootstrap/home
galen test cssPage.test -DwebsiteUrl=${websiteUrl}'/css' --htmlreport ../../reports/bootstrap/css
galen test jsPage.test -DwebsiteUrl=${websiteUrl}'/javascript' --htmlreport ../../reports/bootstrap/javascript