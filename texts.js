const characters = [
	'Ты чертовски глупое дерьмо, ты будешь трахать всю свою мать.',
	'Я каменьщик, работаю три дня.',
	'Я каменьщик, работаю три дня.',
	'Я не герой любовник и не какой то там смазливый мальчик, я человек камин.',
	'Я каменьщик, работаю три дня без зарплаты.',
	'Я кожевник и выбрал не ту дверь.',
	'Я кожевник и выбрал не ту дверь.',
	'Оревуар и мерси боку мне 70 и я ухожу.',
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
	'Андрею сказали, что фистинг - это не больно. Обманули дурака на ♂THREE HUNDRED BUCKS♂.',
	'Владимир Путин М♂л♂дец',
	'♂Дружок пирожок кажется ты ошибся дверью, штаб навального на 2 этажа ниже♂',
	'идеальный стрим для нашего ♂️BONDAGE GAY WEBSITE♂️',
	'Вообще Гачимучи это не просто гей-порно с элементом БДСМ. Это настоящая мужская дружба, борьба, интриги, деньги, товарищество, предательство и конечно же, это харизматичные герои которые по своему уникальны, пропаганда ЗОЖ которую стоит продвигать в массу от мала до велика. На самом деле это ОХУЕННО! Ебаному быдлу не понять. © Азамат 16 лет.',
	'- Что вы делали вчера вечером? - ♂FISTING♂. - А что вчера было? - ♂THREE HUNDRED BUCKS♂.',
	'♂COLLEGE BOY♂ удивительные существа. Самое сложное для них - ♂SWALLOW CUM♂, а самое простое -  STICK FINGER IN YOUR ASS♂.',
	'♂DUNGEON MASTER♂ drilling ass. ♂FISTING♂ is ♂THREE HUNDRED BUCKS♂.',
	'Здравствуй ♂SLAVES♂, вижу у тебя много ♂DEEP DARK FANTASIES♂ ко мне. ♂FISTING♂ их, а потом мы решим что с тобой делать',
	'Те ♂CUM♂, которые вы бросаете на пол ♂SLAVES♂ думают, что это ♂COCK♂.И когда хотят ♂SUCK♂ его, то ♂CUM♂ прилипает к ♂ANAL♂, ♂SLAVE♂ не может ни ♂SUCK♂ ни ♂FISTING♂ и умирает! Берегите ♂GYM♂!!!',
	'Однажды ♂BOSS OF THE GYM♂ сказал двум ♂BOY NEXT DOOR♂, что за съёмки в ♂GAY PORN♂ заплатят ♂THREE HUNDRED BUCKS♂. Обманули ♂FUCKING SLAVES♂ на четыре ♂FISTING ASS♂!',
	'Только хотел рассчитаться на кассе, как сзади голос: "♂OH SHIT♂, Я оплачу". ♂FUCKING SLAVE♂ какой-то. Говорит: "Я в ♂GYM♂ работаю. "Мы возле ♂LOCKER ROOM♂ ♂FUCK YOU♂". Потом в сторону отвёл, протянул ♂THREE HUNDRED BUCKS♂: "Когда всё начнётся, замолви за меня словечко перед ♂DUNGEON MASTER♂. "Не хочу ♂STICK FINGER IN MY ASS♂". И ♂CUM♂.',
	'♂DUNGEON MASTER♂ заходит в ♂DUNGEON♂. Видит маленькую бронзовую фигурку ♂FUNCKING SLAVE♂. На ценнике написано: "♂FUNCKING SLAVE♂ - 1000 рублей, ♂FISTING♂ - 300$". - Я могу купить ♂FUNCKING SLAVE♂ без ♂FISTING♂? - спрашивает он ♂LEATHERMAN♂. - Конечно, - отвечает ♂LEATHERMAN♂, - Но за ♂FISTING♂ вы всё равно вернётесь.',
	'-♂️BOYS♂️, слушайте меня внимательно. Будем прорываться к ♂️GYM♂️. ♂️DUNGEON♂️ кишит ♂️FUCKING SLAVES♂️ и прочей нечистью. Поэтому ♂️CUMMING♂️ в оба и прикрывать ♂️ASS♂️ друг друга. Всё. Проверяйте ♂️FAT COCK♂️ и выдвигаемся вперёд по аллее. Готовность ♂️THREE HUNDRED♂️ секунд'
] 

module.exports = {
	characters: characters,
	events: events,
	gachi: gachi,
}
