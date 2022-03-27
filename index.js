import { Client, Intents, MessageActionRow, MessageSelectMenu } from "discord.js";
import fs from "fs";
import _ from "lodash";

const config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

client.on("ready", () => {
	// client.guilds.cache.forEach(guild => {
	// 	guild.commands.create({
	// 		name: "prices",
	// 		description: "Get the current prices of the items in the shop"
	// 	});
	// }).catch(console.error);

	console.log("[System]: Bot ready!");
});

const questions = {
	// Dark aether
	dt: [
		[
			// First line is the question
			"Will I get banned?",
			// Second line is the answer
			"This tool is designed for hosters to host clients/customers.\nThat being said, if you follow the instructions correctly, you can avoid a ban for anywhere of a minimum of 24 hours to a week/two weeks, potentially longer.\nOther people in the lobby have 0 chance of being banned no matter what.\nIf you need to know how to buy temporary accounts for $10 that are designed for the purpose of getting banned (AKA throw-away account), send a direct message to <@817837528660705362>.",
			// Third line is the emoji (optional)
			"<a:excl:909892864060846120>"
		],

		[
			"What is the price?",
			"Prices: \n24 Hours <a:slowline:909214056945180722> $15\nLifetime <a:slowline:909214056945180722> $85",
			"<a:8857moneny:910843643265425409>"
		],

		[
			"How long does it take?",
			"The cycle takes around 1-2 minutes to completely unlock Dark Aether.",
			"<a:10s:826329607052591104>"
		],

		[
			"Max players per lobby?",
			"You can host up to 3 people, excluding yourself.\nAll clients can get Dark aether at the same time",
			"<:4170cap:909199473006227476>"
		],

		[
			"When does it update?",
			"Like most of my tools, I generally have everything up-to-date in less than 12 hours.\nThis tool however was created to update automatically; meaning, when the game updates, the tool is literally ready to run seconds after rebooting your game.",
			"<a:updating:899593897150382091>"
		],

		[
			"Do you offer custom UI?",
			"It depends on the seller and the circumstances, but generally I'm able to work something out. If you are seriously interested, feel free to shoot me a DM. <@817837528660705362>",
			"<a:885555767321702461:909199022051430440>"
		]
	],

	// Stats
	stat: [
		[
			"Will I get banned?",
			"Generally no, but if you choose an account that is in the top 500 players or unrealistic stats, there is a chance.\nNote: We haven't seen it happen yet.",
			"<a:DC_exclamation:820301682394005546>"
		],

		[
			"How is this done?",
			"You find a profile you like at https://cod.tracker.gg/warzone/leaderboards/battle-royale/xbl/Wins?page=1.\nThen you will simply join a lobby. We do not need any of your information, and the processs will be completed within a minute or two.",
			"<:MWLogo:909637643640385596>"
		],

		[
			"Will SBMM matchmaking be effected?",
			"Yes, but should not be substancial.",
			"<:MWLogo:909637643640385596>"
		],

		[
			"What are the prices?",
			"Depending on what game mode you want to have stats cloned for, the price varies.\n\nLess than 200 wins for MW/Warzone = $65\nMore than 200 wins for MW/Warzone = $105",
			"<a:8857moneny:910843643265425409>"
		],

		[
			"How long does it take?",
			"In total, it will take less than 5 minutes to complete and have your stats updated, viewable live."
		]
	],

	// Camo swapper
	ctool: [
		[
			"Will I get banned?",
			"We have not had a single person report a ban using this tool in over a month and a half, since we released it.  Seriously.",
			"<a:DC_exclamation:820301682394005546>"
		],

		[
			"What are the prices?",
			`**Prices**

			MW <a:whitearrow:909199008210243644> CW (Price Per Weapon)

			<a:echeckgreen:909199474209984552> MW | Gold → CW Weapon | $5
			<a:echeckgreen:909199474209984552> MW | Platinum → CW Weapon | $6
			<a:echeckgreen:909199474209984552> MW | Damascus → CW Weapon | $8
			<a:echeckgreen:909199474209984552> MW | Obsidian → CW Weapon | $10

			CW <a:whitearrow:909199008210243644> MW (Price Per Weapon)

			<a:echeckgreen:909199474209984552> CW | Gold <a:whitearrow:909199008210243644> MW/WZ Weapon | $5
			<a:echeckgreen:909199474209984552> CW | Diamond <a:whitearrow:909199008210243644> MW/WZ Weapon | $6
			<a:echeckgreen:909199474209984552> CW | Dark Matter Ultra <a:whitearrow:909199008210243644> MW/WZ Weapon | $7

			CW ZM <a:whitearrow:909199008210243644> MW (Price Per Weapon)

			<a:echeckgreen:909199474209984552> CW Zombie | Golden Viper <a:whitearrow:909199008210243644> MW/WZ Weapon | $7
			<a:echeckgreen:909199474209984552> CW Zombie | Plague Diamond <a:whitearrow:909199008210243644> MW/WZ Weapon | $7
			<a:echeckgreen:909199474209984552> CW Zombie | Dark Aether <a:whitearrow:909199008210243644> MW/WZ Weapon | $8`,
			"<a:8857moneny:910843643265425409>"
		],

		[
			"Are the camos permanent?",
			"The short answer is yes! This is considered a semi-permanent solution. Essentially, you can keep the camos forever if you save the custom weapon as a blueprint. You can even go back (without the tool) and edit the blueprint, changing attachments or reticles, etc. without losing your camo. You just have to make sure you save it as a blueprint when you're finished.",
			"<a:nicechek:910896207885398036>"
		]
	],

	// Bot lobby
	bltool: [
		[
			"What are the prices?",
			`**__Regular Pricing__**
			**Day -** $20 (You make $15/key)  Customer=$35
			**Week -** $50 (You make $35/key) Customer=$85
			**Life -** $90 (You make $60/key) Customer=$150

			Reseller prices are available, please send a DM to JohnWick#0002 for information.`,
			"<a:8857moneny:910843643265425409>"
		],

		[
			"What does this tool do?",
			`**__Main Features:__**
			<a:slowline:909214056945180722> XP Multipliers for Rank XP, Weapon XP and Battlepass XP === normal rate... X 4!!!
			<a:slowline:909214056945180722> Our Bot Lobby tool gives you access to grind for camos, kills and levels faster as the time goes by.
			<a:slowline:909214056945180722> Set 11 multiplayer bots in MW private match, but gain xp as our tool tells the game it is an online match!
			<a:slowline:909214056945180722> Double XP
			<a:slowline:909214056945180722> Double Weapon XP
			<a:slowline:909214056945180722> Double BattlePass XP
			<a:slowline:909214056945180722> Unlimited Ammo
			<a:slowline:909214056945180722> Unlimited Points

			**__Player Options__**
			<a:slowline:909214056945180722> Any online loadouts can be used, all players!
			<a:slowline:909214056945180722> Activate real XP by transfer of host to a console player
			<a:slowline:909214056945180722> Set + Teleport To Any Location
			<a:slowline:909214056945180722> Can max a weapon in 2 minutes and 30 seconds!
			<a:slowline:909214056945180722> Gain 20-40 Rank XP in 2 minutes and 30 seconds!
			<a:slowline:909214056945180722> Gain 5-10 BattlePass XP in 2 minutes and 30 seconds!
			<a:slowline:909214056945180722> Unlock most camos for a weapon in the same amount of time!`,
			"<a:884130105411129364:909199007291674684>"
		],

		[
			"What does the tool unlock?",
			"4x XP, you can very quickly unlock any weapons, camos and level them to their max level.\nIf you look at mastery challenges that need completed for certain unlocks, they're very easy to complete, and using the tool saves you from having to complete these challenges in what would normally be X amount of different matches.\nExample: If the requirement is 10 headshots in 10 different matches, with the bot lobby tool you can get 10 shots 10 times in the same match to complete the requirement.",
			"<a:nicechek:910896207885398036>"
		],

		[
			"Has anybody been banned?",
			"0 hosts and 0 customers have ever reported a ban using our MW bot lobby tool. We have been one of the few that has had almost 100% uptime with our tool, for the last 3-4 months straight. We are proud to be one of the few that also can say in almost 4 months time we have not incurred any bans for our customers, or their customers!",
			"<a:DC_exclamation:820301682394005546>"
		],

		[
			"Max # Players per Lobby?",
			"We recommend hosting only one person at a time but you can host up to two people in one party.",
			"<a:AlienVibe:909210202644049921>"
		],

		[
			"Do I need to stay ingame?",
			"No! Once you transfer host, by leaving the match the console player will become host. Then the XP will be activated for all players left in the lobby!\nYes, this includes PC players!",
			"<a:informationicon:860831294450565131>"
		]
	],

	// UAV
	uav: [

	],

	// VG stats
	vgstat: [
		[
			"Will I get banned?",
			"There have been no bans since launch. We do not see there being any in the future either, as the method used it truly changing your stats for good, hard coded, and server sided! (:",
			"<a:DC_exclamation:820301682394005546>"
		],

		[
			"Is VG stat editing available?",
			"Yes, we've been editing stats since game launch without issue."
		],

		[
			"How is this done?",
			"You find a profile you like at https://cod.tracker.gg/vanguard/leaderboards/stats/xbl/default?page=1.\nThen you simply join a lobby, meaning we do not need any of your information. Processs will be completed within a minute or two.",
			"<:MWLogo:909637643640385596>"
		],

		[
			"What are the prices?",
			"\"Low-Normal\" Stats (Realistic Avg. Player) = $110\n\"High-Extreme Stats\" (Still Realistic, but Pro-Status!) = $200",
			"<a:8857moneny:910843643265425409>"
		],

		[
			"How long does it take?",
			"In total, it will take less than 5 minutes to complete and have your stats updated, available for the world to see - live."
		],
	]
};

