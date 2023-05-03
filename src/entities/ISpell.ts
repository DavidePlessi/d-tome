export default interface ISpell {
    index: number;
    name: string;
    originalName: string;
    link: string;
    school: string;
    level: string;
    castingTime: string;
    extendedCastingTime: string;
    savingThrow: string;
    hasRitual: boolean;
    hasConcentration: boolean;
    classes?: string[];
    range: string;
    components: string;
    duration: string;
    fullDescription: string;
    atMajorLevels: string;
}
