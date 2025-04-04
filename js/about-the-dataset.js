// Imports from libs
import addMdToPage from './libs/addMdToPage.js';
import tableFromData from './libs/tableFromData.js';

// Imports ouur group sums
import { rawData } from './load-data-and-make-groups.js';

addMdToPage(`
  ## Om datasetet
  Det här datasetet utgår från ett [verkligt dataset](https://www.statsuncovered.com/courses/rs-930/ttests), om än med något oklart ursprung.
  
  Men vi har modifierat det - hittat på nya värden för en variabel - **general_health**, så att den ska bli mera normalfördelad inom olika grupper.

  Anledningen är att T-test bara är tillförlitliga på normalfördelad data och syftet med detta exempel är att visa hur **Shapiro-Wilks-test** och **tvåsidiga T-test** fungerar!

  Det finns många fler variabler i datasetet än de enda två vi har tittat på - **smoking_status** och **general_health**.

  [Du kan ladda ner den modifierade versionen vi använder här](smokinghealth.csv).
`);

tableFromData({ data: rawData, fixedHeader: true });