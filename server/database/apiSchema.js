const { gql, makeExecutableSchema } = require('apollo-server-express');//copied from 'dnd5eapi.co/graphql' for easier integration
const resolvers = require('./resolvers')

const apiSchema = gql`
  type AbilityScore {
    _id: String!
    desc: [String]
    full_name: String
    index: String
    name: String
    skills: [AbilityScoreSkills]
    url: String
  }

  type AbilityScoreSkills {
    index: String
    name: String
    url: String
  }

  type Alignment {
    _id: String!
    desc: String
    abbreviation: String
    index: String
    name: String
    url: String
  }

  type Background {
    _id: String!
    index: String
    name: String
    starting_proficiencies: [AbilityScoreSkills]
    language_options: BackgroundLanguage_options
    url: String
    starting_equipment: [BackgroundStarting_equipment]
    starting_equipment_options: [BackgroundStarting_equipment_options]
    feature: BackgroundFeature
    personality_traits: BackgroundPersonality_traits
    ideals: BackgroundIdeals
    bonds: BackgroundPersonality_traits
    flaws: BackgroundPersonality_traits
  }

  type BackgroundFeature {
    name: String
    desc: [String]
  }

  type BackgroundIdeals {
    choose: Float
    from: [BackgroundIdealsFrom]
    type: String
  }

  type BackgroundIdealsFrom {
    desc: String
    alignments: [AbilityScoreSkills]
  }

  type BackgroundLanguage_options {
    choose: Float
    from: [AbilityScoreSkills]
    type: String
  }

  type BackgroundPersonality_traits {
    choose: Float
    from: [String]
    type: String
  }

  type BackgroundStarting_equipment {
    equipment: AbilityScoreSkills
    quantity: Float
  }

  type BackgroundStarting_equipment_options {
    choose: Float
    from: [BackgroundStarting_equipment_optionsFrom]
    type: String
  }

  type BackgroundStarting_equipment_optionsFrom {
    equipment: AbilityScoreSkills
    quantity: Float
  }

  type Class {
    _id: String!
    class_levels: String
    hit_die: Float
    index: String
    name: String
    proficiencies: [Proficiency]
    proficiency_choices: [ClassProficiency_choices]
    saving_throws: [AbilityScoreSkills]
    spellcasting: ClassSpellcasting
    spells: String
    starting_equipment: [ClassStarting_equipment]
    starting_equipment_options: [ClassStarting_equipment_options]
    subclasses: [AbilityScoreSkills]
    url: String
  }

  type ClassProficiency_choices {
    choose: Float
    from: [Proficiency]
    type: String
  }

  type ClassSpellcasting {
    info: [ClassSpellcastingInfo]
    level: Float
    spellcasting_ability: AbilityScoreSkills
  }

  type ClassSpellcastingInfo {
    desc: [String]
    name: String
  }

  type ClassStarting_equipment {
    equipment: Equipment
    quantity: Float
  }

  type ClassStarting_equipment_options {
    choose: Float
    from: [ClassStarting_equipment_optionsFrom]
    type: String
  }

  type ClassStarting_equipment_optionsFrom {
    equipment: Equipment
    quantity: Float
  }

  type Condition {
    _id: String!
    desc: [String]
    index: String
    name: String
    url: String
  }

  type DamageType {
    _id: String!
    desc: [String]
    index: String
    name: String
    url: String
  }

  type Equipment {
    _id: String!
    armor_category: String
    armor_class: EquipmentArmor_class
    capacity: String
    category_range: String
    contents: [EquipmentContents]
    cost: EquipmentCost
    damage: EquipmentDamage
    desc: [String]
    equipment_category: AbilityScoreSkills
    gear_category: AbilityScoreSkills
    index: String
    name: String
    properties: [AbilityScoreSkills]
    quantity: Float
    range: EquipmentRange
    special: [String]
    speed: EquipmentSpeed
    stealth_disadvantage: Boolean
    str_minimum: Float
    throw_range: EquipmentThrow_range
    tool_category: String
    two_handed_damage: EquipmentTwo_handed_damage
    url: String
    vehicle_category: String
    weapon_category: String
    weapon_range: String
    weight: Float
  }

  type EquipmentArmor_class {
    base: Float
    dex_bonus: Boolean
    max_bonus: Float
  }

  type EquipmentCategory {
    _id: String!
    equipment: [AbilityScoreSkills]
    index: String
    name: String
    url: String
  }

  type EquipmentContents {
    item: AbilityScoreSkills
    quantity: Float
  }

  type EquipmentCost {
    quantity: Float
    unit: String
  }

  type EquipmentDamage {
    damage_dice: String
    damage_type: AbilityScoreSkills
  }

  type EquipmentRange {
    long: Float
    normal: Float
  }

  type EquipmentSpeed {
    quantity: Float
    unit: String
  }

  type EquipmentThrow_range {
    long: Float
    normal: Float
  }

  type EquipmentTwo_handed_damage {
    damage_dice: String
    damage_type: AbilityScoreSkills
  }

  type Feature {
    _id: String!
    choice: FeatureChoice
    class: AbilityScoreSkills
    desc: [String]
    group: String
    index: String
    level: Float
    name: String
    prerequisites: [FeaturePrerequisites]
    reference: String
    subclass: AbilityScoreSkills
    url: String
  }

  type FeatureChoice {
    choose: Float
    from: [AbilityScoreSkills]
    type: String
  }

  type FeaturePrerequisites {
    level: Float
    type: String
  }

  input FilterFindManyAbilityScore_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyAbilityScoreInput {
    _id: String
    desc: [String]
    full_name: String
    index: String
    name: String
    skills: [FilterFindManyAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindManyAbilityScoreOperatorsInput
    OR: [FilterFindManyAbilityScoreInput!]
    AND: [FilterFindManyAbilityScoreInput!]
  }

  input FilterFindManyAbilityScoreOperatorsInput {
    _id: FilterFindManyAbilityScore_idOperatorsInput
  }

  input FilterFindManyAbilityScoreSkillsInput {
    index: String
    name: String
    url: String
  }

  input FilterFindManyAlignment_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyAlignmentInput {
    _id: String
    desc: String
    abbreviation: String
    index: String
    name: String
    url: String
    _operators: FilterFindManyAlignmentOperatorsInput
    OR: [FilterFindManyAlignmentInput!]
    AND: [FilterFindManyAlignmentInput!]
  }

  input FilterFindManyAlignmentOperatorsInput {
    _id: FilterFindManyAlignment_idOperatorsInput
  }

  input FilterFindManyBackground_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyBackgroundFeatureInput {
    name: String
    desc: [String]
  }

  input FilterFindManyBackgroundIdealsFromInput {
    desc: String
    alignments: [FilterFindManyAbilityScoreSkillsInput]
  }

  input FilterFindManyBackgroundIdealsInput {
    choose: Float
    from: [FilterFindManyBackgroundIdealsFromInput]
    type: String
  }

  input FilterFindManyBackgroundInput {
    _id: String
    index: String
    name: String
    starting_proficiencies: [FilterFindManyAbilityScoreSkillsInput]
    language_options: FilterFindManyBackgroundLanguage_optionsInput
    url: String
    starting_equipment: [FilterFindManyBackgroundStarting_equipmentInput]
    starting_equipment_options: [FilterFindManyBackgroundStarting_equipment_optionsInput]
    feature: FilterFindManyBackgroundFeatureInput
    personality_traits: FilterFindManyBackgroundPersonality_traitsInput
    ideals: FilterFindManyBackgroundIdealsInput
    bonds: FilterFindManyBackgroundPersonality_traitsInput
    flaws: FilterFindManyBackgroundPersonality_traitsInput
    _operators: FilterFindManyBackgroundOperatorsInput
    OR: [FilterFindManyBackgroundInput!]
    AND: [FilterFindManyBackgroundInput!]
  }

  input FilterFindManyBackgroundLanguage_optionsInput {
    choose: Float
    from: [FilterFindManyAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindManyBackgroundOperatorsInput {
    _id: FilterFindManyBackground_idOperatorsInput
  }

  input FilterFindManyBackgroundPersonality_traitsInput {
    choose: Float
    from: [String]
    type: String
  }

  input FilterFindManyBackgroundStarting_equipment_optionsFromInput {
    equipment: FilterFindManyAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindManyBackgroundStarting_equipment_optionsInput {
    choose: Float
    from: [FilterFindManyBackgroundStarting_equipment_optionsFromInput]
    type: String
  }

  input FilterFindManyBackgroundStarting_equipmentInput {
    equipment: FilterFindManyAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindManyClass_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyClassInput {
    _id: String
    class_levels: String
    hit_die: Float
    index: String
    name: String
    proficiencies: [FilterFindManyAbilityScoreSkillsInput]
    proficiency_choices: [FilterFindManyClassProficiency_choicesInput]
    saving_throws: [FilterFindManyAbilityScoreSkillsInput]
    spellcasting: FilterFindManyClassSpellcastingInput
    spells: String
    starting_equipment: [FilterFindManyClassStarting_equipmentInput]
    starting_equipment_options: [FilterFindManyClassStarting_equipment_optionsInput]
    subclasses: [FilterFindManyAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindManyClassOperatorsInput
    OR: [FilterFindManyClassInput!]
    AND: [FilterFindManyClassInput!]
  }

  input FilterFindManyClassOperatorsInput {
    _id: FilterFindManyClass_idOperatorsInput
  }

  input FilterFindManyClassProficiency_choicesInput {
    choose: Float
    from: [FilterFindManyAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindManyClassSpellcastingInfoInput {
    desc: [String]
    name: String
  }

  input FilterFindManyClassSpellcastingInput {
    info: [FilterFindManyClassSpellcastingInfoInput]
    level: Float
    spellcasting_ability: FilterFindManyAbilityScoreSkillsInput
  }

  input FilterFindManyClassStarting_equipment_optionsFromInput {
    equipment: FilterFindManyAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindManyClassStarting_equipment_optionsInput {
    choose: Float
    from: [FilterFindManyClassStarting_equipment_optionsFromInput]
    type: String
  }

  input FilterFindManyClassStarting_equipmentInput {
    equipment: FilterFindManyAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindManyCondition_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyConditionInput {
    _id: String
    desc: [String]
    index: String
    name: String
    url: String
    _operators: FilterFindManyConditionOperatorsInput
    OR: [FilterFindManyConditionInput!]
    AND: [FilterFindManyConditionInput!]
  }

  input FilterFindManyConditionOperatorsInput {
    _id: FilterFindManyCondition_idOperatorsInput
  }

  input FilterFindManyDamageType_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyDamageTypeInput {
    _id: String
    desc: [String]
    index: String
    name: String
    url: String
    _operators: FilterFindManyDamageTypeOperatorsInput
    OR: [FilterFindManyDamageTypeInput!]
    AND: [FilterFindManyDamageTypeInput!]
  }

  input FilterFindManyDamageTypeOperatorsInput {
    _id: FilterFindManyDamageType_idOperatorsInput
  }

  input FilterFindManyEquipment_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyEquipmentArmor_classInput {
    base: Float
    dex_bonus: Boolean
    max_bonus: Float
  }

  input FilterFindManyEquipmentCategory_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyEquipmentCategoryInput {
    _id: String
    equipment: [FilterFindManyAbilityScoreSkillsInput]
    index: String
    name: String
    url: String
    _operators: FilterFindManyEquipmentCategoryOperatorsInput
    OR: [FilterFindManyEquipmentCategoryInput!]
    AND: [FilterFindManyEquipmentCategoryInput!]
  }

  input FilterFindManyEquipmentCategoryOperatorsInput {
    _id: FilterFindManyEquipmentCategory_idOperatorsInput
  }

  input FilterFindManyEquipmentContentsInput {
    item: FilterFindManyAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindManyEquipmentCostInput {
    quantity: Float
    unit: String
  }

  input FilterFindManyEquipmentDamageInput {
    damage_dice: String
    damage_type: FilterFindManyAbilityScoreSkillsInput
  }

  input FilterFindManyEquipmentInput {
    _id: String
    armor_category: String
    armor_class: FilterFindManyEquipmentArmor_classInput
    capacity: String
    category_range: String
    contents: [FilterFindManyEquipmentContentsInput]
    cost: FilterFindManyEquipmentCostInput
    damage: FilterFindManyEquipmentDamageInput
    desc: [String]
    equipment_category: FilterFindManyAbilityScoreSkillsInput
    gear_category: FilterFindManyAbilityScoreSkillsInput
    index: String
    name: String
    properties: [FilterFindManyAbilityScoreSkillsInput]
    quantity: Float
    range: FilterFindManyEquipmentRangeInput
    special: [String]
    speed: FilterFindManyEquipmentSpeedInput
    stealth_disadvantage: Boolean
    str_minimum: Float
    throw_range: FilterFindManyEquipmentThrow_rangeInput
    tool_category: String
    two_handed_damage: FilterFindManyEquipmentTwo_handed_damageInput
    url: String
    vehicle_category: String
    weapon_category: String
    weapon_range: String
    weight: Float
    _operators: FilterFindManyEquipmentOperatorsInput
    OR: [FilterFindManyEquipmentInput!]
    AND: [FilterFindManyEquipmentInput!]
  }

  input FilterFindManyEquipmentOperatorsInput {
    _id: FilterFindManyEquipment_idOperatorsInput
  }

  input FilterFindManyEquipmentRangeInput {
    long: Float
    normal: Float
  }

  input FilterFindManyEquipmentSpeedInput {
    quantity: Float
    unit: String
  }

  input FilterFindManyEquipmentThrow_rangeInput {
    long: Float
    normal: Float
  }

  input FilterFindManyEquipmentTwo_handed_damageInput {
    damage_dice: String
    damage_type: FilterFindManyAbilityScoreSkillsInput
  }

  input FilterFindManyFeature_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyFeatureChoiceInput {
    choose: Float
    from: [FilterFindManyAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindManyFeatureInput {
    _id: String
    choice: FilterFindManyFeatureChoiceInput
    class: FilterFindManyAbilityScoreSkillsInput
    desc: [String]
    group: String
    index: String
    level: Float
    name: String
    prerequisites: [FilterFindManyFeaturePrerequisitesInput]
    reference: String
    subclass: FilterFindManyAbilityScoreSkillsInput
    url: String
    _operators: FilterFindManyFeatureOperatorsInput
    OR: [FilterFindManyFeatureInput!]
    AND: [FilterFindManyFeatureInput!]
  }

  input FilterFindManyFeatureOperatorsInput {
    _id: FilterFindManyFeature_idOperatorsInput
  }

  input FilterFindManyFeaturePrerequisitesInput {
    level: Float
    type: String
  }

  input FilterFindManyLanguage_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyLanguageInput {
    _id: String
    desc: String
    index: String
    name: String
    script: String
    type: String
    typical_speakers: [String]
    url: String
    _operators: FilterFindManyLanguageOperatorsInput
    OR: [FilterFindManyLanguageInput!]
    AND: [FilterFindManyLanguageInput!]
  }

  input FilterFindManyLanguageOperatorsInput {
    _id: FilterFindManyLanguage_idOperatorsInput
  }

  input FilterFindManyLevel_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyLevelClass_specificCreating_spell_slotsInput {
    sorcery_point_cost: Float
    spell_slot_level: Float
  }

  input FilterFindManyLevelClass_specificInput {
    action_surges: Float
    arcane_recovery_levels: Float
    aura_range: Float
    bardic_inspiration_die: Float
    brutal_critical_dice: Float
    channel_divinity_charges: Float
    creating_spell_slots: [FilterFindManyLevelClass_specificCreating_spell_slotsInput]
    destroy_undead_cr: Float
    extra_attacks: Float
    favored_enemies: Float
    favored_terrain: Float
    indomitable_uses: Float
    invocations_known: Float
    ki_points: Float
    magical_secrets_max_5: Float
    magical_secrets_max_7: Float
    magical_secrets_max_9: Float
    martial_arts: FilterFindManyLevelClass_specificMartial_artsInput
    metamagic_known: Float
    mystic_arcanum_level_6: Float
    mystic_arcanum_level_7: Float
    mystic_arcanum_level_8: Float
    mystic_arcanum_level_9: Float
    rage_count: Float
    rage_damage_bonus: Float
    sneak_attack: FilterFindManyLevelClass_specificSneak_attackInput
    song_of_rest_die: Float
    sorcery_points: Float
    unarmored_movement: Float
    wild_shape_fly: Boolean
    wild_shape_max_cr: Float
    wild_shape_swim: Boolean
  }

  input FilterFindManyLevelClass_specificMartial_artsInput {
    dice_count: Float
    dice_value: Float
  }

  input FilterFindManyLevelClass_specificSneak_attackInput {
    dice_count: Float
    dice_value: Float
  }

  input FilterFindManyLevelInput {
    _id: String
    ability_score_bonuses: Float
    class: FilterFindManyAbilityScoreSkillsInput
    class_specific: FilterFindManyLevelClass_specificInput
    feature_choices: [FilterFindManyAbilityScoreSkillsInput]
    features: [FilterFindManyAbilityScoreSkillsInput]
    index: String
    level: Float
    prof_bonus: Float
    spellcasting: FilterFindManyLevelSpellcastingInput
    subclass: FilterFindManyAbilityScoreSkillsInput
    subclass_specific: FilterFindManyLevelSubclass_specificInput
    url: String
    _operators: FilterFindManyLevelOperatorsInput
    OR: [FilterFindManyLevelInput!]
    AND: [FilterFindManyLevelInput!]
  }

  input FilterFindManyLevelOperatorsInput {
    _id: FilterFindManyLevel_idOperatorsInput
  }

  input FilterFindManyLevelSpellcastingInput {
    cantrips_known: Float
    spell_slots_level_1: Float
    spell_slots_level_2: Float
    spell_slots_level_3: Float
    spell_slots_level_4: Float
    spell_slots_level_5: Float
    spell_slots_level_6: Float
    spell_slots_level_7: Float
    spell_slots_level_8: Float
    spell_slots_level_9: Float
    spells_known: Float
  }

  input FilterFindManyLevelSubclass_specificInput {
    additional_magical_secrets_max_lvl: Float
    aura_range: Float
  }

  input FilterFindManyMagicItem_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyMagicItemInput {
    _id: String
    desc: [String]
    equipment_category: FilterFindManyAbilityScoreSkillsInput
    index: String
    name: String
    url: String
    _operators: FilterFindManyMagicItemOperatorsInput
    OR: [FilterFindManyMagicItemInput!]
    AND: [FilterFindManyMagicItemInput!]
  }

  input FilterFindManyMagicItemOperatorsInput {
    _id: FilterFindManyMagicItem_idOperatorsInput
  }

  input FilterFindManyMagicSchool_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyMagicSchoolInput {
    _id: String
    desc: String
    index: String
    name: String
    url: String
    _operators: FilterFindManyMagicSchoolOperatorsInput
    OR: [FilterFindManyMagicSchoolInput!]
    AND: [FilterFindManyMagicSchoolInput!]
  }

  input FilterFindManyMagicSchoolOperatorsInput {
    _id: FilterFindManyMagicSchool_idOperatorsInput
  }

  input FilterFindManyMonster_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyMonsterActionsDamageInput {
    damage_dice: String
    damage_type: FilterFindManyAbilityScoreSkillsInput
  }

  input FilterFindManyMonsterActionsInput {
    attack_bonus: Float
    damage: [FilterFindManyMonsterActionsDamageInput]
    desc: String
    name: String
  }

  input FilterFindManyMonsterInput {
    _id: String
    actions: [FilterFindManyMonsterActionsInput]
    alignment: String
    armor_class: Float
    challenge_rating: Float
    charisma: Float
    condition_immunities: [FilterFindManyAbilityScoreSkillsInput]
    constitution: Float
    damage_immunities: [String]
    damage_resistances: [String]
    damage_vulnerabilities: [String]
    dexterity: Float
    forms: [FilterFindManyAbilityScoreSkillsInput]
    hit_dice: String
    hit_points: Float
    index: String
    intelligence: Float
    languages: String
    legendary_actions: [FilterFindManyMonsterLegendary_actionsInput]
    name: String
    proficiencies: [FilterFindManyMonsterProficienciesInput]
    reactions: [FilterFindManyMonsterReactionsInput]
    senses: FilterFindManyMonsterSensesInput
    size: String
    special_abilities: [FilterFindManyMonsterSpecial_abilitiesInput]
    speed: FilterFindManyMonsterSpeedInput
    strength: Float
    subtype: String
    type: String
    url: String
    wisdom: Float
    xp: Float
    _operators: FilterFindManyMonsterOperatorsInput
    OR: [FilterFindManyMonsterInput!]
    AND: [FilterFindManyMonsterInput!]
  }

  input FilterFindManyMonsterLegendary_actionsInput {
    attack_bonus: Float
    desc: String
    name: String
  }

  input FilterFindManyMonsterOperatorsInput {
    _id: FilterFindManyMonster_idOperatorsInput
  }

  input FilterFindManyMonsterProficienciesInput {
    proficiency: FilterFindManyAbilityScoreSkillsInput
    value: Float
  }

  input FilterFindManyMonsterReactionsInput {
    desc: String
    name: String
  }

  input FilterFindManyMonsterSensesInput {
    blindsight: String
    darkvision: String
    passive_perception: Float
    tremorsense: String
    truesight: String
  }

  input FilterFindManyMonsterSpecial_abilitiesInput {
    desc: String
    name: String
  }

  input FilterFindManyMonsterSpeedInput {
    burrow: String
    climb: String
    fly: String
    hover: Boolean
    swim: String
    walk: String
  }

  input FilterFindManyProficiency_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyProficiencyInput {
    _id: String
    classes: [FilterFindManyAbilityScoreSkillsInput]
    index: String
    name: String
    races: [FilterFindManyAbilityScoreSkillsInput]
    references: [FilterFindManyProficiencyReferencesInput]
    type: String
    url: String
    _operators: FilterFindManyProficiencyOperatorsInput
    OR: [FilterFindManyProficiencyInput!]
    AND: [FilterFindManyProficiencyInput!]
  }

  input FilterFindManyProficiencyOperatorsInput {
    _id: FilterFindManyProficiency_idOperatorsInput
  }

  input FilterFindManyProficiencyReferencesInput {
    index: String
    name: String
    type: String
    url: String
  }

  input FilterFindManyRace_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyRaceAbility_bonus_optionsFromInput {
    ability_score: FilterFindManyAbilityScoreSkillsInput
    bonus: Float
  }

  input FilterFindManyRaceAbility_bonus_optionsInput {
    choose: Float
    from: [FilterFindManyRaceAbility_bonus_optionsFromInput]
    type: String
  }

  input FilterFindManyRaceAbility_bonusesInput {
    ability_score: FilterFindManyAbilityScoreSkillsInput
    bonus: Float
  }

  input FilterFindManyRaceInput {
    _id: String
    ability_bonus_options: FilterFindManyRaceAbility_bonus_optionsInput
    ability_bonuses: [FilterFindManyRaceAbility_bonusesInput]
    age: String
    alignment: String
    index: String
    language_desc: String
    language_options: FilterFindManyRaceLanguage_optionsInput
    languages: [FilterFindManyAbilityScoreSkillsInput]
    name: String
    size: String
    size_description: String
    speed: Float
    starting_proficiencies: [FilterFindManyAbilityScoreSkillsInput]
    starting_proficiency_options: FilterFindManyRaceStarting_proficiency_optionsInput
    subraces: [FilterFindManyAbilityScoreSkillsInput]
    trait_options: FilterFindManyRaceTrait_optionsInput
    traits: [FilterFindManyAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindManyRaceOperatorsInput
    OR: [FilterFindManyRaceInput!]
    AND: [FilterFindManyRaceInput!]
  }

  input FilterFindManyRaceLanguage_optionsInput {
    choose: Float
    from: [FilterFindManyAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindManyRaceOperatorsInput {
    _id: FilterFindManyRace_idOperatorsInput
  }

  input FilterFindManyRaceStarting_proficiency_optionsInput {
    choose: Float
    from: [FilterFindManyAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindManyRaceTrait_optionsInput {
    choose: Float
    from: [FilterFindManyAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindManyRule_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyRuleInput {
    _id: String
    desc: String
    index: String
    name: String
    subsections: [FilterFindManyAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindManyRuleOperatorsInput
    OR: [FilterFindManyRuleInput!]
    AND: [FilterFindManyRuleInput!]
  }

  input FilterFindManyRuleOperatorsInput {
    _id: FilterFindManyRule_idOperatorsInput
  }

  input FilterFindManyRuleSection_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyRuleSectionInput {
    _id: String
    desc: String
    index: String
    name: String
    url: String
    _operators: FilterFindManyRuleSectionOperatorsInput
    OR: [FilterFindManyRuleSectionInput!]
    AND: [FilterFindManyRuleSectionInput!]
  }

  input FilterFindManyRuleSectionOperatorsInput {
    _id: FilterFindManyRuleSection_idOperatorsInput
  }

  input FilterFindManySpell_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManySpellArea_of_effectInput {
    size: Float
    type: String
  }

  input FilterFindManySpellDamageInput {
    damage_at_slot_level: JSON
    damage_at_character_level: JSON
    damage_type: FilterFindManyAbilityScoreSkillsInput
  }

  input FilterFindManySpellDcInput {
    dc_success: String
    dc_type: FilterFindManyAbilityScoreSkillsInput
    desc: String
  }

  input FilterFindManySpellInput {
    _id: String
    area_of_effect: FilterFindManySpellArea_of_effectInput
    attack_type: String
    casting_time: String
    classes: [FilterFindManyAbilityScoreSkillsInput]
    components: [String]
    concentration: Boolean
    damage: FilterFindManySpellDamageInput
    dc: FilterFindManySpellDcInput
    desc: [String]
    duration: String
    heal_at_slot_level: JSON
    higher_level: [String]
    index: String
    level: Float
    material: String
    name: String
    range: String
    ritual: Boolean
    school: FilterFindManyAbilityScoreSkillsInput
    subclasses: [FilterFindManyAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindManySpellOperatorsInput
    OR: [FilterFindManySpellInput!]
    AND: [FilterFindManySpellInput!]
  }

  input FilterFindManySpellOperatorsInput {
    _id: FilterFindManySpell_idOperatorsInput
  }

  input FilterFindManyStartingEquipment_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyStartingEquipmentInput {
    _id: String
    class: FilterFindManyAbilityScoreSkillsInput
    index: String
    starting_equipment: [FilterFindManyStartingEquipmentStarting_equipmentInput]
    starting_equipment_options: [FilterFindManyStartingEquipmentStarting_equipment_optionsInput]
    url: String
    _operators: FilterFindManyStartingEquipmentOperatorsInput
    OR: [FilterFindManyStartingEquipmentInput!]
    AND: [FilterFindManyStartingEquipmentInput!]
  }

  input FilterFindManyStartingEquipmentOperatorsInput {
    _id: FilterFindManyStartingEquipment_idOperatorsInput
  }

  input FilterFindManyStartingEquipmentStarting_equipment_optionsFromInput {
    equipment: FilterFindManyAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindManyStartingEquipmentStarting_equipment_optionsInput {
    choose: Float
    from: [FilterFindManyStartingEquipmentStarting_equipment_optionsFromInput]
    type: String
  }

  input FilterFindManyStartingEquipmentStarting_equipmentInput {
    equipment: FilterFindManyAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindManySubclass_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManySubclassInput {
    _id: String
    class: FilterFindManyAbilityScoreSkillsInput
    desc: [String]
    index: String
    name: String
    spells: [FilterFindManySubclassSpellsInput]
    subclass_flavor: String
    subclass_levels: String
    url: String
    _operators: FilterFindManySubclassOperatorsInput
    OR: [FilterFindManySubclassInput!]
    AND: [FilterFindManySubclassInput!]
  }

  input FilterFindManySubclassOperatorsInput {
    _id: FilterFindManySubclass_idOperatorsInput
  }

  input FilterFindManySubclassSpellsInput {
    prerequisites: [FilterFindManySubclassSpellsPrerequisitesInput]
    spell: FilterFindManyAbilityScoreSkillsInput
  }

  input FilterFindManySubclassSpellsPrerequisitesInput {
    index: String
    name: String
    type: String
    url: String
  }

  input FilterFindManySubrace_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManySubraceAbility_bonusesInput {
    ability_score: FilterFindManyAbilityScoreSkillsInput
    bonus: Float
  }

  input FilterFindManySubraceInput {
    _id: String
    ability_bonuses: [FilterFindManySubraceAbility_bonusesInput]
    desc: String
    index: String
    language_options: FilterFindManySubraceLanguage_optionsInput
    name: String
    race: FilterFindManyAbilityScoreSkillsInput
    racial_trait_options: FilterFindManySubraceRacial_trait_optionsInput
    racial_traits: [FilterFindManyAbilityScoreSkillsInput]
    starting_proficiencies: [FilterFindManyAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindManySubraceOperatorsInput
    OR: [FilterFindManySubraceInput!]
    AND: [FilterFindManySubraceInput!]
  }

  input FilterFindManySubraceLanguage_optionsInput {
    choose: Float
    from: [FilterFindManyAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindManySubraceOperatorsInput {
    _id: FilterFindManySubrace_idOperatorsInput
  }

  input FilterFindManySubraceRacial_trait_optionsInput {
    choose: Float
    from: [FilterFindManyAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindManyTrait_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyTraitInput {
    _id: String
    desc: [String]
    index: String
    name: String
    proficiencies: [FilterFindManyTraitProficienciesInput]
    proficiency_choices: FilterFindManyTraitProficiency_choicesInput
    races: [FilterFindManyAbilityScoreSkillsInput]
    subraces: [FilterFindManyAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindManyTraitOperatorsInput
    OR: [FilterFindManyTraitInput!]
    AND: [FilterFindManyTraitInput!]
  }

  input FilterFindManyTraitOperatorsInput {
    _id: FilterFindManyTrait_idOperatorsInput
  }

  input FilterFindManyTraitProficienciesInput {
    index: String
    name: String
    url: String
  }

  input FilterFindManyTraitProficiency_choicesInput {
    choose: Float
    from: [FilterFindManyAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindManyWeaponProperty_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindManyWeaponPropertyInput {
    _id: String
    desc: [String]
    index: String
    name: String
    url: String
    _operators: FilterFindManyWeaponPropertyOperatorsInput
    OR: [FilterFindManyWeaponPropertyInput!]
    AND: [FilterFindManyWeaponPropertyInput!]
  }

  input FilterFindManyWeaponPropertyOperatorsInput {
    _id: FilterFindManyWeaponProperty_idOperatorsInput
  }

  input FilterFindOneAbilityScore_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneAbilityScoreInput {
    _id: String
    desc: [String]
    full_name: String
    index: String
    name: String
    skills: [FilterFindOneAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindOneAbilityScoreOperatorsInput
    OR: [FilterFindOneAbilityScoreInput!]
    AND: [FilterFindOneAbilityScoreInput!]
  }

  input FilterFindOneAbilityScoreOperatorsInput {
    _id: FilterFindOneAbilityScore_idOperatorsInput
  }

  input FilterFindOneAbilityScoreSkillsInput {
    index: String
    name: String
    url: String
  }

  input FilterFindOneAlignment_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneAlignmentInput {
    _id: String
    desc: String
    abbreviation: String
    index: String
    name: String
    url: String
    _operators: FilterFindOneAlignmentOperatorsInput
    OR: [FilterFindOneAlignmentInput!]
    AND: [FilterFindOneAlignmentInput!]
  }

  input FilterFindOneAlignmentOperatorsInput {
    _id: FilterFindOneAlignment_idOperatorsInput
  }

  input FilterFindOneBackground_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneBackgroundFeatureInput {
    name: String
    desc: [String]
  }

  input FilterFindOneBackgroundIdealsFromInput {
    desc: String
    alignments: [FilterFindOneAbilityScoreSkillsInput]
  }

  input FilterFindOneBackgroundIdealsInput {
    choose: Float
    from: [FilterFindOneBackgroundIdealsFromInput]
    type: String
  }

  input FilterFindOneBackgroundInput {
    _id: String
    index: String
    name: String
    starting_proficiencies: [FilterFindOneAbilityScoreSkillsInput]
    language_options: FilterFindOneBackgroundLanguage_optionsInput
    url: String
    starting_equipment: [FilterFindOneBackgroundStarting_equipmentInput]
    starting_equipment_options: [FilterFindOneBackgroundStarting_equipment_optionsInput]
    feature: FilterFindOneBackgroundFeatureInput
    personality_traits: FilterFindOneBackgroundPersonality_traitsInput
    ideals: FilterFindOneBackgroundIdealsInput
    bonds: FilterFindOneBackgroundPersonality_traitsInput
    flaws: FilterFindOneBackgroundPersonality_traitsInput
    _operators: FilterFindOneBackgroundOperatorsInput
    OR: [FilterFindOneBackgroundInput!]
    AND: [FilterFindOneBackgroundInput!]
  }

  input FilterFindOneBackgroundLanguage_optionsInput {
    choose: Float
    from: [FilterFindOneAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindOneBackgroundOperatorsInput {
    _id: FilterFindOneBackground_idOperatorsInput
  }

  input FilterFindOneBackgroundPersonality_traitsInput {
    choose: Float
    from: [String]
    type: String
  }

  input FilterFindOneBackgroundStarting_equipment_optionsFromInput {
    equipment: FilterFindOneAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindOneBackgroundStarting_equipment_optionsInput {
    choose: Float
    from: [FilterFindOneBackgroundStarting_equipment_optionsFromInput]
    type: String
  }

  input FilterFindOneBackgroundStarting_equipmentInput {
    equipment: FilterFindOneAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindOneClass_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneClassInput {
    _id: String
    class_levels: String
    hit_die: Float
    index: String
    name: String
    proficiencies: [FilterFindOneAbilityScoreSkillsInput]
    proficiency_choices: [FilterFindOneClassProficiency_choicesInput]
    saving_throws: [FilterFindOneAbilityScoreSkillsInput]
    spellcasting: FilterFindOneClassSpellcastingInput
    spells: String
    starting_equipment: [FilterFindOneClassStarting_equipmentInput]
    starting_equipment_options: [FilterFindOneClassStarting_equipment_optionsInput]
    subclasses: [FilterFindOneAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindOneClassOperatorsInput
    OR: [FilterFindOneClassInput!]
    AND: [FilterFindOneClassInput!]
  }

  input FilterFindOneClassOperatorsInput {
    _id: FilterFindOneClass_idOperatorsInput
  }

  input FilterFindOneClassProficiency_choicesInput {
    choose: Float
    from: [FilterFindOneAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindOneClassSpellcastingInfoInput {
    desc: [String]
    name: String
  }

  input FilterFindOneClassSpellcastingInput {
    info: [FilterFindOneClassSpellcastingInfoInput]
    level: Float
    spellcasting_ability: FilterFindOneAbilityScoreSkillsInput
  }

  input FilterFindOneClassStarting_equipment_optionsFromInput {
    equipment: FilterFindOneAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindOneClassStarting_equipment_optionsInput {
    choose: Float
    from: [FilterFindOneClassStarting_equipment_optionsFromInput]
    type: String
  }

  input FilterFindOneClassStarting_equipmentInput {
    equipment: FilterFindOneAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindOneCondition_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneConditionInput {
    _id: String
    desc: [String]
    index: String
    name: String
    url: String
    _operators: FilterFindOneConditionOperatorsInput
    OR: [FilterFindOneConditionInput!]
    AND: [FilterFindOneConditionInput!]
  }

  input FilterFindOneConditionOperatorsInput {
    _id: FilterFindOneCondition_idOperatorsInput
  }

  input FilterFindOneDamageType_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneDamageTypeInput {
    _id: String
    desc: [String]
    index: String
    name: String
    url: String
    _operators: FilterFindOneDamageTypeOperatorsInput
    OR: [FilterFindOneDamageTypeInput!]
    AND: [FilterFindOneDamageTypeInput!]
  }

  input FilterFindOneDamageTypeOperatorsInput {
    _id: FilterFindOneDamageType_idOperatorsInput
  }

  input FilterFindOneEquipment_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneEquipmentArmor_classInput {
    base: Float
    dex_bonus: Boolean
    max_bonus: Float
  }

  input FilterFindOneEquipmentCategory_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneEquipmentCategoryInput {
    _id: String
    equipment: [FilterFindOneAbilityScoreSkillsInput]
    index: String
    name: String
    url: String
    _operators: FilterFindOneEquipmentCategoryOperatorsInput
    OR: [FilterFindOneEquipmentCategoryInput!]
    AND: [FilterFindOneEquipmentCategoryInput!]
  }

  input FilterFindOneEquipmentCategoryOperatorsInput {
    _id: FilterFindOneEquipmentCategory_idOperatorsInput
  }

  input FilterFindOneEquipmentContentsInput {
    item: FilterFindOneAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindOneEquipmentCostInput {
    quantity: Float
    unit: String
  }

  input FilterFindOneEquipmentDamageInput {
    damage_dice: String
    damage_type: FilterFindOneAbilityScoreSkillsInput
  }

  input FilterFindOneEquipmentInput {
    _id: String
    armor_category: String
    armor_class: FilterFindOneEquipmentArmor_classInput
    capacity: String
    category_range: String
    contents: [FilterFindOneEquipmentContentsInput]
    cost: FilterFindOneEquipmentCostInput
    damage: FilterFindOneEquipmentDamageInput
    desc: [String]
    equipment_category: FilterFindOneAbilityScoreSkillsInput
    gear_category: FilterFindOneAbilityScoreSkillsInput
    index: String
    name: String
    properties: [FilterFindOneAbilityScoreSkillsInput]
    quantity: Float
    range: FilterFindOneEquipmentRangeInput
    special: [String]
    speed: FilterFindOneEquipmentSpeedInput
    stealth_disadvantage: Boolean
    str_minimum: Float
    throw_range: FilterFindOneEquipmentThrow_rangeInput
    tool_category: String
    two_handed_damage: FilterFindOneEquipmentTwo_handed_damageInput
    url: String
    vehicle_category: String
    weapon_category: String
    weapon_range: String
    weight: Float
    _operators: FilterFindOneEquipmentOperatorsInput
    OR: [FilterFindOneEquipmentInput!]
    AND: [FilterFindOneEquipmentInput!]
  }

  input FilterFindOneEquipmentOperatorsInput {
    _id: FilterFindOneEquipment_idOperatorsInput
  }

  input FilterFindOneEquipmentRangeInput {
    long: Float
    normal: Float
  }

  input FilterFindOneEquipmentSpeedInput {
    quantity: Float
    unit: String
  }

  input FilterFindOneEquipmentThrow_rangeInput {
    long: Float
    normal: Float
  }

  input FilterFindOneEquipmentTwo_handed_damageInput {
    damage_dice: String
    damage_type: FilterFindOneAbilityScoreSkillsInput
  }

  input FilterFindOneFeature_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneFeatureChoiceInput {
    choose: Float
    from: [FilterFindOneAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindOneFeatureInput {
    _id: String
    choice: FilterFindOneFeatureChoiceInput
    class: FilterFindOneAbilityScoreSkillsInput
    desc: [String]
    group: String
    index: String
    level: Float
    name: String
    prerequisites: [FilterFindOneFeaturePrerequisitesInput]
    reference: String
    subclass: FilterFindOneAbilityScoreSkillsInput
    url: String
    _operators: FilterFindOneFeatureOperatorsInput
    OR: [FilterFindOneFeatureInput!]
    AND: [FilterFindOneFeatureInput!]
  }

  input FilterFindOneFeatureOperatorsInput {
    _id: FilterFindOneFeature_idOperatorsInput
  }

  input FilterFindOneFeaturePrerequisitesInput {
    level: Float
    type: String
  }

  input FilterFindOneLanguage_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneLanguageInput {
    _id: String
    desc: String
    index: String
    name: String
    script: String
    type: String
    typical_speakers: [String]
    url: String
    _operators: FilterFindOneLanguageOperatorsInput
    OR: [FilterFindOneLanguageInput!]
    AND: [FilterFindOneLanguageInput!]
  }

  input FilterFindOneLanguageOperatorsInput {
    _id: FilterFindOneLanguage_idOperatorsInput
  }

  input FilterFindOneLevel_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneLevelClass_specificCreating_spell_slotsInput {
    sorcery_point_cost: Float
    spell_slot_level: Float
  }

  input FilterFindOneLevelClass_specificInput {
    action_surges: Float
    arcane_recovery_levels: Float
    aura_range: Float
    bardic_inspiration_die: Float
    brutal_critical_dice: Float
    channel_divinity_charges: Float
    creating_spell_slots: [FilterFindOneLevelClass_specificCreating_spell_slotsInput]
    destroy_undead_cr: Float
    extra_attacks: Float
    favored_enemies: Float
    favored_terrain: Float
    indomitable_uses: Float
    invocations_known: Float
    ki_points: Float
    magical_secrets_max_5: Float
    magical_secrets_max_7: Float
    magical_secrets_max_9: Float
    martial_arts: FilterFindOneLevelClass_specificMartial_artsInput
    metamagic_known: Float
    mystic_arcanum_level_6: Float
    mystic_arcanum_level_7: Float
    mystic_arcanum_level_8: Float
    mystic_arcanum_level_9: Float
    rage_count: Float
    rage_damage_bonus: Float
    sneak_attack: FilterFindOneLevelClass_specificSneak_attackInput
    song_of_rest_die: Float
    sorcery_points: Float
    unarmored_movement: Float
    wild_shape_fly: Boolean
    wild_shape_max_cr: Float
    wild_shape_swim: Boolean
  }

  input FilterFindOneLevelClass_specificMartial_artsInput {
    dice_count: Float
    dice_value: Float
  }

  input FilterFindOneLevelClass_specificSneak_attackInput {
    dice_count: Float
    dice_value: Float
  }

  input FilterFindOneLevelInput {
    _id: String
    ability_score_bonuses: Float
    class: FilterFindOneAbilityScoreSkillsInput
    class_specific: FilterFindOneLevelClass_specificInput
    feature_choices: [FilterFindOneAbilityScoreSkillsInput]
    features: [FilterFindOneAbilityScoreSkillsInput]
    index: String
    level: Float
    prof_bonus: Float
    spellcasting: FilterFindOneLevelSpellcastingInput
    subclass: FilterFindOneAbilityScoreSkillsInput
    subclass_specific: FilterFindOneLevelSubclass_specificInput
    url: String
    _operators: FilterFindOneLevelOperatorsInput
    OR: [FilterFindOneLevelInput!]
    AND: [FilterFindOneLevelInput!]
  }

  input FilterFindOneLevelOperatorsInput {
    _id: FilterFindOneLevel_idOperatorsInput
  }

  input FilterFindOneLevelSpellcastingInput {
    cantrips_known: Float
    spell_slots_level_1: Float
    spell_slots_level_2: Float
    spell_slots_level_3: Float
    spell_slots_level_4: Float
    spell_slots_level_5: Float
    spell_slots_level_6: Float
    spell_slots_level_7: Float
    spell_slots_level_8: Float
    spell_slots_level_9: Float
    spells_known: Float
  }

  input FilterFindOneLevelSubclass_specificInput {
    additional_magical_secrets_max_lvl: Float
    aura_range: Float
  }

  input FilterFindOneMagicItem_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneMagicItemInput {
    _id: String
    desc: [String]
    equipment_category: FilterFindOneAbilityScoreSkillsInput
    index: String
    name: String
    url: String
    _operators: FilterFindOneMagicItemOperatorsInput
    OR: [FilterFindOneMagicItemInput!]
    AND: [FilterFindOneMagicItemInput!]
  }

  input FilterFindOneMagicItemOperatorsInput {
    _id: FilterFindOneMagicItem_idOperatorsInput
  }

  input FilterFindOneMagicSchool_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneMagicSchoolInput {
    _id: String
    desc: String
    index: String
    name: String
    url: String
    _operators: FilterFindOneMagicSchoolOperatorsInput
    OR: [FilterFindOneMagicSchoolInput!]
    AND: [FilterFindOneMagicSchoolInput!]
  }

  input FilterFindOneMagicSchoolOperatorsInput {
    _id: FilterFindOneMagicSchool_idOperatorsInput
  }

  input FilterFindOneMonster_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneMonsterActionsDamageInput {
    damage_dice: String
    damage_type: FilterFindOneAbilityScoreSkillsInput
  }

  input FilterFindOneMonsterActionsInput {
    attack_bonus: Float
    damage: [FilterFindOneMonsterActionsDamageInput]
    desc: String
    name: String
  }

  input FilterFindOneMonsterInput {
    _id: String
    actions: [FilterFindOneMonsterActionsInput]
    alignment: String
    armor_class: Float
    challenge_rating: Float
    charisma: Float
    condition_immunities: [FilterFindOneAbilityScoreSkillsInput]
    constitution: Float
    damage_immunities: [String]
    damage_resistances: [String]
    damage_vulnerabilities: [String]
    dexterity: Float
    forms: [FilterFindOneAbilityScoreSkillsInput]
    hit_dice: String
    hit_points: Float
    index: String
    intelligence: Float
    languages: String
    legendary_actions: [FilterFindOneMonsterLegendary_actionsInput]
    name: String
    proficiencies: [FilterFindOneMonsterProficienciesInput]
    reactions: [FilterFindOneMonsterReactionsInput]
    senses: FilterFindOneMonsterSensesInput
    size: String
    special_abilities: [FilterFindOneMonsterSpecial_abilitiesInput]
    speed: FilterFindOneMonsterSpeedInput
    strength: Float
    subtype: String
    type: String
    url: String
    wisdom: Float
    xp: Float
    _operators: FilterFindOneMonsterOperatorsInput
    OR: [FilterFindOneMonsterInput!]
    AND: [FilterFindOneMonsterInput!]
  }

  input FilterFindOneMonsterLegendary_actionsInput {
    attack_bonus: Float
    desc: String
    name: String
  }

  input FilterFindOneMonsterOperatorsInput {
    _id: FilterFindOneMonster_idOperatorsInput
  }

  input FilterFindOneMonsterProficienciesInput {
    proficiency: FilterFindOneAbilityScoreSkillsInput
    value: Float
  }

  input FilterFindOneMonsterReactionsInput {
    desc: String
    name: String
  }

  input FilterFindOneMonsterSensesInput {
    blindsight: String
    darkvision: String
    passive_perception: Float
    tremorsense: String
    truesight: String
  }

  input FilterFindOneMonsterSpecial_abilitiesInput {
    desc: String
    name: String
  }

  input FilterFindOneMonsterSpeedInput {
    burrow: String
    climb: String
    fly: String
    hover: Boolean
    swim: String
    walk: String
  }

  input FilterFindOneProficiency_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneProficiencyInput {
    _id: String
    classes: [FilterFindOneAbilityScoreSkillsInput]
    index: String
    name: String
    races: [FilterFindOneAbilityScoreSkillsInput]
    references: [FilterFindOneProficiencyReferencesInput]
    type: String
    url: String
    _operators: FilterFindOneProficiencyOperatorsInput
    OR: [FilterFindOneProficiencyInput!]
    AND: [FilterFindOneProficiencyInput!]
  }

  input FilterFindOneProficiencyOperatorsInput {
    _id: FilterFindOneProficiency_idOperatorsInput
  }

  input FilterFindOneProficiencyReferencesInput {
    index: String
    name: String
    type: String
    url: String
  }

  input FilterFindOneRace_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneRaceAbility_bonus_optionsFromInput {
    ability_score: FilterFindOneAbilityScoreSkillsInput
    bonus: Float
  }

  input FilterFindOneRaceAbility_bonus_optionsInput {
    choose: Float
    from: [FilterFindOneRaceAbility_bonus_optionsFromInput]
    type: String
  }

  input FilterFindOneRaceAbility_bonusesInput {
    ability_score: FilterFindOneAbilityScoreSkillsInput
    bonus: Float
  }

  input FilterFindOneRaceInput {
    _id: String
    ability_bonus_options: FilterFindOneRaceAbility_bonus_optionsInput
    ability_bonuses: [FilterFindOneRaceAbility_bonusesInput]
    age: String
    alignment: String
    index: String
    language_desc: String
    language_options: FilterFindOneRaceLanguage_optionsInput
    languages: [FilterFindOneAbilityScoreSkillsInput]
    name: String
    size: String
    size_description: String
    speed: Float
    starting_proficiencies: [FilterFindOneAbilityScoreSkillsInput]
    starting_proficiency_options: FilterFindOneRaceStarting_proficiency_optionsInput
    subraces: [FilterFindOneAbilityScoreSkillsInput]
    trait_options: FilterFindOneRaceTrait_optionsInput
    traits: [FilterFindOneAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindOneRaceOperatorsInput
    OR: [FilterFindOneRaceInput!]
    AND: [FilterFindOneRaceInput!]
  }

  input FilterFindOneRaceLanguage_optionsInput {
    choose: Float
    from: [FilterFindOneAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindOneRaceOperatorsInput {
    _id: FilterFindOneRace_idOperatorsInput
  }

  input FilterFindOneRaceStarting_proficiency_optionsInput {
    choose: Float
    from: [FilterFindOneAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindOneRaceTrait_optionsInput {
    choose: Float
    from: [FilterFindOneAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindOneRule_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneRuleInput {
    _id: String
    desc: String
    index: String
    name: String
    subsections: [FilterFindOneAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindOneRuleOperatorsInput
    OR: [FilterFindOneRuleInput!]
    AND: [FilterFindOneRuleInput!]
  }

  input FilterFindOneRuleOperatorsInput {
    _id: FilterFindOneRule_idOperatorsInput
  }

  input FilterFindOneRuleSection_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneRuleSectionInput {
    _id: String
    desc: String
    index: String
    name: String
    url: String
    _operators: FilterFindOneRuleSectionOperatorsInput
    OR: [FilterFindOneRuleSectionInput!]
    AND: [FilterFindOneRuleSectionInput!]
  }

  input FilterFindOneRuleSectionOperatorsInput {
    _id: FilterFindOneRuleSection_idOperatorsInput
  }

  input FilterFindOneSpell_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneSpellArea_of_effectInput {
    size: Float
    type: String
  }

  input FilterFindOneSpellDamageInput {
    damage_at_slot_level: JSON
    damage_at_character_level: JSON
    damage_type: FilterFindOneAbilityScoreSkillsInput
  }

  input FilterFindOneSpellDcInput {
    dc_success: String
    dc_type: FilterFindOneAbilityScoreSkillsInput
    desc: String
  }

  input FilterFindOneSpellInput {
    _id: String
    area_of_effect: FilterFindOneSpellArea_of_effectInput
    attack_type: String
    casting_time: String
    classes: [FilterFindOneAbilityScoreSkillsInput]
    components: [String]
    concentration: Boolean
    damage: FilterFindOneSpellDamageInput
    dc: FilterFindOneSpellDcInput
    desc: [String]
    duration: String
    heal_at_slot_level: JSON
    higher_level: [String]
    index: String
    level: Float
    material: String
    name: String
    range: String
    ritual: Boolean
    school: FilterFindOneAbilityScoreSkillsInput
    subclasses: [FilterFindOneAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindOneSpellOperatorsInput
    OR: [FilterFindOneSpellInput!]
    AND: [FilterFindOneSpellInput!]
  }

  input FilterFindOneSpellOperatorsInput {
    _id: FilterFindOneSpell_idOperatorsInput
  }

  input FilterFindOneStartingEquipment_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneStartingEquipmentInput {
    _id: String
    class: FilterFindOneAbilityScoreSkillsInput
    index: String
    starting_equipment: [FilterFindOneStartingEquipmentStarting_equipmentInput]
    starting_equipment_options: [FilterFindOneStartingEquipmentStarting_equipment_optionsInput]
    url: String
    _operators: FilterFindOneStartingEquipmentOperatorsInput
    OR: [FilterFindOneStartingEquipmentInput!]
    AND: [FilterFindOneStartingEquipmentInput!]
  }

  input FilterFindOneStartingEquipmentOperatorsInput {
    _id: FilterFindOneStartingEquipment_idOperatorsInput
  }

  input FilterFindOneStartingEquipmentStarting_equipment_optionsFromInput {
    equipment: FilterFindOneAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindOneStartingEquipmentStarting_equipment_optionsInput {
    choose: Float
    from: [FilterFindOneStartingEquipmentStarting_equipment_optionsFromInput]
    type: String
  }

  input FilterFindOneStartingEquipmentStarting_equipmentInput {
    equipment: FilterFindOneAbilityScoreSkillsInput
    quantity: Float
  }

  input FilterFindOneSubclass_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneSubclassInput {
    _id: String
    class: FilterFindOneAbilityScoreSkillsInput
    desc: [String]
    index: String
    name: String
    spells: [FilterFindOneSubclassSpellsInput]
    subclass_flavor: String
    subclass_levels: String
    url: String
    _operators: FilterFindOneSubclassOperatorsInput
    OR: [FilterFindOneSubclassInput!]
    AND: [FilterFindOneSubclassInput!]
  }

  input FilterFindOneSubclassOperatorsInput {
    _id: FilterFindOneSubclass_idOperatorsInput
  }

  input FilterFindOneSubclassSpellsInput {
    prerequisites: [FilterFindOneSubclassSpellsPrerequisitesInput]
    spell: FilterFindOneAbilityScoreSkillsInput
  }

  input FilterFindOneSubclassSpellsPrerequisitesInput {
    index: String
    name: String
    type: String
    url: String
  }

  input FilterFindOneSubrace_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneSubraceAbility_bonusesInput {
    ability_score: FilterFindOneAbilityScoreSkillsInput
    bonus: Float
  }

  input FilterFindOneSubraceInput {
    _id: String
    ability_bonuses: [FilterFindOneSubraceAbility_bonusesInput]
    desc: String
    index: String
    language_options: FilterFindOneSubraceLanguage_optionsInput
    name: String
    race: FilterFindOneAbilityScoreSkillsInput
    racial_trait_options: FilterFindOneSubraceRacial_trait_optionsInput
    racial_traits: [FilterFindOneAbilityScoreSkillsInput]
    starting_proficiencies: [FilterFindOneAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindOneSubraceOperatorsInput
    OR: [FilterFindOneSubraceInput!]
    AND: [FilterFindOneSubraceInput!]
  }

  input FilterFindOneSubraceLanguage_optionsInput {
    choose: Float
    from: [FilterFindOneAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindOneSubraceOperatorsInput {
    _id: FilterFindOneSubrace_idOperatorsInput
  }

  input FilterFindOneSubraceRacial_trait_optionsInput {
    choose: Float
    from: [FilterFindOneAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindOneTrait_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneTraitInput {
    _id: String
    desc: [String]
    index: String
    name: String
    proficiencies: [FilterFindOneTraitProficienciesInput]
    proficiency_choices: FilterFindOneTraitProficiency_choicesInput
    races: [FilterFindOneAbilityScoreSkillsInput]
    subraces: [FilterFindOneAbilityScoreSkillsInput]
    url: String
    _operators: FilterFindOneTraitOperatorsInput
    OR: [FilterFindOneTraitInput!]
    AND: [FilterFindOneTraitInput!]
  }

  input FilterFindOneTraitOperatorsInput {
    _id: FilterFindOneTrait_idOperatorsInput
  }

  input FilterFindOneTraitProficienciesInput {
    index: String
    name: String
    url: String
  }

  input FilterFindOneTraitProficiency_choicesInput {
    choose: Float
    from: [FilterFindOneAbilityScoreSkillsInput]
    type: String
  }

  input FilterFindOneWeaponProperty_idOperatorsInput {
    gt: String
    gte: String
    lt: String
    lte: String
    ne: String
    in: [String]
    nin: [String]
    regex: RegExpAsString
    exists: Boolean
  }

  input FilterFindOneWeaponPropertyInput {
    _id: String
    desc: [String]
    index: String
    name: String
    url: String
    _operators: FilterFindOneWeaponPropertyOperatorsInput
    OR: [FilterFindOneWeaponPropertyInput!]
    AND: [FilterFindOneWeaponPropertyInput!]
  }

  input FilterFindOneWeaponPropertyOperatorsInput {
    _id: FilterFindOneWeaponProperty_idOperatorsInput
  }

  scalar JSON

  type Language {
    _id: String!
    desc: String
    index: String
    name: String
    script: String
    type: String
    typical_speakers: [String]
    url: String
  }

  type Level {
    _id: String!
    ability_score_bonuses: Float
    class: AbilityScoreSkills
    class_specific: LevelClass_specific
    feature_choices: [AbilityScoreSkills]
    features: [AbilityScoreSkills]
    index: String
    level: Float
    prof_bonus: Float
    spellcasting: LevelSpellcasting
    subclass: AbilityScoreSkills
    subclass_specific: LevelSubclass_specific
    url: String
  }

  type LevelClass_specific {
    action_surges: Float
    arcane_recovery_levels: Float
    aura_range: Float
    bardic_inspiration_die: Float
    brutal_critical_dice: Float
    channel_divinity_charges: Float
    creating_spell_slots: [LevelClass_specificCreating_spell_slots]
    destroy_undead_cr: Float
    extra_attacks: Float
    favored_enemies: Float
    favored_terrain: Float
    indomitable_uses: Float
    invocations_known: Float
    ki_points: Float
    magical_secrets_max_5: Float
    magical_secrets_max_7: Float
    magical_secrets_max_9: Float
    martial_arts: LevelClass_specificMartial_arts
    metamagic_known: Float
    mystic_arcanum_level_6: Float
    mystic_arcanum_level_7: Float
    mystic_arcanum_level_8: Float
    mystic_arcanum_level_9: Float
    rage_count: Float
    rage_damage_bonus: Float
    sneak_attack: LevelClass_specificSneak_attack
    song_of_rest_die: Float
    sorcery_points: Float
    unarmored_movement: Float
    wild_shape_fly: Boolean
    wild_shape_max_cr: Float
    wild_shape_swim: Boolean
  }

  type LevelClass_specificCreating_spell_slots {
    sorcery_point_cost: Float
    spell_slot_level: Float
  }

  type LevelClass_specificMartial_arts {
    dice_count: Float
    dice_value: Float
  }

  type LevelClass_specificSneak_attack {
    dice_count: Float
    dice_value: Float
  }

  type LevelSpellcasting {
    cantrips_known: Float
    spell_slots_level_1: Float
    spell_slots_level_2: Float
    spell_slots_level_3: Float
    spell_slots_level_4: Float
    spell_slots_level_5: Float
    spell_slots_level_6: Float
    spell_slots_level_7: Float
    spell_slots_level_8: Float
    spell_slots_level_9: Float
    spells_known: Float
  }

  type LevelSubclass_specific {
    additional_magical_secrets_max_lvl: Float
    aura_range: Float
  }

  type MagicItem {
    _id: String!
    desc: [String]
    equipment_category: AbilityScoreSkills
    index: String
    name: String
    url: String
  }

  type MagicSchool {
    _id: String!
    desc: String
    index: String
    name: String
    url: String
  }

  type Monster {
    _id: String!
    actions: [MonsterActions]
    alignment: String
    armor_class: Float
    challenge_rating: Float
    charisma: Float
    condition_immunities: [AbilityScoreSkills]
    constitution: Float
    damage_immunities: [String]
    damage_resistances: [String]
    damage_vulnerabilities: [String]
    dexterity: Float
    forms: [AbilityScoreSkills]
    hit_dice: String
    hit_points: Float
    index: String
    intelligence: Float
    languages: String
    legendary_actions: [MonsterLegendary_actions]
    name: String
    proficiencies: [MonsterProficiencies]
    reactions: [MonsterReactions]
    senses: MonsterSenses
    size: String
    special_abilities: [MonsterSpecial_abilities]
    speed: MonsterSpeed
    strength: Float
    subtype: String
    type: String
    url: String
    wisdom: Float
    xp: Float
  }

  type MonsterActions {
    attack_bonus: Float
    damage: [MonsterActionsDamage]
    desc: String
    name: String
  }

  type MonsterActionsDamage {
    damage_dice: String
    damage_type: AbilityScoreSkills
  }

  type MonsterLegendary_actions {
    attack_bonus: Float
    desc: String
    name: String
  }

  type MonsterProficiencies {
    proficiency: AbilityScoreSkills
    value: Float
  }

  type MonsterReactions {
    desc: String
    name: String
  }

  type MonsterSenses {
    blindsight: String
    darkvision: String
    passive_perception: Float
    tremorsense: String
    truesight: String
  }

  type MonsterSpecial_abilities {
    desc: String
    name: String
  }

  type MonsterSpeed {
    burrow: String
    climb: String
    fly: String
    hover: Boolean
    swim: String
    walk: String
  }

  type Proficiency {
    _id: String!
    classes: [AbilityScoreSkills]
    index: String
    name: String
    races: [AbilityScoreSkills]
    references: [ProficiencyReferences]
    type: String
    url: String
  }

  type ProficiencyReferences {
    index: String
    name: String
    type: String
    url: String
  }



  type Race {
    _id: String!
    ability_bonus_options: RaceAbility_bonus_options
    ability_bonuses: [RaceAbility_bonuses]
    age: String
    alignment: String
    index: String
    language_desc: String
    language_options: RaceLanguage_options
    languages: [AbilityScoreSkills]
    name: String
    size: String
    size_description: String
    speed: Float
    starting_proficiencies: [AbilityScoreSkills]
    starting_proficiency_options: RaceStarting_proficiency_options
    subraces: [AbilityScoreSkills]
    trait_options: RaceTrait_options
    traits: [AbilityScoreSkills]
    url: String
  }

  type RaceAbility_bonus_options {
    choose: Float
    from: [RaceAbility_bonus_optionsFrom]
    type: String
  }

  type RaceAbility_bonus_optionsFrom {
    ability_score: AbilityScoreSkills
    bonus: Float
  }

  type RaceAbility_bonuses {
    ability_score: AbilityScoreSkills
    bonus: Float
  }

  type RaceLanguage_options {
    choose: Float
    from: [AbilityScoreSkills]
    type: String
  }

  type RaceStarting_proficiency_options {
    choose: Float
    from: [AbilityScoreSkills]
    type: String
  }

  type RaceTrait_options {
    choose: Float
    from: [AbilityScoreSkills]
    type: String
  }

  scalar RegExpAsString

  type Rule {
    _id: String!
    desc: String
    index: String
    name: String
    subsections: [AbilityScoreSkills]
    url: String
  }

  type RuleSection {
    _id: String!
    desc: String
    index: String
    name: String
    url: String
  }

  enum SortFindManyAbilityScoreInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyAlignmentInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyBackgroundInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyClassInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyConditionInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyDamageTypeInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyEquipmentCategoryInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyEquipmentInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyFeatureInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyLanguageInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyLevelInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyMagicItemInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyMagicSchoolInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyMonsterInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyProficiencyInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyRaceInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyRuleInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyRuleSectionInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManySpellInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyStartingEquipmentInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManySubclassInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManySubraceInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyTraitInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindManyWeaponPropertyInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneAbilityScoreInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneAlignmentInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneBackgroundInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneClassInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneConditionInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneDamageTypeInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneEquipmentCategoryInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneEquipmentInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneFeatureInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneLanguageInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneLevelInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneMagicItemInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneMagicSchoolInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneMonsterInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneProficiencyInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneRaceInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneRuleInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneRuleSectionInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneSpellInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneStartingEquipmentInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneSubclassInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneSubraceInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneTraitInput {
    _ID_ASC
    _ID_DESC
  }

  enum SortFindOneWeaponPropertyInput {
    _ID_ASC
    _ID_DESC
  }

  type Spell {
    _id: String!
    area_of_effect: SpellArea_of_effect
    attack_type: String
    casting_time: String
    classes: [AbilityScoreSkills]
    components: [String]
    concentration: Boolean
    damage: SpellDamage
    dc: SpellDc
    desc: [String]
    duration: String
    heal_at_slot_level: JSON
    higher_level: [String]
    index: String
    level: Float
    material: String
    name: String
    range: String
    ritual: Boolean
    school: AbilityScoreSkills
    subclasses: [AbilityScoreSkills]
    url: String
  }

  type SpellArea_of_effect {
    size: Float
    type: String
  }

  type SpellDamage {
    damage_at_slot_level: JSON
    damage_at_character_level: JSON
    damage_type: AbilityScoreSkills
  }

  type SpellDc {
    dc_success: String
    dc_type: AbilityScoreSkills
    desc: String
  }

  type StartingEquipment {
    _id: String!
    class: AbilityScoreSkills
    index: String
    starting_equipment: [StartingEquipmentStarting_equipment]
    starting_equipment_options: [StartingEquipmentStarting_equipment_options]
    url: String
  }

  type StartingEquipmentStarting_equipment {
    equipment: AbilityScoreSkills
    quantity: Float
  }

  type StartingEquipmentStarting_equipment_options {
    choose: Float
    from: [StartingEquipmentStarting_equipment_optionsFrom]
    type: String
  }

  type StartingEquipmentStarting_equipment_optionsFrom {
    equipment: AbilityScoreSkills
    quantity: Float
  }

  type Subclass {
    _id: String!
    class: AbilityScoreSkills
    desc: [String]
    index: String
    name: String
    spells: [SubclassSpells]
    subclass_flavor: String
    subclass_levels: String
    url: String
  }

  type SubclassSpells {
    prerequisites: [SubclassSpellsPrerequisites]
    spell: AbilityScoreSkills
  }

  type SubclassSpellsPrerequisites {
    index: String
    name: String
    type: String
    url: String
  }

  type Subrace {
    _id: String!
    ability_bonuses: [SubraceAbility_bonuses]
    desc: String
    index: String
    language_options: SubraceLanguage_options
    name: String
    race: AbilityScoreSkills
    racial_trait_options: SubraceRacial_trait_options
    racial_traits: [AbilityScoreSkills]
    starting_proficiencies: [AbilityScoreSkills]
    url: String
  }

  type SubraceAbility_bonuses {
    ability_score: AbilityScoreSkills
    bonus: Float
  }

  type SubraceLanguage_options {
    choose: Float
    from: [AbilityScoreSkills]
    type: String
  }

  type SubraceRacial_trait_options {
    choose: Float
    from: [AbilityScoreSkills]
    type: String
  }

  type Trait {
    _id: String!
    desc: [String]
    index: String
    name: String
    proficiencies: [TraitProficiencies]
    proficiency_choices: TraitProficiency_choices
    races: [AbilityScoreSkills]
    subraces: [AbilityScoreSkills]
    url: String
  }

  type TraitProficiencies {
    index: String
    name: String
    url: String
  }

  type TraitProficiency_choices {
    choose: Float
    from: [AbilityScoreSkills]
    type: String
  }

  type WeaponProperty {
    _id: String!
    desc: [String]
    index: String
    name: String
    url: String
  }
`;

