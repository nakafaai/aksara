import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/chemistry/periodic-groups",
  domain: "chemistry",
  key: "lesson.chemistry.periodic-groups",
  kind: "lesson",
  routeSlugs: {
    en: "periodic-table-groups",
    id: "golongan-sistem-periodik",
    de: "gruppen-des-periodensystems",
    ms: "kumpulan-jadual-berkala",
  },
  sections: ["group-properties"],
  slug: "periodic-groups",
  translations: {
    en: {
      description: "Compare noble gases, alkali metals and halogens.",
      title: "Groups of the Periodic Table",
    },
    id: {
      description: "Bandingkan gas mulia, logam alkali, dan halogen.",
      title: "Golongan dalam Sistem Periodik",
    },
    de: {
      description: "Vergleich Edelgase, Alkalimetalle und Halogene.",
      title: "Gruppen des Periodensystems",
    },
    ms: {
      description: "Bandingkan gas adi, logam alkali dan halogen.",
      title: "Kumpulan dalam Jadual Berkala",
    },
  },
};

export default lesson;
