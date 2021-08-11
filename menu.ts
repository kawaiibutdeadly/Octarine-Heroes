import { PathX } from "immortal-core/Imports";
import { Attributes,  Menu } from "wrapper/Imports";
import { BaseHeroMenu, BaseItemsNames } from "../../Menu/Base";

export const AlchemistMenu = BaseHeroMenu({
	NpcName: "npc_dota_hero_alchemist",
	AlternativeHarassName: {
		EN: "Alternative сombo",
		RU: "Альтернативное комбо",
	},
	NodeAttribute: Attributes.DOTA_ATTRIBUTE_STRENGHT,
	Items: [
		"item_blink",
		...BaseItemsNames()
	],
	Abilities: [
		"alchemist_acid_spray",
		"alchemist_chemical_rage",
	],
	],
	Shields: {
		ExcludeItemsLinkenBreak: excludeItem
	}

})

