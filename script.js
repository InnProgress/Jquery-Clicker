var money = 0;
var level = 1;
var xp = 0;
var maxXp = 100;

var hacked = 0;
var hack = 0;
var hackMax = 10;

var moneySkill = 1;
var hackSkill = 1;
var moneyBotSkill = 1;
var hackBotSkill = 1;

var buttonLaikas = 0;

var group = -1;

var hideAlert = 0;

var achievment = [];


var achievmentInfo = [
	{id: 0, moneyR: 50, hackedR: 0, levelR: 0},
	{id: 1, moneyR: 2000, hackedR: 0, levelR: 0},
	{id: 2, moneyR: 3000, hackedR: 10, levelR: 0},
	{id: 3, moneyR: 0, hackedR: 0, levelR: 15},
	{id: 4, moneyR: 0, hackedR: 20, levelR: 0},
	{id: 5, moneyR: 5000, hackedR: 30, levelR: 15},
	{id: 6, moneyR: 0, hackedR: 0, levelR: 30},
	{id: 7, moneyR: 20000, hackedR: 0, levelR: 0},
	{id: 8, moneyR: 0, hackedR: 50, levelR: 0}
];

var achievmentAwardInfo = [
	{id: 0, moneyR: 0, xpR: 100, moneyClick: 0, hackClick: 0, moneySecond: 0, hackSecond: 0},
	{id: 1, moneyR: 0, xpR: 500, moneyClick: 0, hackClick: 0, moneySecond: 0, hackSecond: 0},
	{id: 2, moneyR: 0, xpR: 0, moneyClick: 0, hackClick: 0, moneySecond: 10, hackSecond: 0},
	{id: 3, moneyR: 5000, xpR: 0, moneyClick: 0, hackClick: 5, moneySecond: 0, hackSecond: 0},
	{id: 4, moneyR: 1500, xpR: 0, moneyClick: 0, hackClick: 0, moneySecond: 10, hackSecond: 0},
	{id: 5, moneyR: 0, xpR: 0, moneyClick: 0, hackClick: 20, moneySecond: 0, hackSecond: 20},
	{id: 6, moneyR: 0, xpR: 0, moneyClick: 30, hackClick: 0, moneySecond: 30, hackSecond: 0},
	{id: 7, moneyR: 0, xpR: 1500, moneyClick: 0, hackClick: 0, moneySecond: 0, hackSecond: 0},
	{id: 8, moneyR: 0, xpR: 0, moneyClick: 50, hackClick: 50, moneySecond: 50, hackSecond: 50}
];


var hackerGroups = [
	{id: 0, name: "AnonCoders", minLvl: 5, moneyProcents: 10, xpProcents: 5, hackProcents: 0, lucky: 20},
	{id: 1, name: "DCLeaks", minLvl: 10, moneyProcents: 15, xpProcents: 10, hackProcents: 5, lucky: 20},
	{id: 2, name: "Cult of the Dead Cow", minLvl: 20, moneyProcents: 15, xpProcents: 20, hackProcents: 15, lucky: 15},
	{id: 3, name: "Masters of Deception", minLvl: 30, moneyProcents: 25, xpProcents: 20, hackProcents: 20, lucky: 25},
	{id: 4, name: "P.H.I.R.M.", minLvl: 45, moneyProcents: 35, xpProcents: 40, hackProcents: 20, lucky: 30},
	{id: 5, name: "RedHack", minLvl: 60, moneyProcents: 45, xpProcents: 45, hackProcents: 30, lucky: 45},
	{id: 6, name: "Shadow Brokers", minLvl: 80, moneyProcents: 55, xpProcents: 55, hackProcents: 35, lucky: 45},
	{id: 7, name: "Legion of Doom", minLvl: 100, moneyProcents: 65, xpProcents: 70, hackProcents: 45, lucky: 60},
	{id: 8, name: "Anonymous", minLvl: 130, moneyProcents: 70, xpProcents: 90, hackProcents: 80, lucky: 75}
];


CreateAchievments();
CreateHackerGroups();




$("#money-skill-text").html(moneySkill);
$("#hack-skill-text").html(hackSkill);
$("#money-bot-skill-text").html(moneyBotSkill);
$("#hack-bot-skill-text").html(hackBotSkill);

setInterval(AddBotMoney, 1000);

$("#game").click(function() {
	$(".main-content").fadeOut("slow");
	$("#game-content").fadeIn("slow");
});
$("#contacts").click(function() {
	$(".main-content").fadeOut("slow");
	$("#contacts-content").fadeIn("slow");
});
$("#updates").click(function() {
	$(".main-content").fadeOut("slow");
	$("#updates-content").fadeIn("slow");
});
$("#donate").click(function() {
	$(".main-content").fadeOut("slow");
	$("#donate-content").fadeIn("slow");
});