const information = {
	// Dark aether
	dt: [
		[
			"Tool Features Info",
			`<a:slowline:909214056945180722> Hard Unlock Dark Aether In Minutes
			<a:slowline:909214056945180722> God mode
			<a:slowline:909214056945180722> Unlimited Ammo
			<a:slowline:909214056945180722> Unlimited Points
			<a:slowline:909214056945180722> Rapid Fire
			<a:slowline:909214056945180722> 100% Critical Kills
			<a:slowline:909214056945180722> Set Any Weapon For Any Player
			<a:slowline:909214056945180722> Set + Teleport To Any Location
			<a:slowline:909214056945180722> Set Teleport - All Zombies to Crosshair
			<a:slowline:909214056945180722> Disco Camos Weapon Cycle
			<a:slowline:909214056945180722> Run Speed Hack (With Extreme Mode for Fun!)
			<a:slowline:909214056945180722> Weapon Cycle All (Read Description Above)
			<a:slowline:909214056945180722> Cycle Guns Only (Read Description Above)`,
			"<a:informationicon:860831294450565131>"
		]
	],

	// Stats
	stat: [

	],

	// Camo swapper
	ctool: [

	],

	// Bot lobby
	bltool: [
			[
				"How To Set Up Classes",
				"When you're in a private match menu, tell your customer to create any class with any attachment and it'll be available when you migrate host.\nThey should set up the Ammo Crate as their field upgrade so they do not run out of ammo.\nThey can then use everything set up to earn XP instead of having a default gun with no attachments, **even if they are level 1!**\n\n*Note: Our guide you will recieve with purchase will give you several methods that are specifically used to level up a particular category; Weapons, Rank, or Camos etc.  This works extremly fast.*",
				"<a:informationicon:860831294450565131>"
			],

			[
				"How-To Transfer Host",
				"You transfer host by leaving the match, and the console player in the lobby will become host. Then the XP will be activated for all players left in the lobby!\nYes, this includes PC players!",
				"<a:informationicon:860831294450565131>"
			]
	],

	// UAV
	uav: [

	],

	// VG stats
	vgstat: [

	]
};

