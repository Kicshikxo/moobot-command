const http = require('http'),
	  url  = require('url'),
	  PORT = process.env.PORT || 3000
const MongoClient = require("mongodb").MongoClient;

function randInt(min, max){return ~~((Math.random() * (max - min + 1)) + min)}
Array.prototype.choiceOne = function(){return this[randInt(0, this.length-1)]}

const characters = [
	'Я каменьщик, работаю три дня.',
	'Я каменьщик, работаю три дня.',
	'Я каменьщик, работаю три дня без зарплаты.',
	'Я кожевник и выбрал не ту дверь.',
	'Я кожевник и выбрал не ту дверь.',
	'Я всегда хладнокровен, несмотря ни на что. Я никогда не повышаю голоса и не позволяю эмоциям управлять мной.',
	'Я часто забиваюсь в узкие закутки, где никто не сможет добраться до меня.',
	'Я выполняю приказы, даже если считаю, что они несправедливые.',
	'Куда бы я ни пришёл, я начинаю собирать местные слухи и распространять сплетни.',
	'Мне всегда нужно знать, как всё вокруг устроено, и как нужно обращаться с другими.',
	'Друзья знают, что всегда могут на меня положиться.',
	'Превыше всего я ценю совершенство.',
	'Однажды я пробежал 40 километров без остановки, чтобы предупредить свой клан о приближающейся орде орков. Если понадобится, я повторю это.',
	'Я связываю всё, что происходит со мной, с грандиозным замыслом космического масштаба.',
	'Я быстро устаю. Когда уже я найду свою судьбу?',
	'Я позволяю жажде победить в споре становиться сильнее дружбы и гармонии.',
	'На новом месте я первым делом подмечаю, где находятся различные ценности — или места, где они могут быть спрятаны.',
	'Когда я становлюсь перед выбором между друзьями и деньгами, я обычно выбираю деньги.',
	'Я могу найти общую позицию даже у самых яростных врагов, сопереживая им, и всегда стремясь к примирению.',
	'У меня есть семья, но я не знаю, где она. Надеюсь, когда-нибудь я увижу их вновь.',
	'Власть. Я хищник, а другие корабли в море — моя добыча.',
	'Я тайно считаю, что было бы хорошо стать тираном, правящим землями.',
	'Я работаю над великой философской теорией и люблю тех, кто разделяет мои идеи.',
	'У меня проблемы с доверием. Те, кто выглядят самыми порядочными, зачастую скрывают множество грязных секретов.',
	'Я сделаю всё что угодно, чтобы заполучить что-то редкое или очень ценное.'
],
events = [
	'Персонажи видят объявление, написанное детским почерком, в котором говорится о том, что потерялся морской котик, и за его нахождение готовы заплатить 2 медяка.',
	'Местный художник пытается продать эскизы нескольких своих картин, так же он предлагает прохожим нарисовать их портрет углем всего за 5 серебрянных.',
	'Прибой выносит к берегу мертвеца.',
	'После пары бокалов вам на миг показалось, что у всех посетителей таверны одно лицо. Да ну, бред какой-то. Очевидно, это все вино.',
	'В этой деревне есть традиция устраивать шуточный суд для любого, кто прожил в браке не менее семи лет. Есть супруги под присягой торжественно поклянется, что никогда не ссорились друг с другом, то они получают шмат бекона или еще что-то из закромов родины.',
	'Когда отречется король от своей короны, кровь обычного человека воспрянет подобно новому солнцу.',
	'Группа деревенских ребятишек, устроившая шуточное побоище, вооружившись палками, и соорудив доспехи из старых кастрюль и прочего старья. Если группа проявляет дружелюбие, дети могут указать направление к ближайшей деревне (или к месту, которое ищут персонажи).',
	'Все горные вершины покрыты снегом. Все кроме одной. Необычная гора - это спящий вулкан, который стал домом для морского народа.',
	'Странствующие бард и волшебник-иллюзионист устраивают представление, в ходе которого оживает (фигурально выражаясь) древняя легенда.',
	'Вялая мышь крутится под ногами и делает всё, чтобы её раздавили.',
	'Сильнейшая звездная вспышка ввела из строя важные узлы корабля. Необходимо приземлиться на ближайшую планету до того, как полученная доза радиации убьет весь экипаж, и починить корабль. Само собой ближайшей оказалась планета весьма удаленная от основных торговых путей.',
	'С лотка пробаются восхитительно-пахнужие пирожки с мясом. Всякая попытка ужнать о происхождении начинки встречается милой и понимающей улыбкой продавщицы.',
	'Поток горячей воды вдруг вырывается из-под земли и насмерть обваривает двух ремесленников, трудящихся на крупным заказом от короны.',
	'Сирены. Массивная металлическая штука… гуманоид… выскакивает прямо перед тобой.',
	'Порт украшают праздничными гирляндами из рыбьих костей. Какие-то хулиганы каждую ночь обрывают одну из них.',
	'В этот праздник на порогах домов выставляют выдолбленные овощи, на которых вырезаны странные, жуткие и забавные лица. Внутрь овощей помещают зажженные свечи. Говорят, это отпугивает злых духов.',
	'Практически недвижимая гладь воды усеяна большими листьями кувшинок, выглядящими достаточно большими, чтобы на них можно было спокойно наступить.',
	'Это мэр Тилкинс из колонии на Райан 4 всем, кто нас слышит. Мы находимся в блокаде 18 месяцев, у нас заканчиваются еда и прочие припасы, мы отчаянно нуждаемся в помощи!',
	'Из-за магической катастрофы, произошедшей в этих местах много сотен лет назад, горы все еще излучают элементальную энергию. Здесь частенько можно столкнуться с случаями спонтанного самовозгорания и с элементалями.',
	'Несколько крыс прибито за хвост к стенке тележки, у которой стоит потрепанного вида мужик. При вашем приближении, он кричит: "Крыса на палочке - 1 медяк, очень питательно!"',
	'Большая толпа не дает увидеть, что именно продается в этом лотке. Продавец окружен рассерженными людьми, требующими вернуть им деньги за испорченный товар. Похоже, в любой момент может начаться мордобой.',
	'Местные соревнуются в том, кто состроит самую страшную рожу. А победителю следует обойти все поселение по кругу, своим страшным видом отгоняя злых духов.',
	'Одетый в разномастное тряпье человек подбирает мусор, разбросанный по улице. Он ворошит разнокалиберные обломки и обрывки длинной палкой, выискивая что-нибудь на продажу.',
	'Деревенские мастерят простенькие хлопушки и трещотки и ходят от дома к дому, галдят, запускают ракеты. Считается, что те, чья совесть запятнана неблаговидными поступками устрашатся шума и покаятся.',
	'Человек, чья одежда выглядит значительно респектабельнее, чем окружение, продает темно-лиловый порошок, который, по его утверждениям, увеличивает магические способности. Незнакомец даже готов предоставить персонажам бесплатный образец, так как они ему понравились.',
	'Через пару минут после того, как партия зашла в таверну, они могут услышать звуки приближающейся грозы. Чем дольше партия находится в таверне, тем сильнее и ближе бушует шторм. А через 45 минут в стену таверны врезается дерево.',
	'Жители села устраивают соревнования, кто дальше закинет старые ботинки. Победитель получает новую пару обуви от местного сапожника. кроме того, считается, что с новой обувью победителю скоро придут хорошие новости.',
	'Ваш корабль наводнили паразиты. Всем известна их способность к размножению, поэтому ни одна станция или планета не разрешит пришвартоваться зараженному судну. А паразитов становится все больше.',
	'C горы спускаются Цеповые Улитки . Они довольно опасны, но поддаются приручению.',
	'Червоточина в этой системе весьма нестабильна, мы полагаем, она сломала барьер между измерениями, мы уже повстречали три копии нашего собственного корабля с командой. Точно такие же, с небольшими отличиями. Я бы посоветовал вам повернуть обратно, пока не стало поздно.',
	'В дальнем углу сидит человек в темном плаще. Он готов продать контрабанду любому, кто его об этом спросит.',
	'Разрытые могилы на кладбище и вывернутые из земли надгробные камни. Цепочка следов уводит к селению.',
	'Из озера в небо идёт дождь.',
	'Какой-то оборванец подсыпает что-то в напиток женщины сидящей с ним за одним столом.',
	'Мандилион или комитетчики оцепили дом, где скрывается враждебный инопланетянин. Где-то на пятом этаже послушались крики и ругательства, а потом… ББУБУХХХХХ!!!!! Полыхнуло огнём, и от постройки отломился порядочный кусок. Из дыры… высунулась харя, искорёженная взрывом. Как он там выжить-то сумел? А харя возьми и запрыгни на крышу соседнего здания.',
	'На борту телеги виднеется надпись "Приют Должника", в самой телеге лежат три тела, а рядом стоит большой человек в фартуке и с клещами в руках, он замечает вас и улыбается, показывая идеальные белые зубы.',
	'В телеге лежат куски мяса в разном состянии, у некоторых неприятный зеленоватый отенок, а над ними лениво жужжат крупные мухи.',
	'На пне некогда огромного дерева сидит большая лягушка. покрытая цветными пятнами и полосами. Она глядит куда-то вдаль и издает хриплые квакающие звуки, раздувая свой горловой мешок.',
	'Местный правитель изменил налогообложение моряков, и горожане в порту нападают на объявившего это глашатая.',
	'Несколько пыльных бутылок сложено в дальнем углу лотка. Кто-то сделал грубые наброски виноградных гроздей на них.',
	'Застонут деревья великого леса и подобно дождю с небес опадут звезды.',
	'Вы обнаруживаете покрытые льдом тела, разбросанные по тропе. Несчастный случай или злой умысел? Нужно быть осторожнее.',
	'Кольцо мерцающего света звезд освещает путь в новый мир, что старше времени.',
	'Долгожданное открытие сезона гонок на метлах! Ведьмы и волшебники рассекают в небесах ничуть не беспокоясь о сохранности природы или партии. Остерегайтесь огненных шаров!',
	'Прекраснейшую девушку на глазах партии кусает ядовитая змея. Времени на спасение мало.',
	'Партия натыкается на место преступления, и как раз появившиеся стражники, которых послали расследовать смерть знаменитого героя, обвиняют во всем вас. Совпадение?..',
	'За персонажами следит человек, который записывает в тетрадь все их покупки.',
	'Фермер, возвращающийся с полей с полной тачкой свежих овощей (1d6 рационов). Если группа дружелюбна, он может предложить обменять еду на что-нибудь (деньги его мало интересуют).',
	'Гарпии. Самые обычные гарпии. Они хотят съесть всю партию. или хотя бы их запасы еды.',
	'Скользкий на вид господин продает со своего ярко раскрашенного фургона чудо-эликсир исцеляющий от всего. В толпе виден сгорбленный страничек с палочкой, как только он принял образец эликсира, так он закричал от радости, отбросил трость и бодро шагает по улице.'
],
gachi = [
	'вы настоящий ♂DUNGEON MASTER♂.',
	'вы согласитесь на что угодно за ♂THREE HUNDRED BUCKS♂.',
	'вас боятся все ♂FUCKING SLAVES♂.',
	'ты хочешь меня ♂FUCK♂-♂FUCK♂-♂FUCK♂ а я хочу ♂THREE HUNDRED BUCKS♂.',
	'это ♂FUCK YOU♂ слегка, Просто ♂FUNGER♂ щекочет ♂MY ASS♂.',
	'вы берёте курс на ♂SUCK SOME DICKS♂.',
	'я ♂SWALLOW♂ сейчас ♂MY CUM♂.',
	'не так всё было, где же твое хвалёное ♂THREE HUNDRED BUCKS♂?',
	'awaken my ♂DUNGEON MASTER♂.',
	'ведьмаку заплатите ♂THREE HUNDRED BUCKS♂.',
	'♂ASS WE CAN!♂',
	'Владимир Путин М♂л♂дец',
	'♂Дружок пирожок кажется ты ошибся дверью, штаб навального на 2 этажа ниже♂',
	'идеальный стрим для нашего ♂️BONDAGE GAY WEBSITE♂️',
	'Вообще Гачимучи это не просто гей-порно с элементом БДСМ. Это настоящая мужская дружба, борьба, интриги, деньги, товарищество, предательство и конечно же, это харизматичные герои которые по своему уникальны, пропаганда ЗОЖ которую стоит продвигать в массу от мала до велика. На самом деле это ОХУЕННО! Ебаному быдлу не понять. © Азамат 16 лет.'
]
pickaxeLevel1 = [{
	type: 'Камень',
	comment: 'вскопал камень. (1$)',
	price: 1,
	chance: 500
},{
	type: 'Уголь',
	comment: 'вскопал уголь. (5$)',
	price: 5,
	chance: 200
},{
	type: 'Оловянная руда',
	comment: 'вскопал олово. (15$)',
	price: 15,
	chance: 100
},{
	type: 'Медная руда',
	comment: 'вскопал медь. (15$)',
	price: 15,
	chance: 100
},{
	type: 'Железная руда',
	comment: 'вскопал железо. (30$)',
	price: 30,
	chance: 50
},{
	type: 'Золотая руда',
	comment: 'вскопал золото. (50$)',
	price: 50,
	chance: 50
}],
pickaxeLevel2 = [{
	type: 'Камень',
	comment: 'вскопал камень. (1$)',
	price: 1,
	chance: 400
},{
	type: 'Уголь',
	comment: 'вскопал уголь. (5$)',
	price: 5,
	chance: 200
},{
	type: 'Оловянная руда',
	comment: 'вскопал олово. (15$)',
	price: 15,
	chance: 100
},{
	type: 'Медная руда',
	comment: 'вскопал медь. (15$)',
	price: 15,
	chance: 100
},{
	type: 'Железная руда',
	comment: 'вскопал железо. (30$)',
	price: 30,
	chance: 50
},{
	type: 'Золотая руда',
	comment: 'вскопал золото. (50$)',
	price: 50,
	chance: 50
},{
	type: 'Рог единорога',
	comment: 'подобрал рог единорога . (65$) Jebaited ',
	price: 65,
	chance: 40
},{
	type: 'Алмазная руда',
	comment: 'вскопал алмазы. (100$) ResidentSleeper ',
	price: 100,
	chance: 30
},{
	type: 'Кокаин',
	comment: 'нашёл кокаин. (250$) SeemsGood ',
	price: 250,
	chance: 20
},{
	type: 'Долбанит',
	comment: 'вскопал долбанит. (500$) PogChamp ',
	price: 500,
	chance: 10
}],
pickaxeLevel3 = [{
	type: 'Камень',
	comment: 'вскопал камень. (1$)',
	price: 1,
	chance: 350
},{
	type: 'Уголь',
	comment: 'вскопал уголь. (5$)',
	price: 5,
	chance: 150
},{
	type: 'Оловянная руда',
	comment: 'вскопал олово. (15$)',
	price: 15,
	chance: 80
},{
	type: 'Медная руда',
	comment: 'вскопал медь. (15$)',
	price: 15,
	chance: 80
},{
	type: 'Железная руда',
	comment: 'вскопал железо. (30$)',
	price: 30,
	chance: 100
},{
	type: 'Золотая руда',
	comment: 'вскопал золото. (50$)',
	price: 50,
	chance: 140
},{
	type: 'Рог единорога',
	comment: 'подобрал рог единорога . (65$) Jebaited ',
	price: 65,
	chance: 40
},{
	type: 'Алмазная руда',
	comment: 'вскопал алмазы. (100$) ResidentSleeper ',
	price: 100,
	chance: 30
},{
	type: 'Кокаин',
	comment: 'нашёл кокаин. (250$) SeemsGood ',
	price: 250,
	chance: 20
},{
	type: 'Долбанит',
	comment: 'вскопал долбанит. (500$) PogChamp ',
	price: 500,
	chance: 9
},{
	type: 'Нудесы Ани',
	comment: 'увидел в инсте нудесы Ани. (1000$) NotLikeThis NotLikeThis NotLikeThis ',
	price: 1000,
	chance: 1
}],
pickaxeLevel4 = [{
	type: 'Камень',
	comment: 'вскопал камень. (1$)',
	price: 1,
	chance: 200
},{
	type: 'Уголь',
	comment: 'вскопал уголь. (5$)',
	price: 5,
	chance: 200
},{
	type: 'Оловянная руда',
	comment: 'вскопал олово. (15$)',
	price: 15,
	chance: 100
},{
	type: 'Медная руда',
	comment: 'вскопал медь. (15$)',
	price: 15,
	chance: 100
},{
	type: 'Железная руда',
	comment: 'вскопал железо. (30$)',
	price: 30,
	chance: 150
},{
	type: 'Золотая руда',
	comment: 'вскопал золото. (50$)',
	price: 50,
	chance: 150
},{
	type: 'Рог единорога',
	comment: 'подобрал рог единорога . (65$) Jebaited ',
	price: 65,
	chance: 40
},{
	type: 'Алмазная руда',
	comment: 'вскопал алмазы. (100$) ResidentSleeper ',
	price: 100,
	chance: 30
},{
	type: 'Кокаин',
	comment: 'нашёл кокаин. (250$) SeemsGood ',
	price: 250,
	chance: 20
},{
	type: 'Долбанит',
	comment: 'вскопал долбанит. (500$) PogChamp ',
	price: 500,
	chance: 8
},{
	type: 'Нудесы Ани',
	comment: 'увидел в инсте нудесы Ани. (1000$) NotLikeThis NotLikeThis NotLikeThis ',
	price: 1000,
	chance: 2
}],
pickaxeLevel5 = [{
	type: 'Уголь',
	comment: 'вскопал уголь. (5$)',
	price: 5,
	chance: 100
},{
	type: 'Оловянная руда',
	comment: 'вскопал олово. (15$)',
	price: 15,
	chance: 100
},{
	type: 'Медная руда',
	comment: 'вскопал медь. (15$)',
	price: 15,
	chance: 100
},{
	type: 'Железная руда',
	comment: 'вскопал железо. (30$)',
	price: 30,
	chance: 250
},{
	type: 'Золотая руда',
	comment: 'вскопал золото. (50$)',
	price: 50,
	chance: 230
},{
	type: 'Рог единорога',
	comment: 'подобрал рог единорога . (65$) Jebaited ',
	price: 65,
	chance: 100
},{
	type: 'Алмазная руда',
	comment: 'вскопал алмазы. (100$) ResidentSleeper ',
	price: 100,
	chance: 100
},{
	type: 'Кокаин',
	comment: 'нашёл кокаин. (250$) SeemsGood ',
	price: 250,
	chance: 50
},{
	type: 'Долбанит',
	comment: 'вскопал долбанит. (500$) PogChamp ',
	price: 500,
	chance: 5
},{
	type: 'Нудесы Ани',
	comment: 'увидел в инсте нудесы Ани. (1000$) NotLikeThis NotLikeThis NotLikeThis ',
	price: 1000,
	chance: 5
}],
dungeonEventsLevel1 = [{
		text: ' вы упали по пути к подземелью и вывихнули колено, дальше идти смысла не было.',
		chance: 100,
		money: 0
	},{
		text: ' войдя в подземелье нашёл на стенде красивую вазу, "Она выглядит дорогой" - подумали вы и вынесли её с собой. Баланс +30.',
		chance: 150,
		money: 30
	},{
		text: ' на подходе к подземелью лежали несколько золотых монет. Подобрав их вы решили вернуться обратно. Баланс +10.',
		chance: 150,
		money: 10
	},{
		text: ' в подземелье вы встретили скелета. Он был слаб, поэтому вы без труда убили его своим мечом, после чего забрали кошель с монетами, висящий на его поясе, и ушли из подземелья. Баланс +50.',
		chance: 75,
		money: 50
	},{
		text: ' в подземелье вы нашли труп человека. "Вот бедолага" - подумали вы, но увидев на его поясе кошель золота вы обобрали труп и вышли в страхе из подземелья. Баланс +50.',
		chance: 70,
		money: 50
	},{
		text: ' в подземелье вы стретили дикую собаку. Убить её у вас труда не составило, но и золота при ней не было.',
		chance: 130,
		money: 0
	},{
		text: ' вы вошли в подземелье и встретили ♂DUNGEON MASTER♂, который за ♂THREE HUNDRED BUCKS♂ согласился на ♂FISTING♂. Баланс -300.',
		chance: 20,
		money: -300
	},{
		text: ' в подземелье вы встретили разбойника. Его снаряжение было лучше вашего, поэтому он согласился вас отпустить за 100 золотых монет.',
		good: ' Вы отдали ему 100 золотых монет и ушли из подземелья. Баланс -100.',
		bad:  ' Но у вас не оказалось при себе денег и разбойник вас убил. Аккаунт удалён.',
		chance: 50,
		money: -100
	},{
		text: ' в подземелье вы встретили группу хорошо экипированных бандитов. Они не стали сразу вас убивать и предложили отпустить за 200 золотых монет.',
		good: ' Вы отдали им 200 золотых монет и ушли из подземелья. Баланс -200.',
		bad:  ' Но у вас не оказалось при себе денег и разбойники вас убил. Аккаунт удалён.',
		chance: 50,
		money: -200
	},{
		text: ' в подземелье вы шли рядом с пропастью и оступились. Из вашего кошелька в пропасть упало несколько монет. Баланс -20.',
		chance: 50,
		money: -20
	},{
		text: ' в подземелье какой то вы увидели незнакомца, подойдя к нему он резко выхватил с вашего пояса кошель и убежал с ним. Вы не смогли его догнать... Баланс -100.',
		chance: 50,
		money: -100
	},{
		text: ' в подземелье вы встретили человека. Он был истощён и не знал как выбраться. Вы проводили его до выхода и дали немного денег. Баланс -10.',
		chance: 50,
		money: -10
	},{
		text: ' в подземелье среди песке вы увидели сверкающий камень. Вам стало интересно что это и вы раскопали его, это оказался алмаз. Баланс +100.',
		chance: 50,
		money: 100
	},{
		text: ' войдя в подземелье вы встретили огра. Едва заметив вас он кинул в вашу сторону большой валун и убил вас. Аккаунт удалён.',
		chance: 5,
		kill: true
	}
],
dungeonEventsLevel2 = [{
		text: ' вы упали по пути к подземелью и вывихнули колено, дальше идти смысла не было.',
		chance: 100,
		money: 0
	},{
		text: ' войдя в подземелье нашёл на стенде красивое кольцо. Вы недолго думая взяли его и вынесли с собой. Баланс +50.',
		chance: 100,
		money: 50
	},{
		text: ' на подходе к подземелью лежали несколько золотых монет. Подобрав их вы решили вернуться обратно. Баланс +20.',
		chance: 100,
		money: 20
	},{
		text: ' в подземелье вы встретили скелета. Он был слаб, поэтому вы без труда убили его своим мечом, после чего забрали кошель с монетами, висящий на его поясе, и ушли из подземелья. Баланс +75.',
		chance: 75,
		money: 75
	},{
		text: ' в подземелье вы нашли труп человека. "Вот бедолага" - подумали вы, но увидев на его поясе кошель золота вы обобрали труп и вышли в страхе из подземелья. Баланс +50.',
		chance: 70,
		money: 50
	},{
		text: ' в подземелье вы стретили дикую собаку. Убить её у вас труда не составило, но и золота при ней не было.',
		chance: 80,
		money: 0
	},{
		text: ' вы вошли в подземелье и встретили ♂DUNGEON MASTER♂, который за ♂THREE HUNDRED BUCKS♂ согласился на ♂FISTING♂. Баланс -300.',
		chance: 20,
		money: -300
	},{
		text: ' в подземелье вы стретили разбойника. Ваше снаряжение позволило вам победить его и забрать его золото. Баланс +100',
		chance: 100,
		money: 0
	},{
		text: ' в подземелье вы встретили разбойника. Его снаряжение было лучше вашего, поэтому он согласился вас отпустить за 150 золотых монет.',
		good: ' Вы отдали ему 150 золотых монет и ушли из подземелья. Баланс -150.',
		bad:  ' Но у вас не оказалось при себе денег и разбойник вас убил. Аккаунт удалён.',
		chance: 50,
		money: -150
	},{
		text: ' в подземелье вы встретили человека. У него был странный цвет кожи и манера говорить. Он попросил у вас 10 монет.',
		good: ' Вы отдали ему 10 золотых монет, но вам стало не по себе и вы вышли из подземелья. Баланс -10',
		bad:  ' Но у вас не оказалось при себе денег и человек превратился в чудовище, после чего с лёгкостью вас убил. Аккаунт удалён.',
		chance: 50,
		money: -10
	},{
		text: ' в подземелье вы встретили группу хорошо экипированных бандитов. Они не стали сразу вас убивать и предложили отпустить за 200 золотых монет.',
		good: ' Вы отдали им 200 золотых монет и ушли из подземелья. Баланс -200.',
		bad:  ' Но у вас не оказалось при себе денег и разбойники вас убил. Аккаунт удалён.',
		chance: 50,
		money: -200
	},{
		text: ' в подземелье вы шли рядом с пропастью и оступились. Из вашего кошелька в пропасть упало несколько монет. Баланс -25.',
		chance: 50,
		money: -25
	},{
		text: ' в подземелье какой то вы увидели незнакомца, подойдя к нему он резко выхватил с вашего пояса кошель и убежал с ним. Вы не смогли его догнать... Баланс -100.',
		chance: 50,
		money: -100
	},{
		text: ' в подземелье вы встретили человека. Он был истощён и не знал как выбраться. Вы проводили его до выхода и дали немного денег. Баланс -20.',
		chance: 50,
		money: -20
	},{
		text: ' в подземелье среди песке вы увидели поблеклый камень. Вам стало интересно что это и вы раскопали его, это оказался долбанит. Баланс +200.',
		chance: 50,
		money: 200
	},{
		text: ' войдя в подземелье вы встретили огра. Вы попытались убить его но ваше снаряжение вам не позволило. Он раздавил вас как букашку. Аккаунт удалён.',
		chance: 5,
		kill: true
	}
],
dungeonEventsLevel3 = [{
		text: ' вы упали по пути к подземелью и вывихнули колено, дальше идти смысла не было.',
		chance: 100,
		money: 0
	},{
		text: ' войдя в подземелье вы нашли на стенде красивое кольцо. Вы недолго думая взяли его и вынесли с собой. Баланс +50.',
		chance: 50,
		money: 50
	},{
		text: ' гуляю по подземелью вы вдруг замечаете что в вашем кошельке пропали деньги. Баланс -100.',
		chance: 50,
		money: -100
	},{
		text: ' на подходе к подземелью лежали несколько золотых монет. Подобрав их вы решили вернуться обратно. Баланс +20.',
		chance: 50,
		money: 20
	},{
		text: ' вы вошли в подземелье и встретили ♂DUNGEON MASTER♂, который за ♂THREE HUNDRED BUCKS♂ согласился на ♂FISTING♂. Баланс -300.',
		chance: 50,
		money: -300
	},{
		text: ' в подземелье вы встретили скелета. Он был слаб, поэтому вы без труда убили его своим мечом, после чего забрали кошель с монетами, висящий на его поясе, и ушли из подземелья. Баланс +75.',
		chance: 80,
		money: 75
	},{
		text: ' в подземелье вы встретили зомби. Вы без труда убили его, после чего забрали кошель с монетами, висящий на его поясе, и ушли из подземелья. Баланс +75.',
		chance: 50,
		money: 75
	},{
		text: ' в подземелье вы нашли труп человека. "Вот бедолага" - подумали вы, но увидев на его поясе кошель золота вы обобрали труп и вышли в страхе из подземелья. Баланс +50.',
		chance: 70,
		money: 50
	},{
		text: ' в подземелье вы стретили дикую собаку. Убить её у вас труда не составило, но и золота при ней не было.',
		chance: 50,
		money: 0
	},{
		text: ' в подземелье какой то вы увидели незнакомца, подойдя к нему он резко выхватил с вашего пояса кошель и убежал с ним. Вы не смогли его догнать... Баланс -100.',
		chance: 50,
		money: -100
	},{
		text: ' в подземелье вы стретили разбойника. Ваше снаряжение позволило вам победить его и забрать его золото. Баланс +100.',
		chance: 100,
		money: 0
	},{
		text: ' в подземелье вы встретили человека. У него был странный цвет кожи и манера говорить. Он попросил у вас 20 монет.',
		good: ' Вы отдали ему 20 золотых монет, но вам стало не по себе и вы вышли из подземелья. Баланс -20',
		bad:  ' Но у вас не оказалось при себе денег и человек превратился в чудовище, после чего с лёгкостью вас убил. Аккаунт удалён.',
		chance: 50,
		money: -20
	},{
		text: ' в подземелье вы встретили группу бандитов. Но ваше снаряжение позволило справиться с ними в одиночку и забрать их запасы. Баланс +500.',
		chance: 40,
		money: 500
	},{
		text: ' в подземелье вы шли рядом с пропастью и оступились. Из вашего кошелька в пропасть упало несколько монет. Баланс -50.',
		chance: 100,
		money: -50
	},{
		text: ' в подземелье вы встретили человека. Он был истощён и не знал как выбраться. Вы проводили его до выхода и дали немного денег. Баланс -25.',
		chance: 50,
		money: -25
	},{
		text: ' в подземелье среди песке вы увидели поблеклый камень. Вам стало интересно что это и вы раскопали его, это оказался долбанит. Баланс +200.',
		chance: 50,
		money: 200
	},{
		text: ' войдя в подземелье вы встретили огра. Ваше снаряжение позволило вам убить его и забрать сокровища которые он охранял. Баланс +1000.',
		chance: 10,
		money: 1000
	}
],
backpackPrices = {
	'3': 500,
	'5': 2000,
	'7': 5000,
	'10': 7500
},
backpackSizes = {
	'3': 5,
	'5': 7,
	'7': 10,
	'10': 15
},
pickaxePrices = {
	'1': 1000,
	'2': 2500,
	'3': 5000,
	'4': 10000
},
swordPrices = {
	'0': 1000,
	'1': 2500,
	'2': 4500,
},
commands = {
	receiveData: function(collection){
		return new Promise(function(resolve, reject){
			collection.find({}, { projection: { _id: 0}}).toArray(function(error, result){
				resolve(result)
			})
		})
	},
	info: function(res, collection, user){
		if (pathname.split('/')[4]){
			requestedUser = url.domainToUnicode(String(pathname.split('/')[4].replace('@','').replace('%40',''))).toLowerCase()
			for (i of data){if (i.name == requestedUser) user = i}
		}
		occupiedSpace = 0
		for (i of user.inventory) occupiedSpace += i.quantity
		res.write(' Имя: '+user.name+', Баланс: '+user.money+'$, Рюкзак: '+occupiedSpace+'/'+user.backpackSize+', Уровень кирки: '+user.pickaxeLevel+', '+((user.swordLevel > 0) ? 'Уровень меча: '+user.swordLevel : 'Меча нет')+'.')
	},
	inventory: function(res, collection, user){
		if (user.inventory.length < 1){
			res.write('В вашем рюкзаке ничего нет, \'!mine копать\' для добычи.')
			return res.end()
		}

		total = 0
		for (i of user.inventory) total += i.price * i.quantity
		for (i of user.inventory){res.write(i.type+' ('+((i.quantity > 1) ? +i.quantity+'×' : '')+i.price+'$), ')}
		occupiedSpace = 0
		for (i of user.inventory) occupiedSpace += i.quantity
		res.write('Всего: '+total+'$, Место: '+occupiedSpace+'/'+user.backpackSize)
	},
	dig: function(res, collection, user){return new Promise(function(resolve, reject){
		if ((function(){
			occupiedSpace = 0
			for (i of user.inventory) occupiedSpace += i.quantity
			return occupiedSpace
		})() >= user.backpackSize){
			res.write(' Рюкзак переполнен.')
			return resolve()
		}
		if (user.pickaxeLevel == 1) options = pickaxeLevel1
		else if (user.pickaxeLevel == 2) options = pickaxeLevel2
		else if (user.pickaxeLevel == 3) options = pickaxeLevel3
		else if (user.pickaxeLevel == 4) options = pickaxeLevel4
		else if (user.pickaxeLevel == 5) options = pickaxeLevel5
		for (sum = options[0].chance, choice = 0, rand = ~~(Math.random() * 1000); sum <= rand; sum += options[choice].chance) choice++
		occupiedSpace = 0
		for (i of user.inventory) occupiedSpace += i.quantity
		res.write(options[choice].comment+', Рюкзак '+(occupiedSpace+1)+'/'+user.backpackSize+'.')
		
		if ((function(){
			for (i of user.inventory){
				if (i.type == options[choice].type) return true
			}
		})()){
			for (i of user.inventory){
				if (i.type == options[choice].type){
					i.quantity++
				}
			}
		}
		else 
			user.inventory.push({
			type: options[choice].type,
			quantity: 1,
			price: options[choice].price
		})
			
		user.inventory.sort(function(a, b){return b.price - a.price})
			
		collection.updateOne({name: user.name},{$set: {inventory: user.inventory}}, function(error, result){
			if(error) res.write(' Ошибка с добавлением в инвентарь. Ошибка: '+error)
			resolve()
		})
	})},
	dungeon: function(res, collection, user){return new Promise(function(resolve, reject){
		if (user.swordLevel < 1){
			res.write(' Для похода в подземелье вам необходим меч. \'!mine купить меч\' для покупки.')
			return resolve()
		}
		if (user.swordLevel == 1) options = dungeonEventsLevel1
		else if (user.swordLevel == 2) options = dungeonEventsLevel2
		else if (user.swordLevel == 3) options = dungeonEventsLevel3
		for (sum = options[0].chance, choice = 0, rand = ~~(Math.random() * 1000); sum <= rand; sum += options[choice].chance) choice++
		res.write(options[choice].text)
		if (options[choice].money){
			if (options[choice].good){
				if (user.money >= Math.abs(options[choice].money)) 
					collection.updateOne(user,{$set: {money: Math.max(0, user.money+options[choice].money)}}, function(error, result){
						if(error) res.write(' Ошибка с пересчётом денег. Ошибка: '+error)
						else res.write(options[choice].good)
						resolve()
				})
				else collection.deleteOne(user, function(error, obj){
					if(error) res.write(' Ошибка удаления аккаунта. Ошибка: '+error)
					else res.write(options[choice].bad)
					resolve()
				})
			}
			else collection.updateOne(user,{$set: {money: Math.max(0, user.money+options[choice].money)}}, function(error, result){
				if(error) res.write(' Ошибка с пересчётом денег. Ошибка: '+error)
				else if (options[choice].good) res.write(options[choice].good)
				resolve()
			})
		}
		else if (options[choice].kill == true) collection.deleteOne(user, function(error, obj){
			if(error) res.write(' Ошибка удаления аккаунта. Ошибка: '+error)
			resolve()
		})
		else resolve()
	})},
	sell: function(res, collection, user){return new Promise(function(resolve, reject){
		total = 0
		for (i of user.inventory) total += i.price * i.quantity
		if (total > 0){
			collection.updateOne(user,{$set: {money: user.money+total,inventory: []}}, function(error, result){
				if(error) res.write(' Ошибка с продажей. Ошибка: '+error)
				else res.write(' Вы продали свои ресурсы за '+total+'$, текущий баланс: '+parseInt(total + user.money)+'$.')
				resolve()
			})
		}
		else {
			res.write(" Вам нечего продавать, '!mine копать' для добычи.")
			resolve()
		}
	})},
	upgrade: function(res, collection, user){return new Promise(function(resolve, reject){
		upgradingItem = url.domainToUnicode(pathname.split('/')[4]).toLowerCase()
		if (['рюкзак','сумка','сумку','инвентарь','inventory','inv'].indexOf(upgradingItem) != -1){
			if (user.backpackSize == 50){
				res.write(' У вас максимальный уровень рюкзака.')
				return resolve()
			}
			else {
				newBackpackSize = backpackSizes[user.backpackSize]
				price = backpackPrices[user.backpackSize]
			}
			if (user.money >= price){
				collection.updateOne(user,{$set: {money: user.money - price, backpackSize: newBackpackSize}}, function(error, result){
					if(error) res.write(' Ошибка улучшения рюкзака. Ошибка: '+error)
					else res.write('Вместимость рюкзака увеличена до '+newBackpackSize+' за '+price+'$, оставшиеся деньги: '+(user.money - price)+'$.')
					resolve()
				})
			}
			else {
				res.write(' Для увеличения места в рюкзаке до '+newBackpackSize+' требуется '+price+'$')
				resolve()
			}
		}
		else if (['кирка','кирку','инструмент','pickaxe','pick'].indexOf(upgradingItem) != -1){
			if (user.pickaxeLevel == 5){
				res.write(' У вас максимальный уровень кирки.')
				return resolve()
			}
			else price = pickaxePrices[user.pickaxeLevel]
			if (user.money >= price){
				collection.updateOne(user,{$set: {money: user.money - price, pickaxeLevel: user.pickaxeLevel + 1}}, function(error, result){
					if(error) res.write(' Ошибка улучшения кирки. Ошибка: '+error)
					else res.write('Уровень кирки увеличен до '+(user.pickaxeLevel+1)+' уровня за '+price+'$, оставшиеся деньги: '+(user.money-price)+'$.')
					resolve()
				})
			}
			else {
				res.write(' Для увеличения уровня кирки до '+(user.pickaxeLevel+1)+' уровня требуется '+price+'$')
				resolve()
			}
		}
		else if (['меч','оружие','данж','sword','sw'].indexOf(upgradingItem) != -1){
			if (user.swordLevel == 3){
				res.write(' У вас максимальный уровень меча.')
				return resolve()
			}
			else price = swordPrices[user.swordLevel]
			if (user.money >= price){
				collection.updateOne(user,{$set: {money: user.money - price, swordLevel: user.swordLevel + 1}}, function(error, result){
					if(error) res.write(' Ошибка улучшения меча. Ошибка: '+error)
					else res.write('Уровень меча увеличен до '+(user.swordLevel+1)+' уровня за '+price+'$, оставшиеся деньги: '+(user.money-price)+'$.')
					resolve()
				})
			}
			else {
				res.write(' Для увеличения уровня меча до '+(user.swordLevel+1)+' уровня требуется '+price+'$')
				resolve()
			}
		}
		else {
			res.write(" Команда '!mine улучшить' имеею структуру: '!mine улучшить (рюкзак/кирку/меч)'. "+((user.backpackSize != 15) ? 'Для увеличения рюкзака до '+backpackSizes[user.backpackSize]+' необходимо '+backpackPrices[user.backpackSize]+'$.' : 'У вас максимальный уровень рюкзака')+'. '+((user.pickaxeLevel != 5) ? 'Для улучшения кирки до '+(user.pickaxeLevel+1)+' уровня необходимо '+pickaxePrices[user.pickaxeLevel]+'$. ' : 'У вас максимальный уровень кирки.')+((user.swordLevel != 3) ? 'Для улучшения меча до '+(user.swordLevel+1)+' уровня необходимо '+swordPrices[user.swordLevel]+'$.' : 'У вас максимальный уровень меча.'))
			resolve()
		}
	})},
	give: function(res, collection, user){return new Promise(function(resolve, reject){
		recipient = url.domainToUnicode(String(pathname.split('/')[4].replace('@','').replace('%40',''))).toLowerCase()
		value = Math.abs(parseInt(pathname.split('/')[5]))
		
		if (!recipient || !value){
			res.write(" Команда '!mine передать' имеет структуру: '!mine передать пользователь сумма'.")
			return resolve()
		}
		
		if (user.name == recipient){
			res.write(" Нельзя передавать деньги себе.")
			return resolve()
		}
		
		if ((function(){
			for (i of data) if (i.name == recipient) {
				recipientGold = i.money
				return true
			}
		})()){
			if (user.money >= value){
				collection.updateOne({name: recipient},{$set: {money: recipientGold+value}}, function(error, result){
					if(error) {
						res.write(' Ошибка с передачей денег. Ошибка: '+error)
						return resolve()
					}
					else res.write(' Вы отдали @'+recipient+' '+value+'$, текущий баланс: '+(user.money-value)+'$.')
				})
				collection.updateOne(user,{$set: {money: user.money-value}}, function(error, result){
					if(error) res.write(' Ошибка с пересчётом баланса. Ошибка: '+error)
					return resolve()
				})
			}
			else {
				res.write(' У вас недостаточно средств для перевода.')
				resolve()
			}
		}
		else {
			res.write(' Пользователь '+recipient+' не зарегистрирован.')
			resolve()
		}
	})},
	users: function(res, data){
		res.write(' Зарегистрированные пользователи: ')
		data.sort(function(a,b){return b.money-a.money})
		for (let user of data) res.write(user.name.replace(/\b\w/g, l => l.toUpperCase())+'('+user.money+'$) ')
	},
	create: function(res, collection, name){return new Promise(function(resolve, reject){
		collection.insertOne({name: name, money: 0, inventory: [], backpackSize: 3, pickaxeLevel: 1, swordLevel: 0}, function(error, result){
			if(error) res.write(' Ошибка создания аккаунта. Ошибка: '+error)
			else res.write(' Аккаунт создан, теперь вы можете пользоваться командами бота.')
			resolve()
		})
	})},
	remove: function(res, collection, user){return new Promise(function(resolve, reject){
		collection.deleteOne(user, function(error, obj){
			if(error) res.write(' Ошибка удаления аккаунта. Ошибка: '+error)
			else res.write(" Аккаунт удалён, введите любое сообщение с '!mine' чтобы создать новый.")
			resolve()
		})
	})}
}
const server = http.createServer(function(req, res) {
	res.writeHeader(200, {"Content-Type": "application/json"})
	pathname = url.parse(req.url).pathname
	if (pathname.split('/')[1] == 'mine'){
		name = url.domainToUnicode(pathname.split('/')[2])
		action = url.domainToUnicode(pathname.split('/')[3]).toLowerCase()
		
		const mongoClient = new MongoClient("\x6D\x6F\x6E\x67\x6F\x64\x62\x2B\x73\x72\x76\x3A\x2F\x2F\x4B\x69\x63\x73\x68\x69\x6B\x78\x6F\x3A\x75\x61\x33\x77\x69\x6B\x71\x77\x65\x40\x63\x6C\x75\x73\x74\x65\x72\x30\x2D\x38\x68\x75\x6D\x79\x2E\x67\x63\x70\x2E\x6D\x6F\x6E\x67\x6F\x64\x62\x2E\x6E\x65\x74\x2F\x6D\x6F\x6F\x62\x6F\x74", {useNewUrlParser: true});
		mongoClient.connect(async function(error, client){
			
			if (error) {
				res.write(' Ошибка подключения к серверу. Ошибка: '+error)
				return res.end()
			}
			
			const collection = client.db("Moobot").collection("mine")
			data = await commands.receiveData(collection)
			
			if ((function(){
				for (i of data){
					if (i.name == name) {
						user = i
						return true
					}
				}
			})()){
				if (['инфо','инфа','баланс','деньги','банк','имя','info','infa','money','bank'].indexOf(action) != -1) commands.info(res, collection, user)
				else if (['инвентарь','инвент','карманы','сумка','рюкзак','вещи','ресурсы','inventory','inv'].indexOf(action) != -1) commands.inventory(res, collection, user)
				else if (['копать','батрачить','шахта','шахтёр','работать','dig'].indexOf(action) != -1) await commands.dig(res, collection, user)
				else if (['данж','подземелье','испытание','dungeon','dunge'].indexOf(action) != -1) await commands.dungeon(res, collection, user)
				else if (['продать', 'очистить','сбагрить','sell'].indexOf(action) != -1) await commands.sell(res, collection, user)
				else if (['улучшить','купить','прокачать','апгрейд','upgrade','up','buy'].indexOf(action) != -1) await commands.upgrade(res, collection, user)
				else if (['пользователи','игроки','люди','users','players'].indexOf(action) != -1) commands.users(res, data)
				else if (['удалиться','delete','del','remove'].indexOf(action) != -1) await commands.remove(res, collection, user)
				else if (['передать','перевод','подарить','подарок','give'].indexOf(action) != -1) await commands.give(res, collection, user)
				else res.write("Доступные команды для бота: 'инфо', 'пользователи', 'копать', 'данж', 'инвентарь', 'продать', 'улучшить', 'передать', 'удалиться'")
			}
			else await commands.create(res, collection, name)
			res.end()
			client.close()
		})
	}
	else if (pathname == '/ask') {
		res.write(['Да', 'Нет'].choiceOne())
		res.end()
	}
	else if (pathname.split('/')[1] == 'joke') {
		const Iconv = require('iconv').Iconv;
		http.get({host: 'rzhunemogu.ru', port: 80, path: '/RandJSON.aspx?CType=1', method: 'GET', encoding: 'binary'}, function(result){
			result.on('data', function(body){
				body = new Buffer(body, 'binary');
				conv = Iconv('windows-1251', 'utf8');
				body = conv.convert(body).toString();
				res.write(body.slice(12, -2))
				res.end()
			});
		});
	}
	else if (pathname.split('/')[1] == 'choice'){
		options = pathname.split('/')[2].split('+').map(function(element){
			if (parseInt(element) == element || parseFloat(element) == element) return element
			else return url.domainToUnicode(element)
		})
		if (options.length < 2) res.write('Количество вариантов должно быть больше одного. Варианты указываются после команды через пробел.')
		else res.write(options.choiceOne())
		res.end()
	}
	else if (pathname.split('/')[1] == 'rpg'){
		type = url.domainToUnicode(pathname.split('/')[2]).toLowerCase()
		if (['персонаж','персонажи','перс','герой'].indexOf(type) != -1)
			res.write(characters.choiceOne())
		else if (['событие','соба','ивент'].indexOf(type) != -1)
			res.write(events.choiceOne())
		else if (['гачи','gachi'].indexOf(type) != -1)
			res.write(gachi.choiceOne())
		else res.write(' Добро пожаловать в наш волшебный мир! Хочешь поучаствовать и узнать больше информации? Выбери категорию: персонаж (чтобы узнать, кто ты по жизни), событие (что происходит вокруг твоего персонажа). Например "!rpg персонаж"')
		res.end()
	}
	else {
		res.write('Проверьте правильность настройки команды.')
		res.end()
	}
})
server.listen(PORT)
console.log('Server started on port: '+PORT)
