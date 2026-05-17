// Mapa de traducción de productos (Opción B — traducciones en código).
// Clave = nombre tal como llega al componente. Para la categoría "Pizzas"
// el nombre ya viene con prefijo "Pizza " (lib/productDisplay.js), por eso
// esas entradas se indexan como "Pizza X".
//
// Regla de nombres: términos propios/no traducibles (Naan, Biryani, Kebab,
// Dürüm, Pizza, Calzone, Pasta, Burger, Hot Dog, nombres de cócteles, etc.)
// se mantienen igual en alfabeto latino; ru/ar usan transliteración.
// Idiomas: es, en, cat, fr, de, nl, ru, ar, pl, it.

export const productsMap = {
  "1/2 Pollo": {
    name: { es: "1/2 Pollo", en: "1/2 Chicken", cat: "1/2 Pollastre", fr: "1/2 Poulet", de: "1/2 Hähnchen", nl: "1/2 Kip", ru: "1/2 курицы", ar: "نصف دجاجة", pl: "1/2 kurczaka", it: "1/2 Pollo" },
    description: { es: "Medio pollo asado con patatas y ensalada.", en: "Half roast chicken with fries and salad.", cat: "Mig pollastre rostit amb patates i amanida.", fr: "Demi-poulet rôti avec frites et salade.", de: "Halbes Brathähnchen mit Pommes und Salat.", nl: "Halve gebraden kip met friet en salade.", ru: "Половина жареной курицы с картофелем фри и салатом.", ar: "نصف دجاجة مشوية مع بطاطس مقلية وسلطة.", pl: "Pół pieczonego kurczaka z frytkami i sałatką.", it: "Mezzo pollo arrosto con patatine e insalata." }
  },
  "1/4 Pollo": {
    name: { es: "1/4 Pollo", en: "1/4 Chicken", cat: "1/4 Pollastre", fr: "1/4 Poulet", de: "1/4 Hähnchen", nl: "1/4 Kip", ru: "1/4 курицы", ar: "ربع دجاجة", pl: "1/4 kurczaka", it: "1/4 Pollo" },
    description: { es: "Cuarto de pollo asado con patatas y ensalada.", en: "Quarter roast chicken with fries and salad.", cat: "Quart de pollastre rostit amb patates i amanida.", fr: "Quart de poulet rôti avec frites et salade.", de: "Viertel Brathähnchen mit Pommes und Salat.", nl: "Kwart gebraden kip met friet en salade.", ru: "Четверть жареной курицы с картофелем фри и салатом.", ar: "ربع دجاجة مشوية مع بطاطس مقلية وسلطة.", pl: "Ćwiartka pieczonego kurczaka z frytkami i sałatką.", it: "Un quarto di pollo arrosto con patatine e insalata." }
  },
  "2 Paellas + 1 Litro Sangría": {
    name: { es: "2 Paellas + 1 Litro Sangría", en: "2 Paellas + 1 Litre Sangria", cat: "2 Paelles + 1 Litre Sangria", fr: "2 Paellas + 1 Litre Sangria", de: "2 Paellas + 1 Liter Sangria", nl: "2 Paella's + 1 Liter Sangria", ru: "2 паэльи + 1 литр сангрии", ar: "2 بايلا + 1 لتر سانغريا", pl: "2 paelle + 1 litr sangrii", it: "2 Paelle + 1 Litro Sangria" },
    description: { es: "Dos paellas más una jarra de sangría.", en: "Two paellas plus a jug of sangria.", cat: "Dues paelles més una gerra de sangria.", fr: "Deux paellas et un pichet de sangria.", de: "Zwei Paellas plus ein Krug Sangria.", nl: "Twee paella's plus een kan sangria.", ru: "Две паэльи и кувшин сангрии.", ar: "بايلتان مع إبريق سانغريا.", pl: "Dwie paelle plus dzbanek sangrii.", it: "Due paelle più una caraffa di sangria." }
  },
  "Pizza 4 Quesos": {
    name: { es: "Pizza 4 Quesos", en: "Pizza 4 Cheeses", cat: "Pizza 4 Formatges", fr: "Pizza 4 Fromages", de: "Pizza 4 Käse", nl: "Pizza 4 Kazen", ru: "Пицца 4 сыра", ar: "بيتزا 4 أجبان", pl: "Pizza 4 Sery", it: "Pizza 4 Formaggi" },
    description: { es: "Salsa de tomate y cuatro quesos especiales.", en: "Tomato sauce and four special cheeses.", cat: "Salsa de tomàquet i quatre formatges especials.", fr: "Sauce tomate et quatre fromages spéciaux.", de: "Tomatensauce und vier besondere Käsesorten.", nl: "Tomatensaus en vier speciale kazen.", ru: "Томатный соус и четыре особых сыра.", ar: "صلصة طماطم وأربعة أجبان مميزة.", pl: "Sos pomidorowy i cztery specjalne sery.", it: "Salsa di pomodoro e quattro formaggi speciali." }
  },
  "Agua / Water": {
    name: { es: "Agua", en: "Water", cat: "Aigua", fr: "Eau", de: "Wasser", nl: "Water", ru: "Вода", ar: "ماء", pl: "Woda", it: "Acqua" },
    description: { es: "Agua mineral natural o con gas.", en: "Still or sparkling mineral water.", cat: "Aigua mineral natural o amb gas.", fr: "Eau minérale plate ou gazeuse.", de: "Mineralwasser still oder mit Kohlensäure.", nl: "Plat of bruisend mineraalwater.", ru: "Минеральная вода без газа или газированная.", ar: "مياه معدنية عادية أو غازية.", pl: "Woda mineralna niegazowana lub gazowana.", it: "Acqua minerale naturale o frizzante." }
  },
  "Alitas de Pollo": {
    name: { es: "Alitas de Pollo", en: "Chicken Wings", cat: "Aletes de Pollastre", fr: "Ailes de Poulet", de: "Hähnchenflügel", nl: "Kippenvleugels", ru: "Куриные крылышки", ar: "أجنحة دجاج", pl: "Skrzydełka z kurczaka", it: "Alette di Pollo" },
    description: { es: "Seis jugosas alitas de pollo aderezadas y fritas.", en: "Six juicy seasoned and fried chicken wings.", cat: "Sis aletes de pollastre sucoses, amanides i fregides.", fr: "Six ailes de poulet juteuses assaisonnées et frites.", de: "Sechs saftige gewürzte und frittierte Hähnchenflügel.", nl: "Zes sappige gekruide en gefrituurde kippenvleugels.", ru: "Шесть сочных приправленных и обжаренных крылышек.", ar: "ست أجنحة دجاج عصيرية متبلة ومقلية.", pl: "Sześć soczystych, przyprawionych i smażonych skrzydełek.", it: "Sei alette di pollo succose, condite e fritte." }
  },
  "Almejas": {
    name: { es: "Almejas", en: "Clams", cat: "Cloïsses", fr: "Palourdes", de: "Venusmuscheln", nl: "Venusschelpen", ru: "Моллюски", ar: "محار", pl: "Małże", it: "Vongole" },
    description: { es: "Cazuela de almejas en salsa marinera.", en: "Clams casserole in marinara sauce.", cat: "Cassola de cloïsses en salsa marinera.", fr: "Cassolette de palourdes en sauce marinière.", de: "Venusmuscheln in Marinara-Sauce.", nl: "Venusschelpen in marinarasaus.", ru: "Моллюски в соусе маринара.", ar: "محار في صلصة المارينارا.", pl: "Małże w sosie marinara.", it: "Tegame di vongole in salsa marinara." }
  },
  "Atún": {
    name: { es: "Atún", en: "Tuna Salad", cat: "Tonyina", fr: "Salade de Thon", de: "Thunfischsalat", nl: "Tonijnsalade", ru: "Салат с тунцом", ar: "سلطة تونة", pl: "Sałatka z tuńczykiem", it: "Insalata di Tonno" },
    description: { es: "Lechuga, tomate, atún desmigado, cebollas y olivas.", en: "Lettuce, tomato, flaked tuna, onions and olives.", cat: "Enciam, tomàquet, tonyina esmicolada, cebes i olives.", fr: "Laitue, tomate, thon émietté, oignons et olives.", de: "Salat, Tomate, zerpflückter Thunfisch, Zwiebeln und Oliven.", nl: "Sla, tomaat, tonijnvlokken, uien en olijven.", ru: "Салат, помидор, тунец, лук и оливки.", ar: "خس وطماطم وتونة مفتتة وبصل وزيتون.", pl: "Sałata, pomidor, rozdrobniony tuńczyk, cebula i oliwki.", it: "Lattuga, pomodoro, tonno sfaldato, cipolle e olive." }
  },
  "Pizza Amigos 2": {
    name: { es: "Pizza Amigos 2", en: "Pizza Amigos 2", cat: "Pizza Amigos 2", fr: "Pizza Amigos 2", de: "Pizza Amigos 2", nl: "Pizza Amigos 2", ru: "Пицца Amigos 2", ar: "بيتزا Amigos 2", pl: "Pizza Amigos 2", it: "Pizza Amigos 2" },
    description: { es: "Tomate, queso, pollo, vegetales, atún y gambas.", en: "Tomato, cheese, chicken, vegetables, tuna and prawns.", cat: "Tomàquet, formatge, pollastre, verdures, tonyina i gambes.", fr: "Tomate, fromage, poulet, légumes, thon et crevettes.", de: "Tomate, Käse, Hähnchen, Gemüse, Thunfisch und Garnelen.", nl: "Tomaat, kaas, kip, groenten, tonijn en garnalen.", ru: "Томат, сыр, курица, овощи, тунец и креветки.", ar: "طماطم وجبن ودجاج وخضار وتونة وجمبري.", pl: "Pomidor, ser, kurczak, warzywa, tuńczyk i krewetki.", it: "Pomodoro, formaggio, pollo, verdure, tonno e gamberi." }
  },
  "Pizza Atún": {
    name: { es: "Pizza Atún", en: "Tuna Pizza", cat: "Pizza Tonyina", fr: "Pizza Thon", de: "Thunfisch-Pizza", nl: "Tonijnpizza", ru: "Пицца с тунцом", ar: "بيتزا تونة", pl: "Pizza z tuńczykiem", it: "Pizza Tonno" },
    description: { es: "Salsa de tomate, queso, cebollas y atún.", en: "Tomato sauce, cheese, onions and tuna.", cat: "Salsa de tomàquet, formatge, cebes i tonyina.", fr: "Sauce tomate, fromage, oignons et thon.", de: "Tomatensauce, Käse, Zwiebeln und Thunfisch.", nl: "Tomatensaus, kaas, uien en tonijn.", ru: "Томатный соус, сыр, лук и тунец.", ar: "صلصة طماطم وجبن وبصل وتونة.", pl: "Sos pomidorowy, ser, cebula i tuńczyk.", it: "Salsa di pomodoro, formaggio, cipolle e tonno." }
  },
  "Pizza Bacon": {
    name: { es: "Pizza Bacon", en: "Bacon Pizza", cat: "Pizza Bacon", fr: "Pizza Bacon", de: "Bacon-Pizza", nl: "Baconpizza", ru: "Пицца с беконом", ar: "بيتزا بيكون", pl: "Pizza z bekonem", it: "Pizza Bacon" },
    description: { es: "Salsa de tomate, queso mozzarella y bacon.", en: "Tomato sauce, mozzarella cheese and bacon.", cat: "Salsa de tomàquet, formatge mozzarella i bacon.", fr: "Sauce tomate, mozzarella et bacon.", de: "Tomatensauce, Mozzarella und Bacon.", nl: "Tomatensaus, mozzarella en bacon.", ru: "Томатный соус, моцарелла и бекон.", ar: "صلصة طماطم وجبن موزاريلا وبيكون.", pl: "Sos pomidorowy, mozzarella i bekon.", it: "Salsa di pomodoro, mozzarella e bacon." }
  },
  "Pizza Barbacoa": {
    name: { es: "Pizza Barbacoa", en: "Barbecue Pizza", cat: "Pizza Barbacoa", fr: "Pizza Barbecue", de: "Barbecue-Pizza", nl: "Barbecuepizza", ru: "Пицца барбекю", ar: "بيتزا باربكيو", pl: "Pizza Barbecue", it: "Pizza Barbecue" },
    description: { es: "Salsa barbacoa, queso, pollo y olivas.", en: "Barbecue sauce, cheese, chicken and olives.", cat: "Salsa barbacoa, formatge, pollastre i olives.", fr: "Sauce barbecue, fromage, poulet et olives.", de: "Barbecue-Sauce, Käse, Hähnchen und Oliven.", nl: "Barbecuesaus, kaas, kip en olijven.", ru: "Соус барбекю, сыр, курица и оливки.", ar: "صلصة باربكيو وجبن ودجاج وزيتون.", pl: "Sos barbecue, ser, kurczak i oliwki.", it: "Salsa barbecue, formaggio, pollo e olive." }
  },
  "Bikini": {
    name: { es: "Bikini", en: "Ham & Cheese Toastie", cat: "Bikini", fr: "Croque Jambon-Fromage", de: "Schinken-Käse-Toast", nl: "Tosti Ham-Kaas", ru: "Сэндвич бикини", ar: "بيكيني (توست جبن ولحم)", pl: "Tost z szynką i serem", it: "Toast Prosciutto e Formaggio" },
    description: { es: "Sándwich mixto de jamón dulce y queso fundido.", en: "Toasted sandwich with cooked ham and melted cheese.", cat: "Sandvitx mixt de pernil dolç i formatge fos.", fr: "Croque-monsieur au jambon et fromage fondu.", de: "Getoastetes Sandwich mit Kochschinken und geschmolzenem Käse.", nl: "Tosti met gekookte ham en gesmolten kaas.", ru: "Горячий сэндвич с варёной ветчиной и плавленым сыром.", ar: "ساندويتش محمص بلحم مطبوخ وجبن ذائب.", pl: "Tostowana kanapka z szynką i roztopionym serem.", it: "Toast con prosciutto cotto e formaggio fuso." }
  },
  "Bistec con huevo": {
    name: { es: "Bistec con huevo", en: "Steak with Egg", cat: "Bistec amb ou", fr: "Steak à l'œuf", de: "Steak mit Ei", nl: "Biefstuk met ei", ru: "Бифштекс с яйцом", ar: "ستيك مع بيضة", pl: "Stek z jajkiem", it: "Bistecca con uovo" },
    description: { es: "Filete de ternera, huevo frito y patatas.", en: "Beef steak, fried egg and fries.", cat: "Filet de vedella, ou ferrat i patates.", fr: "Steak de bœuf, œuf au plat et frites.", de: "Rindersteak, Spiegelei und Pommes.", nl: "Biefstuk, gebakken ei en friet.", ru: "Говяжий стейк, жареное яйцо и картофель фри.", ar: "ستيك لحم بقري وبيضة مقلية وبطاطس مقلية.", pl: "Stek wołowy, jajko sadzone i frytki.", it: "Bistecca di manzo, uovo fritto e patatine." }
  },
  "Bocadillo Bacon con queso": {
    name: { es: "Bocadillo Bacon con queso", en: "Bacon & Cheese Sandwich", cat: "Entrepà Bacon amb formatge", fr: "Sandwich Bacon-Fromage", de: "Sandwich Bacon mit Käse", nl: "Broodje Bacon met kaas", ru: "Сэндвич с беконом и сыром", ar: "ساندويتش بيكون وجبن", pl: "Kanapka z bekonem i serem", it: "Panino Bacon e formaggio" },
    description: { es: "Bacon crujiente y queso fundido.", en: "Crispy bacon and melted cheese.", cat: "Bacon cruixent i formatge fos.", fr: "Bacon croustillant et fromage fondu.", de: "Knuspriger Bacon und geschmolzener Käse.", nl: "Krokante bacon en gesmolten kaas.", ru: "Хрустящий бекон и плавленый сыр.", ar: "بيكون مقرمش وجبن ذائب.", pl: "Chrupiący bekon i roztopiony ser.", it: "Bacon croccante e formaggio fuso." }
  },
  "Bocadillo Butifarra": {
    name: { es: "Bocadillo Butifarra", en: "Butifarra Sausage Sandwich", cat: "Entrepà Botifarra", fr: "Sandwich Butifarra", de: "Butifarra-Sandwich", nl: "Broodje Butifarra", ru: "Сэндвич с колбаской бутифарра", ar: "ساندويتش نقانق بوتيفارا", pl: "Kanapka z kiełbasą butifarra", it: "Panino Butifarra" },
    description: { es: "Salchicha fresca a la plancha dentro del pan.", en: "Grilled fresh sausage in bread.", cat: "Salsitxa fresca a la planxa dins del pa.", fr: "Saucisse fraîche grillée dans le pain.", de: "Gegrillte frische Wurst im Brot.", nl: "Gegrilde verse worst in brood.", ru: "Жареная свежая колбаска в хлебе.", ar: "نقانق طازجة مشوية داخل الخبز.", pl: "Świeża kiełbasa z grilla w pieczywie.", it: "Salsiccia fresca alla piastra nel pane." }
  },
  "Bocadillo Calamares": {
    name: { es: "Bocadillo Calamares", en: "Calamari Sandwich", cat: "Entrepà Calamars", fr: "Sandwich Calamars", de: "Calamari-Sandwich", nl: "Broodje Inktvisringen", ru: "Сэндвич с кальмарами", ar: "ساندويتش كاليماري", pl: "Kanapka z kalmarami", it: "Panino Calamari" },
    description: { es: "Anillas de calamar a la romana.", en: "Battered fried calamari rings.", cat: "Anelles de calamar a la romana.", fr: "Anneaux de calamar frits à la romaine.", de: "Panierte frittierte Calamari-Ringe.", nl: "Gefrituurde inktvisringen in beslag.", ru: "Кольца кальмара в кляре.", ar: "حلقات كاليماري مقلية بالبقسماط.", pl: "Krążki kalmara w cieście.", it: "Anelli di calamaro fritti alla romana." }
  },
  "Bocadillo Caliente Bacon": {
    name: { es: "Bocadillo Caliente Bacon", en: "Hot Bacon Sandwich", cat: "Entrepà Calent Bacon", fr: "Sandwich Chaud au Bacon", de: "Warmes Bacon-Sandwich", nl: "Warm Broodje Bacon", ru: "Горячий сэндвич с беконом", ar: "ساندويتش بيكون ساخن", pl: "Ciepła kanapka z bekonem", it: "Panino Caldo Bacon" },
    description: { es: "Tiras de bacon ahumado a la plancha.", en: "Grilled smoked bacon strips.", cat: "Tires de bacon fumat a la planxa.", fr: "Lamelles de bacon fumé grillé.", de: "Gegrillte Streifen geräucherten Bacons.", nl: "Gegrilde gerookte baconreepjes.", ru: "Жареные полоски копчёного бекона.", ar: "شرائح بيكون مدخن مشوي.", pl: "Grillowane paski wędzonego bekonu.", it: "Strisce di bacon affumicato alla piastra." }
  },
  "Bocadillo Caliente Lomo": {
    name: { es: "Bocadillo Caliente Lomo", en: "Hot Pork Loin Sandwich", cat: "Entrepà Calent Llom", fr: "Sandwich Chaud à l'Échine de Porc", de: "Warmes Schweinelende-Sandwich", nl: "Warm Broodje Varkenshaas", ru: "Горячий сэндвич со свиной корейкой", ar: "ساندويتش خاصرة خنزير ساخن", pl: "Ciepła kanapka ze schabem", it: "Panino Caldo Lombo" },
    description: { es: "Filetes de lomo de cerdo a la plancha.", en: "Grilled pork loin fillets.", cat: "Filets de llom de porc a la planxa.", fr: "Filets d'échine de porc grillés.", de: "Gegrillte Schweinelende-Filets.", nl: "Gegrilde varkenshaasfilets.", ru: "Жареные филе свиной корейки.", ar: "شرائح خاصرة خنزير مشوية.", pl: "Grillowane filety ze schabu.", it: "Filetti di lombo di maiale alla piastra." }
  },
  "Bocadillo Caliente Pollo": {
    name: { es: "Bocadillo Caliente Pollo", en: "Hot Chicken Sandwich", cat: "Entrepà Calent Pollastre", fr: "Sandwich Chaud au Poulet", de: "Warmes Hähnchen-Sandwich", nl: "Warm Broodje Kip", ru: "Горячий сэндвич с курицей", ar: "ساندويتش دجاج ساخن", pl: "Ciepła kanapka z kurczakiem", it: "Panino Caldo Pollo" },
    description: { es: "Pechuga de pollo a la plancha.", en: "Grilled chicken breast.", cat: "Pit de pollastre a la planxa.", fr: "Blanc de poulet grillé.", de: "Gegrillte Hähnchenbrust.", nl: "Gegrilde kipfilet.", ru: "Жареная куриная грудка.", ar: "صدر دجاج مشوي.", pl: "Grillowana pierś z kurczaka.", it: "Petto di pollo alla piastra." }
  },
  "Bocadillo de Atún": {
    name: { es: "Bocadillo de Atún", en: "Tuna Sandwich", cat: "Entrepà de Tonyina", fr: "Sandwich au Thon", de: "Thunfisch-Sandwich", nl: "Broodje Tonijn", ru: "Сэндвич с тунцом", ar: "ساندويتش تونة", pl: "Kanapka z tuńczykiem", it: "Panino al Tonno" },
    description: { es: "Bocadillo frío de atún desmigado y complementos.", en: "Cold sandwich with flaked tuna and toppings.", cat: "Entrepà fred de tonyina esmicolada i complements.", fr: "Sandwich froid au thon émietté et garnitures.", de: "Kaltes Sandwich mit zerpflücktem Thunfisch und Beilagen.", nl: "Koud broodje met tonijnvlokken en garnituur.", ru: "Холодный сэндвич с тунцом и добавками.", ar: "ساندويتش بارد بتونة مفتتة وإضافات.", pl: "Zimna kanapka z rozdrobnionym tuńczykiem i dodatkami.", it: "Panino freddo con tonno sfaldato e contorni." }
  },
  "Bocadillo de Fuet": {
    name: { es: "Bocadillo de Fuet", en: "Fuet Sausage Sandwich", cat: "Entrepà de Fuet", fr: "Sandwich au Fuet", de: "Fuet-Sandwich", nl: "Broodje Fuet", ru: "Сэндвич с фуэт", ar: "ساندويتش فويت", pl: "Kanapka z fuetem", it: "Panino al Fuet" },
    description: { es: "Clásico bocadillo de rodajas de fuet catalán.", en: "Classic sandwich with slices of Catalan fuet.", cat: "Clàssic entrepà de rodanxes de fuet català.", fr: "Sandwich classique de tranches de fuet catalan.", de: "Klassisches Sandwich mit Scheiben katalanischen Fuets.", nl: "Klassiek broodje met plakjes Catalaanse fuet.", ru: "Классический сэндвич с ломтиками каталонского фуэт.", ar: "ساندويتش كلاسيكي بشرائح فويت الكتالوني.", pl: "Klasyczna kanapka z plastrami katalońskiego fuetu.", it: "Classico panino con fette di fuet catalano." }
  },
  "Bocadillo de Queso": {
    name: { es: "Bocadillo de Queso", en: "Cheese Sandwich", cat: "Entrepà de Formatge", fr: "Sandwich au Fromage", de: "Käse-Sandwich", nl: "Broodje Kaas", ru: "Сэндвич с сыром", ar: "ساندويتش جبن", pl: "Kanapka z serem", it: "Panino al Formaggio" },
    description: { es: "Bocadillo frío de lonchas de queso tierno o curado.", en: "Cold sandwich with slices of soft or cured cheese.", cat: "Entrepà fred de llesques de formatge tendre o curat.", fr: "Sandwich froid de tranches de fromage tendre ou affiné.", de: "Kaltes Sandwich mit Scheiben von Weich- oder Hartkäse.", nl: "Koud broodje met plakjes jonge of belegen kaas.", ru: "Холодный сэндвич с ломтиками мягкого или выдержанного сыра.", ar: "ساندويتش بارد بشرائح جبن طري أو معتق.", pl: "Zimna kanapka z plastrami sera świeżego lub dojrzewającego.", it: "Panino freddo con fette di formaggio fresco o stagionato." }
  },
  "Bocadillo Jamón Ibérico": {
    name: { es: "Bocadillo Jamón Ibérico", en: "Iberian Ham Sandwich", cat: "Entrepà Pernil Ibèric", fr: "Sandwich Jambon Ibérique", de: "Iberico-Schinken-Sandwich", nl: "Broodje Iberische Ham", ru: "Сэндвич с иберийским хамоном", ar: "ساندويتش خامون إيبيري", pl: "Kanapka z szynką iberyjską", it: "Panino Prosciutto Iberico" },
    description: { es: "Bocadillo de finas lonchas de jamón ibérico.", en: "Sandwich with thin slices of Iberian ham.", cat: "Entrepà de fines llesques de pernil ibèric.", fr: "Sandwich de fines tranches de jambon ibérique.", de: "Sandwich mit dünnen Scheiben Iberico-Schinken.", nl: "Broodje met dunne plakjes Iberische ham.", ru: "Сэндвич с тонкими ломтиками иберийского хамона.", ar: "ساندويتش بشرائح رفيعة من الخامون الإيبيري.", pl: "Kanapka z cienkimi plastrami szynki iberyjskiej.", it: "Panino con fette sottili di prosciutto iberico." }
  },
  "Bocadillo Jamón York": {
    name: { es: "Bocadillo Jamón York", en: "Cooked Ham Sandwich", cat: "Entrepà Pernil Dolç", fr: "Sandwich Jambon Blanc", de: "Kochschinken-Sandwich", nl: "Broodje Gekookte Ham", ru: "Сэндвич с варёной ветчиной", ar: "ساندويتش لحم مطبوخ", pl: "Kanapka z szynką gotowaną", it: "Panino Prosciutto Cotto" },
    description: { es: "Bocadillo frío de jamón dulce cocido.", en: "Cold sandwich with cooked ham.", cat: "Entrepà fred de pernil dolç cuit.", fr: "Sandwich froid au jambon blanc cuit.", de: "Kaltes Sandwich mit Kochschinken.", nl: "Koud broodje met gekookte ham.", ru: "Холодный сэндвич с варёной ветчиной.", ar: "ساندويتش بارد بلحم مطبوخ.", pl: "Zimna kanapka z szynką gotowaną.", it: "Panino freddo con prosciutto cotto." }
  },
  "Bocadillo Lomo con queso": {
    name: { es: "Bocadillo Lomo con queso", en: "Pork Loin & Cheese Sandwich", cat: "Entrepà Llom amb formatge", fr: "Sandwich Échine de Porc-Fromage", de: "Schweinelende-Käse-Sandwich", nl: "Broodje Varkenshaas met kaas", ru: "Сэндвич со свиной корейкой и сыром", ar: "ساندويتش خاصرة خنزير وجبن", pl: "Kanapka ze schabem i serem", it: "Panino Lombo e formaggio" },
    description: { es: "Lomo a la plancha coronado con queso derretido.", en: "Grilled pork loin topped with melted cheese.", cat: "Llom a la planxa coronat amb formatge fos.", fr: "Échine de porc grillée nappée de fromage fondu.", de: "Gegrillte Schweinelende mit geschmolzenem Käse.", nl: "Gegrilde varkenshaas met gesmolten kaas.", ru: "Жареная свиная корейка под плавленым сыром.", ar: "خاصرة خنزير مشوية مغطاة بجبن ذائب.", pl: "Grillowany schab z roztopionym serem.", it: "Lombo alla piastra ricoperto di formaggio fuso." }
  },
  "Bocadillo Pollo con queso": {
    name: { es: "Bocadillo Pollo con queso", en: "Chicken & Cheese Sandwich", cat: "Entrepà Pollastre amb formatge", fr: "Sandwich Poulet-Fromage", de: "Hähnchen-Käse-Sandwich", nl: "Broodje Kip met kaas", ru: "Сэндвич с курицей и сыром", ar: "ساندويتش دجاج وجبن", pl: "Kanapka z kurczakiem i serem", it: "Panino Pollo e formaggio" },
    description: { es: "Pollo a la plancha y queso fundido.", en: "Grilled chicken and melted cheese.", cat: "Pollastre a la planxa i formatge fos.", fr: "Poulet grillé et fromage fondu.", de: "Gegrilltes Hähnchen und geschmolzener Käse.", nl: "Gegrilde kip en gesmolten kaas.", ru: "Жареная курица и плавленый сыр.", ar: "دجاج مشوي وجبن ذائب.", pl: "Grillowany kurczak i roztopiony ser.", it: "Pollo alla piastra e formaggio fuso." }
  },
  "Bocadillo Tortilla francesa": {
    name: { es: "Bocadillo Tortilla francesa", en: "Plain Omelette Sandwich", cat: "Entrepà Truita francesa", fr: "Sandwich Omelette Nature", de: "Omelett-Sandwich", nl: "Broodje Omelet", ru: "Сэндвич с омлетом", ar: "ساندويتش عجة", pl: "Kanapka z omletem", it: "Panino Frittata" },
    description: { es: "Tortilla recién cuajada de dos huevos.", en: "Freshly made two-egg omelette.", cat: "Truita acabada de fer de dos ous.", fr: "Omelette fraîche de deux œufs.", de: "Frisch zubereitetes Omelett aus zwei Eiern.", nl: "Vers gemaakte omelet van twee eieren.", ru: "Свежеприготовленный омлет из двух яиц.", ar: "عجة طازجة من بيضتين.", pl: "Świeżo przygotowany omlet z dwóch jajek.", it: "Frittata appena fatta con due uova." }
  },
  "Bocadillo Vegetal": {
    name: { es: "Bocadillo Vegetal", en: "Veggie Sandwich", cat: "Entrepà Vegetal", fr: "Sandwich Végétarien", de: "Gemüse-Sandwich", nl: "Broodje Vega", ru: "Овощной сэндвич", ar: "ساندويتش خضار", pl: "Kanapka wegetariańska", it: "Panino Vegetale" },
    description: { es: "Tomate, lechuga, huevo duro, olivas y atún.", en: "Tomato, lettuce, hard-boiled egg, olives and tuna.", cat: "Tomàquet, enciam, ou dur, olives i tonyina.", fr: "Tomate, laitue, œuf dur, olives et thon.", de: "Tomate, Salat, hartes Ei, Oliven und Thunfisch.", nl: "Tomaat, sla, hardgekookt ei, olijven en tonijn.", ru: "Помидор, салат, варёное яйцо, оливки и тунец.", ar: "طماطم وخس وبيض مسلوق وزيتون وتونة.", pl: "Pomidor, sałata, jajko na twardo, oliwki i tuńczyk.", it: "Pomodoro, lattuga, uovo sodo, olive e tonno." }
  },
  "Boloñesa": {
    name: { es: "Boloñesa", en: "Bolognese", cat: "Bolonyesa", fr: "Bolognaise", de: "Bolognese", nl: "Bolognese", ru: "Болоньезе", ar: "بولونيز", pl: "Bolońskie", it: "Bolognese" },
    description: { es: "Espaguetis con salsa boloñesa, carne picada y tomate.", en: "Spaghetti with bolognese sauce, minced meat and tomato.", cat: "Espaguetis amb salsa bolonyesa, carn picada i tomàquet.", fr: "Spaghettis sauce bolognaise, viande hachée et tomate.", de: "Spaghetti mit Bolognese-Sauce, Hackfleisch und Tomate.", nl: "Spaghetti met bolognesesaus, gehakt en tomaat.", ru: "Спагетти с соусом болоньезе, фаршем и томатом.", ar: "سباغيتي بصلصة البولونيز واللحم المفروم والطماطم.", pl: "Spaghetti z sosem bolońskim, mielonym mięsem i pomidorem.", it: "Spaghetti al ragù alla bolognese con carne macinata e pomodoro." }
  },
  "Burger Pescado": {
    name: { es: "Burger Pescado", en: "Fish Burger", cat: "Burger de Peix", fr: "Burger de Poisson", de: "Fisch-Burger", nl: "Visburger", ru: "Бургер с рыбой", ar: "برغر سمك", pl: "Burger rybny", it: "Burger di Pesce" },
    description: { es: "Pescado blanco rebozado, lechuga y salsas suaves.", en: "Battered white fish, lettuce and mild sauces.", cat: "Peix blanc arrebossat, enciam i salses suaus.", fr: "Poisson blanc pané, laitue et sauces douces.", de: "Panierter Weißfisch, Salat und milde Saucen.", nl: "Gepaneerde witvis, sla en milde sauzen.", ru: "Белая рыба в кляре, салат и мягкие соусы.", ar: "سمك أبيض مقلي بالبقسماط وخس وصلصات خفيفة.", pl: "Panierowana biała ryba, sałata i łagodne sosy.", it: "Pesce bianco impanato, lattuga e salse delicate." }
  },
  "Burger Pollo": {
    name: { es: "Burger Pollo", en: "Chicken Burger", cat: "Burger de Pollastre", fr: "Burger de Poulet", de: "Hähnchen-Burger", nl: "Kipburger", ru: "Бургер с курицей", ar: "برغر دجاج", pl: "Burger z kurczakiem", it: "Burger di Pollo" },
    description: { es: "Filete de pollo, lechuga, tomate y mayonesa.", en: "Chicken fillet, lettuce, tomato and mayonnaise.", cat: "Filet de pollastre, enciam, tomàquet i maionesa.", fr: "Filet de poulet, laitue, tomate et mayonnaise.", de: "Hähnchenfilet, Salat, Tomate und Mayonnaise.", nl: "Kipfilet, sla, tomaat en mayonaise.", ru: "Куриное филе, салат, помидор и майонез.", ar: "شريحة دجاج وخس وطماطم ومايونيز.", pl: "Filet z kurczaka, sałata, pomidor i majonez.", it: "Filetto di pollo, lattuga, pomodoro e maionese." }
  },
  "Burger Ternera": {
    name: { es: "Burger Ternera", en: "Beef Burger", cat: "Burger de Vedella", fr: "Burger de Bœuf", de: "Rind-Burger", nl: "Runderburger", ru: "Бургер с говядиной", ar: "برغر لحم بقري", pl: "Burger wołowy", it: "Burger di Manzo" },
    description: { es: "Carne de ternera, lechuga, tomate y salsas.", en: "Beef patty, lettuce, tomato and sauces.", cat: "Carn de vedella, enciam, tomàquet i salses.", fr: "Steak de bœuf, laitue, tomate et sauces.", de: "Rindfleisch, Salat, Tomate und Saucen.", nl: "Rundvlees, sla, tomaat en sauzen.", ru: "Говяжья котлета, салат, помидор и соусы.", ar: "لحم بقري وخس وطماطم وصلصات.", pl: "Wołowina, sałata, pomidor i sosy.", it: "Carne di manzo, lattuga, pomodoro e salse." }
  },
  "Burger Vegetal": {
    name: { es: "Burger Vegetal", en: "Veggie Burger", cat: "Burger Vegetal", fr: "Burger Végétarien", de: "Gemüse-Burger", nl: "Vegaburger", ru: "Вегетарианский бургер", ar: "برغر نباتي", pl: "Burger wegetariański", it: "Burger Vegetale" },
    description: { es: "Hamburguesa vegetal con vegetales frescos y salsas.", en: "Veggie patty with fresh vegetables and sauces.", cat: "Hamburguesa vegetal amb verdures fresques i salses.", fr: "Galette végétale avec légumes frais et sauces.", de: "Gemüse-Patty mit frischem Gemüse und Saucen.", nl: "Vegaburger met verse groenten en sauzen.", ru: "Овощная котлета со свежими овощами и соусами.", ar: "قرص نباتي مع خضار طازجة وصلصات.", pl: "Kotlet warzywny ze świeżymi warzywami i sosami.", it: "Burger vegetale con verdure fresche e salse." }
  },
  "Burgers con patatas": {
    name: { es: "Burgers con patatas", en: "Burgers with Fries", cat: "Burgers amb patates", fr: "Burgers avec frites", de: "Burger mit Pommes", nl: "Burgers met friet", ru: "Бургеры с картофелем фри", ar: "برغر مع بطاطس", pl: "Burgery z frytkami", it: "Burger con patatine" },
    description: { es: "Dos hamburguesas sin pan con patatas y ensalada.", en: "Two bunless burgers with fries and salad.", cat: "Dues hamburgueses sense pa amb patates i amanida.", fr: "Deux burgers sans pain avec frites et salade.", de: "Zwei Burger ohne Brötchen mit Pommes und Salat.", nl: "Twee burgers zonder broodje met friet en salade.", ru: "Две котлеты без булки с картофелем фри и салатом.", ar: "قرصا برغر بدون خبز مع بطاطس وسلطة.", pl: "Dwa burgery bez bułki z frytkami i sałatką.", it: "Due hamburger senza pane con patatine e insalata." }
  },
  "Butter Chicken": {
    name: { es: "Butter Chicken", en: "Butter Chicken", cat: "Butter Chicken", fr: "Butter Chicken", de: "Butter Chicken", nl: "Butter Chicken", ru: "Баттер чикен", ar: "بتر تشيكن", pl: "Butter Chicken", it: "Butter Chicken" },
    description: { es: "Pollo en salsa cremosa de mantequilla y tomate.", en: "Chicken in a creamy butter and tomato sauce.", cat: "Pollastre en salsa cremosa de mantega i tomàquet.", fr: "Poulet dans une sauce crémeuse au beurre et à la tomate.", de: "Hähnchen in cremiger Butter-Tomaten-Sauce.", nl: "Kip in een romige boter-tomatensaus.", ru: "Курица в кремовом соусе из масла и томата.", ar: "دجاج في صلصة كريمية بالزبدة والطماطم.", pl: "Kurczak w kremowym sosie maślano-pomidorowym.", it: "Pollo in salsa cremosa di burro e pomodoro." }
  },
  "Café con leche": {
    name: { es: "Café con leche", en: "Coffee with Milk", cat: "Cafè amb llet", fr: "Café au Lait", de: "Milchkaffee", nl: "Koffie met Melk", ru: "Кофе с молоком", ar: "قهوة بالحليب", pl: "Kawa z mlekiem", it: "Caffè Latte" },
    description: { es: "Espresso con leche.", en: "Espresso with milk.", cat: "Espresso amb llet.", fr: "Espresso avec du lait.", de: "Espresso mit Milch.", nl: "Espresso met melk.", ru: "Эспрессо с молоком.", ar: "إسبريسو بالحليب.", pl: "Espresso z mlekiem.", it: "Espresso con latte." }
  },
  "Café Solo": {
    name: { es: "Café Solo", en: "Espresso", cat: "Cafè Sol", fr: "Café Espresso", de: "Espresso", nl: "Espresso", ru: "Эспрессо", ar: "قهوة سادة", pl: "Espresso", it: "Caffè Espresso" },
    description: { es: "Clásico café espresso.", en: "Classic espresso coffee.", cat: "Clàssic cafè espresso.", fr: "Café espresso classique.", de: "Klassischer Espresso.", nl: "Klassieke espresso.", ru: "Классический эспрессо.", ar: "قهوة إسبريسو كلاسيكية.", pl: "Klasyczne espresso.", it: "Classico caffè espresso." }
  },
  "Caipiroska": {
    name: { es: "Caipiroska", en: "Caipiroska", cat: "Caipiroska", fr: "Caipiroska", de: "Caipiroska", nl: "Caipiroska", ru: "Кайпироска", ar: "كايبيروسكا", pl: "Caipiroska", it: "Caipiroska" },
    description: { es: "Cóctel refrescante con vodka y lima.", en: "Refreshing cocktail with vodka and lime.", cat: "Còctel refrescant amb vodka i llima.", fr: "Cocktail rafraîchissant à la vodka et au citron vert.", de: "Erfrischender Cocktail mit Wodka und Limette.", nl: "Verfrissende cocktail met wodka en limoen.", ru: "Освежающий коктейль с водкой и лаймом.", ar: "كوكتيل منعش بالفودكا والليمون الأخضر.", pl: "Orzeźwiający koktajl z wódką i limonką.", it: "Cocktail rinfrescante con vodka e lime." }
  },
  "Calamares": {
    name: { es: "Calamares", en: "Calamari", cat: "Calamars", fr: "Calamars", de: "Calamari", nl: "Inktvisringen", ru: "Кальмары", ar: "كاليماري", pl: "Kalmary", it: "Calamari" },
    description: { es: "Ocho anillas de calamar a la romana.", en: "Eight battered fried calamari rings.", cat: "Vuit anelles de calamar a la romana.", fr: "Huit anneaux de calamar frits à la romaine.", de: "Acht panierte frittierte Calamari-Ringe.", nl: "Acht gefrituurde inktvisringen in beslag.", ru: "Восемь колец кальмара в кляре.", ar: "ثماني حلقات كاليماري مقلية بالبقسماط.", pl: "Osiem krążków kalmara w cieście.", it: "Otto anelli di calamaro fritti alla romana." }
  },
  "Calamares en Plato": {
    name: { es: "Calamares en Plato", en: "Calamari Plate", cat: "Calamars en Plat", fr: "Assiette de Calamars", de: "Calamari-Teller", nl: "Bord Inktvisringen", ru: "Тарелка кальмаров", ar: "طبق كاليماري", pl: "Talerz kalmarów", it: "Piatto di Calamari" },
    description: { es: "Ración de anillas a la romana con guarnición.", en: "Portion of battered calamari rings with a side.", cat: "Ració d'anelles a la romana amb guarnició.", fr: "Portion d'anneaux frits à la romaine avec garniture.", de: "Portion panierter Calamari-Ringe mit Beilage.", nl: "Portie gefrituurde inktvisringen met bijgerecht.", ru: "Порция колец в кляре с гарниром.", ar: "حصة من حلقات الكاليماري مع طبق جانبي.", pl: "Porcja krążków kalmara w cieście z dodatkiem.", it: "Porzione di anelli alla romana con contorno." }
  },
  "Pizza Calzone": {
    name: { es: "Pizza Calzone", en: "Pizza Calzone", cat: "Pizza Calzone", fr: "Pizza Calzone", de: "Pizza Calzone", nl: "Pizza Calzone", ru: "Пицца кальцоне", ar: "بيتزا كالزوني", pl: "Pizza Calzone", it: "Pizza Calzone" },
    description: { es: "Pizza cerrada con tomate, queso, cebolla y carne.", en: "Folded pizza with tomato, cheese, onion and meat.", cat: "Pizza tancada amb tomàquet, formatge, ceba i carn.", fr: "Pizza fermée avec tomate, fromage, oignon et viande.", de: "Gefaltete Pizza mit Tomate, Käse, Zwiebel und Fleisch.", nl: "Dichtgevouwen pizza met tomaat, kaas, ui en vlees.", ru: "Закрытая пицца с томатом, сыром, луком и мясом.", ar: "بيتزا مطوية بالطماطم والجبن والبصل واللحم.", pl: "Zamknięta pizza z pomidorem, serem, cebulą i mięsem.", it: "Pizza chiusa con pomodoro, formaggio, cipolla e carne." }
  },
  "Caña pequeña": {
    name: { es: "Caña pequeña", en: "Small Draft Beer", cat: "Canya petita", fr: "Petite Bière Pression", de: "Kleines Bier vom Fass", nl: "Klein Tapbier", ru: "Маленькое разливное пиво", ar: "بيرة صغيرة من البرميل", pl: "Małe piwo z beczki", it: "Birra Piccola alla Spina" },
    description: { es: "Vaso pequeño de cerveza de barril.", en: "Small glass of draft beer.", cat: "Got petit de cervesa de barril.", fr: "Petit verre de bière pression.", de: "Kleines Glas Fassbier.", nl: "Klein glas tapbier.", ru: "Маленький бокал разливного пива.", ar: "كوب صغير من البيرة من البرميل.", pl: "Mała szklanka piwa z beczki.", it: "Bicchiere piccolo di birra alla spina." }
  },
  "Canelones Boloñesa": {
    name: { es: "Canelones Boloñesa", en: "Cannelloni Bolognese", cat: "Canelons Bolonyesa", fr: "Cannelloni Bolognaise", de: "Cannelloni Bolognese", nl: "Cannelloni Bolognese", ru: "Каннеллони болоньезе", ar: "كانيلوني بولونيز", pl: "Cannelloni bolońskie", it: "Cannelloni alla Bolognese" },
    description: { es: "Canelones rellenos de carne con bechamel y queso gratinado.", en: "Meat-filled cannelloni with béchamel and gratinated cheese.", cat: "Canelons farcits de carn amb beixamel i formatge gratinat.", fr: "Cannelloni farcis à la viande, béchamel et fromage gratiné.", de: "Mit Fleisch gefüllte Cannelloni mit Béchamel und überbackenem Käse.", nl: "Met vlees gevulde cannelloni met bechamel en gegratineerde kaas.", ru: "Каннеллони с мясом, бешамелем и запечённым сыром.", ar: "كانيلوني محشوة باللحم مع البشاميل والجبن المحمر.", pl: "Cannelloni z mięsem, beszamelem i zapieczonym serem.", it: "Cannelloni ripieni di carne con besciamella e formaggio gratinato." }
  },
  "Pizza Caprese": {
    name: { es: "Pizza Caprese", en: "Pizza Caprese", cat: "Pizza Caprese", fr: "Pizza Caprese", de: "Pizza Caprese", nl: "Pizza Caprese", ru: "Пицца капрезе", ar: "بيتزا كابريزي", pl: "Pizza Caprese", it: "Pizza Caprese" },
    description: { es: "Tomate natural, queso fresco y orégano.", en: "Fresh tomato, fresh cheese and oregano.", cat: "Tomàquet natural, formatge fresc i orenga.", fr: "Tomate fraîche, fromage frais et origan.", de: "Frische Tomate, frischer Käse und Oregano.", nl: "Verse tomaat, verse kaas en oregano.", ru: "Свежий помидор, свежий сыр и орегано.", ar: "طماطم طازجة وجبن طازج وأوريغانو.", pl: "Świeży pomidor, świeży ser i oregano.", it: "Pomodoro fresco, formaggio fresco e origano." }
  },
  "Carbonara": {
    name: { es: "Carbonara", en: "Carbonara", cat: "Carbonara", fr: "Carbonara", de: "Carbonara", nl: "Carbonara", ru: "Карбонара", ar: "كاربونارا", pl: "Carbonara", it: "Carbonara" },
    description: { es: "Espaguetis con salsa carbonara cremosa, nata, bacon y queso.", en: "Spaghetti with creamy carbonara sauce, cream, bacon and cheese.", cat: "Espaguetis amb salsa carbonara cremosa, nata, bacon i formatge.", fr: "Spaghettis sauce carbonara crémeuse, crème, bacon et fromage.", de: "Spaghetti mit cremiger Carbonara-Sauce, Sahne, Bacon und Käse.", nl: "Spaghetti met romige carbonarasaus, room, bacon en kaas.", ru: "Спагетти со сливочным соусом карбонара, беконом и сыром.", ar: "سباغيتي بصلصة كاربونارا كريمية وكريمة وبيكون وجبن.", pl: "Spaghetti z kremowym sosem carbonara, śmietaną, bekonem i serem.", it: "Spaghetti alla carbonara cremosi con panna, bacon e formaggio." }
  },
  "Pizza Carbonara": {
    name: { es: "Pizza Carbonara", en: "Pizza Carbonara", cat: "Pizza Carbonara", fr: "Pizza Carbonara", de: "Pizza Carbonara", nl: "Pizza Carbonara", ru: "Пицца карбонара", ar: "بيتزا كاربونارا", pl: "Pizza Carbonara", it: "Pizza Carbonara" },
    description: { es: "Base de nata, bacon, jamón cocido y cebolla.", en: "Cream base, bacon, cooked ham and onion.", cat: "Base de nata, bacon, pernil cuit i ceba.", fr: "Base crème, bacon, jambon cuit et oignon.", de: "Sahnebasis, Bacon, Kochschinken und Zwiebel.", nl: "Roombasis, bacon, gekookte ham en ui.", ru: "Сливочная основа, бекон, варёная ветчина и лук.", ar: "قاعدة كريمة وبيكون ولحم مطبوخ وبصل.", pl: "Baza śmietanowa, bekon, szynka gotowana i cebula.", it: "Base di panna, bacon, prosciutto cotto e cipolla." }
  },
  "Cerveza Mediana": {
    name: { es: "Cerveza Mediana", en: "Medium Beer", cat: "Cervesa Mitjana", fr: "Bière Moyenne", de: "Mittleres Bier", nl: "Middelgroot Bier", ru: "Среднее пиво", ar: "بيرة وسط", pl: "Średnie piwo", it: "Birra Media" },
    description: { es: "Botella de tamaño mediano (tercio).", en: "Medium-size bottle (third of a litre).", cat: "Ampolla de mida mitjana (terç).", fr: "Bouteille de taille moyenne (un tiers de litre).", de: "Mittelgroße Flasche (ein Drittel Liter).", nl: "Middelgrote fles (derde liter).", ru: "Бутылка среднего размера (треть литра).", ar: "زجاجة متوسطة الحجم (ثلث لتر).", pl: "Butelka średniej wielkości (jedna trzecia litra).", it: "Bottiglia di media dimensione (un terzo)." }
  },
  "Cheese Naan": {
    name: { es: "Cheese Naan", en: "Cheese Naan", cat: "Cheese Naan", fr: "Cheese Naan", de: "Cheese Naan", nl: "Cheese Naan", ru: "Чиз наан", ar: "تشيز نان", pl: "Cheese Naan", it: "Cheese Naan" },
    description: { es: "Pan plano indio relleno de queso fundido.", en: "Indian flatbread filled with melted cheese.", cat: "Pa pla indi farcit de formatge fos.", fr: "Pain plat indien fourré au fromage fondu.", de: "Indisches Fladenbrot mit geschmolzenem Käse gefüllt.", nl: "Indiaas platbrood gevuld met gesmolten kaas.", ru: "Индийская лепёшка с плавленым сыром.", ar: "خبز هندي مسطح محشو بالجبن الذائب.", pl: "Indyjski płaski chleb nadziewany roztopionym serem.", it: "Pane piatto indiano ripieno di formaggio fuso." }
  },
  "Chicken Biryani": {
    name: { es: "Chicken Biryani", en: "Chicken Biryani", cat: "Chicken Biryani", fr: "Chicken Biryani", de: "Chicken Biryani", nl: "Chicken Biryani", ru: "Чикен бирьяни", ar: "تشيكن برياني", pl: "Chicken Biryani", it: "Chicken Biryani" },
    description: { es: "Arroz basmati especiado cocinado con trozos de pollo.", en: "Spiced basmati rice cooked with pieces of chicken.", cat: "Arròs basmati especiat cuinat amb trossos de pollastre.", fr: "Riz basmati épicé cuit avec des morceaux de poulet.", de: "Gewürzter Basmatireis mit Hähnchenstücken.", nl: "Gekruide basmatirijst met stukjes kip.", ru: "Пряный рис басмати с кусочками курицы.", ar: "أرز بسمتي متبل مطبوخ مع قطع الدجاج.", pl: "Przyprawiony ryż basmati z kawałkami kurczaka.", it: "Riso basmati speziato cotto con pezzi di pollo." }
  },
  "Chicken Curry": {
    name: { es: "Chicken Curry", en: "Chicken Curry", cat: "Chicken Curry", fr: "Chicken Curry", de: "Chicken Curry", nl: "Chicken Curry", ru: "Чикен карри", ar: "تشيكن كاري", pl: "Chicken Curry", it: "Chicken Curry" },
    description: { es: "Pollo guisado en salsa de curry tradicional hindú.", en: "Chicken stewed in traditional Indian curry sauce.", cat: "Pollastre guisat en salsa de curri tradicional índia.", fr: "Poulet mijoté dans une sauce curry indienne traditionnelle.", de: "Hähnchen in traditioneller indischer Currysauce geschmort.", nl: "Kip gestoofd in traditionele Indiase currysaus.", ru: "Курица, тушённая в традиционном индийском соусе карри.", ar: "دجاج مطهو في صلصة الكاري الهندية التقليدية.", pl: "Kurczak duszony w tradycyjnym indyjskim sosie curry.", it: "Pollo in umido in salsa curry tradizionale indiana." }
  },
  "Chicken Madras": {
    name: { es: "Chicken Madras", en: "Chicken Madras", cat: "Chicken Madras", fr: "Chicken Madras", de: "Chicken Madras", nl: "Chicken Madras", ru: "Чикен мадрас", ar: "تشيكن مدراس", pl: "Chicken Madras", it: "Chicken Madras" },
    description: { es: "Pollo al estilo Madras en salsa roja especiada.", en: "Madras-style chicken in a spiced red sauce.", cat: "Pollastre estil Madras en salsa vermella especiada.", fr: "Poulet façon Madras en sauce rouge épicée.", de: "Hähnchen nach Madras-Art in würziger roter Sauce.", nl: "Kip op Madras-wijze in pittige rode saus.", ru: "Курица по-мадрасски в острогом красном соусе.", ar: "دجاج على طريقة مدراس في صلصة حمراء متبلة.", pl: "Kurczak w stylu Madras w pikantnym czerwonym sosie.", it: "Pollo stile Madras in salsa rossa speziata." }
  },
  "Chilli Chicken": {
    name: { es: "Chilli Chicken", en: "Chilli Chicken", cat: "Chilli Chicken", fr: "Chilli Chicken", de: "Chilli Chicken", nl: "Chilli Chicken", ru: "Чилли чикен", ar: "تشيلي تشيكن", pl: "Chilli Chicken", it: "Chilli Chicken" },
    description: { es: "Pollo picante en salsa de chile rojo con arroz o pan.", en: "Spicy chicken in red chilli sauce with rice or bread.", cat: "Pollastre picant en salsa de xile vermell amb arròs o pa.", fr: "Poulet épicé en sauce au piment rouge avec riz ou pain.", de: "Scharfes Hähnchen in roter Chilisauce mit Reis oder Brot.", nl: "Pittige kip in rode chilisaus met rijst of brood.", ru: "Острая курица в соусе из красного чили с рисом или хлебом.", ar: "دجاج حار في صلصة الفلفل الأحمر مع أرز أو خبز.", pl: "Pikantny kurczak w sosie z czerwonego chili z ryżem lub chlebem.", it: "Pollo piccante in salsa di peperoncino rosso con riso o pane." }
  },
  "Cortado": {
    name: { es: "Cortado", en: "Cortado", cat: "Tallat", fr: "Café Noisette", de: "Cortado", nl: "Cortado", ru: "Кортадо", ar: "كورتادو", pl: "Cortado", it: "Caffè Macchiato" },
    description: { es: "Espresso con poca leche.", en: "Espresso with a little milk.", cat: "Espresso amb poca llet.", fr: "Espresso avec un peu de lait.", de: "Espresso mit etwas Milch.", nl: "Espresso met een beetje melk.", ru: "Эспрессо с небольшим количеством молока.", ar: "إسبريسو بقليل من الحليب.", pl: "Espresso z odrobiną mleka.", it: "Espresso con poco latte." }
  },
  "Costillas de Cerdo": {
    name: { es: "Costillas de Cerdo", en: "Pork Ribs", cat: "Costelles de Porc", fr: "Côtes de Porc", de: "Schweinerippchen", nl: "Varkensribbetjes", ru: "Свиные рёбрышки", ar: "ضلوع خنزير", pl: "Żeberka wieprzowe", it: "Costine di Maiale" },
    description: { es: "Tira de costillas asadas adobadas con guarnición.", en: "Marinated roast ribs with a side.", cat: "Tira de costelles rostides adobades amb guarnició.", fr: "Travers de porc rôti mariné avec garniture.", de: "Marinierte gebratene Rippchen mit Beilage.", nl: "Gemarineerde geroosterde ribbetjes met bijgerecht.", ru: "Маринованные запечённые рёбрышки с гарниром.", ar: "ضلوع مشوية متبلة مع طبق جانبي.", pl: "Marynowane pieczone żeberka z dodatkiem.", it: "Costine arrosto marinate con contorno." }
  },
  "Costillas de cordero": {
    name: { es: "Costillas de cordero", en: "Lamb Chops", cat: "Costelles de xai", fr: "Côtelettes d'Agneau", de: "Lammkoteletts", nl: "Lamskoteletten", ru: "Бараньи рёбрышки", ar: "ريش الضأن", pl: "Kotlety jagnięce", it: "Costolette di Agnello" },
    description: { es: "Costillar de cordero asado con patatas y ensalada.", en: "Roast lamb rack with fries and salad.", cat: "Costellam de xai rostit amb patates i amanida.", fr: "Carré d'agneau rôti avec frites et salade.", de: "Gebratenes Lammkarree mit Pommes und Salat.", nl: "Geroosterd lamsrek met friet en salade.", ru: "Запечённая баранья корейка с картофелем фри и салатом.", ar: "ريش ضأن مشوية مع بطاطس وسلطة.", pl: "Pieczona comber jagnięcy z frytkami i sałatką.", it: "Carré di agnello arrosto con patatine e insalata." }
  },
  "Croquetas de Pollo": {
    name: { es: "Croquetas de Pollo", en: "Chicken Croquettes", cat: "Croquetes de Pollastre", fr: "Croquettes de Poulet", de: "Hähnchen-Kroketten", nl: "Kipkroketten", ru: "Куриные крокеты", ar: "كروكيت دجاج", pl: "Krokiety z kurczaka", it: "Crocchette di Pollo" },
    description: { es: "Ocho croquetas cremosas con bechamel y pollo.", en: "Eight creamy croquettes with béchamel and chicken.", cat: "Vuit croquetes cremoses amb beixamel i pollastre.", fr: "Huit croquettes crémeuses à la béchamel et au poulet.", de: "Acht cremige Kroketten mit Béchamel und Hähnchen.", nl: "Acht romige kroketten met bechamel en kip.", ru: "Восемь кремовых крокетов с бешамелем и курицей.", ar: "ثماني كروكيت كريمية بالبشاميل والدجاج.", pl: "Osiem kremowych krokietów z beszamelem i kurczakiem.", it: "Otto crocchette cremose con besciamella e pollo." }
  },
  "Deluxe": {
    name: { es: "Deluxe", en: "Deluxe Fries", cat: "Deluxe", fr: "Frites Deluxe", de: "Deluxe-Pommes", nl: "Deluxe Friet", ru: "Картофель делюкс", ar: "بطاطس ديلوكس", pl: "Frytki Deluxe", it: "Patatine Deluxe" },
    description: { es: "Patatas de corte rústico sazonadas con especias.", en: "Rustic-cut potatoes seasoned with spices.", cat: "Patates de tall rústic amanides amb espècies.", fr: "Pommes de terre coupe rustique assaisonnées d'épices.", de: "Rustikal geschnittene Kartoffeln mit Gewürzen.", nl: "Rustiek gesneden aardappelen met kruiden.", ru: "Картофель рустик, приправленный специями.", ar: "بطاطس مقطعة ريفية متبلة بالبهارات.", pl: "Ziemniaki krojone rustykalnie z przyprawami.", it: "Patate a taglio rustico condite con spezie." }
  },
  "Döner Box": {
    name: { es: "Döner Box", en: "Döner Box", cat: "Döner Box", fr: "Döner Box", de: "Döner Box", nl: "Döner Box", ru: "Дёнер бокс", ar: "دونر بوكس", pl: "Döner Box", it: "Döner Box" },
    description: { es: "Caja con patatas fritas cubiertas de carne y salsa.", en: "Box of fries topped with kebab meat and sauce.", cat: "Caixa de patates fregides cobertes de carn i salsa.", fr: "Boîte de frites garnies de viande et de sauce.", de: "Box mit Pommes, Dönerfleisch und Sauce.", nl: "Box friet met kebabvlees en saus.", ru: "Коробка картофеля фри с мясом и соусом.", ar: "علبة بطاطس مغطاة باللحم والصلصة.", pl: "Pudełko frytek z mięsem i sosem.", it: "Box di patatine ricoperte di carne e salsa." }
  },
  "Dürüm Normal": {
    name: { es: "Dürüm Normal", en: "Dürüm Normal", cat: "Dürüm Normal", fr: "Dürüm Normal", de: "Dürüm Normal", nl: "Dürüm Normaal", ru: "Дюрюм обычный", ar: "دوروم عادي", pl: "Dürüm Normalny", it: "Dürüm Normale" },
    description: { es: "Rollo con ensalada, carne o falafel y salsas.", en: "Wrap with salad, meat or falafel and sauces.", cat: "Rotlle amb amanida, carn o falàfel i salses.", fr: "Galette roulée avec salade, viande ou falafel et sauces.", de: "Wrap mit Salat, Fleisch oder Falafel und Saucen.", nl: "Wrap met salade, vlees of falafel en sauzen.", ru: "Ролл с салатом, мясом или фалафелем и соусами.", ar: "لفافة بالسلطة واللحم أو الفلافل والصلصات.", pl: "Zawijaniec z sałatą, mięsem lub falafelem i sosami.", it: "Rotolo con insalata, carne o falafel e salse." }
  },
  "Dürüm XL Solo Carne": {
    name: { es: "Dürüm XL Solo Carne", en: "Dürüm XL Meat Only", cat: "Dürüm XL Només Carn", fr: "Dürüm XL Viande Seule", de: "Dürüm XL Nur Fleisch", nl: "Dürüm XL Alleen Vlees", ru: "Дюрюм XL только мясо", ar: "دوروم XL لحم فقط", pl: "Dürüm XL Tylko Mięso", it: "Dürüm XL Solo Carne" },
    description: { es: "Rollo grande sin verduras, solo carne.", en: "Large wrap without vegetables, meat only.", cat: "Rotlle gran sense verdures, només carn.", fr: "Grande galette sans légumes, viande seulement.", de: "Großer Wrap ohne Gemüse, nur Fleisch.", nl: "Grote wrap zonder groenten, alleen vlees.", ru: "Большой ролл без овощей, только мясо.", ar: "لفافة كبيرة بدون خضار، لحم فقط.", pl: "Duży zawijaniec bez warzyw, tylko mięso.", it: "Rotolo grande senza verdure, solo carne." }
  },
  "Dürüm XXL": {
    name: { es: "Dürüm XXL", en: "Dürüm XXL", cat: "Dürüm XXL", fr: "Dürüm XXL", de: "Dürüm XXL", nl: "Dürüm XXL", ru: "Дюрюм XXL", ar: "دوروم XXL", pl: "Dürüm XXL", it: "Dürüm XXL" },
    description: { es: "Rollo gigante con ensalada, carne y salsas.", en: "Giant wrap with salad, meat and sauces.", cat: "Rotlle gegant amb amanida, carn i salses.", fr: "Galette géante avec salade, viande et sauces.", de: "Riesiger Wrap mit Salat, Fleisch und Saucen.", nl: "Gigantische wrap met salade, vlees en sauzen.", ru: "Гигантский ролл с салатом, мясом и соусами.", ar: "لفافة عملاقة بالسلطة واللحم والصلصات.", pl: "Gigantyczny zawijaniec z sałatą, mięsem i sosami.", it: "Rotolo gigante con insalata, carne e salse." }
  },
  "Dürüm XXL Solo Carne": {
    name: { es: "Dürüm XXL Solo Carne", en: "Dürüm XXL Meat Only", cat: "Dürüm XXL Només Carn", fr: "Dürüm XXL Viande Seule", de: "Dürüm XXL Nur Fleisch", nl: "Dürüm XXL Alleen Vlees", ru: "Дюрюм XXL только мясо", ar: "دوروم XXL لحم فقط", pl: "Dürüm XXL Tylko Mięso", it: "Dürüm XXL Solo Carne" },
    description: { es: "Rollo gigante sin verduras, repleto de carne.", en: "Giant wrap without vegetables, packed with meat.", cat: "Rotlle gegant sense verdures, ple de carn.", fr: "Galette géante sans légumes, pleine de viande.", de: "Riesiger Wrap ohne Gemüse, voller Fleisch.", nl: "Gigantische wrap zonder groenten, vol vlees.", ru: "Гигантский ролл без овощей, наполненный мясом.", ar: "لفافة عملاقة بدون خضار، مليئة باللحم.", pl: "Gigantyczny zawijaniec bez warzyw, pełen mięsa.", it: "Rotolo gigante senza verdure, pieno di carne." }
  },
  "English Breakfast": {
    name: { es: "English Breakfast", en: "English Breakfast", cat: "English Breakfast", fr: "English Breakfast", de: "English Breakfast", nl: "English Breakfast", ru: "Английский завтрак", ar: "فطور إنجليزي", pl: "English Breakfast", it: "English Breakfast" },
    description: { es: "Desayuno inglés: huevos, salchicha, bacon y alubias.", en: "English breakfast: eggs, sausage, bacon and beans.", cat: "Esmorzar anglès: ous, salsitxa, bacon i mongetes.", fr: "Petit-déjeuner anglais : œufs, saucisse, bacon et haricots.", de: "Englisches Frühstück: Eier, Wurst, Bacon und Bohnen.", nl: "Engels ontbijt: eieren, worst, bacon en bonen.", ru: "Английский завтрак: яйца, сосиска, бекон и бобы.", ar: "فطور إنجليزي: بيض ونقانق وبيكون وفاصولياء.", pl: "Angielskie śniadanie: jajka, kiełbaska, bekon i fasola.", it: "Colazione inglese: uova, salsiccia, bacon e fagioli." }
  },
  "Entrecot": {
    name: { es: "Entrecot", en: "Entrecôte Steak", cat: "Entrecot", fr: "Entrecôte", de: "Entrecôte", nl: "Entrecote", ru: "Антрекот", ar: "أنتركوت", pl: "Antrykot", it: "Entrecôte" },
    description: { es: "Lomo alto de vacuno a la parrilla con patatas.", en: "Grilled beef ribeye with fries.", cat: "Llom alt de vedella a la graella amb patates.", fr: "Faux-filet de bœuf grillé avec frites.", de: "Gegrilltes Rib-Eye vom Rind mit Pommes.", nl: "Gegrilde runder-ribeye met friet.", ru: "Говяжий рибай на гриле с картофелем фри.", ar: "ريب آي بقري مشوي مع بطاطس.", pl: "Grillowany rostbef wołowy z frytkami.", it: "Costata di manzo alla griglia con patatine." }
  },
  "Escalopa Pollo": {
    name: { es: "Escalopa Pollo", en: "Chicken Schnitzel", cat: "Escalopa de Pollastre", fr: "Escalope de Poulet", de: "Hähnchenschnitzel", nl: "Kipschnitzel", ru: "Куриный шницель", ar: "إسكالوب دجاج", pl: "Sznycel z kurczaka", it: "Cotoletta di Pollo" },
    description: { es: "Filete de pollo empanado con patatas fritas.", en: "Breaded chicken fillet with fries.", cat: "Filet de pollastre arrebossat amb patates fregides.", fr: "Filet de poulet pané avec frites.", de: "Paniertes Hähnchenfilet mit Pommes.", nl: "Gepaneerde kipfilet met friet.", ru: "Куриное филе в панировке с картофелем фри.", ar: "شريحة دجاج مقلية بالبقسماط مع بطاطس.", pl: "Panierowany filet z kurczaka z frytkami.", it: "Filetto di pollo impanato con patatine." }
  },
  "Fideuá": {
    name: { es: "Fideuá", en: "Fideuá", cat: "Fideuà", fr: "Fideuá", de: "Fideuá", nl: "Fideuá", ru: "Фидеуа", ar: "فيديوا", pl: "Fideuá", it: "Fideuá" },
    description: { es: "Plato marinero con fideos y caldo de pescado.", en: "Seafood dish with noodles and fish stock.", cat: "Plat mariner amb fideus i brou de peix.", fr: "Plat marin aux vermicelles et bouillon de poisson.", de: "Meeresgericht mit Nudeln und Fischfond.", nl: "Visgerecht met vermicelli en visbouillon.", ru: "Морское блюдо с лапшой и рыбным бульоном.", ar: "طبق بحري بالشعيرية ومرق السمك.", pl: "Danie morskie z makaronem i wywarem rybnym.", it: "Piatto di mare con vermicelli e brodo di pesce." }
  },
  "Fritura Mariscos": {
    name: { es: "Fritura Mariscos", en: "Fried Seafood", cat: "Fritura de Marisc", fr: "Friture de Fruits de Mer", de: "Frittierte Meeresfrüchte", nl: "Gefrituurde Zeevruchten", ru: "Жареные морепродукты", ar: "مأكولات بحرية مقلية", pl: "Smażone owoce morza", it: "Frittura di Mare" },
    description: { es: "Frutos del mar rebozados y fritos.", en: "Battered and fried seafood.", cat: "Fruits del mar arrebossats i fregits.", fr: "Fruits de mer panés et frits.", de: "Panierte und frittierte Meeresfrüchte.", nl: "Gepaneerde en gefrituurde zeevruchten.", ru: "Морепродукты в кляре, обжаренные.", ar: "ثمار بحر مقلية بالبقسماط.", pl: "Owoce morza w panierce, smażone.", it: "Frutti di mare impanati e fritti." }
  },
  "Frutii de Mare Biryani": {
    name: { es: "Frutii de Mare Biryani", en: "Seafood Biryani", cat: "Biryani de Marisc", fr: "Biryani Fruits de Mer", de: "Meeresfrüchte-Biryani", nl: "Zeevruchten Biryani", ru: "Бирьяни с морепродуктами", ar: "برياني مأكولات بحرية", pl: "Biryani z owocami morza", it: "Biryani ai Frutti di Mare" },
    description: { es: "Arroz basmati especiado con gambas y mejillones.", en: "Spiced basmati rice with prawns and mussels.", cat: "Arròs basmati especiat amb gambes i musclos.", fr: "Riz basmati épicé aux crevettes et moules.", de: "Gewürzter Basmatireis mit Garnelen und Muscheln.", nl: "Gekruide basmatirijst met garnalen en mosselen.", ru: "Пряный рис басмати с креветками и мидиями.", ar: "أرز بسمتي متبل مع جمبري وبلح البحر.", pl: "Przyprawiony ryż basmati z krewetkami i małżami.", it: "Riso basmati speziato con gamberi e cozze." }
  },
  "Pizza Frutti de mare": {
    name: { es: "Pizza Frutti de Mare", en: "Seafood Pizza", cat: "Pizza Frutti de Mare", fr: "Pizza Fruits de Mer", de: "Meeresfrüchte-Pizza", nl: "Zeevruchtenpizza", ru: "Пицца с морепродуктами", ar: "بيتزا مأكولات بحرية", pl: "Pizza z owocami morza", it: "Pizza ai Frutti di Mare" },
    description: { es: "Tomate, queso, gambas, calamares y mejillones.", en: "Tomato, cheese, prawns, calamari and mussels.", cat: "Tomàquet, formatge, gambes, calamars i musclos.", fr: "Tomate, fromage, crevettes, calamars et moules.", de: "Tomate, Käse, Garnelen, Calamari und Muscheln.", nl: "Tomaat, kaas, garnalen, inktvis en mosselen.", ru: "Томат, сыр, креветки, кальмары и мидии.", ar: "طماطم وجبن وجمبري وكاليماري وبلح البحر.", pl: "Pomidor, ser, krewetki, kalmary i małże.", it: "Pomodoro, formaggio, gamberi, calamari e cozze." }
  },
  "Pizza Fungi": {
    name: { es: "Pizza Fungi", en: "Mushroom Pizza", cat: "Pizza Bolets", fr: "Pizza Champignons", de: "Pilz-Pizza", nl: "Champignonpizza", ru: "Пицца с грибами", ar: "بيتزا فطر", pl: "Pizza z pieczarkami", it: "Pizza ai Funghi" },
    description: { es: "Salsa de tomate, queso y champiñones.", en: "Tomato sauce, cheese and mushrooms.", cat: "Salsa de tomàquet, formatge i xampinyons.", fr: "Sauce tomate, fromage et champignons.", de: "Tomatensauce, Käse und Champignons.", nl: "Tomatensaus, kaas en champignons.", ru: "Томатный соус, сыр и шампиньоны.", ar: "صلصة طماطم وجبن وفطر.", pl: "Sos pomidorowy, ser i pieczarki.", it: "Salsa di pomodoro, formaggio e funghi." }
  },
  "Gambes (9 uni)": {
    name: { es: "Gambes (9 uni)", en: "Prawns (9 units)", cat: "Gambes (9 uni)", fr: "Crevettes (9 unités)", de: "Garnelen (9 Stück)", nl: "Garnalen (9 stuks)", ru: "Креветки (9 шт.)", ar: "جمبري (9 حبات)", pl: "Krewetki (9 szt.)", it: "Gamberi (9 unità)" },
    description: { es: "Gambas a la plancha con ensalada y limón.", en: "Grilled prawns with salad and lemon.", cat: "Gambes a la planxa amb amanida i llimona.", fr: "Crevettes grillées avec salade et citron.", de: "Gegrillte Garnelen mit Salat und Zitrone.", nl: "Gegrilde garnalen met salade en citroen.", ru: "Креветки на гриле с салатом и лимоном.", ar: "جمبري مشوي مع سلطة وليمون.", pl: "Grillowane krewetki z sałatką i cytryną.", it: "Gamberi alla piastra con insalata e limone." }
  },
  "Garlic Naan Ajo": {
    name: { es: "Garlic Naan Ajo", en: "Garlic Naan", cat: "Garlic Naan", fr: "Garlic Naan", de: "Garlic Naan", nl: "Garlic Naan", ru: "Гарлик наан", ar: "نان بالثوم", pl: "Garlic Naan", it: "Garlic Naan" },
    description: { es: "Pan plano indio con ajo picado y mantequilla.", en: "Indian flatbread with chopped garlic and butter.", cat: "Pa pla indi amb all picat i mantega.", fr: "Pain plat indien à l'ail haché et au beurre.", de: "Indisches Fladenbrot mit gehacktem Knoblauch und Butter.", nl: "Indiaas platbrood met gehakte knoflook en boter.", ru: "Индийская лепёшка с рубленым чесноком и маслом.", ar: "خبز هندي مسطح بالثوم المفروم والزبدة.", pl: "Indyjski płaski chleb z czosnkiem i masłem.", it: "Pane piatto indiano con aglio tritato e burro." }
  },
  "Hot Dog": {
    name: { es: "Hot Dog", en: "Hot Dog", cat: "Hot Dog", fr: "Hot Dog", de: "Hot Dog", nl: "Hot Dog", ru: "Хот-дог", ar: "هوت دوغ", pl: "Hot Dog", it: "Hot Dog" },
    description: { es: "Perrito caliente clásico en pan tierno.", en: "Classic hot dog in a soft bun.", cat: "Hot dog clàssic en pa tou.", fr: "Hot dog classique dans un pain moelleux.", de: "Klassischer Hot Dog im weichen Brötchen.", nl: "Klassieke hotdog in een zacht broodje.", ru: "Классический хот-дог в мягкой булочке.", ar: "هوت دوغ كلاسيكي في خبز طري.", pl: "Klasyczny hot dog w miękkiej bułce.", it: "Hot dog classico nel panino morbido." }
  },
  "Pizza Jamón": {
    name: { es: "Pizza Jamón", en: "Ham Pizza", cat: "Pizza Pernil", fr: "Pizza Jambon", de: "Schinken-Pizza", nl: "Hampizza", ru: "Пицца с ветчиной", ar: "بيتزا لحم", pl: "Pizza z szynką", it: "Pizza Prosciutto" },
    description: { es: "Tomate, queso, jamón cocido y champiñones.", en: "Tomato, cheese, cooked ham and mushrooms.", cat: "Tomàquet, formatge, pernil cuit i xampinyons.", fr: "Tomate, fromage, jambon cuit et champignons.", de: "Tomate, Käse, Kochschinken und Champignons.", nl: "Tomaat, kaas, gekookte ham en champignons.", ru: "Томат, сыр, варёная ветчина и шампиньоны.", ar: "طماطم وجبن ولحم مطبوخ وفطر.", pl: "Pomidor, ser, szynka gotowana i pieczarki.", it: "Pomodoro, formaggio, prosciutto cotto e funghi." }
  },
  "Jarra de Cerveza": {
    name: { es: "Jarra de Cerveza", en: "Beer Jug", cat: "Gerra de Cervesa", fr: "Pichet de Bière", de: "Bierkrug", nl: "Kan Bier", ru: "Кувшин пива", ar: "إبريق بيرة", pl: "Dzbanek piwa", it: "Caraffa di Birra" },
    description: { es: "Gran formato de cerveza de barril.", en: "Large format of draft beer.", cat: "Gran format de cervesa de barril.", fr: "Grand format de bière pression.", de: "Großformat Fassbier.", nl: "Groot formaat tapbier.", ru: "Большой объём разливного пива.", ar: "حجم كبير من بيرة البرميل.", pl: "Duży format piwa z beczki.", it: "Grande formato di birra alla spina." }
  },
  "Kapsalón Grande XXL": {
    name: { es: "Kapsalón Grande XXL", en: "Kapsalon Large XXL", cat: "Kapsalón Gran XXL", fr: "Kapsalon Grand XXL", de: "Kapsalon Groß XXL", nl: "Kapsalon Groot XXL", ru: "Капсалон большой XXL", ar: "كابسالون كبير XXL", pl: "Kapsalon Duży XXL", it: "Kapsalon Grande XXL" },
    description: { es: "Bandeja grande de patatas, carne, queso y ensalada.", en: "Large tray of fries, meat, cheese and salad.", cat: "Safata gran de patates, carn, formatge i amanida.", fr: "Grand plateau de frites, viande, fromage et salade.", de: "Große Schale mit Pommes, Fleisch, Käse und Salat.", nl: "Grote schaal friet, vlees, kaas en salade.", ru: "Большой поднос картофеля, мяса, сыра и салата.", ar: "صينية كبيرة بطاطس ولحم وجبن وسلطة.", pl: "Duża taca frytek, mięsa, sera i sałatki.", it: "Vassoio grande di patatine, carne, formaggio e insalata." }
  },
  "Kapsalón Mediano": {
    name: { es: "Kapsalón Mediano", en: "Kapsalon Medium", cat: "Kapsalón Mitjà", fr: "Kapsalon Moyen", de: "Kapsalon Mittel", nl: "Kapsalon Medium", ru: "Капсалон средний", ar: "كابسالون وسط", pl: "Kapsalon Średni", it: "Kapsalon Medio" },
    description: { es: "Bandeja de patatas, carne, queso gratinado y ensalada.", en: "Tray of fries, meat, gratinated cheese and salad.", cat: "Safata de patates, carn, formatge gratinat i amanida.", fr: "Plateau de frites, viande, fromage gratiné et salade.", de: "Schale mit Pommes, Fleisch, überbackenem Käse und Salat.", nl: "Schaal friet, vlees, gegratineerde kaas en salade.", ru: "Поднос картофеля, мяса, запечённого сыра и салата.", ar: "صينية بطاطس ولحم وجبن محمر وسلطة.", pl: "Taca frytek, mięsa, zapieczonego sera i sałatki.", it: "Vassoio di patatine, carne, formaggio gratinato e insalata." }
  },
  "Kapsalón Pequeño": {
    name: { es: "Kapsalón Pequeño", en: "Kapsalon Small", cat: "Kapsalón Petit", fr: "Kapsalon Petit", de: "Kapsalon Klein", nl: "Kapsalon Klein", ru: "Капсалон маленький", ar: "كابسالون صغير", pl: "Kapsalon Mały", it: "Kapsalon Piccolo" },
    description: { es: "Bandeja de patatas, carne, queso gratinado y ensalada.", en: "Tray of fries, meat, gratinated cheese and salad.", cat: "Safata de patates, carn, formatge gratinat i amanida.", fr: "Plateau de frites, viande, fromage gratiné et salade.", de: "Schale mit Pommes, Fleisch, überbackenem Käse und Salat.", nl: "Schaal friet, vlees, gegratineerde kaas en salade.", ru: "Поднос картофеля, мяса, запечённого сыра и салата.", ar: "صينية بطاطس ولحم وجبن محمر وسلطة.", pl: "Taca frytek, mięsa, zapieczonego sera i sałatki.", it: "Vassoio di patatine, carne, formaggio gratinato e insalata." }
  },
  "Pizza Kebab": {
    name: { es: "Pizza Kebab", en: "Kebab Pizza", cat: "Pizza Kebab", fr: "Pizza Kebab", de: "Kebab-Pizza", nl: "Kebabpizza", ru: "Пицца с кебабом", ar: "بيتزا كباب", pl: "Pizza Kebab", it: "Pizza Kebab" },
    description: { es: "Tomate, queso, carne de kebab y cebollas.", en: "Tomato, cheese, kebab meat and onions.", cat: "Tomàquet, formatge, carn de kebab i cebes.", fr: "Tomate, fromage, viande de kebab et oignons.", de: "Tomate, Käse, Dönerfleisch und Zwiebeln.", nl: "Tomaat, kaas, kebabvlees en uien.", ru: "Томат, сыр, мясо кебаб и лук.", ar: "طماطم وجبن ولحم كباب وبصل.", pl: "Pomidor, ser, mięso kebab i cebula.", it: "Pomodoro, formaggio, carne di kebab e cipolle." }
  },
  "Lasaña Boloñesa": {
    name: { es: "Lasaña Boloñesa", en: "Lasagna Bolognese", cat: "Lasanya Bolonyesa", fr: "Lasagnes Bolognaise", de: "Lasagne Bolognese", nl: "Lasagne Bolognese", ru: "Лазанья болоньезе", ar: "لازانيا بولونيز", pl: "Lasagna bolońska", it: "Lasagna alla Bolognese" },
    description: { es: "Lasaña de carne picada, tomate, bechamel y queso.", en: "Lasagna with minced meat, tomato, béchamel and cheese.", cat: "Lasanya de carn picada, tomàquet, beixamel i formatge.", fr: "Lasagnes à la viande hachée, tomate, béchamel et fromage.", de: "Lasagne mit Hackfleisch, Tomate, Béchamel und Käse.", nl: "Lasagne met gehakt, tomaat, bechamel en kaas.", ru: "Лазанья с фаршем, томатом, бешамелем и сыром.", ar: "لازانيا باللحم المفروم والطماطم والبشاميل والجبن.", pl: "Lasagna z mielonym mięsem, pomidorem, beszamelem i serem.", it: "Lasagna con carne macinata, pomodoro, besciamella e formaggio." }
  },
  "Macarrones Boloñesa": {
    name: { es: "Macarrones Boloñesa", en: "Macaroni Bolognese", cat: "Macarrons Bolonyesa", fr: "Macaronis Bolognaise", de: "Makkaroni Bolognese", nl: "Macaroni Bolognese", ru: "Макароны болоньезе", ar: "معكرونة بولونيز", pl: "Makaron boloński", it: "Maccheroni alla Bolognese" },
    description: { es: "Macarrones con salsa de tomate y carne picada.", en: "Macaroni with tomato sauce and minced meat.", cat: "Macarrons amb salsa de tomàquet i carn picada.", fr: "Macaronis sauce tomate et viande hachée.", de: "Makkaroni mit Tomatensauce und Hackfleisch.", nl: "Macaroni met tomatensaus en gehakt.", ru: "Макароны с томатным соусом и фаршем.", ar: "معكرونة بصلصة الطماطم واللحم المفروم.", pl: "Makaron z sosem pomidorowym i mielonym mięsem.", it: "Maccheroni con salsa di pomodoro e carne macinata." }
  },
  "Pizza Margarita": {
    name: { es: "Pizza Margarita", en: "Pizza Margherita", cat: "Pizza Margarita", fr: "Pizza Margherita", de: "Pizza Margherita", nl: "Pizza Margherita", ru: "Пицца Маргарита", ar: "بيتزا مارغريتا", pl: "Pizza Margherita", it: "Pizza Margherita" },
    description: { es: "Salsa de tomate y queso mozzarella.", en: "Tomato sauce and mozzarella cheese.", cat: "Salsa de tomàquet i formatge mozzarella.", fr: "Sauce tomate et mozzarella.", de: "Tomatensauce und Mozzarella.", nl: "Tomatensaus en mozzarella.", ru: "Томатный соус и сыр моцарелла.", ar: "صلصة طماطم وجبن موزاريلا.", pl: "Sos pomidorowy i mozzarella.", it: "Salsa di pomodoro e mozzarella." }
  },
  "Margarita": {
    name: { es: "Margarita", en: "Margarita", cat: "Margarita", fr: "Margarita", de: "Margarita", nl: "Margarita", ru: "Маргарита", ar: "مارغريتا", pl: "Margarita", it: "Margarita" },
    description: { es: "Tequila, triple sec y zumo de lima.", en: "Tequila, triple sec and lime juice.", cat: "Tequila, triple sec i suc de llima.", fr: "Tequila, triple sec et jus de citron vert.", de: "Tequila, Triple Sec und Limettensaft.", nl: "Tequila, triple sec en limoensap.", ru: "Текила, трипл сек и сок лайма.", ar: "تكيلا وتريبل سيك وعصير ليمون أخضر.", pl: "Tequila, triple sec i sok z limonki.", it: "Tequila, triple sec e succo di lime." }
  },
  "Mejillones al vapor": {
    name: { es: "Mejillones al vapor", en: "Steamed Mussels", cat: "Musclos al vapor", fr: "Moules à la Vapeur", de: "Gedämpfte Muscheln", nl: "Gestoomde Mosselen", ru: "Мидии на пару", ar: "بلح البحر على البخار", pl: "Małże na parze", it: "Cozze al Vapore" },
    description: { es: "Olla de mejillones de roca cocidos al vapor.", en: "Pot of rock mussels cooked in steam.", cat: "Olla de musclos de roca cuits al vapor.", fr: "Marmite de moules de roche cuites à la vapeur.", de: "Topf Felsmuscheln, dampfgegart.", nl: "Pot rotsmosselen gestoomd.", ru: "Котелок скальных мидий, приготовленных на пару.", ar: "قدر من بلح بحر الصخور المطهو على البخار.", pl: "Garnek małży skalnych gotowanych na parze.", it: "Pentola di cozze di scoglio cotte al vapore." }
  },
  "Menú 1 - Pita Kebab": {
    name: { es: "Menú 1 - Pita Kebab", en: "Menu 1 - Pita Kebab", cat: "Menú 1 - Pita Kebab", fr: "Menu 1 - Pita Kebab", de: "Menü 1 - Pita Kebab", nl: "Menu 1 - Pita Kebab", ru: "Меню 1 - Пита кебаб", ar: "قائمة 1 - بيتا كباب", pl: "Menu 1 - Pita Kebab", it: "Menu 1 - Pita Kebab" },
    description: { es: "Pita Kebab + Patatas + Bebida.", en: "Pita Kebab + Fries + Drink.", cat: "Pita Kebab + Patates + Beguda.", fr: "Pita Kebab + Frites + Boisson.", de: "Pita Kebab + Pommes + Getränk.", nl: "Pita Kebab + Friet + Drankje.", ru: "Пита кебаб + картофель фри + напиток.", ar: "بيتا كباب + بطاطس + مشروب.", pl: "Pita Kebab + Frytki + Napój.", it: "Pita Kebab + Patatine + Bevanda." }
  },
  "Menú 10 - Alitas": {
    name: { es: "Menú 10 - Alitas", en: "Menu 10 - Wings", cat: "Menú 10 - Aletes", fr: "Menu 10 - Ailes", de: "Menü 10 - Flügel", nl: "Menu 10 - Vleugels", ru: "Меню 10 - Крылышки", ar: "قائمة 10 - أجنحة", pl: "Menu 10 - Skrzydełka", it: "Menu 10 - Alette" },
    description: { es: "Ración de alitas de pollo + Patatas + Bebida.", en: "Portion of chicken wings + Fries + Drink.", cat: "Ració d'aletes de pollastre + Patates + Beguda.", fr: "Portion d'ailes de poulet + Frites + Boisson.", de: "Portion Hähnchenflügel + Pommes + Getränk.", nl: "Portie kippenvleugels + Friet + Drankje.", ru: "Порция куриных крылышек + картофель фри + напиток.", ar: "حصة أجنحة دجاج + بطاطس + مشروب.", pl: "Porcja skrzydełek + Frytki + Napój.", it: "Porzione di alette di pollo + Patatine + Bevanda." }
  },
  "Menú 2 - Dürüm": {
    name: { es: "Menú 2 - Dürüm", en: "Menu 2 - Dürüm", cat: "Menú 2 - Dürüm", fr: "Menu 2 - Dürüm", de: "Menü 2 - Dürüm", nl: "Menu 2 - Dürüm", ru: "Меню 2 - Дюрюм", ar: "قائمة 2 - دوروم", pl: "Menu 2 - Dürüm", it: "Menu 2 - Dürüm" },
    description: { es: "Rollo Dürüm + Patatas + Bebida.", en: "Dürüm wrap + Fries + Drink.", cat: "Rotlle Dürüm + Patates + Beguda.", fr: "Galette Dürüm + Frites + Boisson.", de: "Dürüm-Wrap + Pommes + Getränk.", nl: "Dürüm-wrap + Friet + Drankje.", ru: "Ролл дюрюм + картофель фри + напиток.", ar: "لفافة دوروم + بطاطس + مشروب.", pl: "Zawijaniec Dürüm + Frytki + Napój.", it: "Rotolo Dürüm + Patatine + Bevanda." }
  },
  "Menú 3 - Plato Kebab": {
    name: { es: "Menú 3 - Plato Kebab", en: "Menu 3 - Kebab Plate", cat: "Menú 3 - Plat Kebab", fr: "Menu 3 - Assiette Kebab", de: "Menü 3 - Kebab-Teller", nl: "Menu 3 - Kebabschotel", ru: "Меню 3 - Тарелка кебаб", ar: "قائمة 3 - طبق كباب", pl: "Menu 3 - Talerz Kebab", it: "Menu 3 - Piatto Kebab" },
    description: { es: "Plato Kebab + Patatas + Bebida.", en: "Kebab plate + Fries + Drink.", cat: "Plat Kebab + Patates + Beguda.", fr: "Assiette Kebab + Frites + Boisson.", de: "Kebab-Teller + Pommes + Getränk.", nl: "Kebabschotel + Friet + Drankje.", ru: "Тарелка кебаб + картофель фри + напиток.", ar: "طبق كباب + بطاطس + مشروب.", pl: "Talerz kebab + Frytki + Napój.", it: "Piatto Kebab + Patatine + Bevanda." }
  },
  "Menú 4 - Dürüm XXL": {
    name: { es: "Menú 4 - Dürüm XXL", en: "Menu 4 - Dürüm XXL", cat: "Menú 4 - Dürüm XXL", fr: "Menu 4 - Dürüm XXL", de: "Menü 4 - Dürüm XXL", nl: "Menu 4 - Dürüm XXL", ru: "Меню 4 - Дюрюм XXL", ar: "قائمة 4 - دوروم XXL", pl: "Menu 4 - Dürüm XXL", it: "Menu 4 - Dürüm XXL" },
    description: { es: "Dürüm gigante + Patatas + Bebida.", en: "Giant Dürüm + Fries + Drink.", cat: "Dürüm gegant + Patates + Beguda.", fr: "Dürüm géant + Frites + Boisson.", de: "Riesiger Dürüm + Pommes + Getränk.", nl: "Gigantische Dürüm + Friet + Drankje.", ru: "Гигантский дюрюм + картофель фри + напиток.", ar: "دوروم عملاق + بطاطس + مشروب.", pl: "Gigantyczny Dürüm + Frytki + Napój.", it: "Dürüm gigante + Patatine + Bevanda." }
  },
  "Menú 5 - Plato Arroz": {
    name: { es: "Menú 5 - Plato Arroz", en: "Menu 5 - Rice Plate", cat: "Menú 5 - Plat Arròs", fr: "Menu 5 - Assiette de Riz", de: "Menü 5 - Reisteller", nl: "Menu 5 - Rijstschotel", ru: "Меню 5 - Тарелка риса", ar: "قائمة 5 - طبق أرز", pl: "Menu 5 - Talerz Ryżu", it: "Menu 5 - Piatto Riso" },
    description: { es: "Plato con Arroz y Carne + Bebida.", en: "Plate with rice and meat + Drink.", cat: "Plat amb arròs i carn + Beguda.", fr: "Assiette avec riz et viande + Boisson.", de: "Teller mit Reis und Fleisch + Getränk.", nl: "Bord met rijst en vlees + Drankje.", ru: "Тарелка с рисом и мясом + напиток.", ar: "طبق بأرز ولحم + مشروب.", pl: "Talerz z ryżem i mięsem + Napój.", it: "Piatto con riso e carne + Bevanda." }
  },
  "Menú 6 - Doner Box": {
    name: { es: "Menú 6 - Doner Box", en: "Menu 6 - Döner Box", cat: "Menú 6 - Döner Box", fr: "Menu 6 - Döner Box", de: "Menü 6 - Döner Box", nl: "Menu 6 - Döner Box", ru: "Меню 6 - Дёнер бокс", ar: "قائمة 6 - دونر بوكس", pl: "Menu 6 - Döner Box", it: "Menu 6 - Döner Box" },
    description: { es: "Cajita Doner Box + Bebida.", en: "Döner Box + Drink.", cat: "Caixeta Döner Box + Beguda.", fr: "Petite boîte Döner Box + Boisson.", de: "Döner Box + Getränk.", nl: "Döner Box + Drankje.", ru: "Дёнер бокс + напиток.", ar: "علبة دونر بوكس + مشروب.", pl: "Pudełko Döner Box + Napój.", it: "Box Döner + Bevanda." }
  },
  "Menú 7 - Nuggets": {
    name: { es: "Menú 7 - Nuggets", en: "Menu 7 - Nuggets", cat: "Menú 7 - Nuggets", fr: "Menu 7 - Nuggets", de: "Menü 7 - Nuggets", nl: "Menu 7 - Nuggets", ru: "Меню 7 - Наггетсы", ar: "قائمة 7 - ناغتس", pl: "Menu 7 - Nuggetsy", it: "Menu 7 - Nuggets" },
    description: { es: "Nuggets de pollo + Patatas + Bebida.", en: "Chicken nuggets + Fries + Drink.", cat: "Nuggets de pollastre + Patates + Beguda.", fr: "Nuggets de poulet + Frites + Boisson.", de: "Hähnchen-Nuggets + Pommes + Getränk.", nl: "Kipnuggets + Friet + Drankje.", ru: "Куриные наггетсы + картофель фри + напиток.", ar: "ناغتس دجاج + بطاطس + مشروب.", pl: "Nuggetsy z kurczaka + Frytki + Napój.", it: "Nuggets di pollo + Patatine + Bevanda." }
  },
  "Menú 8 - Burger": {
    name: { es: "Menú 8 - Burger", en: "Menu 8 - Burger", cat: "Menú 8 - Burger", fr: "Menu 8 - Burger", de: "Menü 8 - Burger", nl: "Menu 8 - Burger", ru: "Меню 8 - Бургер", ar: "قائمة 8 - برغر", pl: "Menu 8 - Burger", it: "Menu 8 - Burger" },
    description: { es: "Hamburguesa a elegir + Patatas + Bebida.", en: "Burger of your choice + Fries + Drink.", cat: "Hamburguesa a triar + Patates + Beguda.", fr: "Burger au choix + Frites + Boisson.", de: "Burger nach Wahl + Pommes + Getränk.", nl: "Burger naar keuze + Friet + Drankje.", ru: "Бургер на выбор + картофель фри + напиток.", ar: "برغر حسب الاختيار + بطاطس + مشروب.", pl: "Burger do wyboru + Frytki + Napój.", it: "Burger a scelta + Patatine + Bevanda." }
  },
  "Menú 9 - Hot Dog": {
    name: { es: "Menú 9 - Hot Dog", en: "Menu 9 - Hot Dog", cat: "Menú 9 - Hot Dog", fr: "Menu 9 - Hot Dog", de: "Menü 9 - Hot Dog", nl: "Menu 9 - Hot Dog", ru: "Меню 9 - Хот-дог", ar: "قائمة 9 - هوت دوغ", pl: "Menu 9 - Hot Dog", it: "Menu 9 - Hot Dog" },
    description: { es: "Perrito caliente + Patatas + Bebida.", en: "Hot dog + Fries + Drink.", cat: "Hot dog + Patates + Beguda.", fr: "Hot dog + Frites + Boisson.", de: "Hot Dog + Pommes + Getränk.", nl: "Hotdog + Friet + Drankje.", ru: "Хот-дог + картофель фри + напиток.", ar: "هوت دوغ + بطاطس + مشروب.", pl: "Hot dog + Frytki + Napój.", it: "Hot dog + Patatine + Bevanda." }
  },
  "Mixta": {
    name: { es: "Mixta", en: "Mixed Salad", cat: "Mixta", fr: "Salade Mixte", de: "Gemischter Salat", nl: "Gemengde Salade", ru: "Смешанный салат", ar: "سلطة مشكلة", pl: "Sałatka mieszana", it: "Insalata Mista" },
    description: { es: "Lechuga, tomate, maíz, lombarda, zanahoria y olivas.", en: "Lettuce, tomato, corn, red cabbage, carrot and olives.", cat: "Enciam, tomàquet, blat de moro, col llombarda, pastanaga i olives.", fr: "Laitue, tomate, maïs, chou rouge, carotte et olives.", de: "Salat, Tomate, Mais, Rotkohl, Karotte und Oliven.", nl: "Sla, tomaat, maïs, rodekool, wortel en olijven.", ru: "Салат, помидор, кукуруза, краснокочанная капуста, морковь и оливки.", ar: "خس وطماطم وذرة وملفوف أحمر وجزر وزيتون.", pl: "Sałata, pomidor, kukurydza, czerwona kapusta, marchew i oliwki.", it: "Lattuga, pomodoro, mais, cavolo rosso, carota e olive." }
  },
  "Mojito Litro": {
    name: { es: "Mojito Litro", en: "Mojito Litre", cat: "Mojito Litre", fr: "Mojito Litre", de: "Mojito Liter", nl: "Mojito Liter", ru: "Мохито литр", ar: "موهيتو لتر", pl: "Mojito Litr", it: "Mojito Litro" },
    description: { es: "Formato de un litro del cóctel cubano.", en: "One-litre format of the Cuban cocktail.", cat: "Format d'un litre del còctel cubà.", fr: "Format d'un litre du cocktail cubain.", de: "Ein-Liter-Format des kubanischen Cocktails.", nl: "Eén-literformaat van de Cubaanse cocktail.", ru: "Литровый формат кубинского коктейля.", ar: "حجم لتر من الكوكتيل الكوبي.", pl: "Litrowy format kubańskiego koktajlu.", it: "Formato da un litro del cocktail cubano." }
  },
  "Naan Normal": {
    name: { es: "Naan Normal", en: "Plain Naan", cat: "Naan Normal", fr: "Naan Nature", de: "Naan Natur", nl: "Naan Naturel", ru: "Наан обычный", ar: "نان عادي", pl: "Naan Zwykły", it: "Naan Normale" },
    description: { es: "Pan plano tradicional indio cocido al horno.", en: "Traditional Indian flatbread baked in the oven.", cat: "Pa pla tradicional indi cuit al forn.", fr: "Pain plat indien traditionnel cuit au four.", de: "Traditionelles indisches Fladenbrot aus dem Ofen.", nl: "Traditioneel Indiaas platbrood uit de oven.", ru: "Традиционная индийская лепёшка из печи.", ar: "خبز هندي مسطح تقليدي مخبوز في الفرن.", pl: "Tradycyjny indyjski płaski chleb pieczony w piecu.", it: "Pane piatto tradizionale indiano cotto al forno." }
  },
  "Nuggets de Pollo": {
    name: { es: "Nuggets de Pollo", en: "Chicken Nuggets", cat: "Nuggets de Pollastre", fr: "Nuggets de Poulet", de: "Hähnchen-Nuggets", nl: "Kipnuggets", ru: "Куриные наггетсы", ar: "ناغتس دجاج", pl: "Nuggetsy z kurczaka", it: "Nuggets di Pollo" },
    description: { es: "Ocho porciones de pollo empanado y frito.", en: "Eight pieces of breaded and fried chicken.", cat: "Vuit porcions de pollastre arrebossat i fregit.", fr: "Huit morceaux de poulet pané et frit.", de: "Acht Stück paniertes und frittiertes Hähnchen.", nl: "Acht stukjes gepaneerde en gefrituurde kip.", ru: "Восемь кусочков курицы в панировке, обжаренных.", ar: "ثماني قطع دجاج مقلية بالبقسماط.", pl: "Osiem kawałków panierowanego, smażonego kurczaka.", it: "Otto pezzi di pollo impanato e fritto." }
  },
  "Paella Marinera": {
    name: { es: "Paella Marinera", en: "Seafood Paella", cat: "Paella Marinera", fr: "Paella aux Fruits de Mer", de: "Meeresfrüchte-Paella", nl: "Zeevruchtenpaella", ru: "Паэлья с морепродуктами", ar: "بايلا بحرية", pl: "Paella z owocami morza", it: "Paella di Mare" },
    description: { es: "Paella de marisco con intenso fumet.", en: "Seafood paella with intense fish stock.", cat: "Paella de marisc amb fumet intens.", fr: "Paella aux fruits de mer avec fumet intense.", de: "Meeresfrüchte-Paella mit intensivem Fischfond.", nl: "Zeevruchtenpaella met intense visbouillon.", ru: "Паэлья с морепродуктами и насыщенным фюме.", ar: "بايلا بحرية بمرق سمك مركّز.", pl: "Paella z owocami morza z intensywnym wywarem.", it: "Paella di mare con fumetto intenso." }
  },
  "Paella Mixta": {
    name: { es: "Paella Mixta", en: "Mixed Paella", cat: "Paella Mixta", fr: "Paella Mixte", de: "Gemischte Paella", nl: "Gemengde Paella", ru: "Смешанная паэлья", ar: "بايلا مشكلة", pl: "Paella mieszana", it: "Paella Mista" },
    description: { es: "Auténtica paella con carne, vegetales y marisco.", en: "Authentic paella with meat, vegetables and seafood.", cat: "Autèntica paella amb carn, verdures i marisc.", fr: "Authentique paella avec viande, légumes et fruits de mer.", de: "Authentische Paella mit Fleisch, Gemüse und Meeresfrüchten.", nl: "Authentieke paella met vlees, groenten en zeevruchten.", ru: "Настоящая паэлья с мясом, овощами и морепродуктами.", ar: "بايلا أصلية باللحم والخضار والمأكولات البحرية.", pl: "Autentyczna paella z mięsem, warzywami i owocami morza.", it: "Autentica paella con carne, verdure e frutti di mare." }
  },
  "Patatas Bravas": {
    name: { es: "Patatas Bravas", en: "Patatas Bravas", cat: "Patates Braves", fr: "Patatas Bravas", de: "Patatas Bravas", nl: "Patatas Bravas", ru: "Пататас бравас", ar: "بطاطس برافاس", pl: "Patatas Bravas", it: "Patatas Bravas" },
    description: { es: "Patatas fritas bañadas en salsa brava tradicional.", en: "Fried potatoes coated in traditional spicy brava sauce.", cat: "Patates fregides banyades en salsa brava tradicional.", fr: "Pommes de terre frites nappées de sauce brava traditionnelle.", de: "Bratkartoffeln in traditioneller scharfer Brava-Sauce.", nl: "Gefrituurde aardappels in traditionele pittige bravasaus.", ru: "Жареный картофель в традиционном остром соусе брава.", ar: "بطاطس مقلية مغموسة في صلصة برافا الحارة التقليدية.", pl: "Smażone ziemniaki w tradycyjnym pikantnym sosie brava.", it: "Patate fritte avvolte nella tradizionale salsa brava piccante." }
  },
  "Patatas Fritas": {
    name: { es: "Patatas Fritas", en: "French Fries", cat: "Patates Fregides", fr: "Frites", de: "Pommes Frites", nl: "Frieten", ru: "Картофель фри", ar: "بطاطس مقلية", pl: "Frytki", it: "Patatine Fritte" },
    description: { es: "Ración clásica de patatas fritas crujientes.", en: "Classic serving of crispy French fries.", cat: "Ració clàssica de patates fregides cruixents.", fr: "Portion classique de frites croustillantes.", de: "Klassische Portion knuspriger Pommes.", nl: "Klassieke portie knapperige frieten.", ru: "Классическая порция хрустящего картофеля фри.", ar: "حصة كلاسيكية من البطاطس المقلية المقرمشة.", pl: "Klasyczna porcja chrupiących frytek.", it: "Porzione classica di patatine croccanti." }
  },
  "Pizza Pavo": {
    name: { es: "Pizza Pavo", en: "Turkey Pizza", cat: "Pizza Gall dindi", fr: "Pizza Dinde", de: "Puten-Pizza", nl: "Kalkoenpizza", ru: "Пицца с индейкой", ar: "بيتزا ديك رومي", pl: "Pizza z indykiem", it: "Pizza Tacchino" },
    description: { es: "Tomate, queso y pechuga de pavo.", en: "Tomato, cheese and turkey breast.", cat: "Tomàquet, formatge i pit de gall dindi.", fr: "Tomate, fromage et blanc de dinde.", de: "Tomate, Käse und Putenbrust.", nl: "Tomaat, kaas en kalkoenfilet.", ru: "Томат, сыр и грудка индейки.", ar: "طماطم وجبن وصدر ديك رومي.", pl: "Pomidor, ser i pierś z indyka.", it: "Pomodoro, formaggio e petto di tacchino." }
  },
  "Pizza Pepperoni": {
    name: { es: "Pizza Pepperoni", en: "Pepperoni Pizza", cat: "Pizza Pepperoni", fr: "Pizza Pepperoni", de: "Pepperoni-Pizza", nl: "Pepperonipizza", ru: "Пицца пепперони", ar: "بيتزا بيبروني", pl: "Pizza Pepperoni", it: "Pizza Pepperoni" },
    description: { es: "Tomate, queso y rodajas de pepperoni.", en: "Tomato, cheese and pepperoni slices.", cat: "Tomàquet, formatge i rodanxes de pepperoni.", fr: "Tomate, fromage et tranches de pepperoni.", de: "Tomate, Käse und Pepperoni-Scheiben.", nl: "Tomaat, kaas en pepperonischijfjes.", ru: "Томат, сыр и ломтики пепперони.", ar: "طماطم وجبن وشرائح بيبروني.", pl: "Pomidor, ser i plasterki pepperoni.", it: "Pomodoro, formaggio e fette di pepperoni." }
  },
  "Pescado Frito con patatas": {
    name: { es: "Pescado Frito con patatas", en: "Fried Fish with Fries", cat: "Peix Fregit amb patates", fr: "Poisson Frit avec Frites", de: "Gebratener Fisch mit Pommes", nl: "Gebakken Vis met Friet", ru: "Жареная рыба с картофелем фри", ar: "سمك مقلي مع بطاطس", pl: "Smażona ryba z frytkami", it: "Pesce Fritto con patatine" },
    description: { es: "Lomos de pescado blanco rebozados.", en: "Battered white fish fillets.", cat: "Lloms de peix blanc arrebossats.", fr: "Filets de poisson blanc panés.", de: "Panierte Weißfischfilets.", nl: "Gepaneerde witvisfilets.", ru: "Филе белой рыбы в кляре.", ar: "شرائح سمك أبيض مقلية بالبقسماط.", pl: "Filety z białej ryby w panierce.", it: "Filetti di pesce bianco impanati." }
  },
  "Piña Colada": {
    name: { es: "Piña Colada", en: "Piña Colada", cat: "Piña Colada", fr: "Piña Colada", de: "Piña Colada", nl: "Piña Colada", ru: "Пина колада", ar: "بينا كولادا", pl: "Piña Colada", it: "Piña Colada" },
    description: { es: "Ron blanco, crema de coco y piña.", en: "White rum, coconut cream and pineapple.", cat: "Rom blanc, crema de coco i pinya.", fr: "Rhum blanc, crème de coco et ananas.", de: "Weißer Rum, Kokoscreme und Ananas.", nl: "Witte rum, kokoscrème en ananas.", ru: "Белый ром, кокосовый крем и ананас.", ar: "روم أبيض وكريمة جوز الهند وأناناس.", pl: "Biały rum, krem kokosowy i ananas.", it: "Rum bianco, crema di cocco e ananas." }
  },
  "Pita Kebab Normal": {
    name: { es: "Pita Kebab Normal", en: "Pita Kebab Normal", cat: "Pita Kebab Normal", fr: "Pita Kebab Normal", de: "Pita Kebab Normal", nl: "Pita Kebab Normaal", ru: "Пита кебаб обычный", ar: "بيتا كباب عادي", pl: "Pita Kebab Normalny", it: "Pita Kebab Normale" },
    description: { es: "Pan de pita relleno de carne, ensalada y salsas.", en: "Pita bread filled with meat, salad and sauces.", cat: "Pa de pita farcit de carn, amanida i salses.", fr: "Pain pita garni de viande, salade et sauces.", de: "Pita-Brot gefüllt mit Fleisch, Salat und Saucen.", nl: "Pitabroodje gevuld met vlees, salade en sauzen.", ru: "Пита с мясом, салатом и соусами.", ar: "خبز بيتا محشو باللحم والسلطة والصلصات.", pl: "Pita nadziewana mięsem, sałatą i sosami.", it: "Pane pita ripieno di carne, insalata e salse." }
  },
  "Pita Kebab Solo Carne": {
    name: { es: "Pita Kebab Solo Carne", en: "Pita Kebab Meat Only", cat: "Pita Kebab Només Carn", fr: "Pita Kebab Viande Seule", de: "Pita Kebab Nur Fleisch", nl: "Pita Kebab Alleen Vlees", ru: "Пита кебаб только мясо", ar: "بيتا كباب لحم فقط", pl: "Pita Kebab Tylko Mięso", it: "Pita Kebab Solo Carne" },
    description: { es: "Pan de pita relleno únicamente de carne asada.", en: "Pita bread filled only with roast meat.", cat: "Pa de pita farcit únicament de carn rostida.", fr: "Pain pita garni uniquement de viande rôtie.", de: "Pita-Brot nur mit Bratfleisch gefüllt.", nl: "Pitabroodje alleen gevuld met gebraden vlees.", ru: "Пита, наполненная только жареным мясом.", ar: "خبز بيتا محشو باللحم المشوي فقط.", pl: "Pita nadziewana wyłącznie pieczonym mięsem.", it: "Pane pita ripieno solo di carne arrosto." }
  },
  "Plato Falafel": {
    name: { es: "Plato Falafel", en: "Falafel Plate", cat: "Plat Falàfel", fr: "Assiette Falafel", de: "Falafel-Teller", nl: "Falafelschotel", ru: "Тарелка фалафель", ar: "طبق فلافل", pl: "Talerz Falafel", it: "Piatto Falafel" },
    description: { es: "Croquetas de falafel, patatas y ensalada.", en: "Falafel balls, fries and salad.", cat: "Croquetes de falàfel, patates i amanida.", fr: "Boulettes de falafel, frites et salade.", de: "Falafel-Bällchen, Pommes und Salat.", nl: "Falafelballetjes, friet en salade.", ru: "Шарики фалафель, картофель фри и салат.", ar: "كرات فلافل وبطاطس وسلطة.", pl: "Kulki falafel, frytki i sałatka.", it: "Polpette di falafel, patatine e insalata." }
  },
  "Plato Kebab": {
    name: { es: "Plato Kebab", en: "Kebab Plate", cat: "Plat Kebab", fr: "Assiette Kebab", de: "Kebab-Teller", nl: "Kebabschotel", ru: "Тарелка кебаб", ar: "طبق كباب", pl: "Talerz Kebab", it: "Piatto Kebab" },
    description: { es: "Carne asada de kebab, patatas fritas y ensalada.", en: "Roast kebab meat, fries and salad.", cat: "Carn rostida de kebab, patates fregides i amanida.", fr: "Viande de kebab rôtie, frites et salade.", de: "Gebratenes Dönerfleisch, Pommes und Salat.", nl: "Gebraden kebabvlees, friet en salade.", ru: "Жареное мясо кебаб, картофель фри и салат.", ar: "لحم كباب مشوي وبطاطس وسلطة.", pl: "Pieczone mięso kebab, frytki i sałatka.", it: "Carne di kebab arrosto, patatine e insalata." }
  },
  "Plato Kebab Arroz": {
    name: { es: "Plato Kebab Arroz", en: "Kebab Plate with Rice", cat: "Plat Kebab Arròs", fr: "Assiette Kebab Riz", de: "Kebab-Teller mit Reis", nl: "Kebabschotel met Rijst", ru: "Тарелка кебаб с рисом", ar: "طبق كباب بالأرز", pl: "Talerz Kebab z Ryżem", it: "Piatto Kebab con Riso" },
    description: { es: "Carne asada, cama de arroz y ensalada.", en: "Roast meat, bed of rice and salad.", cat: "Carn rostida, llit d'arròs i amanida.", fr: "Viande rôtie, lit de riz et salade.", de: "Bratfleisch, Reisbett und Salat.", nl: "Gebraden vlees, bedje van rijst en salade.", ru: "Жареное мясо, рисовая подушка и салат.", ar: "لحم مشوي على فراش أرز وسلطة.", pl: "Pieczone mięso, podstawa z ryżu i sałatka.", it: "Carne arrosto, letto di riso e insalata." }
  },
  "Pollo para llevar": {
    name: { es: "Pollo para llevar", en: "Chicken to Take Away", cat: "Pollastre per emportar", fr: "Poulet à Emporter", de: "Hähnchen zum Mitnehmen", nl: "Kip om mee te nemen", ru: "Курица навынос", ar: "دجاج للأخذ", pl: "Kurczak na wynos", it: "Pollo da Asporto" },
    description: { es: "Pollo entero asado con patatas y ensalada.", en: "Whole roast chicken with fries and salad.", cat: "Pollastre sencer rostit amb patates i amanida.", fr: "Poulet entier rôti avec frites et salade.", de: "Ganzes Brathähnchen mit Pommes und Salat.", nl: "Hele gebraden kip met friet en salade.", ru: "Целая жареная курица с картофелем фри и салатом.", ar: "دجاجة كاملة مشوية مع بطاطس وسلطة.", pl: "Cały pieczony kurczak z frytkami i sałatką.", it: "Pollo intero arrosto con patatine e insalata." }
  },
  "Red Bull": {
    name: { es: "Red Bull", en: "Red Bull", cat: "Red Bull", fr: "Red Bull", de: "Red Bull", nl: "Red Bull", ru: "Ред Булл", ar: "ريد بُل", pl: "Red Bull", it: "Red Bull" },
    description: { es: "Bebida energética.", en: "Energy drink.", cat: "Beguda energètica.", fr: "Boisson énergisante.", de: "Energydrink.", nl: "Energiedrank.", ru: "Энергетический напиток.", ar: "مشروب طاقة.", pl: "Napój energetyczny.", it: "Bevanda energetica." }
  },
  "Refrescos Variados": {
    name: { es: "Refrescos Variados", en: "Assorted Soft Drinks", cat: "Refrescos Variats", fr: "Sodas Variés", de: "Verschiedene Softdrinks", nl: "Diverse Frisdranken", ru: "Различные напитки", ar: "مشروبات غازية متنوعة", pl: "Różne napoje gazowane", it: "Bibite Assortite" },
    description: { es: "Gama de bebidas carbonatadas (Coca-Cola, Fanta, etc.).", en: "Range of carbonated drinks (Coca-Cola, Fanta, etc.).", cat: "Gamma de begudes carbonatades (Coca-Cola, Fanta, etc.).", fr: "Gamme de boissons gazeuses (Coca-Cola, Fanta, etc.).", de: "Auswahl an kohlensäurehaltigen Getränken (Coca-Cola, Fanta usw.).", nl: "Assortiment koolzuurhoudende dranken (Coca-Cola, Fanta, enz.).", ru: "Ассортимент газированных напитков (Кока-Кола, Фанта и др.).", ar: "تشكيلة من المشروبات الغازية (كوكا كولا، فانتا، إلخ).", pl: "Wybór napojów gazowanych (Coca-Cola, Fanta itp.).", it: "Gamma di bibite gassate (Coca-Cola, Fanta, ecc.)." }
  },
  "Rollos Primavera": {
    name: { es: "Rollos Primavera", en: "Spring Rolls", cat: "Rotllets de Primavera", fr: "Rouleaux de Printemps", de: "Frühlingsrollen", nl: "Loempia's", ru: "Спринг-роллы", ar: "سبرينغ رول", pl: "Sajgonki", it: "Involtini Primavera" },
    description: { es: "Ocho mini rollitos de vegetales fritos.", en: "Eight mini fried vegetable rolls.", cat: "Vuit mini rotllets de verdures fregits.", fr: "Huit mini rouleaux de légumes frits.", de: "Acht frittierte Mini-Gemüserollen.", nl: "Acht mini gefrituurde groenterolletjes.", ru: "Восемь мини-роллов с овощами, обжаренных.", ar: "ثمانية لفائف خضار صغيرة مقلية.", pl: "Osiem mini smażonych sajgonek warzywnych.", it: "Otto mini involtini di verdure fritti." }
  },
  "Pizza Romana": {
    name: { es: "Pizza Romana", en: "Pizza Romana", cat: "Pizza Romana", fr: "Pizza Romana", de: "Pizza Romana", nl: "Pizza Romana", ru: "Пицца романа", ar: "بيتزا رومانا", pl: "Pizza Romana", it: "Pizza Romana" },
    description: { es: "Salsa barbacoa, queso, bacon, jamón y patatas.", en: "Barbecue sauce, cheese, bacon, ham and fries.", cat: "Salsa barbacoa, formatge, bacon, pernil i patates.", fr: "Sauce barbecue, fromage, bacon, jambon et frites.", de: "Barbecue-Sauce, Käse, Bacon, Schinken und Pommes.", nl: "Barbecuesaus, kaas, bacon, ham en friet.", ru: "Соус барбекю, сыр, бекон, ветчина и картофель.", ar: "صلصة باربكيو وجبن وبيكون ولحم وبطاطس.", pl: "Sos barbecue, ser, bekon, szynka i frytki.", it: "Salsa barbecue, formaggio, bacon, prosciutto e patatine." }
  },
  "Pizza Salami": {
    name: { es: "Pizza Salami", en: "Salami Pizza", cat: "Pizza Salami", fr: "Pizza Salami", de: "Salami-Pizza", nl: "Salamipizza", ru: "Пицца с салями", ar: "بيتزا سلامي", pl: "Pizza Salami", it: "Pizza Salame" },
    description: { es: "Tomate, queso y abundante salami.", en: "Tomato, cheese and plenty of salami.", cat: "Tomàquet, formatge i abundant salami.", fr: "Tomate, fromage et salami en abondance.", de: "Tomate, Käse und reichlich Salami.", nl: "Tomaat, kaas en volop salami.", ru: "Томат, сыр и много салями.", ar: "طماطم وجبن وكمية وفيرة من السلامي.", pl: "Pomidor, ser i obfitość salami.", it: "Pomodoro, formaggio e abbondante salame." }
  },
  "Samosa": {
    name: { es: "Samosa", en: "Samosa", cat: "Samosa", fr: "Samosa", de: "Samosa", nl: "Samosa", ru: "Самоса", ar: "سمبوسة", pl: "Samosa", it: "Samosa" },
    description: { es: "Dos empanadillas crujientes rellenas de patata y guisantes.", en: "Two crispy pastries filled with potato and peas.", cat: "Dues empanadetes cruixents farcides de patata i pèsols.", fr: "Deux chaussons croustillants garnis de pomme de terre et petits pois.", de: "Zwei knusprige Teigtaschen mit Kartoffel und Erbsen.", nl: "Twee krokante pasteitjes gevuld met aardappel en erwten.", ru: "Два хрустящих пирожка с картофелем и горохом.", ar: "قطعتا معجنات مقرمشة محشوة بالبطاطس والبازلاء.", pl: "Dwa chrupiące pierożki z ziemniakami i groszkiem.", it: "Due fagottini croccanti ripieni di patata e piselli." }
  },
  "Samosa con garbanzos": {
    name: { es: "Samosa con garbanzos", en: "Samosa with Chickpeas", cat: "Samosa amb cigrons", fr: "Samosa aux Pois Chiches", de: "Samosa mit Kichererbsen", nl: "Samosa met Kikkererwten", ru: "Самоса с нутом", ar: "سمبوسة بالحمص", pl: "Samosa z ciecierzycą", it: "Samosa con Ceci" },
    description: { es: "Empanadillas indias con base de curry de garbanzos.", en: "Indian pastries on a chickpea curry base.", cat: "Empanadetes índies amb base de curri de cigrons.", fr: "Chaussons indiens sur une base de curry de pois chiches.", de: "Indische Teigtaschen auf Kichererbsen-Curry-Basis.", nl: "Indiase pasteitjes op een basis van kikkererwtencurry.", ru: "Индийские пирожки на основе нутового карри.", ar: "معجنات هندية على قاعدة كاري الحمص.", pl: "Indyjskie pierożki na bazie curry z ciecierzycy.", it: "Fagottini indiani su base di curry di ceci." }
  },
  "San Francisco": {
    name: { es: "San Francisco", en: "San Francisco", cat: "San Francisco", fr: "San Francisco", de: "San Francisco", nl: "San Francisco", ru: "Сан-Франциско", ar: "سان فرانسيسكو", pl: "San Francisco", it: "San Francisco" },
    description: { es: "Cóctel sin alcohol de zumos frutales.", en: "Non-alcoholic cocktail of fruit juices.", cat: "Còctel sense alcohol de sucs de fruites.", fr: "Cocktail sans alcool de jus de fruits.", de: "Alkoholfreier Cocktail aus Fruchtsäften.", nl: "Alcoholvrije cocktail van vruchtensappen.", ru: "Безалкогольный коктейль из фруктовых соков.", ar: "كوكتيل غير كحولي من عصائر الفاكهة.", pl: "Bezalkoholowy koktajl z soków owocowych.", it: "Cocktail analcolico di succhi di frutta." }
  },
  "Sangría Vino 1 Ltrs": {
    name: { es: "Sangría Vino 1 Ltrs", en: "Wine Sangria 1 L", cat: "Sangria Vi 1 L", fr: "Sangria au Vin 1 L", de: "Wein-Sangria 1 L", nl: "Wijn Sangria 1 L", ru: "Винная сангрия 1 л", ar: "سانغريا نبيذ 1 لتر", pl: "Sangria z winem 1 L", it: "Sangria di Vino 1 L" },
    description: { es: "Jarra de un litro de sangría tradicional.", en: "One-litre jug of traditional sangria.", cat: "Gerra d'un litre de sangria tradicional.", fr: "Pichet d'un litre de sangria traditionnelle.", de: "Ein-Liter-Krug traditioneller Sangria.", nl: "Kan van één liter traditionele sangria.", ru: "Литровый кувшин традиционной сангрии.", ar: "إبريق لتر من السانغريا التقليدية.", pl: "Litrowy dzbanek tradycyjnej sangrii.", it: "Caraffa da un litro di sangria tradizionale." }
  },
  "Sardinas fritas o plancha": {
    name: { es: "Sardinas fritas o plancha", en: "Fried or Grilled Sardines", cat: "Sardines fregides o a la planxa", fr: "Sardines Frites ou Grillées", de: "Sardinen frittiert oder gegrillt", nl: "Gebakken of Gegrilde Sardines", ru: "Сардины жареные или на гриле", ar: "سردين مقلي أو مشوي", pl: "Sardynki smażone lub z grilla", it: "Sardine Fritte o alla Piastra" },
    description: { es: "Ración de sardinas enteras.", en: "Portion of whole sardines.", cat: "Ració de sardines senceres.", fr: "Portion de sardines entières.", de: "Portion ganzer Sardinen.", nl: "Portie hele sardines.", ru: "Порция целых сардин.", ar: "حصة من السردين الكامل.", pl: "Porcja całych sardynek.", it: "Porzione di sardine intere." }
  },
  "Seekh Kebab": {
    name: { es: "Seekh Kebab", en: "Seekh Kebab", cat: "Seekh Kebab", fr: "Seekh Kebab", de: "Seekh Kebab", nl: "Seekh Kebab", ru: "Сикх кебаб", ar: "سيخ كباب", pl: "Seekh Kebab", it: "Seekh Kebab" },
    description: { es: "Cilindros de carne picada especiada con patatas y ensalada.", en: "Spiced minced meat skewers with fries and salad.", cat: "Cilindres de carn picada especiada amb patates i amanida.", fr: "Brochettes de viande hachée épicée avec frites et salade.", de: "Gewürzte Hackfleischspieße mit Pommes und Salat.", nl: "Gekruide gehaktrolletjes met friet en salade.", ru: "Шашлычки из пряного фарша с картофелем фри и салатом.", ar: "أسياخ لحم مفروم متبل مع بطاطس وسلطة.", pl: "Wałeczki z przyprawionego mielonego mięsa z frytkami i sałatką.", it: "Spiedini di carne macinata speziata con patatine e insalata." }
  },
  "Sex on the beach": {
    name: { es: "Sex on the Beach", en: "Sex on the Beach", cat: "Sex on the Beach", fr: "Sex on the Beach", de: "Sex on the Beach", nl: "Sex on the Beach", ru: "Секс он зе бич", ar: "سيكس أون ذا بيتش", pl: "Sex on the Beach", it: "Sex on the Beach" },
    description: { es: "Vodka, melocotón, naranja y arándanos.", en: "Vodka, peach, orange and cranberry.", cat: "Vodka, préssec, taronja i nabius.", fr: "Vodka, pêche, orange et canneberge.", de: "Wodka, Pfirsich, Orange und Cranberry.", nl: "Wodka, perzik, sinaasappel en cranberry.", ru: "Водка, персик, апельсин и клюква.", ar: "فودكا وخوخ وبرتقال وتوت بري.", pl: "Wódka, brzoskwinia, pomarańcza i żurawina.", it: "Vodka, pesca, arancia e mirtillo rosso." }
  },
  "Sopa Marisco": {
    name: { es: "Sopa Marisco", en: "Seafood Soup", cat: "Sopa de Marisc", fr: "Soupe de Fruits de Mer", de: "Meeresfrüchtesuppe", nl: "Zeevruchtensoep", ru: "Суп из морепродуктов", ar: "شوربة مأكولات بحرية", pl: "Zupa z owoców morza", it: "Zuppa di Mare" },
    description: { es: "Caldo intenso de pescado con trozos de marisco.", en: "Intense fish broth with pieces of seafood.", cat: "Brou intens de peix amb trossos de marisc.", fr: "Bouillon de poisson intense avec morceaux de fruits de mer.", de: "Intensive Fischbrühe mit Meeresfrüchtestücken.", nl: "Intense visbouillon met stukjes zeevruchten.", ru: "Насыщенный рыбный бульон с кусочками морепродуктов.", ar: "مرق سمك مركّز مع قطع من المأكولات البحرية.", pl: "Intensywny wywar rybny z kawałkami owoców morza.", it: "Brodo di pesce intenso con pezzi di frutti di mare." }
  },
  "Pizza Tropical": {
    name: { es: "Pizza Tropical", en: "Tropical Pizza", cat: "Pizza Tropical", fr: "Pizza Tropicale", de: "Tropical-Pizza", nl: "Tropische Pizza", ru: "Пицца тропикаль", ar: "بيتزا استوائية", pl: "Pizza Tropikalna", it: "Pizza Tropicale" },
    description: { es: "Tomate, queso, maíz y piña dulce.", en: "Tomato, cheese, corn and sweet pineapple.", cat: "Tomàquet, formatge, blat de moro i pinya dolça.", fr: "Tomate, fromage, maïs et ananas sucré.", de: "Tomate, Käse, Mais und süße Ananas.", nl: "Tomaat, kaas, maïs en zoete ananas.", ru: "Томат, сыр, кукуруза и сладкий ананас.", ar: "طماطم وجبن وذرة وأناناس حلو.", pl: "Pomidor, ser, kukurydza i słodki ananas.", it: "Pomodoro, formaggio, mais e ananas dolce." }
  },
  "Turca": {
    name: { es: "Turca", en: "Turkish Salad", cat: "Turca", fr: "Salade Turque", de: "Türkischer Salat", nl: "Turkse Salade", ru: "Турецкий салат", ar: "سلطة تركية", pl: "Sałatka turecka", it: "Insalata Turca" },
    description: { es: "Pimiento, tomate fresco, cebolla y pepino.", en: "Pepper, fresh tomato, onion and cucumber.", cat: "Pebrot, tomàquet fresc, ceba i cogombre.", fr: "Poivron, tomate fraîche, oignon et concombre.", de: "Paprika, frische Tomate, Zwiebel und Gurke.", nl: "Paprika, verse tomaat, ui en komkommer.", ru: "Перец, свежий помидор, лук и огурец.", ar: "فلفل وطماطم طازجة وبصل وخيار.", pl: "Papryka, świeży pomidor, cebula i ogórek.", it: "Peperone, pomodoro fresco, cipolla e cetriolo." }
  },
  "Vegetable Biryani": {
    name: { es: "Vegetable Biryani", en: "Vegetable Biryani", cat: "Vegetable Biryani", fr: "Vegetable Biryani", de: "Vegetable Biryani", nl: "Vegetable Biryani", ru: "Веджетебл бирьяни", ar: "خضار برياني", pl: "Vegetable Biryani", it: "Vegetable Biryani" },
    description: { es: "Arroz basmati especiado con verduras mixtas.", en: "Spiced basmati rice with mixed vegetables.", cat: "Arròs basmati especiat amb verdures mixtes.", fr: "Riz basmati épicé aux légumes variés.", de: "Gewürzter Basmatireis mit gemischtem Gemüse.", nl: "Gekruide basmatirijst met gemengde groenten.", ru: "Пряный рис басмати со смешанными овощами.", ar: "أرز بسمتي متبل مع خضار مشكلة.", pl: "Przyprawiony ryż basmati z mieszanymi warzywami.", it: "Riso basmati speziato con verdure miste." }
  },
  "Pizza Vegetariana": {
    name: { es: "Pizza Vegetariana", en: "Vegetarian Pizza", cat: "Pizza Vegetariana", fr: "Pizza Végétarienne", de: "Vegetarische Pizza", nl: "Vegetarische Pizza", ru: "Вегетарианская пицца", ar: "بيتزا نباتية", pl: "Pizza Wegetariańska", it: "Pizza Vegetariana" },
    description: { es: "Tomate, queso, pimientos, maíz, cebolla y olivas.", en: "Tomato, cheese, peppers, corn, onion and olives.", cat: "Tomàquet, formatge, pebrots, blat de moro, ceba i olives.", fr: "Tomate, fromage, poivrons, maïs, oignon et olives.", de: "Tomate, Käse, Paprika, Mais, Zwiebel und Oliven.", nl: "Tomaat, kaas, paprika, maïs, ui en olijven.", ru: "Томат, сыр, перец, кукуруза, лук и оливки.", ar: "طماطم وجبن وفلفل وذرة وبصل وزيتون.", pl: "Pomidor, ser, papryka, kukurydza, cebula i oliwki.", it: "Pomodoro, formaggio, peperoni, mais, cipolla e olive." }
  },
  "Vinos (Copa o Botella)": {
    name: { es: "Vinos (Copa o Botella)", en: "Wines (Glass or Bottle)", cat: "Vins (Copa o Ampolla)", fr: "Vins (Verre ou Bouteille)", de: "Weine (Glas oder Flasche)", nl: "Wijnen (Glas of Fles)", ru: "Вина (бокал или бутылка)", ar: "نبيذ (كأس أو زجاجة)", pl: "Wina (kieliszek lub butelka)", it: "Vini (Calice o Bottiglia)" },
    description: { es: "Selección de tintos, blancos y rosados.", en: "Selection of reds, whites and rosés.", cat: "Selecció de negres, blancs i rosats.", fr: "Sélection de rouges, blancs et rosés.", de: "Auswahl an Rot-, Weiß- und Roséweinen.", nl: "Selectie van rode, witte en roséwijnen.", ru: "Выбор красных, белых и розовых вин.", ar: "تشكيلة من النبيذ الأحمر والأبيض والوردي.", pl: "Wybór win czerwonych, białych i różowych.", it: "Selezione di rossi, bianchi e rosati." }
  }
}
