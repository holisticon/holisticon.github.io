#!/bin/bash

currentDir=$( pwd )
websiteUrl='http://getbootstrap.com'

galen test basic.test -DwebsiteUrl=${websiteUrl} --htmlreport ../../reports/bootstrap
open  ../../reports/bootstrap/report.html
