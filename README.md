# nb-projekat-MONGO
## Softver za online prodaju sportske opreme
Izradili:
1. ***Dimitrije Iskrenović 17654***
2. ***Nemanja Najdanović 17835***
3. ***Nina Miljković 17801***

### Koncept

Softver je zamišljen da olakša online prodaju i kupovinu sportske opreme i garderobe.
Postoje 2 vrste korisnika:
*  Administrator (Admin)
*  Kupac (Customer)

**Administrator** može da kreira, menja i briše kategorije odeće, kao i same artikle. Takođe, ima pregled dospelih narudžbina.

**Customer** ima mogućnost pretraživanja i pregleda odeće uz filtriranje po kategoriji, polu, kao i dodatnim tagovima. Korisnik takodje ima uvid u komentare
i ocene svih artikala, a može i sam da komentariše i ocenjuje artikle. Omogućeno je i naručivanje artikala.

### Tehnologija

Za backend smo korsitili Node.js, a za frontend Vue.js.


### Pokretnaje
Kako bi se softver pokrenuo, potrebno je:
1. U folderu *Backend* i *coworking-front* pokrenuti komandu `npm install` (po potrebi `npm install --force`).
2. U folderu *Backend* preko *CMD-a* pokrenuti `npm start` 
3. U folderu *coworking-front* prekom *CMD-a* upisati komandu `npm run serve`. 
4. Pristupiti web sajtu na adresi `http://localhost:8080`

### NAPOMENA: Sve atipične funkcije na backendu za koje smo smatrali da je potrebno dodatno objašnjenje imaju komentare iznad svoje deklaracije.