var min = 1000;
$("#hack-btn").click(function() {

	var date = new Date();

	if( date.getTime() - buttonLaikas > 94 ) {

		$("#hack-btn").effect( "shake" );

		money += moneySkill;
		xp += 2;

		hack += hackSkill;

		if(group != -1) {
			money += moneySkill * hackerGroups[group].moneyProcents / 100;
			hack += hackSkill * hackerGroups[group].hackProcents / 100;
			xp += 2 * hackerGroups[group].xpProcents / 100;
		}

		checkForHacked();
		$("#hack-progress-text").html(Math.round(hack/hackMax*100,2) + "%");

		checkForNewLevel();
		RefreshGameContentHeader();
	}

	buttonLaikas = date.getTime();

});



$("#achievments-btn").click(function() {
	$("#upgrades").fadeOut();
	$("#achievments").fadeIn();
	$("#hacker-groups").fadeOut();

	$("li").removeClass("game-content-bottom-menu-active");
	$("#achievments-btn").addClass("game-content-bottom-menu-active");
});
$("#upgrades-btn").click(function() {
	$("#upgrades").fadeIn();
	$("#achievments").fadeOut();
	$("#hacker-groups").fadeOut();

	$("li").removeClass("game-content-bottom-menu-active");
	$("#upgrades-btn").addClass("game-content-bottom-menu-active");
});
$("#hacker-groups-btn").click(function() {
	$("#hacker-groups").fadeIn();
	$("#upgrades").fadeOut();
	$("#achievments").fadeOut();

	$("li").removeClass("game-content-bottom-menu-active");
	$("#hacker-groups-btn").addClass("game-content-bottom-menu-active");
});





$("#money-per-click-1").click(function() { BuyMoneyUpgrade(1, 100, false); });
$("#money-per-click-2").click(function() { BuyMoneyUpgrade(5, 2000, false); });
$("#money-per-click-3").click(function() { BuyMoneyUpgrade(15, 6000, false); });
$("#money-per-click-4").click(function() { BuyMoneyUpgrade(40, 30000, false); });
$("#money-per-click-5").click(function() { BuyMoneyUpgrade(80, 100000, false); });

$("#hack-per-click-1").click(function() { BuyHackUpgrade(1, 100, false); });
$("#hack-per-click-2").click(function() { BuyHackUpgrade(5, 2000, false); });
$("#hack-per-click-3").click(function() { BuyHackUpgrade(15, 6000, false); });
$("#hack-per-click-4").click(function() { BuyHackUpgrade(40, 30000, false); });
$("#hack-per-click-5").click(function() { BuyHackUpgrade(80, 100000, false); });

$("#money-per-second-1").click(function() { BuyMoneyUpgrade(1, 400, true); });
$("#money-per-second-2").click(function() { BuyMoneyUpgrade(5, 6000, true); });
$("#money-per-second-3").click(function() { BuyMoneyUpgrade(15, 24000, true); });
$("#money-per-second-4").click(function() { BuyMoneyUpgrade(40, 90000, true); });
$("#money-per-second-5").click(function() { BuyMoneyUpgrade(80, 250000, true); });

$("#hack-per-second-1").click(function() { BuyHackUpgrade(1, 400, true); });
$("#hack-per-second-2").click(function() { BuyHackUpgrade(5, 6000, true); });
$("#hack-per-second-3").click(function() { BuyHackUpgrade(15, 24000, true); });
$("#hack-per-second-4").click(function() { BuyHackUpgrade(40, 90000, true); });
$("#hack-per-second-5").click(function() { BuyHackUpgrade(80, 250000, true); });


$("#error-msg").click(function() {
	$("#error-msg").fadeOut("slow");
});
$("#succes-msg").click(function() {
	$("#succes-msg").fadeOut("slow");
});


function BuyHackUpgrade(upgrade, price, notClickable) {
	if(money >= price) {
		money -= price;
		if(notClickable == false) { 
			hackSkill += upgrade;
		} else {
			hackBotSkill += upgrade;
		}
		RefreshGameContentHeader();
		AddSuccesMsg("You succesfully bough it for <span class='game-icon diamond-icon'></span>" + price + "$");
	} else {
		AddErrorMsg("You don't have enough money");
	}
}

