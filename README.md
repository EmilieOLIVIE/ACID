# Projet ACID

Projet réalisé avec la méthodologie SCRUM en cours de maîtrise des technologies de l'interopérabilité (méthodes agiles, standard FHIR) à l'[école d'ingénieurs ISIS](https://isis.univ-jfc.fr/) (promotion 2023).

***Product Owner*** : Joffrey Viémon-Desplanque.

***Scrum Master*** : Nelson Rogers.

***Dev Team*** : Mohamed Al Nossirat, Marie Cagnasso, Émilie Olivié.

## Description

L'application, codée en [TypeScript](https://www.typescriptlang.org/) et à l'aide du *framework* [React](https://reactjs.org/), manipule des ressources respectant la norme [FHIR](https://hl7.org/fhir/) et permet à un praticien ([*Practitioner*](https://hl7.org/fhir/practitioner.html)) de gérer les plans de soins (*CarePlan*) de patients ([*Patient*](https://hl7.org/fhir/practitioner.html)), à partir de réponses ([*QuestionnaireResponse*](https://hl7.org/fhir/questionnaireresponse.html)) à un questionnaire ([*Questionnaire*](https://hl7.org/fhir/questionnaire.html)) déterminé préalablement. Le praticien peut rendre un diagnostic ([*DiagnosticReport*](https://hl7.org/fhir/diagnosticreport.html)) et prescrire une ordonnance ([*MedicationRequest*](https://hl7.org/fhir/medicationrequest.html)) de médicaments, lesquels suivent la terminologie [SNOMED Clinical Terms](https://www.snomed.org/).

Additionnellement, le praticien peut accéder à ses informations et à celles l'organisation ([*Organization*](https://hl7.org/fhir/organization.html)) à laquelle toutes les ressources qu'il crée sont rattachées.

## Installation

```npm install``` Pour installer toutes les dépendances

```npm run dev``` Pour démarrer l'application

## Ressources

+ ID Organization : 6322d84f76c6f7001a59728a
+ ID Practitioner : 6321f0ead83022001917f14e
+ ID Questionnaire : 6322c934256fb300187f6e7c
+ ID Patient: 007