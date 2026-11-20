import { physicsCoreCurriculum } from "#corpus/curriculum/gymnasiale-oberstufe/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Q4 Physik: Kernphysik. */
const qualificationPhase4PhysicsUnit1 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-4-physics-nuclear-nuclear-physics",
      level: "lesson",
      materialKeys: ["lesson.physics.nuclear-physics"],
      order: 10,
      outcomes: [{ code: "Physik Q4.3 Kernphysik", ...physicsCoreCurriculum }],
    }),
  ],
  key: "qualification-phase-4-physics-nuclear",
  materialCard: {
    de: {
      description: "Atomkerne zerfallen, spalten sich und verschmelzen.",
      title: "Kernphysik",
    },
    en: {
      description: "Nuclei decay, split apart and fuse together.",
      title: "Nuclear physics",
    },
    id: {
      description: "Inti atom meluruh, membelah, dan bergabung.",
      title: "Fisika inti",
    },
    ms: {
      description: "Nukleus mereput, membelah dan bergabung.",
      title: "Fizik nuklear",
    },
  },
  order: 10,
  translations: {
    de: { routeSlug: "kernphysik", title: "Kernphysik" },
    en: { routeSlug: "nuclear-physics", title: "Nuclear physics" },
    id: { routeSlug: "fisika-inti", title: "Fisika inti" },
    ms: { routeSlug: "fizik-nuklear", title: "Fizik nuklear" },
  },
});

/** Q4 Physik: Festkörperphysik. */
const qualificationPhase4PhysicsUnit2 = unitNode({
  children: [
    materialNode({
      key: "qualification-phase-4-physics-solid-state-electronics",
      level: "lesson",
      materialKeys: ["lesson.physics.electronics"],
      order: 10,
      outcomes: [
        { code: "Physik Q4.5 Festkörperphysik", ...physicsCoreCurriculum },
      ],
    }),
  ],
  key: "qualification-phase-4-physics-solid-state",
  materialCard: {
    de: {
      description: "Wie Dioden und Transistoren aus Halbleitern arbeiten.",
      title: "Festkörperphysik",
    },
    en: {
      description: "How diodes and transistors work in semiconductors.",
      title: "Solid-state physics",
    },
    id: {
      description: "Cara dioda dan transistor bekerja dari semikonduktor.",
      title: "Fisika zat padat",
    },
    ms: {
      description: "Cara diod dan transistor berfungsi dalam semikonduktor.",
      title: "Fizik keadaan pepejal",
    },
  },
  order: 20,
  translations: {
    de: { routeSlug: "festkoerperphysik", title: "Festkörperphysik" },
    en: { routeSlug: "solid-state-physics", title: "Solid-state physics" },
    id: { routeSlug: "fisika-zat-padat", title: "Fisika zat padat" },
    ms: { routeSlug: "fizik-keadaan-pepejal", title: "Fizik keadaan pepejal" },
  },
});

/** Q4 Physik: the Themenfelder of the Hessen Kerncurriculum Physik that a lesson teaches, in its order */
export const qualificationPhase4PhysicsUnitNodes = [
  qualificationPhase4PhysicsUnit1,
  qualificationPhase4PhysicsUnit2,
];
