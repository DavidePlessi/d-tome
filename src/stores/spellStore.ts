import ISpell from "../entities/ISpell";
import spells from '../data/spell-details.json' assert { type: "json" };
import ISpellFilter from "../entities/ISpellFilter";

class SpellStore {
    public spells: ISpell[] = [];

    public loadSpells() {
        this.spells = spells.map(s => ({
            id: (s.index -1).toString(),
            index: s.index - 1,
            name: `${s.name} ${s.originalName}`,
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
            classes: JSON.parse(s.categories).map(x => x.name.replace('Incantesimo da ', '')).join(', '),
            range: s.range,
            components: s.components,
            duration: s.duration,
            fullDescription: s.fullDescription,
            atMajorLevels: s.atMajorLevels,
        }))

        return this;
    }
    public filterSpells(spells: ISpell[], filter: ISpellFilter) {
        return spells.filter(s => {
            if(filter.query && filter.query.length > 0) {
                if(s.name.toLowerCase().indexOf(filter.query.toLowerCase()) === -1 &&
                    s.originalName.toLowerCase().indexOf(filter.query.toLowerCase()) === -1) {
                    return false;
                }
            }
            if(filter.level && filter.level.length > 0) {
                if(s.level !== filter.level) {
                    return false;
                }
            }
            if(filter.classes && filter.classes.length > 0) {
                if(s.classes.toLowerCase().indexOf(filter.classes.toLowerCase()) === -1) {
                    return false;
                }
            }
            return true;
        })
    }
}

const spellStore = new SpellStore().loadSpells();

export default spellStore;