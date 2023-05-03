import ISpell from "../entities/ISpell";
import spells from '../data/spell-details.json' assert { type: "json" };
import ISpellFilter from "../entities/ISpellFilter";

class SpellStore {
    public spells: ISpell[] = [];

    public loadSpells() {
        this.spells = spells.map(s => ({
            index: s.index - 1,
            name: s.name,
            originalName: s.originalName.replaceAll('(', '').replaceAll(')', ''),
            link: s.link,
            school: s.school,
            level: s.level[0],
            castingTime: s.castingTime,
            extendedCastingTime: s.extendedCastingTime,
            savingThrow: s.savingThrow,
            hasRitual: s.hasRitual.toLowerCase() === "si",
            hasConcentration: s.hasConcentration.toLowerCase() === "si",
            //@ts-ignore
            classes: JSON.parse(s.categories).map(x => x.name.replace('Incantesimo da ', '') as string),
            range: s.range,
            components: s.components,
            duration: s.duration,
            fullDescription: s.fullDescription,
            atMajorLevels: s.atMajorLevels,
        }))

        return this;
    }
    public filterSpells(spells: ISpell[], filter: ISpellFilter) {
        return this.spells.filter(spell => {
            if (filter.query &&
                !spell.name.toLowerCase().includes(filter.query.toLowerCase()) &&
                !spell.originalName.toLowerCase().includes(filter.query.toLowerCase())
            ) {
                return false
            }
            if (filter.level && spell.level !== filter.level) {
                return false
            }
            if (filter.hasConcentration && !spell.hasConcentration) {
                return false
            }
            return !(filter.components && !spell.components.includes(filter.components));
        })
    }
}

const spellStore = new SpellStore().loadSpells();

export default spellStore;