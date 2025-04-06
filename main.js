import * as s from './libs/simple-statistics.js';
import jload from './libs/jload.js';
import addToPage from './libs/addToPage.js';

// Load the data
let data = await jload('salaries.json');

// Create some variables with filtered and mapped data
let women = data.filter(x => x.gender == 'female');
let men = data.filter(x => x.gender == 'male');
let ages = data.map(x => x.age);
let agesWomen = women.map(x => x.age);
let agesMen = men.map(x => x.age);
let salaries = data.map(x => x.monthlySalarySEK);
let salariesWomen = women.map(x => x.monthlySalarySEK);
let salariesMen = men.map(x => x.monthlySalarySEK);
let ageGroup18_32 = data.filter(x => x.age >= 18 && x.age <= 32);
let ageGroup33_50 = data.filter(x => x.age >= 33 && x.age <= 50);
let ageGroup51_64 = data.filter(x => x.age >= 51 && x.age <= 64);
let salariesAgeGroup18_32 = ageGroup18_32.map(x => x.monthlySalarySEK);
let salariesAgeGroup33_50 = ageGroup33_50.map(x => x.monthlySalarySEK);
let salariesAgeGroup51_64 = ageGroup51_64.map(x => x.monthlySalarySEK);
let salariesAgeGroupWomen18_32 = ageGroup18_32
  .filter(x => x.gender == 'female').map(x => x.monthlySalarySEK);
let salariesAgeGroupWomen33_50 = ageGroup33_50
  .filter(x => x.gender == 'female').map(x => x.monthlySalarySEK);
let salariesAgeGroupWomen51_64 = ageGroup51_64
  .filter(x => x.gender == 'female').map(x => x.monthlySalarySEK);
let salariesAgeGroupMen18_32 = ageGroup18_32
  .filter(x => x.gender == 'male').map(x => x.monthlySalarySEK);
let salariesAgeGroupMen33_50 = ageGroup33_50
  .filter(x => x.gender == 'male').map(x => x.monthlySalarySEK);
let salariesAgeGroupMen51_64 = ageGroup51_64
  .filter(x => x.gender == 'male').map(x => x.monthlySalarySEK);
let regionMo = data.filter(x => x.region == 'Malmö');
let regionGbg = data.filter(x => x.region == 'Göteborg');
let regionSthm = data.filter(x => x.region == 'Stockholm');
let salariesRegionMo = regionMo.map(x => x.monthlySalarySEK);
let salariesRegionGbg = regionGbg.map(x => x.monthlySalarySEK);
let salariesRegionSthm = regionSthm.map(x => x.monthlySalarySEK);
let salariesWomenRegionMo = regionMo
  .filter(x => x.gender == 'female').map(x => x.monthlySalarySEK);
let salariesWomenRegionGbg = regionGbg
  .filter(x => x.gender == 'female').map(x => x.monthlySalarySEK);
let salariesWomenRegionSthm = regionSthm
  .filter(x => x.gender == 'female').map(x => x.monthlySalarySEK);
let salariesMenRegionMo = regionMo
  .filter(x => x.gender == 'male').map(x => x.monthlySalarySEK);
let salariesMenRegionGbg = regionGbg
  .filter(x => x.gender == 'male').map(x => x.monthlySalarySEK);
let salariesMenRegionSthm = regionSthm
  .filter(x => x.gender == 'male').map(x => x.monthlySalarySEK);

