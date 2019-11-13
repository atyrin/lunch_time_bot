import { Kolkovna } from "../../src/Restaurants/Kolkovna";
import { Menu } from "../../src/Restaurants/Restaurant";
import YandexTranslator from '../../src/Translator/YandexTranslator'
import Translator from "../../src/Translator/Translator";

const HTMLParser = require('node-html-parser');
require('dotenv').config();

describe('check kolkovna', () => {
	test('parse kolkovna html', async () => {
		let kolkovna = new Kolkovna();
		let menu: Menu = await kolkovna.parse(rawHtml, async (a)=>a);

		expect(menu.date).toBe("Thursday - 07.11. 2019");

		expect(menu.dishes[0].name).toBe("Gulášová polévka 1, 7, 9, 12");
		expect(menu.dishes[0].price).toBe("35 CZK");

		expect(menu.dishes[4].name).toBe("Kynuté knedlíky s jahodami a zakysanou smetanou 1, 3, 7");
		expect(menu.dishes[4].price).toBe("119 CZK");
	});

	test('load kolkovna html', async () => {
		let kolkovna = new Kolkovna()
		let menu: string = await kolkovna.loadMenu();
		console.log(menu);
		expect(menu).not.toBeNull();
	});

	test('parse kolkovna html', async () => {
		let kolkovna = new Kolkovna()
		let menu: string = await kolkovna.loadMenu();
		const root: HTMLElement = HTMLParser.parse(menu);
		console.log(root);
		let parsedMenu = await kolkovna.parse(menu, async (a)=>a);
		console.log(parsedMenu.toString());
		expect(root).not.toBeNull();
	});

	test('test translation', async () => {
		let kolkovna = new Kolkovna()
		let menu: string = await kolkovna.loadMenu();
		const root: HTMLElement = HTMLParser.parse(menu);
		console.log(root);
		const translator: Translator = new YandexTranslator();

		let parsedMenu = await kolkovna.parse(menu, async (text) => await translator.translate(text));
		console.log(parsedMenu.toTranslatedString());
		expect(root).not.toBeNull();
	});
});