/*   type Query {
    abilityScore(
      filter: FilterFindOneAbilityScoreInput
      skip: Int
      sort: SortFindOneAbilityScoreInput
    ): AbilityScore
    abilityScores(
      filter: FilterFindManyAbilityScoreInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyAbilityScoreInput
    ): [AbilityScore!]!
    alignment(
      filter: FilterFindOneAlignmentInput
      skip: Int
      sort: SortFindOneAlignmentInput
    ): Alignment
    alignments(
      filter: FilterFindManyAlignmentInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyAlignmentInput
    ): [Alignment!]!
    background(
      filter: FilterFindOneBackgroundInput
      skip: Int
      sort: SortFindOneBackgroundInput
    ): Background
    backgrounds(
      filter: FilterFindManyBackgroundInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyBackgroundInput
    ): [Background!]!
    condition(
      filter: FilterFindOneConditionInput
      skip: Int
      sort: SortFindOneConditionInput
    ): Condition
    conditions(
      filter: FilterFindManyConditionInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyConditionInput
    ): [Condition!]!
    class(
      filter: FilterFindOneClassInput
      skip: Int
      sort: SortFindOneClassInput
    ): Class
    classes(
      filter: FilterFindManyClassInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyClassInput
    ): [Class!]!
    damageType(
      filter: FilterFindOneDamageTypeInput
      skip: Int
      sort: SortFindOneDamageTypeInput
    ): DamageType
    damageTypes(
      filter: FilterFindManyDamageTypeInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyDamageTypeInput
    ): [DamageType!]!
    equipment(
      filter: FilterFindOneEquipmentInput
      skip: Int
      sort: SortFindOneEquipmentInput
    ): Equipment
    equipments(
      filter: FilterFindManyEquipmentInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyEquipmentInput
    ): [Equipment!]!
    equipmentCategory(
      filter: FilterFindOneEquipmentCategoryInput
      skip: Int
      sort: SortFindOneEquipmentCategoryInput
    ): EquipmentCategory
    equipmentCategories(
      filter: FilterFindManyEquipmentCategoryInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyEquipmentCategoryInput
    ): [EquipmentCategory!]!
    feature(
      filter: FilterFindOneFeatureInput
      skip: Int
      sort: SortFindOneFeatureInput
    ): Feature
    features(
      filter: FilterFindManyFeatureInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyFeatureInput
    ): [Feature!]!
    language(
      filter: FilterFindOneLanguageInput
      skip: Int
      sort: SortFindOneLanguageInput
    ): Language
    languages(
      filter: FilterFindManyLanguageInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyLanguageInput
    ): [Language!]!
    level(
      filter: FilterFindOneLevelInput
      skip: Int
      sort: SortFindOneLevelInput
    ): Level
    levels(
      filter: FilterFindManyLevelInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyLevelInput
    ): [Level!]!
    magicItem(
      filter: FilterFindOneMagicItemInput
      skip: Int
      sort: SortFindOneMagicItemInput
    ): MagicItem
    magicItems(
      filter: FilterFindManyMagicItemInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyMagicItemInput
    ): [MagicItem!]!
    magicSchool(
      filter: FilterFindOneMagicSchoolInput
      skip: Int
      sort: SortFindOneMagicSchoolInput
    ): MagicSchool
    magicSchools(
      filter: FilterFindManyMagicSchoolInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyMagicSchoolInput
    ): [MagicSchool!]!
    monster(
      filter: FilterFindOneMonsterInput
      skip: Int
      sort: SortFindOneMonsterInput
    ): Monster
    monsters(
      filter: FilterFindManyMonsterInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyMonsterInput
    ): [Monster!]!
    proficiency(
      filter: FilterFindOneProficiencyInput
      skip: Int
      sort: SortFindOneProficiencyInput
    ): Proficiency
    proficiencies(
      filter: FilterFindManyProficiencyInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyProficiencyInput
    ): [Proficiency!]!
    race(
      filter: FilterFindOneRaceInput
      skip: Int
      sort: SortFindOneRaceInput
    ): Race
    races(
      filter: FilterFindManyRaceInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyRaceInput
    ): [Race!]!
    rule(
      filter: FilterFindOneRuleInput
      skip: Int
      sort: SortFindOneRuleInput
    ): Rule
    rules(
      filter: FilterFindManyRuleInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyRuleInput
    ): [Rule!]!
    ruleSection(
      filter: FilterFindOneRuleSectionInput
      skip: Int
      sort: SortFindOneRuleSectionInput
    ): RuleSection
    ruleSections(
      filter: FilterFindManyRuleSectionInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyRuleSectionInput
    ): [RuleSection!]!
    spell(
      filter: FilterFindOneSpellInput
      skip: Int
      sort: SortFindOneSpellInput
    ): Spell
    spells(
      filter: FilterFindManySpellInput
      skip: Int
      limit: Int = 100
      sort: SortFindManySpellInput
    ): [Spell!]!
    startingequipment(
      filter: FilterFindOneStartingEquipmentInput
      skip: Int
      sort: SortFindOneStartingEquipmentInput
    ): StartingEquipment
    startingequipments(
      filter: FilterFindManyStartingEquipmentInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyStartingEquipmentInput
    ): [StartingEquipment!]!
    subclass(
      filter: FilterFindOneSubclassInput
      skip: Int
      sort: SortFindOneSubclassInput
    ): Subclass
    subclasses(
      filter: FilterFindManySubclassInput
      skip: Int
      limit: Int = 100
      sort: SortFindManySubclassInput
    ): [Subclass!]!
    subrace(
      filter: FilterFindOneSubraceInput
      skip: Int
      sort: SortFindOneSubraceInput
    ): Subrace
    subraces(
      filter: FilterFindManySubraceInput
      skip: Int
      limit: Int = 100
      sort: SortFindManySubraceInput
    ): [Subrace!]!
    trait(
      filter: FilterFindOneTraitInput
      skip: Int
      sort: SortFindOneTraitInput
    ): Trait
    traits(
      filter: FilterFindManyTraitInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyTraitInput
    ): [Trait!]!
    weaponProperty(
      filter: FilterFindOneWeaponPropertyInput
      skip: Int
      sort: SortFindOneWeaponPropertyInput
    ): WeaponProperty
    weaponProperties(
      filter: FilterFindManyWeaponPropertyInput
      skip: Int
      limit: Int = 100
      sort: SortFindManyWeaponPropertyInput
    ): [WeaponProperty!]!
  } */

module.exports = apiSchema