client.on("messageCreate", async message => {
	// Check if the message is from Ticket Tool
	if (message.author.id === "722196398635745312") {
		// Get the question ID from the embed
		const lid = /\|\|(.+)\|\|/gmi.exec(message.embeds[0]?.description)?.[1];
		const question = questions[lid];
		const info = information[lid];

		// Check if the question exists
		if (question && info) {
			await message.reply({
				content: "Select any of the actions in the dropdown to get answers/information.",
				components: [
					question.length && new MessageActionRow({
						components: [
							new MessageSelectMenu({
								placeholder: "Questions?",
								customId: `question.${lid}`,
								options: question.map((q, i) => ({
									label: q[0],
									emoji: q[2],
									value: `question.${lid}.${i}`
								}))
							})
						]
					}),
					info.length && new MessageActionRow({
						components: [
							new MessageSelectMenu({
								placeholder: "Information.",
								customId: `info.${lid}`,
								options: info.map((q, i) => ({
									label: q[0],
									emoji: q[2],
									value: `info.${lid}.${i}`
								}))
							})
						]
					})
				].filter(Boolean)
			});
		}
	}
});

client.on("interactionCreate", async interaction => {
	if (!interaction.isCommand()) return;

	// Try-catch to prevent the bot from crashing on errors
	try {
		// Switch on the command entered
		switch (interaction.commandName) {
			// If the command doesn't exist, yell at the user
			default: {
				await interaction.reply("Unknown command!");
			} break;

			// Prices command
			case "prices": {
				const dropdown = new MessageActionRow()
					.addComponents(
						new MessageSelectMenu()
							.setCustomId("pricesServices")
							.setPlaceholder("PLEASE SELECT")
							.addOptions([{
								label: "",
								description: "Some description.",
								value: "some-thing"
							}])
					);

				await interaction.reply({
					content: "joe nuts",
					embed: {
						title: "Prices",
						description: "Please select which product or service you would like to know prices for.",
					},
					components: [dropdown]
				});
			} break;
		}
	}
	// Catch any errors
	catch (err) {
		console.error(err);

		// Send the error to the user
		await interaction.reply("An unknown error ocurred.");
	}
});

