import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/redox-equilibrium",
  domain: "chemistry",
  key: "lesson.chemistry.redox-equilibrium",
  kind: "lesson",
  routeSlugs: {
    en: "redox-equilibrium",
    id: "kesetimbangan-redoks",
    de: "redoxgleichgewicht",
    ms: "keseimbangan-redoks",
  },
  sections: ["redox-cell"],
  slug: "redox-equilibrium",
  translations: {
    en: {
      description: "Find oxidation numbers, build cells and electrolyse.",
      title: "Redox Equilibrium",
    },
    id: {
      description: "Hitung bilangan oksidasi dan rakit sel elektrokimia.",
      title: "Kesetimbangan Redoks",
    },
    de: {
      description: "Bestimme Oxidationszahlen, baue Zellen, elektrolysiere.",
      title: "Redoxgleichgewicht",
    },
    ms: {
      description: "Kira nombor pengoksidaan dan bina sel elektrokimia.",
      title: "Keseimbangan Redoks",
    },
  },
};

export default lesson;
