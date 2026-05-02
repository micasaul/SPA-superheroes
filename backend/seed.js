const mongoose = require('mongoose')
const Superhero = require('./models/Superhero')
require('dotenv').config()

const superheroes = [
  {
    name: 'Spider-Man',
    realName: 'Peter Parker',
    year: 1962,
    house: 'Marvel',
    biography: 'Picado por una araña radiactiva, Peter Parker obtuvo poderes de araña y decidió usarlos para proteger a los inocentes tras la muerte de su tío Ben. Con grandes poderes vienen grandes responsabilidades.',
    equipment: 'Lanzadores de tela de araña, traje con sensores, sentido arácnido',
    images: ['https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png']
  },
  {
    name: 'Iron Man',
    realName: 'Tony Stark',
    year: 1963,
    house: 'Marvel',
    biography: 'Genio, millonario y filántropo, Tony Stark construyó su primera armadura para escapar de un grupo terrorista. Desde entonces perfeccionó la tecnología hasta convertirse en uno de los héroes más poderosos del mundo.',
    equipment: 'Armadura Iron Man Mark L, repulsores, JARVIS',
    images: ['https://upload.wikimedia.org/wikipedia/en/4/47/Iron_Man_%28circa_2018%29.png']
  },
  {
    name: 'Thor',
    realName: 'Thor Odinson',
    year: 1962,
    house: 'Marvel',
    biography: 'Hijo de Odín y príncipe de Asgard, Thor es el dios del trueno. Fue desterrado a la Tierra para aprender humildad y desde entonces protege tanto a los humanos como a los nueve reinos.',
    equipment: 'Mjolnir, Stormbreaker, capa asgardiana',
    images: ['https://m.media-amazon.com/images/S/pv-target-images/a516c3f3bff8681e22d2492f6fe528d21b21821e8f5cee27b4dd5b24181f3383._SX1080_FMjpg_.jpg']
  },
  {
    name: 'Black Widow',
    realName: 'Natasha Romanoff',
    year: 1964,
    house: 'Marvel',
    biography: 'Entrenada desde niña en el programa Habitación Roja, Natasha Romanoff se convirtió en una de las mejores espías del mundo. Tras desertar de la KGB se unió a S.H.I.E.L.D. y luego a los Vengadores.',
    equipment: 'Pistolas viuda, traje táctico, Llave viuda',
    images: ['https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Scarlett_Johansson_as_Black_Widow.jpg/250px-Scarlett_Johansson_as_Black_Widow.jpg']
  },
  {
    name: 'Captain America',
    realName: 'Steve Rogers',
    year: 1941,
    house: 'Marvel',
    biography: 'Un joven débil de Brooklyn fue transformado en el supersoldado perfecto gracias al suero del supersoldado. Steve Rogers luchó en la Segunda Guerra Mundial y fue congelado durante décadas antes de despertar en el siglo XXI.',
    equipment: 'Escudo de vibranium, traje de supersoldado',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC-_xQKcAPcJX94NhG6gpntZusOpvpJjD6ug&s']
  },
  {
    name: 'Hulk',
    realName: 'Bruce Banner',
    year: 1962,
    house: 'Marvel',
    biography: 'El Doctor Bruce Banner fue expuesto a una masiva dosis de radiación gamma que lo transforma en una bestia verde de fuerza incalculable cuando se enoja. Vive en constante lucha entre su mente científica y la furia del Hulk.',
    equipment: 'Ninguno, su cuerpo es su arma',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdWfIQpVJUWcfRoUqEdgZLGOuNFHSLT00y7A&s']
  },
  {
    name: 'Black Panther',
    realName: "T'Challa",
    year: 1966,
    house: 'Marvel',
    biography: "Rey de Wakanda, T'Challa es el Black Panther, protector de la nación más avanzada tecnológicamente del mundo. Combina la sabiduría de un rey con las habilidades de un guerrero élite potenciado por la hierba del corazón.",
    equipment: 'Traje de vibranium, garras retráctiles, collar cinético',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMn8sky6yKp3lAwq6f1_SZDaf3JoAFW4ug3w&s']
  },
  {
    name: 'Doctor Strange',
    realName: 'Stephen Strange',
    year: 1963,
    house: 'Marvel',
    biography: 'Un brillante pero arrogante neurocirujano cuya carrera terminó tras un accidente automovilístico. Buscando sanación encontró las artes místicas y se convirtió en el Hechicero Supremo, protector de la Tierra contra amenazas dimensionales.',
    equipment: 'Capa de levitación, Ojo de Agamotto, Sanctum Sanctorum',
    images: ['https://i.redd.it/j33y6uoml60f1.jpeg']
  },
  {
    name: 'Wolverine',
    realName: 'James Logan Howlett',
    year: 1974,
    house: 'Marvel',
    biography: 'Con más de un siglo de vida, Logan es un mutante con garras de adamantium y factor curativo. Ha sido soldado, espía y héroe, cargando con memorias de guerras y pérdidas que ningún humano podría soportar.',
    equipment: 'Garras de adamantium, esqueleto recubierto de adamantium',
    images: ['https://static.wikia.nocookie.net/superheroes/images/b/bb/Wolverine_FtA.jpg/revision/latest?cb=20240829155917']
  },
  {
    name: 'Deadpool',
    realName: 'Wade Wilson',
    year: 1991,
    house: 'Marvel',
    biography: 'Ex mercenario sometido a un experimento que le otorgó un factor curativo extremo a costa de desfigurar su cuerpo. Deadpool es conocido por su humor irreverente, su bocaza y su tendencia a romper la cuarta pared.',
    equipment: 'Katanas, pistolas, traje rojo, bolsas espaciales',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCLZSLEzZHaYeZ-FTaWDXVncTephtnnjNE6w&s']
  },
  {
    name: 'Loki',
    realName: 'Loki Laufeyson',
    year: 1962,
    house: 'Marvel',
    biography: 'Dios asgardiano del engaño e hijo adoptivo de Odín, Loki oscila entre el villano y el antihéroe. Su inteligencia y habilidad para la magia lo hacen impredecible y fascinante, tan peligroso como carismático.',
    equipment: 'Magia asgardiana, ilusiones, dagas',
    images: ['https://www.ecartelera.com/images/noticias/75300/75354-h3.jpg']
  },
  {
    name: 'Thanos',
    realName: 'Thanos',
    year: 1973,
    house: 'Marvel',
    biography: 'El Titán Loco, obsesionado con el equilibrio del universo, creyó que eliminar la mitad de toda vida era la solución a la escasez de recursos. Reunió las Gemas del Infinito para lograr su objetivo con un simple chasquido.',
    equipment: 'Guantelete del Infinito, Gemas del Infinito',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTegJW-PUjL9qyVMm9AWe4e387RRWA-QN7nlw&s']
  },
  {
    name: 'Scarlet Witch',
    realName: 'Wanda Maximoff',
    year: 1964,
    house: 'Marvel',
    biography: 'Nacida en Sokovia, Wanda Maximoff obtuvo poderes de manipulación de la realidad tras ser sometida a experimentos con una Gema del Infinito. Su poder prácticamente ilimitado la convierte en una de las figuras más temidas del universo.',
    equipment: 'Magia del caos, manipulación de la realidad',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM0lmCK2NM0eOeCsZ6GmTJ4CIvg37m6vut5g&s']
  },
  {
    name: 'Venom',
    realName: 'Eddie Brock',
    year: 1988,
    house: 'Marvel',
    biography: 'Periodista caído en desgracia, Eddie Brock se fusionó con un simbionte alienígena para convertirse en Venom. La relación entre ambos es compleja, oscilando entre el villano y el antihéroe que protege a los inocentes a su manera.',
    equipment: 'Simbionte alienígena, tentáculos, dientes de tiburón',
    images: ['https://f.rpp-noticias.io/2020/05/13/093209_941105.jpg?width=1020&quality=80']
  },
  {
    name: 'Hawkeye',
    realName: 'Clint Barton',
    year: 1964,
    house: 'Marvel',
    biography: 'El único Vengador sin poderes sobrehumanos además de Captain America en sus inicios, Clint Barton es el arquero más preciso del mundo. Su habilidad, reflejos y determinación lo hacen igual de valioso que cualquier superhéroe.',
    equipment: 'Arco compuesto, flechas especializadas, traje táctico',
    images: ['https://static.wikia.nocookie.net/marveldatabase/images/6/6f/Thunderbolts_Vol_5_1_Trading_Card_Variant_Textless.jpg/revision/latest?cb=20220622131243']
  },
  {
    name: 'Batman',
    realName: 'Bruce Wayne',
    year: 1939,
    house: 'DC',
    biography: 'Tras presenciar el asesinato de sus padres de niño, Bruce Wayne dedicó su vida a combatir el crimen en Gotham City. Sin poderes especiales usa su inteligencia, fortuna y entrenamiento físico extremo para enfrentarse a los villanos más peligrosos.',
    equipment: 'Batarangs, capa, cinturón de utilidades, Batimóvil, Batcueva',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFDXacwj1PTD1nnwifHXW9T9JMtJQkT1E7TA&s']
  },
  {
    name: 'Superman',
    realName: 'Clark Kent',
    year: 1938,
    house: 'DC',
    biography: 'Último hijo del planeta Krypton, Kal-El fue enviado a la Tierra por sus padres antes de la destrucción de su mundo. Criado en Smallville como Clark Kent, usa sus poderes extraordinarios para proteger a la humanidad.',
    equipment: 'Capa kryptoniana, traje indestructible',
    images: ['https://i.blogs.es/084998/verano-superman/840_560.jpeg']
  },
  {
    name: 'Wonder Woman',
    realName: 'Diana Prince',
    year: 1941,
    house: 'DC',
    biography: 'Princesa amazona de Themyscira, Diana fue dotada de poderes por los dioses griegos. Abandonó su hogar para proteger al mundo de las amenazas que los humanos no pueden enfrentar solos, convirtiéndose en símbolo de justicia y compasión.',
    equipment: 'Lazo de la verdad, brazaletes indestructibles, tiara, escudo y espada',
    images: ['https://media.newyorker.com/photos/593581e785bd115baccba6d2/master/pass/Lane-Ten-Things-about-Wonder-Woman.jpg']
  },
  {
    name: 'The Flash',
    realName: 'Barry Allen',
    year: 1956,
    house: 'DC',
    biography: 'Científico forense alcanzado por un rayo mientras trabajaba en su laboratorio, Barry Allen obtuvo la capacidad de moverse a velocidades increíbles conectándose a la Fuerza de la Velocidad. Protege Central City y viaja a través del tiempo.',
    equipment: 'Traje comprimido en anillo, Speed Force',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT96MoOvL-FmbvQKfuh4ZRL0WonKhYr2X0aGw&s']
  },
  {
    name: 'Aquaman',
    realName: 'Arthur Curry',
    year: 1941,
    house: 'DC',
    biography: 'Hijo de un faro y una reina de Atlantis, Arthur Curry es el rey de los mares. Puede comunicarse con la vida marina, respirar bajo el agua y posee una fuerza sobrehumana adaptada a las presiones del océano profundo.',
    equipment: 'Tridente de Atlantis, armadura atlante',
    images: ['https://static.wikia.nocookie.net/dccu/images/e/e1/Aquaman%26theLostKingdom_-_textless_German_Poster.jpg/revision/latest/scale-to-width-down/1200?cb=20231124005303']
  },
  {
    name: 'Green Lantern',
    realName: 'Hal Jordan',
    year: 1959,
    house: 'DC',
    biography: 'Piloto de pruebas elegido por el anillo de poder más poderoso del universo, Hal Jordan se convirtió en el Linterna Verde de la Tierra. Su anillo puede crear cualquier construcción que su mente imagine, limitado solo por su voluntad.',
    equipment: 'Anillo de poder verde, linterna de energía',
    images: ['https://cdn11.bigcommerce.com/s-ydriczk/images/stencil/1500x1500/products/87965/89910/Green-Lantern-DC-Comics-Lifesize-Cardboard-Cutout-available-now-at-starstills__02462.1474977632.jpg?c=2']
  },
  {
    name: 'Cyborg',
    realName: 'Victor Stone',
    year: 1980,
    house: 'DC',
    biography: 'Tras un accidente casi mortal, Victor Stone fue salvado por su padre mediante tecnología de Mother Box que fusionó su cuerpo con maquinaria avanzada. Mitad humano, mitad máquina, lucha por encontrar su humanidad mientras protege al mundo.',
    equipment: 'Cuerpo cibernético, cañón de plasma, acceso a cualquier sistema informático',
    images: ['https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Cyborg_%28Victor_Stone%29.jpg/250px-Cyborg_%28Victor_Stone%29.jpg']
  },
  {
    name: 'Green Arrow',
    realName: 'Oliver Queen',
    year: 1941,
    house: 'DC',
    biography: 'Millonario playboy que naufragó en una isla desierta durante cinco años, Oliver Queen aprendió a sobrevivir y a dominar el arco. De vuelta en Star City se convirtió en el Flecha Verde, luchando contra la corrupción con su arco y sus flechas.',
    equipment: 'Arco compuesto, flechas especializadas, traje verde',
    images: ['https://imagenes.hobbyconsolas.com/files/image_640_360/uploads/imagenes/2023/04/25/6901a72153692.jpeg']
  },
  {
    name: 'Shazam',
    realName: 'Billy Batson',
    year: 1939,
    house: 'DC',
    biography: 'Un niño huérfano elegido por el anciano mago Shazam para ser su campeón. Al pronunciar la palabra mágica se transforma en un adulto con los poderes de seis dioses y héroes mitológicos, combinando la inocencia de un niño con la fuerza de un dios.',
    equipment: 'Rayo mágico, traje de Shazam',
    images: ['https://i.blogs.es/dfc86c/shazam-/500_333.webp']
  },
  {
    name: 'Joker',
    realName: 'Arthur Fleck',
    year: 1940,
    house: 'DC',
    biography: 'El eterno némesis de Batman, el Joker es el príncipe payaso del crimen de Gotham. Su origen es un misterio, incluso para él mismo. Caótico, impredecible y brutalmente inteligente, representa el caos puro frente al orden que Batman intenta mantener.',
    equipment: 'Gas de la risa, flores ácidas, cartas explosivas, pistola de bandera',
    images: ['https://batman-escape-assets-2.cdn.ooeo.net/ZhVX0DjCgu4jztPh_heath-ledger-joker-incroyable.webp?auto=format,compress&w=800']
  },
  {
    name: 'Lex Luthor',
    realName: 'Alexander Luthor',
    year: 1940,
    house: 'DC',
    biography: 'El hombre más inteligente del mundo y el enemigo más persistente de Superman. Lex Luthor cree genuinamente que la humanidad no debería depender de un alienígena y que él mismo es el verdadero héroe que la Tierra necesita.',
    equipment: 'Traje de poder Lexcorp, tecnología avanzada, recursos ilimitados',
    images: ['https://i.blogs.es/ad42d5/superman-unchained-issue-4/500_333.webp']
  },
  {
    name: 'Martian Manhunter',
    realName: "J'onn J'onzz",
    year: 1955,
    house: 'DC',
    biography: "Último sobreviviente de Marte, J'onn J'onzz llegó a la Tierra y adoptó una identidad humana. Con poderes que incluyen telepatía, cambio de forma y fuerza sobrehumana, es uno de los miembros fundadores de la Liga de la Justicia.",
    equipment: 'Poderes marcianos innatos, ningún equipo externo',
    images: ['https://static.wikia.nocookie.net/doblaje/images/b/ba/Martian_Manhunter_0003.jpg/revision/latest?cb=20240308173738&path-prefix=es']
  },
  {
    name: 'Nightwing',
    realName: 'Dick Grayson',
    year: 1940,
    house: 'DC',
    biography: 'El primer Robin, Dick Grayson creció bajo la tutela de Batman después de que sus padres murieran en un accidente durante un espectáculo de trapecio. Eventualmente salió de la sombra de su mentor para convertirse en su propio héroe.',
    equipment: 'Escrimas, traje de Nightwing, batarangs modificados',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwdhIzj_dIiXZEt-5V_xii40KqSZEx00GkQw&s']
  },
  {
    name: 'Harley Quinn',
    realName: 'Harleen Quinzel',
    year: 1992,
    house: 'DC',
    biography: 'Ex psiquiatra del Asilo Arkham que se enamoró del Joker y se convirtió en su cómplice. Con el tiempo Harley Quinn encontró su propia identidad fuera de la sombra del Joker, convirtiéndose en un personaje complejo entre villana y antiheroína.',
    equipment: 'Mazo gigante, pistola, traje de arlequín',
    images: ['https://static.wikia.nocookie.net/dcau/images/3/3f/Harley_Quinn.png/revision/latest?cb=20221130210920&path-prefix=es']
  },
  {
    name: 'Catwoman',
    realName: 'Selina Kyle',
    year: 1940,
    house: 'DC',
    biography: 'Maestra ladrona y antiheroína de Gotham, Selina Kyle tiene una relación compleja con Batman que oscila entre el romance y la rivalidad. Aunque roba por placer y necesidad, tiene su propio código de honor y ocasionalmente protege a los inocentes.',
    equipment: 'Látigo, traje de gato, garras retráctiles',
    images: ['https://upload.wikimedia.org/wikipedia/en/e/e4/Catwoman_Infobox.jpg']
  },
  {
    name: 'Ant-Man',
    realName: 'Scott Lang',
    year: 1962,
    house: 'Marvel',
    biography: 'Ex ladrón que obtuvo el traje de Ant-Man del inventor Hank Pym. Scott Lang usa la tecnología Pym para encogerse al tamaño de una hormiga manteniendo su fuerza humana, o crecer hasta alturas gigantescas como Giant-Man.',
    equipment: 'Traje de Ant-Man, partículas Pym, casco de comunicación con insectos',
    images: ['https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2015/7/15/1436980223176/Paul-Rudd-in-Ant-Man-009.jpg?width=700&quality=85&auto=format&fit=max&s=14473b3e4ee54ba393c1f0f7d10b4c58']
  },
  {
    name: 'Captain Marvel',
    realName: 'Carol Danvers',
    year: 1968,
    house: 'Marvel',
    biography: 'Ex piloto de la Fuerza Aérea que absorbió energía del Tesseract durante una explosión, fusionando su ADN con el de un Kree. Carol Danvers es una de las heroínas más poderosas del universo Marvel, capaz de volar y absorber energía.',
    equipment: 'Poderes cósmicos innatos, traje Kree',
    images: ['https://preview.redd.it/what-are-your-thoughts-on-captain-marvel-is-she-a-good-or-v0-mhqpun5vl2de1.jpeg?width=640&crop=smart&auto=webp&s=bcd8cb1f70c43b54b7677a67eb6bfc25847aaa72']
  },
  {
    name: 'Vision',
    realName: '',
    year: 1968,
    house: 'Marvel',
    biography: 'Androide creado por Ultrón usando la mente de JARVIS y una Gema del Infinito, Vision desarrolló una conciencia genuina y sentimientos propios. Su naturaleza única lo coloca entre lo humano y lo artificial de formas que él mismo intenta comprender.',
    equipment: 'Piedra de la Mente, cuerpo sintético de vibranium, rayos de energía',
    images: ['https://upload.wikimedia.org/wikipedia/en/f/fc/Paul_Bettany_as_Vision.jpg']
  },
  {
    name: 'Star-Lord',
    realName: 'Peter Quill',
    year: 1976,
    house: 'Marvel',
    biography: 'Hijo de un humano y un alienígena Celestial, Peter Quill fue secuestrado de la Tierra de niño por los Ravagers. Creció en el espacio convirtiéndose en un cazarrecompensas y eventualmente en el líder de los Guardianes de la Galaxia.',
    equipment: 'Máscaras elementales, pistolas cuánticas, nave Milano, walkman',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2sPOfboOlvO3ALWSzOrlDqNPUxMYaetm2hw&s']
  },
  {
    name: 'Groot',
    realName: '',
    year: 1960,
    house: 'Marvel',
    biography: 'Flora colossus del Planeta X, Groot es un ser arbóreo de pocas palabras pero gran corazón. Miembro de los Guardianes de la Galaxia, su capacidad de regeneración es casi ilimitada y su fuerza descomunal, aunque solo puede decir "Yo soy Groot".',
    equipment: 'Cuerpo arbóreo regenerativo',
    images: ['https://static.wikia.nocookie.net/disney/images/3/3b/Groot.png/revision/latest?cb=20140724202906&path-prefix=es']
  },
  {
    name: 'Rocket Raccoon',
    realName: '',
    year: 1976,
    house: 'Marvel',
    biography: 'Mapache modificado genéticamente con inteligencia superior y habilidad excepcional para las armas y la mecánica. Miembro de los Guardianes de la Galaxia, usa el humor y la agresividad para ocultar el dolor de su traumático origen.',
    equipment: 'Armas de gran calibre improvisadas, granadas, dispositivos tecnológicos robados',
    images: ['https://static.wikia.nocookie.net/marvelcinematicuniverse/images/3/30/Rocket_Vol._3.jpg/revision/latest/thumbnail/width/360/height/450?cb=20231114031203']
  },
  {
    name: 'Gamora',
    realName: 'Gamora Zen Whoberi Ben Titan',
    year: 1975,
    house: 'Marvel',
    biography: 'Hija adoptiva de Thanos, entrenada desde niña para ser la asesina perfecta. Gamora se rebeló contra su padre adoptivo y se unió a los Guardianes de la Galaxia, usando sus habilidades letales para proteger al universo en lugar de destruirlo.',
    equipment: 'Espada Godslayer, habilidades de combate sobrehumanas',
    images: ['https://static.wikia.nocookie.net/marveldatabase/images/7/7c/Gamora_%28Earth-TRN734%29_from_Avengers_Endgame_002.png/revision/latest?cb=20190812205526']
  },
  {
    name: 'Drax',
    realName: 'Arthur Douglas',
    year: 1973,
    house: 'Marvel',
    biography: 'Humano resucitado en un nuevo cuerpo poderoso con el único propósito de destruir a Thanos, quien mató a su familia. Drax el Destructor se unió a los Guardianes de la Galaxia en su búsqueda de venganza, siendo brutalmente honesto e increíblemente literal.',
    equipment: 'Dagas, fuerza sobrehumana, resistencia extrema',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOvwazxBRjOpHF7aKYsO_cY5G5Hw3XkmVBWw&s']
  },
  {
    name: 'Daredevil',
    realName: 'Matt Murdock',
    year: 1964,
    house: 'Marvel',
    biography: 'Cegado de niño por un accidente químico que potenció sus otros sentidos al máximo, Matt Murdock se convirtió en abogado de día y en el Diablo Guardián de noche. Protege Hell\'s Kitchen con un radar sensorial que reemplaza su vista.',
    equipment: 'Bastón bilé, traje rojo, sentidos potenciados',
    images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiUEhY0nfDcNd7O_X4mia6yGsRV6mJyhbewQ&s']
  },
  {
    name: 'Two-Face',
    realName: 'Harvey Dent',
    year: 1942,
    house: 'DC',
    biography: 'Ex fiscal estrella de Gotham y aliado de Batman, Harvey Dent fue desfigurado por ácido lanzado por un criminal durante un juicio. El trauma dividió su personalidad en dos: el hombre de ley que fue y el villano que se convirtió, tomando decisiones con una moneda trucada.',
    equipment: 'Moneda trucada, pistolas, dominio del crimen organizado',
    images: ['https://static.wikia.nocookie.net/batman/images/1/16/TwoFace.jpg/revision/latest/thumbnail/width/360/height/360?cb=20210924070230']
  },
  {
    name: 'Deathstroke',
    realName: 'Slade Wilson',
    year: 1980,
    house: 'DC',
    biography: 'Ex soldado de operaciones especiales sometido a experimentos militares que potenciaron su cuerpo y mente al límite humano. Slade Wilson se convirtió en el mercenario más temido del mundo DC, capaz de anticipar los movimientos de sus enemigos con velocidad sobrehumana.',
    equipment: 'Espada promethium, lanza energética, traje de adamantium, pistolas',
    images: ['https://upload.wikimedia.org/wikipedia/en/6/6e/Deathstroke_%28DC_Comics%29.webp']
  },
]

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conectado a MongoDB')

    await Superhero.deleteMany()
    console.log('Colección limpiada')

    await Superhero.insertMany(superheroes)
    console.log(`${superheroes.length} superheroes insertados`)

    await mongoose.disconnect()
    console.log('Desconectado de MongoDB')
    process.exit(0)
  } catch (err) {
    console.error('Error en seed:', err.message)
    process.exit(1)
  }
}

seed()