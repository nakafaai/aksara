import { materialNode, unitNode } from "#corpus/curriculum/schema";
import { chemistrySyllabus } from "#corpus/curriculum/singapore-moe/documents";

/** Singapore SEC G3 Chemistry (K324), section I Matter, Structures and Properties. */
export const singaporeMatterUnit = unitNode({
  children: [
    materialNode({
      key: "singapore-secondary-chemistry-matter-lab-work",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemistry-introduction"],
      order: 10,
      outcomes: [{ code: "1.1 Experimental Design", ...chemistrySyllabus }],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-matter-atomic-structure",
      level: "lesson",
      materialKeys: ["lesson.chemistry.structure-matter"],
      order: 20,
      outcomes: [
        { code: "2.2 Atomic Structure", ...chemistrySyllabus },
        { code: "8.1 Periodic Trends", ...chemistrySyllabus },
      ],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-matter-bonding",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemical-bond"],
      order: 30,
      outcomes: [
        { code: "3.1 Ionic Bonding", ...chemistrySyllabus },
        { code: "3.2 Covalent Bonding", ...chemistrySyllabus },
        { code: "3.3 Metallic Bonding", ...chemistrySyllabus },
        {
          code: "3.4 Structure and Properties of Materials",
          ...chemistrySyllabus,
        },
      ],
    }),
    materialNode({
      key: "singapore-secondary-chemistry-matter-materials",
      level: "lesson",
      materialKeys: ["lesson.chemistry.manufactured-substances"],
      order: 40,
      outcomes: [
        {
          code: "3.4 Structure and Properties of Materials",
          ...chemistrySyllabus,
        },
      ],
    }),
  ],
  key: "secondary-chemistry-matter",
  materialCard: {
    de: {
      description: "Verbinde Atombau und Bindung mit Stoffeigenschaften.",
      title: "Stoffe: Aufbau und Eigenschaften",
    },
    en: {
      description: "Link atoms and bonding to the properties of materials.",
      title: "Matter: structures and properties",
    },
    id: {
      description: "Kaitkan atom dan ikatan dengan sifat bahan.",
      title: "Materi: struktur dan sifat",
    },
    ms: {
      description: "Kaitkan atom dan ikatan dengan sifat bahan.",
      title: "Jirim: struktur dan sifat",
    },
  },
  order: 10,
  translations: {
    de: {
      routeSlug: "stoffe-aufbau-und-eigenschaften",
      title: "Stoffe: Aufbau und Eigenschaften",
    },
    en: {
      routeSlug: "matter-structures-and-properties",
      title: "Matter: structures and properties",
    },
    id: {
      routeSlug: "materi-struktur-dan-sifat",
      title: "Materi: struktur dan sifat",
    },
    ms: {
      routeSlug: "jirim-struktur-dan-sifat",
      title: "Jirim: struktur dan sifat",
    },
  },
});
