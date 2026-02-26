HEAVENLY_STEMS = [
    "Jia", "Yi", "Bing", "Ding", "Wu",
    "Ji", "Geng", "Xin", "Ren", "Gui",
]

EARTHLY_BRANCHES = [
    "Zi", "Chou", "Yin", "Mao", "Chen", "Si",
    "Wu", "Wei", "Shen", "You", "Xu", "Hai",
]

ANIMALS = [
    "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
    "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig",
]

STEM_ELEMENTS = [
    "Wood", "Wood", "Fire", "Fire", "Earth",
    "Earth", "Metal", "Metal", "Water", "Water",
]

STEM_POLARITIES = [
    "Yang", "Yin", "Yang", "Yin", "Yang",
    "Yin", "Yang", "Yin", "Yang", "Yin",
]

BRANCH_ELEMENTS = [
    "Water", "Earth", "Wood", "Wood", "Earth", "Fire",
    "Fire", "Earth", "Metal", "Metal", "Earth", "Water",
]


def chinese_year(year: int) -> dict:
    stem_index = (year - 4) % 10
    branch_index = (year - 4) % 12
    cycle_position = ((year - 4) % 60) + 1

    return {
        "year": year,
        "heavenly_stem": HEAVENLY_STEMS[stem_index],
        "earthly_branch": EARTHLY_BRANCHES[branch_index],
        "animal": ANIMALS[branch_index],
        "stem_element": STEM_ELEMENTS[stem_index],
        "branch_element": BRANCH_ELEMENTS[branch_index],
        "polarity": STEM_POLARITIES[stem_index],
        "sexagenary_cycle_position": cycle_position,
        "pillar": f"{HEAVENLY_STEMS[stem_index]}-{EARTHLY_BRANCHES[branch_index]}",
    }


def chinese_month(year: int, month: int) -> dict:
    year_stem_index = (year - 4) % 10
    month_stem_base = (year_stem_index % 5) * 2
    month_stem_index = (month_stem_base + month - 1) % 10
    month_branch_index = (month + 1) % 12

    return {
        "month": month,
        "heavenly_stem": HEAVENLY_STEMS[month_stem_index],
        "earthly_branch": EARTHLY_BRANCHES[month_branch_index],
        "animal": ANIMALS[month_branch_index],
    }


def chinese_day(jd: float) -> dict:
    day_count = int(jd + 0.5)
    stem_index = (day_count + 9) % 10
    branch_index = (day_count + 1) % 12

    return {
        "heavenly_stem": HEAVENLY_STEMS[stem_index],
        "earthly_branch": EARTHLY_BRANCHES[branch_index],
        "animal": ANIMALS[branch_index],
        "pillar": f"{HEAVENLY_STEMS[stem_index]}-{EARTHLY_BRANCHES[branch_index]}",
    }
