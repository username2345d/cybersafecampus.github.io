/**
 * CyberSafe Campus · Lógica y contenido de la aplicación
 * ------------------------------------------------------------------
 * ÍNDICE
 *   1. Estado global y utilidades
 *   2. Textos de la interfaz (UI) y palabras del generador
 *   3. Contenido de los módulos (M)       <- aquí se editan los textos
 *   4. Referencias APA y créditos de imágenes
 *   5. Pantallas (home, créditos, subsección) y navegación
 *   6. Actividades interactivas: HTML (R) y comportamiento (A)
 *   7. Render general y eventos
 *
 * Convención de idioma: todo texto visible es un arreglo [ES, EN].
 * La función T() devuelve el elemento según el idioma activo.
 */

// ==================================================================
// 1. ESTADO GLOBAL Y UTILIDADES
// ==================================================================
let lang = 'es', cur = 0;   // idioma activo ('es' | 'en') y pantalla actual (índice en S)
// T(): devuelve el texto en el idioma activo si recibe un par [ES, EN]
const T = o => Array.isArray(o) ? o[lang === 'es' ? 0 : 1] : o;
// $(): atajo de document.querySelector
const $ = (s, r = document) => r.querySelector(s);

// ==================================================================
// 2. TEXTOS DE LA INTERFAZ
// ==================================================================
// Etiquetas de botones y mensajes. Formato: clave: [español, inglés]
const UI = {
  home: ['Inicio', 'Home'], prev: ['← Anterior', '← Previous'], next: ['Siguiente →', 'Next →'],
  src: ['Fuente', 'Source'], mod: ['Módulo', 'Module'], inter: ['Actividad interactiva', 'Interactive activity'],
  start: ['Comenzar', 'Start'], gen: ['Generar passphrase', 'Generate passphrase'], test: ['Prueba tu contraseña', 'Test your password'],
  lv: [['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Muy fuerte'], ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong']],
  ok: ['✅ ¡Correcto! ', '✅ Correct! '], no: ['❌ Casi. ', '❌ Not quite. '], reset: ['Reiniciar', 'Restart'],
  rep: ['Simular reporte de incidente', 'Simulate incident report'], done: ['completado', 'done'], cred: ['Créditos', 'Credits']
};

// Banco de palabras [español, inglés] usado por el generador de passphrase
const W = [['sol', 'río', 'luna', 'cafe', 'monte', 'nube', 'tigre', 'pino', 'cielo', 'ancla'], ['sun', 'river', 'moon', 'coffee', 'mountain', 'cloud', 'tiger', 'pine', 'sky', 'anchor']];


// ==================================================================
// 3. CONTENIDO DE LOS MÓDULOS
// ==================================================================
// M es un arreglo de 5 módulos. Cada módulo tiene:
//   t: título [ES,EN] · i: emoji · s: arreglo de 2 subsecciones
// Cada subsección (pantalla) tiene:
//   t: título · img: imagen (carpeta img/) · p: texto informativo
//   src: [nombre de la fuente, URL] · ui: actividad interactiva
//   ui.k indica el tipo: quiz | flip | gen | tabs | tree | check | slider
const M = [
  // ---------- MÓDULO 1 ----------
  { t: ['Fundamentos de la Ciberseguridad', 'Cybersecurity Fundamentals'], i: '🛡️', s: [
    // 1.1 Qué es la ciberseguridad  ·  actividad: quiz (3 preguntas)
    { t: ['¿Qué es la ciberseguridad y por qué importa?', 'What is cybersecurity and why does it matter?'], img: 'escudo',
      p: ['La ciberseguridad protege sistemas, redes y datos frente a ataques digitales. Los universitarios son objetivo frecuente por el acceso a cuentas institucionales, datos personales y dispositivos, y el error humano participa en una gran parte de las brechas.',
          'Cybersecurity protects systems, networks and data from digital attacks. College students are frequent targets because of institutional accounts, personal data and devices, and human error plays a large role in breaches.'],
      src: ['NIST – Cybersecurity Framework 2.0', 'https://doi.org/10.6028/NIST.CSWP.29'],
      ui: { k: 'quiz', q: [
        { q: ['Recibes un enlace "urgente" de tu universidad. ¿Qué haces?', 'You get an "urgent" link from your university. What do you do?'], o: [['Hago clic rápido', 'Click quickly'], ['Verifico por el canal oficial', 'Verify via the official channel']], a: 1, e: ['Verificar antes de actuar reduce el riesgo.', 'Verifying first lowers the risk.'] },
        { q: ['¿Reutilizar la misma contraseña es seguro?', 'Is reusing the same password safe?'], o: [['Sí, es más fácil', 'Yes, it is easier'], ['No, una filtración compromete todas tus cuentas', 'No, one leak exposes all accounts']], a: 1, e: ['Usa una contraseña única por cuenta.', 'Use a unique password per account.'] },
        { q: ['¿Quién puede ser víctima de un ataque?', 'Who can be a victim of an attack?'], o: [['Solo grandes empresas', 'Only big companies'], ['Cualquier persona, incluidos estudiantes', 'Anyone, including students']], a: 1, e: ['Los estudiantes también son objetivo.', 'Students are targets too.'] }] } },
    // 1.2 Principales amenazas  ·  actividad: tarjetas volteables
    { t: ['Principales amenazas para estudiantes', 'Main threats facing students'], img: 'amenaza',
      p: ['Phishing, malware, ransomware, robo de credenciales, Wi-Fi público inseguro y ofertas de empleo falsas son las amenazas más comunes en la vida universitaria.',
          'Phishing, malware, ransomware, credential theft, unsafe public Wi-Fi and fake job offers are the most common threats in college life.'],
      src: ['CISA – Recognize and Report Phishing', 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing'],
      ui: { k: 'flip', c: [[['Phishing', 'Phishing'], ['Mensajes falsos que roban tus datos de acceso.', 'Fake messages that steal your login data.']],
        [['Ransomware', 'Ransomware'], ['Cifra tus archivos y exige un pago.', 'Encrypts your files and demands payment.']],
        [['Wi-Fi abierto', 'Open Wi-Fi'], ['Un atacante puede espiar tu tráfico.', 'An attacker may snoop on your traffic.']],
        [['Empleo falso', 'Fake job'], ['Piden dinero o datos personales a cambio de "trabajo".', 'They ask for money or personal data for "work".']]] } }] },
  // ---------- MÓDULO 2 ----------
  { t: ['Contraseñas y Autenticación', 'Passwords & Authentication'], i: '🔑', s: [
    // 2.1 Contraseñas fuertes  ·  actividad: generador + medidor de fortaleza
    { t: ['Cómo crear contraseñas fuertes', 'How to create strong passwords'], img: 'proteccion',
      p: ['Prioriza la longitud (el NIST recomienda mínimo 15 caracteres). Usa frases de paso, nunca reutilices contraseñas y apóyate en un gestor de contraseñas.',
          'Prioritize length (NIST recommends at least 15 characters). Use passphrases, never reuse passwords and rely on a password manager.'],
      src: ['NIST – How do I create a good password?', 'https://www.nist.gov/cybersecurity/how-do-i-create-good-password'], ui: { k: 'gen' } },
    // 2.2 MFA y passkeys  ·  actividad: pestañas comparativas
    { t: ['Autenticación multifactor (MFA) y passkeys', 'Multi-factor authentication (MFA) & passkeys'], img: 'escudo',
      p: ['La MFA añade una segunda capa de protección. Prefiere métodos resistentes al phishing, como apps autenticadoras, llaves de seguridad o passkeys.',
          'MFA adds a second layer of protection. Prefer phishing-resistant methods such as authenticator apps, security keys or passkeys.'],
      src: ['CISA – Turn on MFA', 'https://www.cisa.gov/secure-our-world/turn-mfa'],
      ui: { k: 'tabs', c: [['SMS', ['Mejor que nada, pero puede interceptarse o clonarse la SIM.', 'Better than nothing, but can be intercepted or SIM-swapped.']],
        ['App', ['Códigos temporales en tu móvil. Buen equilibrio entre seguridad y comodidad.', 'Time-based codes on your phone. Good balance of security and convenience.']],
        ['Hardware Key', ['La opción más resistente al phishing. Requiere llevar la llave.', 'The most phishing-resistant option. You need to carry the key.']]] } }] },
  // ---------- MÓDULO 3 ----------
  { t: ['Phishing e Ingeniería Social', 'Phishing & Social Engineering'], i: '🎣', s: [
    // 3.1 Reconocer phishing  ·  actividad: simulador (phishing / legítimo)
    { t: ['Cómo reconocer el phishing', 'How to recognize phishing'], img: 'amenaza',
      p: ['Señales: urgencia artificial, errores de redacción, remitentes sospechosos, enlaces acortados y solicitudes de datos o pagos. Los atacantes ya usan IA para crear mensajes más creíbles.',
          'Signs: artificial urgency, writing errors, suspicious senders, shortened links and requests for data or payments. Attackers now use AI to craft more convincing messages.'],
      src: ['CISA – Recognize and Report Phishing', 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing'],
      ui: { k: 'quiz', q: [
        { q: ['"soporte@unad-segura.xyz: Tu cuenta se cierra en 1 hora, ingresa aquí."', '"support@unad-secure.xyz: Your account closes in 1 hour, log in here."'], o: [['Phishing', 'Phishing'], ['Legítimo', 'Legitimate']], a: 0, e: ['Dominio extraño y urgencia artificial.', 'Odd domain and artificial urgency.'] },
        { q: ['Tu docente publica la guía de la semana en el aula virtual oficial y te llega la notificación habitual.', 'Your teacher posts this week\'s guide on the official virtual classroom and you get the usual notification.'], o: [['Phishing', 'Phishing'], ['Legítimo', 'Legitimate']], a: 1, e: ['Canal oficial, sin presión ni pedido de datos.', 'Official channel, no pressure or data request.'] },
        { q: ['"Ganaste una beca. Paga $50.000 para reclamarla: bit.ly/xx"', '"You won a scholarship. Pay $50 to claim it: bit.ly/xx"'], o: [['Phishing', 'Phishing'], ['Legítimo', 'Legitimate']], a: 0, e: ['Enlace acortado y petición de pago.', 'Shortened link and payment request.'] }] } },
    // 3.2 Qué hacer ante phishing  ·  actividad: árbol de decisión
    // ui.n = nodos; con 'q' (pregunta) y 'o' (opciones [texto, nodo siguiente]) o con 'r' (resultado final)
    { t: ['¿Qué hacer si recibes o caes en un phishing?', 'What to do if you get or fall for phishing'], img: 'proteccion',
      p: ['No hagas clic, no respondas y reporta al área de TI de la universidad. Si caíste: cambia tus contraseñas y activa la MFA.',
          'Do not click, do not reply and report it to your university IT team. If you fell for it: change your passwords and turn on MFA.'],
      src: ['CISA – Recognize and Report Phishing', 'https://www.cisa.gov/secure-our-world/recognize-and-report-phishing'],
      ui: { k: 'tree', n: {
        s: { q: ['Recibí un mensaje sospechoso. ¿Hice clic?', 'I got a suspicious message. Did I click?'], o: [[['No hice clic', 'I did not click'], 'a'], [['Sí, hice clic', 'Yes, I clicked'], 'b']] },
        a: { r: ['Perfecto: no respondas, reporta al TI de tu universidad y elimina el mensaje.', 'Great: do not reply, report it to your university IT and delete the message.'] },
        b: { q: ['¿Ingresaste datos o contraseña?', 'Did you enter data or a password?'], o: [[['Sí', 'Yes'], 'c'], [['No', 'No'], 'd']] },
        c: { r: ['Cambia tus contraseñas ya, activa MFA, avisa a TI y vigila tus cuentas.', 'Change your passwords now, enable MFA, tell IT and monitor your accounts.'] },
        d: { r: ['Cierra la página, ejecuta un análisis antivirus y reporta el incidente.', 'Close the page, run an antivirus scan and report the incident.'] } } } }] },
  // ---------- MÓDULO 4 ----------
  { t: ['Hábitos Online y Protección de Dispositivos', 'Online Habits & Device Protection'], i: '📱', s: [
    // 4.1 Wi-Fi público  ·  actividad: checklist con barra de progreso
    { t: ['Uso seguro de Wi-Fi público', 'Safe use of public Wi-Fi'], img: 'proteccion',
      p: ['Evita redes abiertas, usa una VPN, desactiva la conexión automática y no hagas transacciones bancarias en Wi-Fi público.',
          'Avoid open networks, use a VPN, turn off auto-connect and do not do banking on public Wi-Fi.'],
      src: ['CISA – Secure Our World', 'https://www.cisa.gov/secure-our-world'],
      ui: { k: 'check', c: [['Confirmé el nombre real de la red con el local', 'I confirmed the real network name with the venue'], ['Activé mi VPN', 'I turned on my VPN'], ['Desactivé la conexión automática', 'I disabled auto-connect'], ['Evitaré banca y compras en esta red', 'I will avoid banking and shopping on this network'], ['Visito solo sitios con HTTPS', 'I only visit HTTPS sites']] } },
    // 4.2 Actualizaciones y privacidad  ·  actividad: slider (l = niveles, f = retroalimentación)
    { t: ['Actualizaciones, bloqueo y privacidad', 'Updates, device lock & privacy'], img: 'escudo',
      p: ['Mantén sistema y apps actualizados, usa bloqueo de pantalla corto y revisa los permisos y la configuración de privacidad.',
          'Keep your system and apps updated, use a short screen-lock timeout and review permissions and privacy settings.'],
      src: ['CISA – Update Software', 'https://www.cisa.gov/secure-our-world/update-software'],
      ui: { k: 'slider', l: [['Nunca', 'Never'], ['Una vez al año', 'Once a year'], ['Cada varios meses', 'Every few months'], ['Cada mes', 'Monthly'], ['Automático', 'Automatic']],
        f: [['🚨 Muy riesgoso: las vulnerabilidades conocidas quedan abiertas.', '🚨 Very risky: known vulnerabilities stay open.'], ['⚠️ Riesgoso: pasas meses expuesto.', '⚠️ Risky: months of exposure.'], ['🙂 Mejorable: acorta el plazo.', '🙂 Improvable: shorten the gap.'], ['👍 Bien, pero automatizar es mejor.', '👍 Good, but automating is better.'], ['🏆 Excelente: parches al día sin esfuerzo.', '🏆 Excellent: patched without effort.']] } }] },
  // ---------- MÓDULO 5 ----------
  { t: ['Datos, Copias de Seguridad e Incidentes', 'Data, Backups & Incident Response'], i: '💾', s: [
    // 5.1 Backups y ransomware (regla 3-2-1)  ·  actividad: constructor de plan (checklist)
    { t: ['Copias de seguridad y ransomware', 'Backups and ransomware'], img: 'amenaza',
      p: ['Sigue la regla 3-2-1: 3 copias, en 2 medios distintos, 1 fuera de tu casa. Idealmente incluye una copia offline o inmutable contra el ransomware.',
          'Follow the 3-2-1 rule: 3 copies, on 2 different media, 1 offsite. Ideally include an offline or immutable copy against ransomware.'],
      src: ['CISA – Stop Ransomware', 'https://www.cisa.gov/stopransomware'],
      ui: { k: 'check', c: [['Copia 1: mis archivos originales', 'Copy 1: my original files'], ['Copia 2: disco externo (medio distinto)', 'Copy 2: external drive (different media)'], ['Copia 3: nube o lugar externo (offsite)', 'Copy 3: cloud or offsite location'], ['Una copia está desconectada (offline)', 'One copy is disconnected (offline)'], ['Probé restaurar mis archivos', 'I tested restoring my files']] } },
    // 5.2 Respuesta a incidentes  ·  actividad: quiz + botón que simula el reporte (rep)
    { t: ['¿Qué hacer si sufriste un incidente?', 'What to do after an incident'], img: 'proteccion',
      p: ['Reporta de inmediato al área de TI, cambia tus contraseñas, desconecta los dispositivos afectados si es necesario y documenta lo ocurrido.',
          'Report immediately to IT, change your passwords, disconnect affected devices if needed and document what happened.'],
      src: ['NIST – Cybersecurity Framework 2.0', 'https://doi.org/10.6028/NIST.CSWP.29'],
      rep: ['REPORTE DE INCIDENTE\nFecha/hora: ____\nQué ocurrió: ____\nCuentas/dispositivos afectados: ____\nAcciones tomadas: contraseñas cambiadas, MFA activada, dispositivo desconectado\nContacto: soporte TI de la universidad', 'INCIDENT REPORT\nDate/time: ____\nWhat happened: ____\nAffected accounts/devices: ____\nActions taken: passwords changed, MFA enabled, device disconnected\nContact: university IT support'],
      ui: { k: 'quiz', rep: 1, q: [
        { q: ['¿Qué haces primero tras sospechar un incidente?', 'What do you do first after suspecting an incident?'], o: [['Lo ignoro', 'Ignore it'], ['Reporto a TI y cambio contraseñas', 'Report to IT and change passwords']], a: 1, e: ['Actuar rápido limita el daño.', 'Acting fast limits damage.'] },
        { q: ['¿Por qué documentar lo ocurrido?', 'Why document what happened?'], o: [['Ayuda a investigar y recuperarse', 'It helps investigation and recovery'], ['No sirve de nada', 'It is useless']], a: 0, e: ['Los registros facilitan la respuesta.', 'Records make response easier.'] }] } }] }
];


// ==================================================================
// 4. REFERENCIAS Y CRÉDITOS
// ==================================================================
// Referencias en formato APA 7 mostradas en la pantalla de Créditos
const REFS = [
  'Cybersecurity and Infrastructure Security Agency. (n.d.). Recognize and report phishing. https://www.cisa.gov/secure-our-world/recognize-and-report-phishing',
  'Cybersecurity and Infrastructure Security Agency. (n.d.). Stop ransomware. https://www.cisa.gov/stopransomware',
  'National Institute of Standards and Technology. (2024). The NIST Cybersecurity Framework (CSF) 2.0. https://doi.org/10.6028/NIST.CSWP.29',
  'National Institute of Standards and Technology. (n.d.). How do I create a good password? https://www.nist.gov/cybersecurity/how-do-i-create-good-password',
  'National Cybersecurity Alliance. (n.d.). Cybersecurity tips for college students. https://www.staysafeonline.org/articles/cybersecurity-tips-for-college-students',
  'University of California, Berkeley, Information Security Office. (2026). Cybersecurity handbook for students.'
];

// Créditos de imágenes (completar autor/herramienta antes de entregar)
const IMGS = [
  '(2026). Escudo de ciberseguridad con iconos de protección [Imagen generada con IA].',
  '(2026). Escudo digital bloqueando amenazas [Imagen generada con IA].',
  '[magnific.com]. Equipo de hackers frente a monitores [Fotografía]. [https://www.magnific.com/es/foto-gratis/hacker-femenina-su-equipo-ciber-terroristas-creando-virus-peligroso-atacar-al-gobierno_19651636.htm#fromView=keyword&page=1&position=4&uuid=7520f2b1-f72b-444a-a516-dc76707f986a&track=ais_hybrid&query=Ciberseguridad].',
];


// ==================================================================
// 5. PANTALLAS Y NAVEGACIÓN
// ==================================================================
// S = lista plana de pantallas: [home, 10 subsecciones, créditos]. 'cur' es el índice actual.
/* Pantallas: home + 10 subsecciones + créditos */
const S = [{ k: 'home' }];
M.forEach((m, mi) => m.s.forEach((s, si) => S.push({ k: 'sub', mi, si, ...s })));
S.push({ k: 'cred' });


// Botones Anterior / Siguiente (se deshabilitan en los extremos)
const nav = () => `<div class="nav"><button class="btn ghost" ${cur ? '' : 'disabled style="opacity:.4"'} data-go="${cur - 1}">${T(UI.prev)}</button>
<button class="btn" ${cur < S.length - 1 ? '' : 'disabled style="opacity:.4"'} data-go="${cur + 1}">${T(UI.next)}</button></div>`;


// Pantalla 1: bienvenida, objetivos y tarjetas clicables de los 5 módulos
function home() {
  return `<section class="card hero"><div><h1>${lang === 'es' ? 'Ciberseguridad Unadista: Protege tu vida digital' : 'Unadista Cybersecurity: Protect your digital life'}</h1>
<p>${lang === 'es' ? 'Bienvenido/a. Aprenderás a:' : 'Welcome. You will learn to:'}</p><ul>
<li>${lang === 'es' ? 'Entender las amenazas que enfrentas como estudiante' : 'Understand the threats you face as a student'}</li>
<li>${lang === 'es' ? 'Crear contraseñas y usar MFA correctamente' : 'Create passwords and use MFA correctly'}</li>
<li>${lang === 'es' ? 'Reconocer phishing y responder a incidentes' : 'Recognize phishing and respond to incidents'}</li></ul>
<button class="btn" data-go="1">${T(UI.start)}</button></div><img src="img/escudo.jpg" alt="Ciberseguridad"></section>
<h2>${lang === 'es' ? 'Elige un módulo' : 'Choose a module'}</h2><div class="grid">${M.map((m, i) => `<button class="mod" data-mod="${i}"><span>${m.i}</span><b>${T(UI.mod)} ${i + 1}</b>${T(m.t)}</button>`).join('')}</div>`;
}


// Última pantalla: referencias APA y créditos de imágenes
function cred() {
  return `<section class="card"><h2>${T(UI.cred)} & APA 7</h2><ul class="ref">${REFS.map(r => `<li>${r}</li>`).join('')}</ul>
<h3>${lang === 'es' ? 'Imágenes' : 'Images'}</h3><ul class="ref">${IMGS.map(r => `<li>${r}</li>`).join('')}</ul>
<p class="src">${lang === 'es' ? 'Nota: textos y imágenes generados o apoyados con IA (Claude, Anthropic) fueron revisados contra las fuentes citadas.' : 'Note: AI-assisted texts and images (Claude, Anthropic) were checked against the cited sources.'}</p></section>`;
}


// Pantalla de subsección: texto + imagen + fuente, y debajo la actividad interactiva
function sub(s) {
  const n = M[s.mi].s.length;
  return `<section class="card"><p class="crumb">${T(UI.mod)} ${s.mi + 1} · ${s.mi + 1}.${s.si + 1} — ${T(M[s.mi].t)}</p><h2>${T(s.t)}</h2>
<div class="row"><p>${T(s.p)}</p><img src="img/${s.img}.jpg" alt=""></div><p class="src">📚 ${T(UI.src)}: <a href="${s.src[1]}" target="_blank" rel="noopener">${s.src[0]}</a></p></section>
<section class="card" id="ui"><h3>${T(UI.inter)}</h3>${R[s.ui.k](s.ui)}</section>${nav()}`;
}


// ==================================================================
// 6. ACTIVIDADES INTERACTIVAS
// ==================================================================
// R: genera el HTML de cada tipo de actividad a partir de sus datos (ui)
/* Renderizadores de actividades */
const R = {
  // quiz: preguntas con opciones; reutilizado en el simulador de phishing
  quiz: u => u.q.map((q, i) => `<div class="q" data-i="${i}"><p><b>${i + 1}. ${T(q.q)}</b></p>${q.o.map((o, j) => `<button class="opt" data-j="${j}">${T(o)}</button>`).join('')}<p class="fb"></p></div>`).join('')
    + (u.rep ? `<button class="btn" id="rep">${T(UI.rep)}</button><pre id="repo" hidden></pre>` : ''),
  // flip: tarjetas con cara frontal y reverso
  flip: u => `<div class="cards">${u.c.map(([f, b]) => `<div class="flip"><div class="in"><div class="f">${T(f)}</div><div class="bk">${T(b)}</div></div></div>`).join('')}</div>`,
  // gen: botón de passphrase + campo para probar fortaleza
  gen: () => `<button class="btn" id="g">${T(UI.gen)}</button><p class="pass" id="pp">—</p><label><b>${T(UI.test)}</b></label><input type="text" id="pw" autocomplete="off"><div class="meter"><i id="mt"></i></div><p id="ml" class="fb"></p>`,
  // tabs: pestañas que muestran distinto contenido
  tabs: u => `<div class="tabs">${u.c.map((c, i) => `<button class="btn ghost" data-t="${i}">${c[0]}</button>`).join('')}</div><div class="tc" id="tc"></div>`,
  // tree: contenedor del árbol de decisión (se llena en A.tree)
  tree: () => `<div id="tr"></div>`,
  // check: lista de casillas + barra de progreso
  check: u => u.c.map((c, i) => `<label class="chk"><input type="checkbox">${T(c)}</label>`).join('') + `<div class="meter"><i id="mt"></i></div><p class="fb" id="ml"></p>`,
  // slider: control deslizante con retroalimentación
  slider: u => `<input type="range" min="0" max="4" value="2" id="sl"><p><b id="sv"></b></p><p class="fb" id="sf"></p>`
};


// A: da comportamiento (clics, eventos) a la actividad una vez dibujada en pantalla
/* Lógica de cada actividad */
const A = {
  // Marca la opción elegida, muestra la correcta y la explicación; maneja el botón de reporte
  quiz(u) {
    document.querySelectorAll('.q').forEach(div => {
      const q = u.q[div.dataset.i];
      div.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const j = +b.dataset.j, good = j === q.a;
        div.querySelectorAll('.opt').forEach(x => x.disabled = true);
        b.classList.add(good ? 'ok' : 'bad');
        div.querySelectorAll('.opt')[q.a].classList.add('ok');
        $('.fb', div).textContent = T(good ? UI.ok : UI.no) + T(q.e);
      });
    });
    if (u.rep) $('#rep').onclick = () => { const p = $('#repo'); p.hidden = false; p.textContent = T(S[cur].rep); };
  },
  // Alterna la clase 'on' para girar la tarjeta
  flip() { document.querySelectorAll('.flip').forEach(f => f.onclick = () => f.classList.toggle('on')); },
  // Genera 4 palabras + número y puntúa la contraseña (longitud, variedad de caracteres)
  gen() {
    $('#g').onclick = () => { const w = W[lang === 'es' ? 0 : 1], r = () => w[Math.random() * w.length | 0];
      $('#pp').textContent = [r(), r(), r(), r()].join('-') + '-' + (Math.random() * 90 + 10 | 0); };
    $('#pw').oninput = e => { const v = e.target.value; let s = v.length >= 15 ? 2 : v.length >= 10 ? 1 : 0;
      if ([/[a-z]/, /[A-Z]/, /\d/, /[^\w]/].filter(r => r.test(v)).length >= 3) s++;
      if (v.length >= 20) s++; if (!v) s = 0; s = Math.min(s, 4);
      const m = $('#mt'); m.style.width = (s + 1) * 20 + '%'; m.style.background = ['#c0392b', '#e67016', '#f4af00', '#7cb342', '#2e8b57'][s];
      $('#ml').textContent = v ? T(UI.lv)[s] : ''; };
  },
  // Muestra el contenido de la pestaña activa
  tabs(u) {
    const show = i => { document.querySelectorAll('[data-t]').forEach(b => b.classList.toggle('on', +b.dataset.t === i)); $('#tc').innerHTML = `<b>${u.c[i][0]}</b><br>${T(u.c[i][1])}`; };
    document.querySelectorAll('[data-t]').forEach(b => b.onclick = () => show(+b.dataset.t)); show(0);
  },
  // Navega entre nodos del árbol hasta llegar a un resultado; permite reiniciar
  tree(u) {
    const go = id => { const n = u.n[id];
      $('#tr').innerHTML = n.r ? `<div class="tc">✅ ${T(n.r)}</div><button class="btn" id="rs">${T(UI.reset)}</button>`
        : `<p><b>${T(n.q)}</b></p>${n.o.map(([l, nx]) => `<button class="opt" data-n="${nx}">${T(l)}</button>`).join('')}`;
      document.querySelectorAll('[data-n]').forEach(b => b.onclick = () => go(b.dataset.n));
      if (n.r) $('#rs').onclick = () => go('s'); };
    go('s');
  },
  // Cuenta casillas marcadas y actualiza la barra de progreso
  check() {
    const bx = document.querySelectorAll('.chk input');
    bx.forEach(b => b.onchange = () => { const n = [...bx].filter(x => x.checked).length;
      $('#mt').style.width = n / bx.length * 100 + '%'; $('#mt').style.background = n === bx.length ? '#2e8b57' : '#e67016';
      $('#ml').textContent = `${n}/${bx.length} ${T(UI.done)}${n === bx.length ? ' 🎉' : ''}`; });
  },
  // Actualiza la etiqueta y el mensaje según el valor del slider
  slider(u) {
    const up = () => { const v = +$('#sl').value; $('#sv').textContent = T(u.l[v]); $('#sf').textContent = T(u.f[v]); };
    $('#sl').oninput = up; up();
  }
};


// ==================================================================
// 7. RENDER GENERAL Y EVENTOS
// ==================================================================
/* Render general y eventos */

// Dibuja la pantalla actual, activa su actividad y actualiza barra de progreso, idioma y botones
function render() {
  const s = S[cur];
  $('#app').innerHTML = s.k === 'home' ? home() : s.k === 'cred' ? cred() + nav() : sub(s);
  if (s.k === 'sub') A[s.ui.k](s.ui);
  $('#bar').style.width = cur / (S.length - 1) * 100 + '%';
  $('#langBtn').textContent = lang === 'es' ? 'EN' : 'ES';
  document.documentElement.lang = lang;
  document.title = lang === 'es' ? 'Ciberseguridad Unadista' : 'Unadista Cybersecurity';
  document.querySelectorAll('[data-go]').forEach(b => b.onclick = () => go(+b.dataset.go));
  document.querySelectorAll('[data-mod]').forEach(b => b.onclick = () => go(S.findIndex(x => x.mi === +b.dataset.mod)));
  $('#foot').textContent = lang === 'es' ? 'Recurso educativo multimedia · UNAD' : 'Multimedia educational resource · UNAD';
}

// Cambia de pantalla (limita el índice al rango válido) y sube al inicio de la página
function go(i) { cur = Math.max(0, Math.min(S.length - 1, i)); render(); window.scrollTo(0, 0); }

// Eventos del encabezado: botón Inicio y cambio de idioma ES/EN
$('#homeBtn').onclick = () => go(0);
$('#langBtn').onclick = () => { lang = lang === 'es' ? 'en' : 'es'; render(); };

// Arranque: dibuja la primera pantalla
render();