const logs = JSON.parse(fs.readFileSync("./logs.json", "utf8"));

client.on("interactionCreate", async interaction => {
	if (!interaction.isSelectMenu()) return;

	try {
		switch (interaction.customId) {
			default: {
				const [type, ...path] = interaction.values[0].split(".");

				switch (type) {
					case "question": {
						const question = _.get(questions, path);
						question && await interaction.update({
							embeds: [{
								title: question[0],
								description: question[1],
								color: "#a13cc2"
							}]
						});

						_.set(
							logs,
							["questions", question[0]],
							_.get(logs, ["questions", question[0]], 0) + 1
						);
					} break;

					case "info": {
						const info = _.get(information, path);
						info && await interaction.update({
							embeds: [{
								title: info[0],
								description: info[1],
								color: "#a13cc2"
							}]
						});

						_.set(
							logs,
							["information", info[0]],
							_.get(logs, ["information", info[0]], 0) + 1
						);
					} break;
				}

				fs.writeFileSync("./logs.json", JSON.stringify(logs, null, "\t"));

				if (config.logChannelId) {
					const logChannel = client.channels.cache.get(config.logChannelId);

					if (logChannel) {
						await logChannel.send({
							embeds: [{
								title: "Logger",
								description: `${interaction.user} interacted with ${type}: **${_.get(type === "question" ? questions : information, path)[0]}**`,
								footer: {
									text: interaction.user.tag,
									icon_url: interaction.user.avatarURL()
								}
							}]
						});
					}
				}
			}

			case "pricesServices": {
				switch (interaction.values[0]) {
					case "some-thing": {
						await interaction.update({
							content: "Joe nuts",
							components: []
						});
					} break;

					case "some-other-thing": {
						await interaction.update({
							content: "Joe nuts v2",
							components: []
						});
					} break;
				}
			} break;
		}
	}
	catch (err) {
		console.error(err);
	}
});

client.login(config.token);