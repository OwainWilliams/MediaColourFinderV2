@ECHO OFF
:: This file can now be deleted!
:: It was used when setting up the package solution (using https://github.com/LottePitcher/opinionated-package-starter)

:: set up git
git init
git branch -M main
git remote add origin https://github.com/OwainWilliams/MediaColourPickerV2.git

:: ensure latest Umbraco templates used
dotnet new install Umbraco.Templates --force

:: use the umbraco-extension dotnet template to add the package project
cd src
dotnet new umbraco-extension -n "MediaColourPickerV2" --site-domain "https://localhost:44304" --include-example

:: replace package .csproj with the one from the template so has nuget info
cd MediaColourPickerV2
del MediaColourPickerV2.csproj
ren MediaColourPickerV2_nuget.csproj MediaColourPickerV2.csproj

:: add project to solution
cd..
dotnet sln add "MediaColourPickerV2"

:: add reference to project from test site
dotnet add "MediaColourPickerV2.TestSite/MediaColourPickerV2.TestSite.csproj" reference "MediaColourPickerV2/MediaColourPickerV2.csproj"
