# BUDGET JIRA

## GUIDE

- [ ] not taken
	- This one is not taken by anyone yet, please take it
- [ ] (HENRIK) taken by HENRIK
	- This one is obviously taken by HENRIK, so coordinate with him if you want to work on it.
- [x] (HENRIK) completed by HENRIK
	- Don't do this one. It's already done by HENRIK.

## TASKS
### PAYMENT DETAILS
***Ansvarlig: TOBIAS***

- [ ] Let user enter payment details
  - [ ] Choose between MobilePay, gift card and invoice
  - [ ] For gift card
    - user must enter amount, validate as number
    - user must enter gift card number, validate as number
    - if amount is larger than total amount, neither MobilePay nor invoice is available
  - [ ] For MobilePay, user must enter a phone number, validate as 8 digits
  - [ ] Invoice is only available, if billing address has company VAT number

### USER SUBMIT, ACCEPT TERMS, ETC.
***Ansvarlige: JAKOB & HENRIK***

- [ ] Let user submit their order
  - [x] Let user accept terms & conditions
  - [x] Let user accept to receive marketing emails
  - [ ] Let user enter an optional order comment
  - [x] Either (1) create an end-point on requestbin.com, or (2) create end-point on your own server (if you also follow the backend course)
      - Submit all relevant information to the end-point
  - [ ] Include loading indicator and error reporting

### FETCH DATA
***Ansvarlig: FREDERIK***

- [ ] Fetch data instead of using local JSON copies
  -  Product data: https://raw.githubusercontent.com/larsthorup/checkout-data/main/product-v2.json
  -  DK zip codes: https://api.dataforsyningen.dk/postnumre
  -  Include loading indicators and error reporting
 
### STYLING, BABE
***Ansvarlig: NICKLAS***


- [ ] Styling
  - Layout
  - Navigation
  - Images
  - Responsiveness
  - Color
  - Typography
  - Accessibility
  - Use CSS, and not e.g. Bootstrap or Tailwind.

### FEEDBACK IMPL from ASS2 - 
***Ansvarlig: MIKKEL***


- [ ] Test dækning:
	- Gode tests, som både dækker UI men også unit tests af funktioner.
	- Del gerne jeg tests op i flere filer, så er det lidt nemmre at finde ud af hvad de tester hver især. Jeg så gerne at der også var tests på telefonnummer og postnummer ved validering af DK postnumre
	- Test af hele formen med Vitest mangler.
- [ ] Fejlhåndtering: validering:
    - Man kan klikke continue, selvom man ikke har skrevet noget i formen.
- [ ] Jeres order summary viser forkert pris hvis man har valgt 1 item med rabat. e.g Kartofler x 3 = 5, i order summary står der 6. Hvis det er menigen er det kunne der godt have stået hvordan total bliver regnet ud.  Måske subtotal og total.
- [ ] Det er ikke så klart hvilken fejl man får hvis man skriver tekt i telefonnummer, zipcode.
- [ ] Der er ingen måde at komme tilbage til kurven når man er gået videre.
- [ ] Overvej at lave jeres above300 i BasketSummary til en boolean og det samme med percentRebateOver300
- [ ] Overvej om I skal bruge disabled i inputfelter som man ikke må ændre i. phoneCode. Det er ikke så tydeligt at man ikke kan skrive i det.
- [ ] Jeres BasketItem imageUrl property bør være: imageUrl?: string.
- [ ] Overvej at lave jeres contentFlow til et ENUM med states e.g. BASKET | SUMMARY | PAYMENT, så er det nemmere at se hvilken state det i er i. Så inital state ikke er 0 men BASKET.
- [ ] Der er nogle små improvements, rundt omkring. Men lad os tage dem sammen næste gang.
- [ ] Husk at brug media queries i jeres css.