function BuyMoneyUpgrade(upgrade, price, notClickable) {
	if(money >= price) {
		money -= price;
		if(notClickable == false) { 
			moneySkill += upgrade; 
		}
		else {
			moneyBotSkill += upgrade; 
		}

		RefreshGameContentHeader();
		AddSuccesMsg("You succesfully bough it for <span class='game-icon diamond-icon'></span>" + price + "$");
	} else {
		AddErrorMsg("You don't have enough money");
	}
}
function checkForHacked() {
	if(hack > hackMax) {
		hacked ++;
		hack = 0;
		hackMax += hackMax / 1.5;

		$("#hacked-text").html(hacked);

		var moneyGift = (hacked + level) * 10;
		money += moneyGift;
		AddSuccesMsg("You succesfully hacked and here is gift for you: <Br><span class='game-icon diamond-icon'></span> <strong>" + moneyGift + " money</strong>");

	}
}

function alertEx(text, succes) {
	if(succes == 0) {
		$("#modal-section").css("background-color", "darkred");
	} else {
		$("#modal-section").css("background-color", "darkgreen");
	}

	$("#modal-section").html( text );
	$("#modal-section").fadeIn();

	setTimeout(hideAlertEx, 6000);
	hideAlert ++;
}
$("#modal-section").click(function() {
	$("#modal-section").fadeOut();
})
function hideAlertEx() {
	if(hideAlert > 1) {
		hideAlert --;
	} else {
		$("#modal-section").fadeOut();
		hideAlert = 0;
	}
}

function AddErrorMsg(errorText) {
	$("#succes-msg").fadeOut("slow");
	$("#error-msg").fadeIn("slow");
	$("#error-msg").html(errorText + "<Br>Click to hide");
	$("#error-msg").effect( "shake" );

	alertEx("ERROR " + errorText, false);
}
function AddSuccesMsg(succesText) {
	$("#error-msg").fadeOut("slow");
	$("#succes-msg").fadeIn("slow");
	$("#succes-msg").html(succesText + "<Br>Click to hide");
	$("#succes-msg").effect( "shake" );

	alertEx("SUCCES " + succesText, true);
}
function AddBotMoney() {
	xp ++;
	money += moneyBotSkill;
	hack += hackBotSkill;

	if(group != -1) {
		money += moneyBotSkill * hackerGroups[group].moneyProcents / 100;
		hack += hackBotSkill * hackerGroups[group].hackProcents / 100;
		xp += 1 * hackerGroups[group].xpProcents / 100;
	}

	checkForHacked();
	RefreshGameContentHeader();
	checkForNewLevel();

	CheckForNewAchievment();
}

function checkForNewLevel() {
	if(xp >= maxXp) {
		maxXp += Math.round(maxXp / 2, 2);
		level ++;
		xp = 0;

		$("#xp-text").html(xp);
		$("#lvl-text").html(level);
		$("#max-xp-text").html(maxXp);

		AddSuccesMsg("You reached new level!");
	}
}
function RefreshGameContentHeader() {
	$("#money-text").html(Math.round(money, 2) + "$");
	$("#xp-text").html(Math.round(xp,2));

	$("#money-skill-text").html(moneySkill);
	$("#hack-skill-text").html(hackSkill);
	$("#money-bot-skill-text").html(moneyBotSkill);
	$("#hack-bot-skill-text").html(hackBotSkill);

	$("#hack-progress-text").html(Math.round(hack/hackMax*100,2) + "%");
	$("#hack-progress-bar").css("width",(hack/hackMax*100) + "%");

	$("#xp-progress-bar").css("width",(xp/maxXp*100) + "%");
}


function CheckForNewAchievment() {
	for(var i = 0; i < achievmentInfo.length; i ++) {

		if(!achievment[i]) {

			if(money >= achievmentInfo[i].moneyR && hacked >= achievmentInfo[i].hackedR && level >= achievmentInfo[i].levelR) {
				
				money += achievmentAwardInfo[i].moneyR;
				xp += achievmentAwardInfo[i].xpR;
				moneySkill += achievmentAwardInfo[i].moneyClick;
				hackSkill += achievmentAwardInfo[i].hackClick;
				moneyBotSkill += achievmentAwardInfo[i].moneySecond;
				hackBotSkill += achievmentAwardInfo[i].hackSecond;

				achievment[i] = true;

				$("#achievment-logo-" + i).attr("src","images/succes_icon.png");

				AddSuccesMsg("A new achievement has been completed");
			}
		}
	}
}

