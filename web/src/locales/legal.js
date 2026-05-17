// Contenido legal traducido a los 10 idiomas (es,en,cat,fr,de,nl,ru,ar,pl,it).
// Datos de empresa (Amigos 2, NIF, dirección, teléfono, email) NO se traducen.
// Tokens en los textos: {email} {aepd} {gprivacy}  ->  resueltos en LegalModal.
// Negrita con **...**. Estructura: doc = [ { h2:{L}, blocks:[ b ] } ]
//   b = { p:{L} } | { ul:[{L},...] } | { data:[{label:{L}, value:"..."}] }

const L = (es, en, cat, fr, de, nl, ru, ar, pl, it) => ({ es, en, cat, fr, de, nl, ru, ar, pl, it })

export const LEGAL_TITLES = {
  aviso: L("Aviso Legal", "Legal Notice", "Avís Legal", "Mentions Légales", "Impressum", "Juridische Kennisgeving", "Правовая информация", "إشعار قانوني", "Nota prawna", "Note Legali"),
  privacidad: L("Política de Privacidad", "Privacy Policy", "Política de Privacitat", "Politique de Confidentialité", "Datenschutzerklärung", "Privacybeleid", "Политика конфиденциальности", "سياسة الخصوصية", "Polityka prywatności", "Informativa sulla Privacy"),
  cookies: L("Política de Cookies", "Cookie Policy", "Política de Cookies", "Politique de Cookies", "Cookie-Richtlinie", "Cookiebeleid", "Политика использования файлов cookie", "سياسة ملفات تعريف الارتباط", "Polityka plików cookie", "Informativa sui Cookie"),
}

const LBL = {
  denominacion: L("Denominación", "Name", "Denominació", "Dénomination", "Bezeichnung", "Naam", "Наименование", "الاسم", "Nazwa", "Denominazione"),
  nif: L("NIF/NIE", "Tax ID", "NIF/NIE", "NIF/NIE", "Steuer-ID", "Fiscaal nr.", "ИНН", "الرقم الضريبي", "NIP", "Codice fiscale"),
  domicilio: L("Domicilio", "Address", "Domicili", "Domicile", "Anschrift", "Adres", "Адрес", "العنوان", "Adres", "Indirizzo"),
  direccion: L("Dirección", "Address", "Adreça", "Adresse", "Adresse", "Adres", "Адрес", "العنوان", "Adres", "Indirizzo"),
  telefono: L("Teléfono", "Phone", "Telèfon", "Téléphone", "Telefon", "Telefoon", "Телефон", "الهاتف", "Telefon", "Telefono"),
  email: L("Email", "Email", "Email", "E-mail", "E-Mail", "E-mail", "Эл. почта", "البريد الإلكتروني", "E-mail", "Email"),
  web: L("Web", "Website", "Web", "Site web", "Webseite", "Website", "Веб-сайт", "الموقع", "Strona", "Sito web"),
  responsable: L("Responsable", "Data controller", "Responsable", "Responsable", "Verantwortlicher", "Verwerkingsverantwoordelijke", "Оператор", "المسؤول", "Administrator", "Titolare"),
}

const ADDR = "Calle Buenos Aires 44, 17310 Lloret de Mar, Girona"

