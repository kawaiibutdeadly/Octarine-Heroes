import { AbilityX, AcidSpray, ChemicalRage, TargetManager, UnitX } from "immortal-core/Imports";
import { npc_dota_hero_alchemist } from "wrapper/Imports";
import { ModeCombo } from "../../Menu/Base";
import { AbilityHelper, AIOBuff, AIONuke, BaseHeroCombo, HERO_DATA, RegisterHeroModule, ShieldBreakerMap } from "../../_ICore_/Index";

@RegisterHeroModule(npc_dota_hero_alchemist, AlchemistMenu)
export class Alchemist extends BaseHeroCombo {
	
	public readonly Ability = {
		acid: undefined as Nullable<AIONuke>,
		chemical: undefined as Nullable<AIOBuff>,
	}
	
	public Combo(unit: UnitX, menu: ModeCombo): boolean {
		
		const shield = ShieldBreakerMap.get(unit)
		this.AbilityHelper = new AbilityHelper(unit, menu)

		if (shield !== undefined)
			shield.Update(menu)

		if (HERO_DATA.ComboSleeper.Sleeping(unit.Handle) || !TargetManager.HasValidTarget)
			return false

		if (this.AbilityHelper.UseAbility(this.Ability.acid))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.mjollnir, 1400))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.blink, 400, 0))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.hex))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.abyssal))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.bkb, this.Items.blink !== undefined ? 1400 : 800))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.minotavr, this.Items.blink !== undefined ? 1400 : 800))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.veil))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.dagon))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.orchid))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.bloodthorn))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.nullifier))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.atos))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.gleipnir))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.diffusal))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.medal))
			return true

		if (this.AbilityHelper.UseAbility(this.Items.solar))
			return true

		if (unit.Distance(TargetManager.Target!) > unit.GetAttackRange(TargetManager.Target)
			&& this.AbilityHelper.UseAbility(this.Ability.acid)) {
			return true
		}
		
		if (this.AbilityHelper.UseAbility(this.Items.shiva))
			return true

		if (this.AbilityHelper.UseAbilityIfConditionAnyNotNone(
			this.Items.refresherShard,
			this.Items.bkb,
			this.Items.hex,
			this.Items.abyssal,
			this.Items.exMachina,
		)) return true

		if (this.AbilityHelper.UseAbilityIfConditionAnyNotNone(
			this.Items.exMachina,
			this.Items.bkb,
			this.Items.abyssal,
			this.Items.hex,
		)) return true

		if (this.AbilityHelper.UseAbility(this.Ability.chemical, 300))
			return true

		return false
	}
	
	public onAbilityCreated(owner: UnitX, abil: AbilityX): void {
		super.onAbilityCreated(owner, abil)
		if (!this.IsValidHeroName(owner))
			return
		if (abil instanceof Acid)
			this.Ability.acid = new AIONuke(abil)
		if (abil instanceof ChemicalRage)
			this.Ability.chemical = new AIOBuff(abil)
	}

	public onAbilityDestroyed(owner: UnitX, abil: AbilityX) {
		const ability = this.Items as any
		for (const key in this.Items) {
			if (ability.hasOwnProperty(key) && ability[key]?.Ability === abil)
				ability[key] = undefined
		}
	}

	public onGameEnded() {
		super.onGameEnded()
		const abilities = this.Ability as any
		for (const key in this.Ability)
			if (abilities.hasOwnProperty(key))
				abilities[key] = undefined
	}
}