function CreateAchievments() {

	var aList = "";

	for(var i = 0; i < achievmentInfo.length; i ++) {


		var reqText = "";

		if(achievmentInfo[i].moneyR > 0) {
			reqText += " - <span class='game-icon diamond-icon'></span> " + achievmentInfo[i].moneyR + " money - ";
		}
		if(achievmentInfo[i].hackedR > 0) {
			reqText += " - " + achievmentInfo[i].hackedR + " hacked - ";
		}
		if(achievmentInfo[i].levelR > 0) {
			reqText += " - " + achievmentInfo[i].levelR + " LVL - ";
		}

		var awardText = "";

		if(achievmentAwardInfo[i].moneyR > 0) {
			awardText += " - <span class='game-icon diamond-icon'></span> " + achievmentAwardInfo[i].moneyR + " money - ";
		}
		if(achievmentAwardInfo[i].xpR > 0) {
			awardText += " - " + achievmentAwardInfo[i].xpR + "XP - ";
		}
		if(achievmentAwardInfo[i].moneyClick > 0) {
			awardText += " - +<span class='game-icon diamond-icon'></span>" + achievmentAwardInfo[i].moneyClick + " money/click - ";
		}
		if(achievmentAwardInfo[i].hackClick > 0) {
			awardText += " - +" + achievmentAwardInfo[i].hackClick + "hack/click - ";
		}
		if(achievmentAwardInfo[i].moneySecond > 0) {
			awardText += " - +<span class='game-icon diamond-icon'></span>" + achievmentAwardInfo[i].moneySecond + " money/second - ";
		}
		if(achievmentAwardInfo[i].hackSecond > 0) {
			awardText += " - +" + achievmentAwardInfo[i].hackSecond + " hack/second - ";
		}


		aList += 
		"<section class='buy-smth-block' id='achievments-block'> \
			<section class='left'> \
				<img class='achievment-logo' src='images/achivement.png' alt='achievments-logo'>\
				<p>#" + (i+1) + "</p> \
				<p>Requirements: to have <span class='s-color'>" + reqText + "</span></p> \
				<p>Awards: <span class='s-color'>" + awardText + "</p> \
			</section> \
			\
			<section class='right'> \
				<img id='achievment-logo-" + i + "' class='achievment-icon' src='images/unsucces_icon.png' alt='achievment_logo'>\
			</section> \
			\
			<section class='clear'></section> \
		</section>";

	}

	$("#achievments-list").html( aList );
}

function CreateHackerGroups() {

	var aList = "";

	for(var i = 0; i < hackerGroups.length; i ++) {

		var awardText = "";

		if(hackerGroups[i].moneyProcents > 0) {
			awardText += " | <span class='s-color'> +<span class='game-icon diamond-icon'></span> " + hackerGroups[i].moneyProcents + "% money</span> | ";
		}
		if(hackerGroups[i].xpProcents > 0) {
			awardText += " | <span class='s-color'>+" + hackerGroups[i].xpProcents + "% XP</span> | ";
		}
		if(hackerGroups[i].hackProcents > 0) {
			awardText += " | <span class='s-color'>+" + hackerGroups[i].hackProcents + "% Hack</span> | ";
		}

		aList += 
		"<section class='buy-smth-block' id='hacker-group-block'> \
			<img class='achievment-logo' src='images/hacker-groups.png' alt='achievments-logo'>\
			<p>#" + (i+1) + " " + hackerGroups[i].name + "</p> \
			<p>Requirements: minimum level <span class='s-color'>" + hackerGroups[i].minLvl + " lvl</span></p> \
			<p>Help from team: " + awardText + "</p> \
			<p>Luckiness: <span class='s-color'>" + hackerGroups[i].lucky + "%</span></p> \
			\
			<p class='hacker-groups-join-btn' id='join-group-" + i + "'>Join group</p> \
		</section>";
	}

	$("#hacker-groups-list").html( aList );
}
function JoinHackerGroup(i) {
	if(level >= hackerGroups[i].minLvl) {
		if(group == i) {
			AddErrorMsg("You are already in this group");
		} else {
			group = i;
			AddSuccesMsg("You have succesfully joined this group");
			$("#your-group").html("You are in <span class='s-color'><Strong>" + hackerGroups[i].name + "</strong></span> hacker group");

			$(".hacker-groups-join-btn").css("border", "1px solid grey");
			$("#join-group-" + i).css("border","4px solid green");
		}
	} else {
		AddErrorMsg("You can join this hacker group only having " + hackerGroups[i].minLvl + "+ level");
	}
}


$("#join-group-0").click(function() { JoinHackerGroup(0); });
$("#join-group-1").click(function() { JoinHackerGroup(1); });
$("#join-group-2").click(function() { JoinHackerGroup(2); });
$("#join-group-3").click(function() { JoinHackerGroup(3); });
$("#join-group-4").click(function() { JoinHackerGroup(4); });
$("#join-group-5").click(function() { JoinHackerGroup(5); });
$("#join-group-6").click(function() { JoinHackerGroup(6); });
$("#join-group-7").click(function() { JoinHackerGroup(7); });
$("#join-group-8").click(function() { JoinHackerGroup(8); });