export const LEGAL = {
  aviso: [
    {
      h2: L("1. Datos del titular", "1. Owner details", "1. Dades del titular", "1. Données du titulaire", "1. Angaben zum Betreiber", "1. Gegevens van de eigenaar", "1. Данные владельца", "1. بيانات المالك", "1. Dane właściciela", "1. Dati del titolare"),
      blocks: [
        { p: L(
          "En cumplimiento de la Ley 34/2002 (LSSI-CE), se informa:",
          "In compliance with Spanish Law 34/2002 (LSSI-CE), the following is provided:",
          "En compliment de la Llei 34/2002 (LSSI-CE), s'informa:",
          "Conformément à la loi espagnole 34/2002 (LSSI-CE), il est précisé :",
          "Gemäß dem spanischen Gesetz 34/2002 (LSSI-CE) wird informiert:",
          "In overeenstemming met de Spaanse wet 34/2002 (LSSI-CE) wordt het volgende meegedeeld:",
          "В соответствии с законом Испании 34/2002 (LSSI-CE) сообщается:",
          "امتثالاً للقانون الإسباني 34/2002 (LSSI-CE)، نُعلمكم بما يلي:",
          "Zgodnie z hiszpańską ustawą 34/2002 (LSSI-CE) informujemy:",
          "In conformità alla legge spagnola 34/2002 (LSSI-CE), si informa:") },
        { data: [
          { label: LBL.denominacion, value: "Amigos 2" },
          { label: LBL.nif, value: "X6964400T" },
          { label: LBL.domicilio, value: ADDR },
          { label: LBL.telefono, value: "+34 661 849 856" },
          { label: LBL.email, value: "{email}" },
          { label: LBL.web, value: "amigos2.com" },
        ] },
      ],
    },
    {
      h2: L("2. Objeto", "2. Purpose", "2. Objecte", "2. Objet", "2. Gegenstand", "2. Doel", "2. Предмет", "2. الغرض", "2. Przedmiot", "2. Oggetto"),
      blocks: [ { p: L(
        "El presente Aviso Legal regula el uso del sitio web amigos2.com. La navegación por el sitio atribuye la condición de usuario y supone la aceptación plena de todas las condiciones incluidas en este Aviso Legal.",
        "This Legal Notice governs the use of the website amigos2.com. Browsing the site grants the status of user and implies full acceptance of all the conditions set out in this Legal Notice.",
        "Aquest Avís Legal regula l'ús del lloc web amigos2.com. La navegació pel lloc atribueix la condició d'usuari i suposa l'acceptació plena de totes les condicions incloses en aquest Avís Legal.",
        "Les présentes mentions légales régissent l'utilisation du site amigos2.com. La navigation sur le site confère la qualité d'utilisateur et implique l'acceptation pleine de toutes les conditions énoncées dans les présentes mentions légales.",
        "Dieses Impressum regelt die Nutzung der Website amigos2.com. Das Surfen auf der Website verleiht den Status eines Nutzers und bedeutet die vollständige Annahme aller in diesem Impressum enthaltenen Bedingungen.",
        "Deze juridische kennisgeving regelt het gebruik van de website amigos2.com. Het browsen op de site verleent de status van gebruiker en houdt de volledige aanvaarding in van alle in deze kennisgeving opgenomen voorwaarden.",
        "Настоящая правовая информация регулирует использование сайта amigos2.com. Просмотр сайта предоставляет статус пользователя и означает полное принятие всех условий, изложенных здесь.",
        "يحكم هذا الإشعار القانوني استخدام موقع amigos2.com. يمنح تصفح الموقع صفة المستخدم ويعني القبول الكامل لجميع الشروط الواردة في هذا الإشعار.",
        "Niniejsza nota prawna reguluje korzystanie ze strony amigos2.com. Przeglądanie strony nadaje status użytkownika i oznacza pełną akceptację wszystkich zawartych tu warunków.",
        "La presente Nota Legale disciplina l'uso del sito amigos2.com. La navigazione nel sito attribuisce la qualifica di utente e comporta la piena accettazione di tutte le condizioni qui incluse.") } ],
    },
    {
      h2: L("3. Propiedad intelectual", "3. Intellectual property", "3. Propietat intel·lectual", "3. Propriété intellectuelle", "3. Geistiges Eigentum", "3. Intellectueel eigendom", "3. Интеллектуальная собственность", "3. الملكية الفكرية", "3. Własność intelektualna", "3. Proprietà intellettuale"),
      blocks: [ { p: L(
        "Los contenidos del sitio web (textos, imágenes, diseño gráfico, código fuente) son propiedad de Amigos 2 o de terceros con licencia y están protegidos por la legislación española e internacional. Queda prohibida su reproducción sin autorización expresa.",
        "The website content (texts, images, graphic design, source code) is owned by Amigos 2 or by licensed third parties and is protected by Spanish and international law. Reproduction without express authorisation is prohibited.",
        "Els continguts del lloc web (textos, imatges, disseny gràfic, codi font) són propietat d'Amigos 2 o de tercers amb llicència i estan protegits per la legislació espanyola i internacional. Queda prohibida la seva reproducció sense autorització expressa.",
        "Le contenu du site (textes, images, design graphique, code source) est la propriété d'Amigos 2 ou de tiers sous licence et est protégé par la législation espagnole et internationale. Toute reproduction sans autorisation expresse est interdite.",
        "Die Inhalte der Website (Texte, Bilder, Grafikdesign, Quellcode) sind Eigentum von Amigos 2 oder lizenzierter Dritter und durch spanisches und internationales Recht geschützt. Eine Vervielfältigung ohne ausdrückliche Genehmigung ist untersagt.",
        "De inhoud van de website (teksten, afbeeldingen, grafisch ontwerp, broncode) is eigendom van Amigos 2 of van gelicentieerde derden en wordt beschermd door Spaans en internationaal recht. Reproductie zonder uitdrukkelijke toestemming is verboden.",
        "Содержимое сайта (тексты, изображения, графический дизайн, исходный код) принадлежит Amigos 2 или лицензированным третьим лицам и защищено испанским и международным правом. Воспроизведение без явного разрешения запрещено.",
        "محتويات الموقع (النصوص والصور والتصميم الجرافيكي والشيفرة المصدرية) ملك لـ Amigos 2 أو لأطراف ثالثة مرخّصة، وهي محمية بموجب القانون الإسباني والدولي. يُحظر إعادة إنتاجها دون إذن صريح.",
        "Treści serwisu (teksty, obrazy, projekt graficzny, kod źródłowy) są własnością Amigos 2 lub licencjonowanych podmiotów trzecich i są chronione prawem hiszpańskim i międzynarodowym. Powielanie bez wyraźnej zgody jest zabronione.",
        "I contenuti del sito (testi, immagini, design grafico, codice sorgente) sono di proprietà di Amigos 2 o di terzi su licenza e sono protetti dalla legge spagnola e internazionale. È vietata la riproduzione senza autorizzazione espressa.") } ],
    },
    {
      h2: L("4. Responsabilidad", "4. Liability", "4. Responsabilitat", "4. Responsabilité", "4. Haftung", "4. Aansprakelijkheid", "4. Ответственность", "4. المسؤولية", "4. Odpowiedzialność", "4. Responsabilità"),
      blocks: [ { p: L(
        "Amigos 2 no se hace responsable de los daños causados por el uso indebido del sitio web ni por la información obtenida a través de él.",
        "Amigos 2 is not liable for damages caused by improper use of the website or for information obtained through it.",
        "Amigos 2 no es fa responsable dels danys causats per l'ús indegut del lloc web ni per la informació obtinguda a través d'ell.",
        "Amigos 2 n'est pas responsable des dommages causés par une utilisation abusive du site ni des informations obtenues par son intermédiaire.",
        "Amigos 2 haftet nicht für Schäden durch unsachgemäße Nutzung der Website oder für darüber erhaltene Informationen.",
        "Amigos 2 is niet aansprakelijk voor schade door oneigenlijk gebruik van de website of voor via de site verkregen informatie.",
        "Amigos 2 не несёт ответственности за ущерб, причинённый ненадлежащим использованием сайта, или за полученную через него информацию.",
        "لا تتحمل Amigos 2 المسؤولية عن الأضرار الناجمة عن سوء استخدام الموقع أو عن المعلومات التي يتم الحصول عليها من خلاله.",
        "Amigos 2 nie ponosi odpowiedzialności za szkody spowodowane niewłaściwym korzystaniem ze strony ani za informacje uzyskane za jej pośrednictwem.",
        "Amigos 2 non è responsabile dei danni causati da un uso improprio del sito né delle informazioni ottenute tramite esso.") } ],
    },
    {
      h2: L("5. Legislación aplicable", "5. Applicable law", "5. Legislació aplicable", "5. Loi applicable", "5. Anwendbares Recht", "5. Toepasselijk recht", "5. Применимое право", "5. القانون المعمول به", "5. Prawo właściwe", "5. Legge applicabile"),
      blocks: [ { p: L(
        "Las presentes condiciones se rigen por la legislación española. Para la resolución de controversias, las partes se someten a los Juzgados y Tribunales de Girona.",
        "These conditions are governed by Spanish law. For the resolution of disputes, the parties submit to the Courts and Tribunals of Girona.",
        "Aquestes condicions es regeixen per la legislació espanyola. Per a la resolució de controvèrsies, les parts se sotmeten als Jutjats i Tribunals de Girona.",
        "Les présentes conditions sont régies par la loi espagnole. Pour la résolution des litiges, les parties se soumettent aux tribunaux de Gérone.",
        "Diese Bedingungen unterliegen spanischem Recht. Für die Beilegung von Streitigkeiten unterwerfen sich die Parteien den Gerichten von Girona.",
        "Deze voorwaarden vallen onder Spaans recht. Voor geschillenbeslechting onderwerpen de partijen zich aan de rechtbanken van Girona.",
        "Настоящие условия регулируются законодательством Испании. Для разрешения споров стороны обращаются в суды Жироны.",
        "تخضع هذه الشروط للقانون الإسباني. ولحل النزاعات، يخضع الطرفان لمحاكم جيرونا.",
        "Niniejsze warunki podlegają prawu hiszpańskiemu. W celu rozstrzygania sporów strony poddają się sądom w Gironie.",
        "Le presenti condizioni sono regolate dalla legge spagnola. Per la risoluzione delle controversie, le parti si sottomettono ai Tribunali di Girona.") } ],
    },
  ],

  privacidad: [
    {
      h2: L("1. Responsable del tratamiento", "1. Data controller", "1. Responsable del tractament", "1. Responsable du traitement", "1. Verantwortlicher", "1. Verwerkingsverantwoordelijke", "1. Оператор данных", "1. المسؤول عن المعالجة", "1. Administrator danych", "1. Titolare del trattamento"),
      blocks: [ { data: [
        { label: LBL.responsable, value: "Amigos 2" },
        { label: LBL.nif, value: "X6964400T" },
        { label: LBL.direccion, value: ADDR },
        { label: LBL.email, value: "{email}" },
      ] } ],
    },
    {
      h2: L("2. Datos que recogemos", "2. Data we collect", "2. Dades que recollim", "2. Données que nous collectons", "2. Erhobene Daten", "2. Gegevens die wij verzamelen", "2. Какие данные мы собираем", "2. البيانات التي نجمعها", "2. Jakie dane zbieramy", "2. Dati che raccogliamo"),
      blocks: [ { p: L(
        "Únicamente recogemos los datos que usted facilita voluntariamente a través del formulario de contacto: nombre, correo electrónico y mensaje.",
        "We only collect the data you voluntarily provide through the contact form: name, email and message.",
        "Únicament recollim les dades que vostè facilita voluntàriament a través del formulari de contacte: nom, correu electrònic i missatge.",
        "Nous ne collectons que les données que vous fournissez volontairement via le formulaire de contact : nom, e-mail et message.",
        "Wir erheben nur die Daten, die Sie freiwillig über das Kontaktformular angeben: Name, E-Mail und Nachricht.",
        "Wij verzamelen alleen de gegevens die u vrijwillig via het contactformulier verstrekt: naam, e-mail en bericht.",
        "Мы собираем только данные, которые вы добровольно предоставляете через форму контакта: имя, эл. почту и сообщение.",
        "نجمع فقط البيانات التي تقدمها طوعًا عبر نموذج الاتصال: الاسم والبريد الإلكتروني والرسالة.",
        "Zbieramy wyłącznie dane podane dobrowolnie przez formularz kontaktowy: imię, e-mail i wiadomość.",
        "Raccogliamo solo i dati che fornisci volontariamente tramite il modulo di contatto: nome, e-mail e messaggio.") } ],
    },
    {
      h2: L("3. Finalidad", "3. Purpose", "3. Finalitat", "3. Finalité", "3. Zweck", "3. Doel", "3. Цель", "3. الغرض", "3. Cel", "3. Finalità"),
      blocks: [
        { p: L("Los datos se utilizan exclusivamente para:", "The data is used exclusively to:", "Les dades s'utilitzen exclusivament per a:", "Les données sont utilisées exclusivement pour :", "Die Daten werden ausschließlich verwendet, um:", "De gegevens worden uitsluitend gebruikt om:", "Данные используются исключительно для:", "تُستخدم البيانات حصريًا من أجل:", "Dane są wykorzystywane wyłącznie do:", "I dati sono utilizzati esclusivamente per:") },
        { ul: [
          L("Responder a las consultas enviadas a través del formulario de contacto.", "Respond to enquiries sent through the contact form.", "Respondre a les consultes enviades a través del formulari de contacte.", "Répondre aux demandes envoyées via le formulaire de contact.", "Anfragen über das Kontaktformular zu beantworten.", "Reageren op vragen die via het contactformulier zijn verzonden.", "Ответа на запросы, отправленные через форму контакта.", "الرد على الاستفسارات المرسلة عبر نموذج الاتصال.", "Odpowiadania na zapytania wysłane przez formularz kontaktowy.", "Rispondere alle richieste inviate tramite il modulo di contatto."),
          L("Gestionar la relación comercial si así se solicita.", "Manage the business relationship if requested.", "Gestionar la relació comercial si així es sol·licita.", "Gérer la relation commerciale si demandé.", "Die Geschäftsbeziehung auf Wunsch zu verwalten.", "De zakelijke relatie te beheren indien gevraagd.", "Управления деловыми отношениями по запросу.", "إدارة العلاقة التجارية عند الطلب.", "Zarządzania relacją biznesową na życzenie.", "Gestire il rapporto commerciale se richiesto."),
        ] },
        { p: L("No utilizamos sus datos para publicidad ni los cedemos a terceros.", "We do not use your data for advertising or share it with third parties.", "No utilitzem les seves dades per a publicitat ni les cedim a tercers.", "Nous n'utilisons pas vos données à des fins publicitaires et ne les cédons pas à des tiers.", "Wir verwenden Ihre Daten nicht für Werbung und geben sie nicht an Dritte weiter.", "Wij gebruiken uw gegevens niet voor reclame en delen ze niet met derden.", "Мы не используем ваши данные для рекламы и не передаём их третьим лицам.", "لا نستخدم بياناتك للإعلان ولا نشاركها مع أطراف ثالثة.", "Nie wykorzystujemy Twoich danych do reklamy ani nie przekazujemy ich osobom trzecim.", "Non utilizziamo i tuoi dati per pubblicità né li cediamo a terzi.") },
      ],
    },
    {
      h2: L("4. Legitimación", "4. Legal basis", "4. Legitimació", "4. Base légale", "4. Rechtsgrundlage", "4. Rechtsgrond", "4. Правовое основание", "4. الأساس القانوني", "4. Podstawa prawna", "4. Base giuridica"),
      blocks: [ { p: L(
        "La base legal es el consentimiento del interesado, otorgado mediante el envío voluntario del formulario de contacto.",
        "The legal basis is the consent of the data subject, given by voluntarily submitting the contact form.",
        "La base legal és el consentiment de l'interessat, atorgat mitjançant l'enviament voluntari del formulari de contacte.",
        "La base légale est le consentement de la personne concernée, donné par l'envoi volontaire du formulaire de contact.",
        "Rechtsgrundlage ist die Einwilligung der betroffenen Person durch das freiwillige Absenden des Kontaktformulars.",
        "De rechtsgrond is de toestemming van de betrokkene, gegeven door het vrijwillig verzenden van het contactformulier.",
        "Правовое основание — согласие субъекта данных, выраженное добровольной отправкой формы контакта.",
        "الأساس القانوني هو موافقة صاحب البيانات، الممنوحة بإرسال نموذج الاتصال طوعًا.",
        "Podstawą prawną jest zgoda osoby, której dane dotyczą, wyrażona przez dobrowolne wysłanie formularza.",
        "La base giuridica è il consenso dell'interessato, prestato mediante l'invio volontario del modulo di contatto.") } ],
    },
    {
      h2: L("5. Conservación", "5. Retention", "5. Conservació", "5. Conservation", "5. Aufbewahrung", "5. Bewaring", "5. Хранение", "5. مدة الحفظ", "5. Przechowywanie", "5. Conservazione"),
      blocks: [ { p: L(
        "Los datos se conservarán durante el tiempo necesario para atender su solicitud y, posteriormente, durante los plazos legalmente exigibles.",
        "The data will be kept for as long as necessary to handle your request and thereafter for the legally required periods.",
        "Les dades es conservaran durant el temps necessari per atendre la seva sol·licitud i, posteriorment, durant els terminis legalment exigibles.",
        "Les données seront conservées le temps nécessaire au traitement de votre demande, puis pendant les délais légalement exigibles.",
        "Die Daten werden so lange aufbewahrt, wie es zur Bearbeitung Ihrer Anfrage erforderlich ist, und danach für die gesetzlich vorgeschriebenen Fristen.",
        "De gegevens worden bewaard zolang nodig is om uw verzoek te behandelen en daarna gedurende de wettelijk vereiste termijnen.",
        "Данные хранятся столько, сколько необходимо для обработки запроса, а затем в течение установленных законом сроков.",
        "تُحفظ البيانات للمدة اللازمة لمعالجة طلبك ثم للمدد المطلوبة قانونًا.",
        "Dane będą przechowywane przez czas niezbędny do obsługi żądania, a następnie przez okresy wymagane prawem.",
        "I dati saranno conservati per il tempo necessario a gestire la richiesta e successivamente per i periodi previsti dalla legge.") } ],
    },
    {
      h2: L("6. Derechos del usuario", "6. User rights", "6. Drets de l'usuari", "6. Droits de l'utilisateur", "6. Rechte des Nutzers", "6. Rechten van de gebruiker", "6. Права пользователя", "6. حقوق المستخدم", "6. Prawa użytkownika", "6. Diritti dell'utente"),
      blocks: [ { p: L(
        'Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando un email a {email} con el asunto "Protección de Datos".',
        'You may exercise your rights of access, rectification, erasure, objection, restriction and portability by emailing {email} with the subject "Data Protection".',
        'Pot exercir els seus drets d\'accés, rectificació, supressió, oposició, limitació i portabilitat enviant un email a {email} amb l\'assumpte "Protecció de Dades".',
        'Vous pouvez exercer vos droits d\'accès, de rectification, d\'effacement, d\'opposition, de limitation et de portabilité en écrivant à {email} avec l\'objet « Protection des données ».',
        'Sie können Ihre Rechte auf Auskunft, Berichtigung, Löschung, Widerspruch, Einschränkung und Übertragbarkeit per E-Mail an {email} mit dem Betreff „Datenschutz" ausüben.',
        'U kunt uw rechten op inzage, rectificatie, wissing, bezwaar, beperking en overdraagbaarheid uitoefenen door te mailen naar {email} met het onderwerp "Gegevensbescherming".',
        'Вы можете реализовать права на доступ, исправление, удаление, возражение, ограничение и переносимость, написав на {email} с темой «Защита данных».',
        'يمكنك ممارسة حقوقك في الوصول والتصحيح والحذف والاعتراض والتقييد والنقل بإرسال بريد إلى {email} بعنوان "حماية البيانات".',
        'Możesz realizować prawa dostępu, sprostowania, usunięcia, sprzeciwu, ograniczenia i przenoszenia, pisząc na {email} z tematem „Ochrona danych".',
        'Puoi esercitare i diritti di accesso, rettifica, cancellazione, opposizione, limitazione e portabilità scrivendo a {email} con oggetto "Protezione dei dati".') } ],
    },
    {
      h2: L("7. Seguridad", "7. Security", "7. Seguretat", "7. Sécurité", "7. Sicherheit", "7. Beveiliging", "7. Безопасность", "7. الأمان", "7. Bezpieczeństwo", "7. Sicurezza"),
      blocks: [ { p: L(
        "Los datos se almacenan en Supabase (Supabase Inc.), que cumple con el RGPD y dispone de las medidas de seguridad técnicas y organizativas adecuadas.",
        "Data is stored on Supabase (Supabase Inc.), which complies with the GDPR and has appropriate technical and organisational security measures.",
        "Les dades s'emmagatzemen a Supabase (Supabase Inc.), que compleix el RGPD i disposa de les mesures de seguretat tècniques i organitzatives adequades.",
        "Les données sont stockées sur Supabase (Supabase Inc.), conforme au RGPD et disposant de mesures de sécurité techniques et organisationnelles adéquates.",
        "Die Daten werden bei Supabase (Supabase Inc.) gespeichert, das die DSGVO erfüllt und über angemessene technische und organisatorische Sicherheitsmaßnahmen verfügt.",
        "Gegevens worden opgeslagen op Supabase (Supabase Inc.), dat voldoet aan de AVG en passende technische en organisatorische beveiligingsmaatregelen heeft.",
        "Данные хранятся в Supabase (Supabase Inc.), которая соответствует GDPR и имеет надлежащие технические и организационные меры безопасности.",
        "تُخزَّن البيانات على Supabase (Supabase Inc.) المتوافقة مع اللائحة العامة لحماية البيانات وتتوفر لديها تدابير أمان تقنية وتنظيمية مناسبة.",
        "Dane są przechowywane w Supabase (Supabase Inc.), zgodnym z RODO i posiadającym odpowiednie środki bezpieczeństwa.",
        "I dati sono archiviati su Supabase (Supabase Inc.), conforme al GDPR e dotata di adeguate misure di sicurezza tecniche e organizzative.") } ],
    },
    {
      h2: L("8. Reclamaciones", "8. Complaints", "8. Reclamacions", "8. Réclamations", "8. Beschwerden", "8. Klachten", "8. Жалобы", "8. الشكاوى", "8. Skargi", "8. Reclami"),
      blocks: [ { p: L(
        "Si considera que el tratamiento no es adecuado, puede presentar una reclamación ante la Agencia Española de Protección de Datos {aepd}.",
        "If you believe the processing is not appropriate, you may file a complaint with the Spanish Data Protection Agency {aepd}.",
        "Si considera que el tractament no és adequat, pot presentar una reclamació davant l'Agència Espanyola de Protecció de Dades {aepd}.",
        "Si vous estimez que le traitement n'est pas adéquat, vous pouvez déposer une réclamation auprès de l'Agence espagnole de protection des données {aepd}.",
        "Wenn Sie der Ansicht sind, dass die Verarbeitung nicht angemessen ist, können Sie eine Beschwerde bei der spanischen Datenschutzbehörde {aepd} einreichen.",
        "Als u vindt dat de verwerking niet passend is, kunt u een klacht indienen bij het Spaanse gegevensbeschermingsagentschap {aepd}.",
        "Если вы считаете, что обработка ненадлежащая, вы можете подать жалобу в Испанское агентство по защите данных {aepd}.",
        "إذا رأيت أن المعالجة غير ملائمة، يمكنك تقديم شكوى إلى الوكالة الإسبانية لحماية البيانات {aepd}.",
        "Jeśli uważasz, że przetwarzanie jest nieodpowiednie, możesz złożyć skargę do Hiszpańskiej Agencji Ochrony Danych {aepd}.",
        "Se ritieni che il trattamento non sia adeguato, puoi presentare un reclamo all'Agenzia spagnola di protezione dei dati {aepd}.") } ],
    },
  ],

  cookies: [
    {
      h2: L("1. ¿Qué son las cookies?", "1. What are cookies?", "1. Què són les cookies?", "1. Que sont les cookies ?", "1. Was sind Cookies?", "1. Wat zijn cookies?", "1. Что такое cookie?", "1. ما هي ملفات تعريف الارتباط؟", "1. Czym są pliki cookie?", "1. Cosa sono i cookie?"),
      blocks: [ { p: L(
        "Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Se utilizan para recordar sus preferencias y mejorar su experiencia de navegación.",
        "Cookies are small text files stored on your device when you visit a website. They are used to remember your preferences and improve your browsing experience.",
        "Les cookies són petits arxius de text que s'emmagatzemen al seu dispositiu quan visita un lloc web. S'utilitzen per recordar les seves preferències i millorar l'experiència de navegació.",
        "Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous visitez un site web. Ils servent à mémoriser vos préférences et à améliorer votre navigation.",
        "Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät gespeichert werden. Sie dienen dazu, Ihre Präferenzen zu speichern und Ihr Surferlebnis zu verbessern.",
        "Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen wanneer u een website bezoekt. Ze onthouden uw voorkeuren en verbeteren uw surfervaring.",
        "Cookie — это небольшие текстовые файлы, сохраняемые на вашем устройстве при посещении сайта. Они запоминают ваши настройки и улучшают просмотр.",
        "ملفات تعريف الارتباط هي ملفات نصية صغيرة تُخزَّن على جهازك عند زيارة موقع. تُستخدم لتذكّر تفضيلاتك وتحسين تجربة التصفح.",
        "Pliki cookie to małe pliki tekstowe zapisywane na urządzeniu podczas odwiedzania strony. Służą do zapamiętywania preferencji i poprawy przeglądania.",
        "I cookie sono piccoli file di testo memorizzati sul dispositivo quando si visita un sito web. Servono a ricordare le preferenze e migliorare la navigazione.") } ],
    },
    {
      h2: L("2. Cookies que utiliza esta web", "2. Cookies used on this site", "2. Cookies que utilitza aquesta web", "2. Cookies utilisés sur ce site", "2. Auf dieser Website verwendete Cookies", "2. Cookies die deze site gebruikt", "2. Какие cookie использует этот сайт", "2. ملفات الارتباط التي يستخدمها هذا الموقع", "2. Pliki cookie używane na tej stronie", "2. Cookie utilizzati da questo sito"),
      blocks: [
        { p: L("Esta web utiliza únicamente cookies técnicas estrictamente necesarias:", "This site uses only strictly necessary technical cookies:", "Aquesta web utilitza únicament cookies tècniques estrictament necessàries:", "Ce site n'utilise que des cookies techniques strictement nécessaires :", "Diese Website verwendet nur unbedingt erforderliche technische Cookies:", "Deze site gebruikt alleen strikt noodzakelijke technische cookies:", "Этот сайт использует только строго необходимые технические cookie:", "يستخدم هذا الموقع فقط ملفات تعريف ارتباط تقنية ضرورية:", "Ta strona używa wyłącznie ściśle niezbędnych technicznych plików cookie:", "Questo sito utilizza solo cookie tecnici strettamente necessari:") },
        { ul: [
          L("**Cookies de sesión:** permiten mantener la navegación activa durante la visita.", "**Session cookies:** keep browsing active during the visit.", "**Cookies de sessió:** permeten mantenir la navegació activa durant la visita.", "**Cookies de session :** maintiennent la navigation active pendant la visite.", "**Sitzungscookies:** halten die Navigation während des Besuchs aktiv.", "**Sessiecookies:** houden de navigatie actief tijdens het bezoek.", "**Сессионные cookie:** поддерживают навигацию активной во время визита.", "**ملفات الجلسة:** تُبقي التصفح نشطًا أثناء الزيارة.", "**Cookie sesyjne:** utrzymują aktywną nawigację podczas wizyty.", "**Cookie di sessione:** mantengono la navigazione attiva durante la visita."),
          L("**Cookies de preferencias:** almacenan el idioma seleccionado.", "**Preference cookies:** store the selected language.", "**Cookies de preferències:** emmagatzemen l'idioma seleccionat.", "**Cookies de préférences :** mémorisent la langue sélectionnée.", "**Präferenzcookies:** speichern die gewählte Sprache.", "**Voorkeurscookies:** slaan de gekozen taal op.", "**Cookie настроек:** хранят выбранный язык.", "**ملفات التفضيلات:** تخزّن اللغة المختارة.", "**Cookie preferencji:** przechowują wybrany język.", "**Cookie di preferenza:** memorizzano la lingua selezionata."),
        ] },
        { p: L(
          "Esta web **NO** utiliza cookies de análisis, publicidad ni seguimiento de terceros. NO usamos Google Analytics ni ninguna herramienta de rastreo.",
          "This site does **NOT** use analytics, advertising or third-party tracking cookies. We do NOT use Google Analytics or any tracking tool.",
          "Aquesta web **NO** utilitza cookies d'anàlisi, publicitat ni seguiment de tercers. NO fem servir Google Analytics ni cap eina de rastreig.",
          "Ce site n'utilise **PAS** de cookies d'analyse, de publicité ou de suivi tiers. Nous n'utilisons PAS Google Analytics ni aucun outil de suivi.",
          "Diese Website verwendet **KEINE** Analyse-, Werbe- oder Tracking-Cookies Dritter. Wir verwenden KEIN Google Analytics oder Tracking-Tools.",
          "Deze site gebruikt **GEEN** analyse-, advertentie- of trackingcookies van derden. Wij gebruiken GEEN Google Analytics of trackingtools.",
          "Этот сайт **НЕ** использует аналитические, рекламные или сторонние трекинговые cookie. Мы НЕ используем Google Analytics или инструменты отслеживания.",
          "هذا الموقع **لا** يستخدم ملفات تحليل أو إعلان أو تتبع من أطراف ثالثة. لا نستخدم Google Analytics أو أي أداة تتبع.",
          "Ta strona **NIE** używa plików analitycznych, reklamowych ani śledzących osób trzecich. NIE używamy Google Analytics ani narzędzi śledzących.",
          "Questo sito **NON** utilizza cookie di analisi, pubblicità o tracciamento di terzi. NON usiamo Google Analytics né strumenti di tracciamento.") },
      ],
    },
    {
      h2: L("3. Cookies de terceros", "3. Third-party cookies", "3. Cookies de tercers", "3. Cookies tiers", "3. Cookies von Dritten", "3. Cookies van derden", "3. Сторонние cookie", "3. ملفات الأطراف الثالثة", "3. Pliki cookie osób trzecich", "3. Cookie di terze parti"),
      blocks: [ { p: L(
        "El mapa de Google Maps integrado puede generar cookies propias de Google. Más información: {gprivacy}.",
        "The embedded Google Maps map may generate Google's own cookies. More information: {gprivacy}.",
        "El mapa de Google Maps integrat pot generar cookies pròpies de Google. Més informació: {gprivacy}.",
        "La carte Google Maps intégrée peut générer des cookies propres à Google. Plus d'informations : {gprivacy}.",
        "Die eingebettete Google-Maps-Karte kann eigene Cookies von Google erzeugen. Mehr Informationen: {gprivacy}.",
        "De ingesloten Google Maps-kaart kan eigen cookies van Google genereren. Meer informatie: {gprivacy}.",
        "Встроенная карта Google Maps может создавать собственные cookie Google. Подробнее: {gprivacy}.",
        "قد تولّد خريطة Google Maps المضمّنة ملفات تعريف ارتباط خاصة بـ Google. مزيد من المعلومات: {gprivacy}.",
        "Osadzona mapa Google Maps może generować własne pliki cookie Google. Więcej informacji: {gprivacy}.",
        "La mappa Google Maps integrata può generare cookie propri di Google. Maggiori informazioni: {gprivacy}.") } ],
    },
    {
      h2: L("4. ¿Cómo desactivar las cookies?", "4. How to disable cookies?", "4. Com desactivar les cookies?", "4. Comment désactiver les cookies ?", "4. Wie deaktiviert man Cookies?", "4. Hoe cookies uitschakelen?", "4. Как отключить cookie?", "4. كيف تعطّل ملفات الارتباط؟", "4. Jak wyłączyć pliki cookie?", "4. Come disattivare i cookie?"),
      blocks: [
        { p: L("Puede configurar su navegador para rechazar o eliminar las cookies:", "You can set your browser to reject or delete cookies:", "Pot configurar el navegador per rebutjar o eliminar les cookies:", "Vous pouvez configurer votre navigateur pour refuser ou supprimer les cookies :", "Sie können Ihren Browser so einstellen, dass Cookies abgelehnt oder gelöscht werden:", "U kunt uw browser instellen om cookies te weigeren of te verwijderen:", "Вы можете настроить браузер на отклонение или удаление cookie:", "يمكنك ضبط متصفحك لرفض ملفات الارتباط أو حذفها:", "Możesz ustawić przeglądarkę tak, aby odrzucała lub usuwała pliki cookie:", "Puoi configurare il browser per rifiutare o eliminare i cookie:") },
        { ul: [
          L("**Chrome:** Configuración → Privacidad → Cookies", "**Chrome:** Settings → Privacy → Cookies", "**Chrome:** Configuració → Privacitat → Cookies", "**Chrome :** Paramètres → Confidentialité → Cookies", "**Chrome:** Einstellungen → Datenschutz → Cookies", "**Chrome:** Instellingen → Privacy → Cookies", "**Chrome:** Настройки → Конфиденциальность → Файлы cookie", "**Chrome:** الإعدادات ← الخصوصية ← ملفات الارتباط", "**Chrome:** Ustawienia → Prywatność → Pliki cookie", "**Chrome:** Impostazioni → Privacy → Cookie"),
          L("**Firefox:** Opciones → Privacidad → Cookies", "**Firefox:** Options → Privacy → Cookies", "**Firefox:** Opcions → Privacitat → Cookies", "**Firefox :** Options → Vie privée → Cookies", "**Firefox:** Optionen → Datenschutz → Cookies", "**Firefox:** Opties → Privacy → Cookies", "**Firefox:** Настройки → Приватность → Куки", "**Firefox:** الخيارات ← الخصوصية ← ملفات الارتباط", "**Firefox:** Opcje → Prywatność → Pliki cookie", "**Firefox:** Opzioni → Privacy → Cookie"),
          L("**Safari:** Preferencias → Privacidad → Cookies", "**Safari:** Preferences → Privacy → Cookies", "**Safari:** Preferències → Privacitat → Cookies", "**Safari :** Préférences → Confidentialité → Cookies", "**Safari:** Einstellungen → Datenschutz → Cookies", "**Safari:** Voorkeuren → Privacy → Cookies", "**Safari:** Настройки → Конфиденциальность → Cookie", "**Safari:** التفضيلات ← الخصوصية ← ملفات الارتباط", "**Safari:** Preferencje → Prywatność → Pliki cookie", "**Safari:** Preferenze → Privacy → Cookie"),
          L("**Edge:** Configuración → Privacidad → Cookies", "**Edge:** Settings → Privacy → Cookies", "**Edge:** Configuració → Privacitat → Cookies", "**Edge :** Paramètres → Confidentialité → Cookies", "**Edge:** Einstellungen → Datenschutz → Cookies", "**Edge:** Instellingen → Privacy → Cookies", "**Edge:** Настройки → Конфиденциальность → Файлы cookie", "**Edge:** الإعدادات ← الخصوصية ← ملفات الارتباط", "**Edge:** Ustawienia → Prywatność → Pliki cookie", "**Edge:** Impostazioni → Privacy → Cookie"),
        ] },
      ],
    },
    {
      h2: L("5. Más información", "5. More information", "5. Més informació", "5. Plus d'informations", "5. Weitere Informationen", "5. Meer informatie", "5. Дополнительная информация", "5. مزيد من المعلومات", "5. Więcej informacji", "5. Maggiori informazioni"),
      blocks: [ { p: L(
        "Para cualquier consulta: {email}", "For any query: {email}", "Per a qualsevol consulta: {email}", "Pour toute question : {email}", "Bei Fragen: {email}", "Voor vragen: {email}", "По любым вопросам: {email}", "لأي استفسار: {email}", "W razie pytań: {email}", "Per qualsiasi domanda: {email}") } ],
    },
  ],
}

export const LEGAL_UPDATED = L(
  "Última actualización: Mayo 2026", "Last updated: May 2026", "Última actualització: Maig 2026",
  "Dernière mise à jour : mai 2026", "Letzte Aktualisierung: Mai 2026", "Laatst bijgewerkt: mei 2026",
  "Последнее обновление: май 2026 г.", "آخر تحديث: مايو 2026", "Ostatnia aktualizacja: maj 2026",
  "Ultimo aggiornamento: maggio 2026")