// Perform and output statistic calculations
addToPage(`<pre>
  <b>Notera</b>: Samtliga löner är bruttomånadslöner i SEK, 
  samt <b>sd</b> används som förkortning för standardavvikelse.

  <b>Regioner</b>
  Den region de flesta bor i:         ${s.modeFast(data.map(x => x.region))}
  Antal från Malmö-regionen:          ${regionMo.length} 
  Antal från Göteborgs-regionen:      ${regionGbg.length} 
  Antal från Stockholms-regionen:     ${regionSthm.length} 

  <b>Ålder</b>
  Den yngsta individen:               ${s.min(ages)}
  Den äldsta individen:               ${s.max(ages)}
  
  Den yngsta kvinnan:                 ${s.min(agesWomen)}
  Den äldsta kvinnan:                 ${s.max(agesWomen)}
  
  Den yngsta mannen:                  ${s.min(agesMen)}
  Den äldsta mannen:                  ${s.max(agesMen)}

  Antal kvinnor:                      ${women.length}
  Antal män:                          ${men.length}

  Medianålder för samtliga:           ${s.median(ages)}
  Medelålder för samtliga:            ${s.mean(ages).toFixed(1)} (sd: ${s.sampleStandardDeviation(ages).toFixed(1)})

  Medianålder för kvinnor:            ${s.median(agesWomen)}
  Medelålder för kvinnor:             ${s.mean(agesWomen).toFixed(1)} (sd: ${s.sampleStandardDeviation(agesWomen).toFixed(1)})

  Medianålder för män:                ${s.median(agesMen)}
  Medelålder för män:                 ${s.mean(agesMen).toFixed(1)} (sd: ${s.sampleStandardDeviation(agesMen).toFixed(1)})

  <b>Löner och kön</b>
  Medianlön för samtliga:             ${s.median(salaries).toFixed(0)} 
  Medellön för samtliga:              ${s.mean(salaries).toFixed(0)} (sd: ${s.sampleStandardDeviation(salaries).toFixed(0)})

  Medianlön för kvinnor:              ${s.median(salariesWomen).toFixed(0)} 
  Medellön för kvinnor:               ${s.mean(salariesWomen).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesWomen).toFixed(0)})

  Medianlön för män:                  ${s.median(salariesMen).toFixed(0)} 
  Medellön för män:                   ${s.mean(salariesMen).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesMen).toFixed(0)})

  <b>Slutsater om kön</b>
  Vi kan konstatera att kön har betydelse för lönenivån,
  med en skillnad i medellön på 4 261 SEK och i medianlön på 4 943 SEK, till männens fördel.


  <b>Åldersgruppsindelning</b>
  Antal respondenter 18-32 år:        ${ageGroup18_32.length}
  Antal respondenter 33-50 år:        ${ageGroup33_50.length}
  Antal respondenter 51-64 år:        ${ageGroup51_64.length}

  <b>Löner och ålder, samtliga</b>
  Medianlön för samtliga 18-32 år:    ${s.median(salariesAgeGroup18_32).toFixed(0)}
  Medellön för samtliga  18-32 år:    ${s.mean(salariesAgeGroup18_32).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesAgeGroup18_32).toFixed(0)})

  Medianlön för samtliga 33-50 år:    ${s.median(salariesAgeGroup33_50).toFixed(0)}
  Medellön för samtliga  33-50 år:    ${s.mean(salariesAgeGroup33_50).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesAgeGroup33_50).toFixed(0)})

  Medianlön för samtliga 51-64 år:    ${s.median(salariesAgeGroup51_64).toFixed(0)}
  Medellön för samtliga  51-64 år:    ${s.mean(salariesAgeGroup51_64).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesAgeGroup51_64).toFixed(0)})
  
  <b>Löner och ålder, kvinnor</b>
  Medianlön för kvinnor 18-32 år:     ${s.median(salariesAgeGroupWomen18_32).toFixed(0)}
  Medellön för kvinnor 18-32 år:      ${s.mean(salariesAgeGroupWomen18_32).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesAgeGroupWomen18_32).toFixed(0)})

  Medianlön för kvinnor 33-50 år:     ${s.median(salariesAgeGroupWomen33_50).toFixed(0)}
  Medellön för kvinnor 33-50 år:      ${s.mean(salariesAgeGroupWomen33_50).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesAgeGroupWomen33_50).toFixed(0)})

  Medianlön för kvinnor 51-64 år:     ${s.median(salariesAgeGroupWomen51_64).toFixed(0)}
  Medellön för kvinnor 51-64 år:      ${s.mean(salariesAgeGroupWomen51_64).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesAgeGroupWomen51_64).toFixed(0)})
  
  <b>Löner och ålder, män</b>
  Medianlön för män 18-32 år:         ${s.median(salariesAgeGroupMen18_32).toFixed(0)}
  Medellön för män 18-32 år:          ${s.mean(salariesAgeGroupMen18_32).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesAgeGroupMen18_32).toFixed(0)})

  Medianlön för män 33-50 år:         ${s.median(salariesAgeGroupMen33_50).toFixed(0)}
  Medellön för män 33-50 år:          ${s.mean(salariesAgeGroupMen33_50).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesAgeGroupMen33_50).toFixed(0)})

  Medianlön för män 51-64 år:         ${s.median(salariesAgeGroupMen51_64).toFixed(0)}
  Medellön för män 51-64 år:          ${s.mean(salariesAgeGroupMen51_64).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesAgeGroupMen51_64).toFixed(0)})
  
  <b>Slutsater om ålder</b>
  Vi delade in respondenterna i 3 åldersgrupper (18-32 år: 322 st, 33-50 år: 386 st, 51-64 år: 292 st)
  och kan konstatera att lönerna ökar med ålder,med nästa dubbelt så höga medellön i gruppen 51-64 år (73 913 SEK), 
  jämfört med gruppen 18-32 år (37 983 SEK).

  Även lönespridningen ökar markant med ålder (från 12 993 SEK i standardavvikelse i den yngsta gruppen till 27 019 SEK i den äldsta).
  
  Vad gäller korrelationen lön och ålder ser vi en liknande utveckling oavsett kön, om vi tittar på endast kvinnor, respektive endast män,
  inom olika åldersgrupper kvarstår faktum att medellönerna är nästan dubbelt så höga i gruppen 51-64 år, jämfört med gruppen 18-32 år.


  <b>Löner och regioner, samtliga</b>
  Medianlön för samtliga, Malmö:      ${s.median(salariesRegionMo).toFixed(0)}
  Medellön för samtliga, Malmö:       ${s.mean(salariesRegionMo).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesRegionMo).toFixed(0)})

  Medianlön för samtliga, Göteborg:   ${s.median(salariesRegionGbg).toFixed(0)}
  Medellön för samtliga, Göteborg:    ${s.mean(salariesRegionGbg).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesRegionGbg).toFixed(0)})
 
  Medianlön för samtliga, Stockholm:  ${s.median(salariesRegionSthm).toFixed(0)}
  Medellön för samtliga, Stockholm:   ${s.mean(salariesRegionSthm).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesRegionSthm).toFixed(0)})
 
  <b>Löner och regioner, kvinnor</b>
  Medianlön för kvinnor, Malmö:       ${s.median(salariesWomenRegionMo).toFixed(0)}
  Medellön för kvinnor, Malmö:        ${s.mean(salariesWomenRegionMo).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesWomenRegionMo).toFixed(0)})

  Medianlön för kvinnor, Göteborg:    ${s.median(salariesWomenRegionGbg).toFixed(0)}
  Medellön för kvinnor, Göteborg:     ${s.mean(salariesWomenRegionGbg).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesWomenRegionGbg).toFixed(0)})
 
  Medianlön för kvinnor, Stockholm:   ${s.median(salariesWomenRegionSthm).toFixed(0)}
  Medellön för kvinnor, Stockholm:    ${s.mean(salariesWomenRegionSthm).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesWomenRegionSthm).toFixed(0)})
 
  <b>Löner och regioner, män</b>
  Medianlön för män, Malmö:           ${s.median(salariesMenRegionMo).toFixed(0)}
  Medellön för män, Malmö:            ${s.mean(salariesMenRegionMo).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesMenRegionMo).toFixed(0)})

  Medianlön för män, Göteborg:        ${s.median(salariesMenRegionGbg).toFixed(0)}
  Medellön för män, Göteborg:         ${s.mean(salariesMenRegionGbg).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesMenRegionGbg).toFixed(0)})
 
  Medianlön för män, Stockholm:       ${s.median(salariesMenRegionSthm).toFixed(0)}
  Medellön för män, Stockholm:        ${s.mean(salariesMenRegionSthm).toFixed(0)} (sd: ${s.sampleStandardDeviation(salariesMenRegionSthm).toFixed(0)})
 
  <b>Slutsatser om regioner</b>
  Vad gäller de olika regionerna (Malmö-, Göteborg- och Stockholmsregionen) inverkan på lönerna är skillnaderna mellan Malmö och Göteborg relativt små,
  med bara aningen högre löner i Göteborg.

  Det är däremot en tydlig skillnad mellan Stockholm och övriga regioner. Medellönen för Stockholmsregionen är 4 870 SEK högre än för Malmöregionen.
  Standardavvikelserna är likartade (vilket innebär att extremvärden inte verkar snedvrida jämförelsen).


  <b>Slutsatser</b>
  Sammanfattningsvis kan sägas att ålder verkar ha störst betydelse för lön, och att kön och vilken storstadsregion verkar ha ungefär lika stor betydelse.

  Det vore därmed ganska troligt att två jämngamla IT-utvecklare, en manlig verksam i Malmö och en kvinnlig verksam i Stockholm har liknande lön.

  Den IT-utvecklare som tjänar sämst är en ung kvinna i Malmö-regionen och den som tjänar bäst är en äldre man i Stockholms-regionen.
  
</pre>`)