const rawHtml = `<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8" />
	<meta name="description" content="" />
	<meta name="robots" content="index,follow" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="description" content="You will find the KOLKOVNA Argentinská restaurant in the new ArtGen complex on the left bank of the Vltava River in the flourishing Holešovice District. KOLKOVNA Argentinská combines modern design with the best tradition of Czech Pilsner Urquell tank beer, excellent Czech cuisine, quality services and hospitality. Enjoy the unique ambiance of KOLKOVNA Argentinská." />


	<title>Kolkovna Argentinská</title>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans:400,700&subset=latin,latin-ext" type="text/css" />

		<link rel="stylesheet" href="/min/front_mainCss.css?v=2" />

	<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
	<link rel="icon" href="/favicon.ico" type="image/x-icon" />

	<!--[if lt IE 9]>
	<script src=" /js/html5shiv-printshiv.js"></script>
	<![endif]-->
	
	<script type="text/javascript">
		var recaptchaSiteKey = "6LcPpgITAAAAAHhp5PMPjlU4OiaWrpo9nOiYLmoW";
	</script>

	<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-28145068-1']);
	_gaq.push(['_setDomainName', 'kolkovna.cz']);
	_gaq.push(['_setAllowLinker', true]);
	_gaq.push(['_trackPageview']);

	(function() {
	  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();
	</script>

	<!-- Facebook Pixel Code -->
	<script>
	!function(f,b,e,v,n,t,s){ if(f.fbq)return;n=f.fbq=function(){ n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
	n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s) }(window,
	document,'script','https://connect.facebook.net/en_US/fbevents.js');

	fbq('init', '812063852232165');
	fbq('track', "PageView");

	</script>
	<noscript><img height="1" width="1" style="display:none"
	src="https://www.facebook.com/tr?id=812063852232165&ev=PageView&noscript=1"
	 /></noscript>
	<!-- End Facebook Pixel Code -->
	</script>

	<script src="https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit&hl=en" type="text/javascript" async defer></script>
</head>

<body class="langen restaurantPresenter" data-lang="en">
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.7";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));</script>


	<header>
		<div class="stripe">
			<figure class="languages content">
				<a id="facebookFindUs" href="https://www.facebook.com/KolkovnaRestaurants" target="_blank"><img src="/img/facebook_find_us.png" alt="Find us on Facebook" /></a>

				<ul class="plain">
					<li class="first"><a href="/cs/kolkovna-argentinska-23">cs</a></li>
					<li class=""><a href="/en/kolkovna-argentinska-23">en</a></li>
					<li class=""><a href="/sk/kolkovna-argentinska-23">sk</a></li>
					<li class=""><a href="/ru/kolkovna-argentinska-23">ru</a></li>
					<li class="last"><a href="/kr/kolkovna-argentinska-23">kr</a></li>
				</ul>
			</figure>

			<div class="content">
				<a href="/en">
					<img src="/img/rest_images/23/logo/argentinska.png" alt="Kolkovna Restaurants" />
				</a>

				<nav>
<ul class="plain" id="topMenu">

	<li id="topMenuMenu1" class="main hasSubmenu first">
		<a class="mainHref" href="#"><span>Kolkovna Restaurants</span></a>
		<ul class="plain submenu" id="topMenuSubMenu1">
			<li id="topMenuMenu1_1" class="sub first">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-savarin-20"><span>KOLKOVNA SAVARIN | cz</span></a>
			</li>
			<li id="topMenuMenu1_2" class="sub">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-celnice-13"><span>KOLKOVNA CELNICE | cz</span></a>
			</li>
			<li id="topMenuMenu1_3" class="sub">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-olympia-12"><span>KOLKOVNA OLYMPIA | cz</span></a>
			</li>
			<li id="topMenuMenu1_4" class="sub">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-budejovicka-18"><span>KOLKOVNA BUDĚJOVICKÁ | cz</span></a>
			</li>
			<li id="topMenuMenu1_5" class="sub">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-argentinska-23"><span>KOLKOVNA ARGENTINSKÁ | cz</span></a>
			</li>
			<li id="topMenuMenu1_6" class="sub">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-stodulky-24"><span>KOLKOVNA STODŮLKY | cz</span></a>
			</li>
			<li id="topMenuMenu1_7" class="sub">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-dock-25"><span>KOLKOVNA DOCK | cz</span></a>
			</li>
			<li id="topMenuMenu1_8" class="sub">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-eurovea-19"><span>KOLKOVNA EUROVEA | sk</span></a>
			</li>
			<li id="topMenuMenu1_9" class="sub">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-river-park-15"><span>KOLKOVNA RIVER PARK | sk</span></a>
			</li>
			<li id="topMenuMenu1_10" class="sub">
				<a class="secHref" href="https://www.kolkovna.cz/en/stopkova-plzenska-pivnice-16"><span>STOPKOVA PLZEŇSKÁ PIVNICE | cz</span></a>
			</li>
			<li id="topMenuMenu1_11" class="sub last">
				<a class="secHref" href="https://www.kolkovna.cz/en/kolkovna-almaty-22"><span>KOLKOVNA ALMATY | kz</span></a>
			</li>
		</ul>
	</li>

	<li id="topMenuMenu2" class="main">
		<a class="mainHref" href="/en/kolkovna-friends"><span>Kolkovna Friends</span></a>
	</li>

	<li id="topMenuMenu3" class="main">
		<a class="mainHref" href="/en/menu-of-the-day"><span>Menu of the day</span></a>
	</li>

	<li id="topMenuMenu4" class="main last">
		<a class="mainHref" href="/en/reservation"><span>reservation</span></a>
	</li>
</ul>				</nav>
			</div>
		</div>
		<div id="stripeSpacer">&nbsp;</div>
	</header>

	<div id="main">
			<nav class="content clearfix">
<ul class="plain secondaryMenu" id="restaurantMenu">

	<li id="restaurantMenuMenu1" class="main first">
		<a class="mainHref" href="https://www.kolkovna.cz/en/kolkovna-argentinska-23"><span>information</span></a>
	</li>

	<li id="restaurantMenuMenu2" class="main">
		<a class="mainHref" href="https://www.kolkovna.cz/en/kolkovna-argentinska-23/menu"><span>menu</span></a>
	</li>

	<li id="restaurantMenuMenu3" class="main">
		<a class="mainHref" href="https://www.kolkovna.cz/en/kolkovna-argentinska-23/drinks"><span>drinks</span></a>
	</li>

	<li id="restaurantMenuMenu4" class="main">
		<a class="mainHref" href="https://www.kolkovna.cz/en/kolkovna-argentinska-23/menu-of-the-day"><span>menu of the day</span></a>
	</li>

	<li id="restaurantMenuMenu5" class="main">
		<a class="mainHref" href="https://www.kolkovna.cz/en/kolkovna-argentinska-23/reservation"><span>reservation</span></a>
	</li>

	<li id="restaurantMenuMenu6" class="main">
		<a class="mainHref" href="https://www.damejidlo.cz/kolkovna-argentinska" target=&quot;_blank&quot;><span>food delivery</span></a>
	</li>

	<li id="restaurantMenuMenu7" class="main">
		<a class="mainHref" href="https://www.kolkovna.cz/en/kolkovna-argentinska-23/photos"><span>photos</span></a>
	</li>

	<li id="restaurantMenuMenu8" class="main last">
		<a class="mainHref" href="https://www.kolkovna.cz/en/kolkovna-argentinska-23/contact"><span>Contact</span></a>
	</li>
</ul>			</nav>

<div class="content contentBcg clearfix">

	<div class="leftCol">
		<article>
			<h1>KOLKOVNA ARGENTINSKÁ&nbsp;&nbsp;|&nbsp;&nbsp;<span>information</span></h1>


<aside class="banners" id="banner">
	<div class="dots">
		<a class="active" href="#!">&nbsp;</a>
		<a href="#!">&nbsp;</a>
	</div>
		<article class="bannerSlide">
				<div class="mockH2">&nbsp;</div>

				<a href="/en/kolkovna-argentinska-23/news/goose-party-in-kolkovna-restaurants-cz-179">

			<img src="/image/banner/533x325/8/179_18146828345dc174865211a.jpg" alt="Goose Party in Kolkovna Restaurants - CZ" />

				</a>

			
		</article>
		<article class="bannerSlide prevs">
				<div class="mockH2">&nbsp;</div>


			<img src="/image/banner/533x325/8/187_3201663955daf02db8daf0.jpg" alt="Škola čepování Kolkovna Restaurants" />


			
		</article>
</aside>

			<p class="shortText">You will find the KOLKOVNA Argentinská restaurant in the new ArtGen complex on the left bank of the Vltava River in the flourishing Holešovice District. KOLKOVNA Argentinská combines modern design with the best tradition of Czech Pilsner Urquell tank beer, excellent Czech cuisine, quality services and hospitality. Enjoy the unique ambiance of KOLKOVNA Argentinská. <a href="#!" class="showLongText">more&nbsp;&gt;&gt;</a></p>
			<p class="longText">The first KOLKOVNA – Pilsner Urquell Original Restaurant concept restaurant, in Holešovice in the new modern ArtGen office complex, offers the ambiance of an honest Czech restaurant with everything this entails. The menu offers a modern take on classic Czech cuisine, complemented by salads and selected specialities from around the world. The area is designed similarly to other KOLKOVNA – Pilsner Urquell Original Restaurant concept restaurants and is stylised into the period of the First Republic in combination with modern elements corresponding to the current requirements of a modern restaurant and is dominated by a typical bar with a copper casing. Kolkovna Argentinská offers seating on one floor and in an outdoor garden. It offers a total of 267 seats. All areas are fully air-conditioned and are non-smoking. The restaurant offers draft Pilsner Urquell, dark Velkopopovický Kozel and Birell Light. <a href="#!" class="showShortText">&lt;&lt;&nbsp;less</a></p>

						<div class="icons">
					<div class="icon">
						<img src="/img/hp_icons/icon_pets.png" alt="Pets" title="Pets" /><br />
							&nbsp;
					</div>
					<div class="icon">
						<img src="/img/hp_icons/icon_wifi.png" alt="Wi-Fi" title="Wi-Fi" /><br />
							&nbsp;
					</div>
					<div class="icon">
						<img src="/img/hp_icons/icon_meal_ticket.png" alt="Meal tickets" title="Meal tickets" /><br />
							&nbsp;
					</div>
					<div class="icon">
						<img src="/img/hp_icons/icon_credit_card.png" alt="Credit cards" title="Credit cards" /><br />
							&nbsp;
					</div>
					<div class="icon">
						<img src="/img/hp_icons/icon_no_smoking.png" alt="Non-smoking area" title="Non-smoking area" /><br />
							&nbsp;
					</div>
					<div class="icon">
						<img src="/img/hp_icons/icon_camera.png" alt="Closed circuit TV system" title="Closed circuit TV system" /><br />
							&nbsp;
					</div>
					<div class="icon">
						<img src="/img/hp_icons/icon_clima.png" alt="Air conditioning" title="Air conditioning" /><br />
							&nbsp;
					</div>
					<div class="icon">
						<img src="/img/hp_icons/places_inside.png" alt="Places inside" title="Places inside" /><br />
							211
					</div>
					<div class="icon">
						<img src="/img/hp_icons/places_outside.png" alt="Places outside" title="Places outside" /><br />
							56
					</div>
			</div>
		</article>

			<article>
				<h2>Try today´s menu</h2>
				<p>Each weekday we always prepare a fresh menu of the day especially for you. We offer soup of the day and a choice of four main courses. And remember you can have your favourite meal as a take-away to eat at home or at your office. 

The menu of the day is available from 11 a.m. until sold out, but not after 3 p.m.</p>
			</article>

	<div class="dailyMenuWeek">
		<section>
			<h2 class="brown">Thursday - 07.11. 2019</h2>
			<table class="menu dailyMenu">
				<tr>
					<td class="title">Soup</td>
					<td class="name">Gulášová polévka 1, 7, 9, 12</td>
					<td class="price">35 CZK</td>
				</tr>
				<tr>
					<td class="title">Main course</td>
					<td class="name">Gril. losos, smetanové brambory, omáčka z pečených paprik 4,7,12</td>
					<td class="price">159 CZK</td>
				</tr>
				<tr>
					<td class="title">Main course II.</td>
					<td class="name">Hovězí svíčková pečeně s houskovým knedlíkem, brusinky 1,3,7,9,12</td>
					<td class="price">139 CZK</td>
				</tr>
				<tr>
					<td class="title">Main course III.</td>
					<td class="name">Kuř. roláda s bylinkami a slaninou, bramb. kaše, naklád. okurka 1,7,9</td>
					<td class="price">129 CZK</td>
				</tr>
				<tr>
					<td class="title">Main course IV.</td>
					<td class="name">Kynuté knedlíky s jahodami a zakysanou smetanou 1, 3, 7</td>
					<td class="price">119 CZK</td>
				</tr>
			</table>
		</section>
	</div>

	</div>

	<div class="rightCol">
<aside class="rightPannel rightContact clearFix" id="rightContact">
		<div class="contactContent">
			<h1>KOLKOVNA ARGENTINSKÁ</h1>
			<div class="address">
				
				U garáží 1611/1<br />
				170 00 Praha 7<br />
				Czech Republic
			</div>

			<h2>reservation</h2>
			<p>
				<strong>+420 277 008 884</strong><br />
				<a href="mailto:argentinska@kolkovna.cz">argentinska@kolkovna.cz</a>
			</p>

			<h2>Open</h2>
				<div class="clearFix">
					<div class="openingDays">
						Mon
							- Sat
					</div>
					11:00 - 24:00
				</div>
				<div class="clearFix">
					<div class="openingDays">
						Sun
					</div>
					11:00 - 23:00
				</div>

		</div>

		<div id="contactMapContent" class="mapContent">
								<iframe data-addr="KOLKOVNA ARGENTINSKÁ, U garáží 1611/1, Praha 7, Czech Republic" width="100%" height="100%" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=KOLKOVNA ARGENTINSKÁ, U garáží 1611/1, Praha 7, Czech Republic&key=AIzaSyBvfmXjoxcNbTnC6unjhFBTI4ytMjDSUNM" allowfullscreen></iframe>
		</div>


		<div class="buttons clearfix">
		</div>

		<div class="social clearfix">
			<div class="clearfix">
				<div class="fbPage">
					<div class="fb-page" data-href="https://www.facebook.com/KolkovnaArgentinska" data-height="170" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/KolkovnaArgentinska" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/KolkovnaArgentinska">KOLKOVNA ARGENTINSKÁ</a></blockquote></div>
				</div>
			</div>

			<a class="instagram" href="https://www.instagram.com/kolkovna_restaurants/" target="_blank"><span>https://www.instagram.com/kolkovna_restaurants/</span></a>

		</div>
</aside>
	</div>


</div>
	</div>

	<footer>
		<div class="content">
<aside id="friends">
	<a class="switch" href="#"><span>&DownArrow;</span></a>
	<h2>
			Kolkovna Friends
	</h2>
	
<form action="https://friends.kolkovna.cz/" method="post" id="frm-friends-login"><input type="text" placeholder="User name" name="username" id="frmlogin-username" value="" /><input type="password" placeholder="Password" name="password" id="frmlogin-password" /><input class="button" type="submit" name="butLogin" id="frmlogin-butLogin" value="Log in" /><div><input type="hidden" name="captcha" id="frmlogin-captcha" value="" /></div>
</form>
	

	<ul class="links plain">
		<li><a id="friendsRegistration" target="_blank" href="https://friends.kolkovna.cz/auth/register">New registration</a></li>
		<li><a target="_blank" href="https://friends.kolkovna.cz/auth/lost">Forgotten your password?</a></li>
	</ul>
</aside>

			<nav class="clearfix">
<ul class="plain clearfix" id="bottomMenu">

	<li id="bottomMenuMenu1" class="main first">
		<a class="mainHref" href="/en"><span>homepage</span></a>
	</li>

	<li id="bottomMenuMenu2" class="main">
		<a class="mainHref" href="/en/job-opportunities"><span>Job opportunities</span></a>
	</li>

	<li id="bottomMenuMenu3" class="main">
		<a class="mainHref" href="/en/gift-voucher"><span>gift voucher</span></a>
	</li>

	<li id="bottomMenuMenu4" class="main">
		<a class="mainHref" href="/en/feedback"><span>feedback</span></a>
	</li>

	<li id="bottomMenuMenu5" class="main last">
		<a class="mainHref" href="/en/contact-us"><span>contact us</span></a>
	</li>
</ul>			</nav>

<aside id="partners" class="clearfix">
	<a href="http://www.prazdroj.cz" target="_blank">
		<img src="/img/partners/pilsner.png" alt="Pilsner Urquell" />
	</a>
	<a href="http://www.kofola.cz" target="_blank">
		<img src="/img/partners/kofola.png" alt="Kofola" />
	</a>
	<a href="http://www.tchibo-coffeeservice.cz" target="_blank">
		<img src="/img/partners/piacetto.png" alt="Piacetto espresso" />
	</a>
	<a href="http://www.pernod-ricard.cz" target="_blank">
		<img src="/img/partners/becher.png" alt="Jan Becher" />
	</a>
	<a href="http://www.fromin.eu" target="_blank">
		<img src="/img/partners/fromin.png" alt="Fromin" />
	</a>
	<a href="http://www.rjelinek.cz" target="_blank">
		<img src="/img/partners/jelinek.png" alt="R. Jelínek" />
	</a>
	<a href="http://www.gwl.cz" target="_blank">
		<img src="/img/partners/gwl.png" alt="Good Wine Lover" />
	</a>
</aside>
			<aside id="copyright">
				<a id="mobileLink" href="https://m.kolkovna.cz/en/kolkovna-argentinska-23?forceVersion=mobile">mobile site</a>
				<strong>&copy; Kolkovna Restaurants</strong> | <a href="http://www.gng.cz">design & system by GNG</a>
			</aside>
		</div>
	</footer>

<div id="sliderBackground" style="background-image:url('\/image\/photogal_new\/1618x1080\/4\/10_2080700495552513e9e5f9e\.jpg')">
	<ul class="plain" id="sliderImages">
		<li style="background-image:url('\/image\/photogal_new\/1618x1080\/4\/10_2080700495552513e9e5f9e\.jpg')">&nbsp;</li>
		<li style="background-image:url('\/image\/photogal_new\/1618x1080\/4\/10_212332591552513e06c408\.jpg')">&nbsp;</li>
		<li style="background-image:url('\/image\/photogal_new\/1618x1080\/4\/10_359820927552513c710aa8\.jpg')">&nbsp;</li>
		<li style="background-image:url('\/image\/photogal_new\/1618x1080\/4\/10_1003611999552513ccd667f\.jpg')">&nbsp;</li>
	</ul>
</div>


	<script type="text/javascript">
		var consent_config = {
			css: '.consent-cookies { background-color: #7e6a40; }',
			lan: 'en'
		}
	</script>

		<script src="/min/front_js.js?v=2"></script>

	<script type="text/javascript">
	$('#facebookFindUs').click(function(){
		_gaq.push(['_trackEvent', 'facebook', 'click']);
	});
	</script>

</body>
</html>
`