import type { LessonModule } from "#corpus/material/schema";

const lesson: LessonModule = {
  assetRoot: "material/lesson/mathematics/combinatorics",
  domain: "mathematics",
  key: "lesson.mathematics.combinatorics",
  kind: "lesson",
  routeSlugs: {
    en: "combinatorics",
    id: "kombinatorik",
    de: "kombinatorik",
    ms: "kombinatorik",
  },
  sections: [
    "binomial-newton",
    "circular-permutation",
    "combination",
    "filling-place-rule",
    "permutation-of-n-items-from-n-objects",
    "permutation-with-identical-objects",
    "probability-of-an-event",
    "probability-of-compound-events",
    "probability-of-independent-conditional-events",
    "probability-of-independent-events",
    "probability-of-mutually-exclusive-events",
  ],
  slug: "combinatorics",
  translations: {
    en: {
      description: "Expand powers quickly with binomial coefficients.",
      title: "Combinatorics",
    },
    id: {
      description: "Kembangkan pangkat cepat dengan koefisien binomial.",
      title: "Kombinatorik",
    },
    de: {
      description: "Zähle Anordnungen und berechne Wahrscheinlichkeiten.",
      title: "Kombinatorik",
    },
    ms: {
      description: "Kembangkan kuasa dengan cepat guna pekali binomial.",
      title: "Kombinatorik",
    },
  },
};

export default lesson;
