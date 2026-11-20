import { chemistryStandards } from "#corpus/curriculum/kssm/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Chemistry chapters of the themes Importance of Chemistry and Fundamentals of Chemistry, Bab 1 to Bab 5. */
export const kssmForm4ChemistryFoundationNodes = [
  unitNode({
    children: [
      materialNode({
        key: "form-4-chemistry-introduction-to-chemistry-chemistry-introduction",
        level: "lesson",
        materialKeys: ["lesson.chemistry.chemistry-introduction"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 1.1 to 1.3",
            ...chemistryStandards,
          },
        ],
      }),
    ],
    key: "form-4-chemistry-introduction-to-chemistry",
    materialCard: {
      de: {
        description: "Forsche wie ein Chemiker und arbeite sicher im Labor.",
        title: "Einführung in die Chemie",
      },
      en: {
        description: "Investigate like a chemist and work safely in the lab.",
        title: "Introduction to Chemistry",
      },
      id: {
        description: "Selidiki seperti ahli kimia dan bekerja aman di lab.",
        title: "Pengantar Kimia",
      },
      ms: {
        description: "Siasat seperti ahli kimia dan bekerja selamat di makmal.",
        title: "Pengenalan kepada Kimia",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "einfuehrung-in-die-chemie",
        title: "Einführung in die Chemie",
      },
      en: {
        routeSlug: "introduction-to-chemistry",
        title: "Introduction to Chemistry",
      },
      id: { routeSlug: "pengantar-kimia", title: "Pengantar Kimia" },
      ms: {
        routeSlug: "pengenalan-kepada-kimia",
        title: "Pengenalan kepada Kimia",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-chemistry-matter-and-the-atomic-structure-structure-matter",
        level: "lesson",
        materialKeys: ["lesson.chemistry.structure-matter"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 2.2 to 2.4",
            ...chemistryStandards,
          },
        ],
      }),
    ],
    key: "form-4-chemistry-matter-and-the-atomic-structure",
    materialCard: {
      de: {
        description: "Sieh, wie Atome jede Art von Materie aufbauen.",
        title: "Materie und Atombau",
      },
      en: {
        description: "See how atoms build every kind of matter.",
        title: "Matter and the Atomic Structure",
      },
      id: {
        description: "Lihat bagaimana atom menyusun semua materi.",
        title: "Materi dan Struktur Atom",
      },
      ms: {
        description: "Lihat cara atom membina semua jenis jirim.",
        title: "Jirim dan Struktur Atom",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "materie-und-atombau", title: "Materie und Atombau" },
      en: {
        routeSlug: "matter-and-the-atomic-structure",
        title: "Matter and the Atomic Structure",
      },
      id: {
        routeSlug: "materi-dan-struktur-atom",
        title: "Materi dan Struktur Atom",
      },
      ms: {
        routeSlug: "jirim-dan-struktur-atom",
        title: "Jirim dan Struktur Atom",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-chemistry-the-mole-concept-chemical-formula-and-equation-mole-concept",
        level: "lesson",
        materialKeys: ["lesson.chemistry.mole-concept"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 3.1 to 3.4",
            ...chemistryStandards,
          },
        ],
      }),
    ],
    key: "form-4-chemistry-the-mole-concept-chemical-formula-and-equation",
    materialCard: {
      de: {
        description: "Zähle Teilchen und gleiche Reaktionen mit dem Mol aus.",
        title: "Stoffmenge, chemische Formeln und Reaktionsgleichungen",
      },
      en: {
        description: "Count particles and balance reactions with the mole.",
        title: "The Mole Concept, Chemical Formula and Equation",
      },
      id: {
        description: "Hitung partikel dan setarakan reaksi dengan konsep mol.",
        title: "Konsep Mol, Rumus Kimia, dan Persamaan Reaksi",
      },
      ms: {
        description: "Kira zarah dan seimbangkan tindak balas dengan mol.",
        title: "Konsep Mol, Formula dan Persamaan Kimia",
      },
    },
    order: 30,
    translations: {
      de: {
        routeSlug: "stoffmenge-chemische-formeln-und-reaktionsgleichungen",
        title: "Stoffmenge, chemische Formeln und Reaktionsgleichungen",
      },
      en: {
        routeSlug: "the-mole-concept-chemical-formula-and-equation",
        title: "The Mole Concept, Chemical Formula and Equation",
      },
      id: {
        routeSlug: "konsep-mol-rumus-kimia-dan-persamaan-reaksi",
        title: "Konsep Mol, Rumus Kimia, dan Persamaan Reaksi",
      },
      ms: {
        routeSlug: "konsep-mol-formula-dan-persamaan-kimia",
        title: "Konsep Mol, Formula dan Persamaan Kimia",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-chemistry-the-periodic-table-of-elements-periodic-groups",
        level: "lesson",
        materialKeys: ["lesson.chemistry.periodic-groups"],
        order: 20,
        outcomes: [
          {
            code: "Form 4, Content Standards 4.3 to 4.7",
            ...chemistryStandards,
          },
        ],
      }),
    ],
    key: "form-4-chemistry-the-periodic-table-of-elements",
    materialCard: {
      de: {
        description: "Lies das Periodensystem aus dem Atombau ab.",
        title: "Das Periodensystem der Elemente",
      },
      en: {
        description: "Read the periodic table from the atom's structure.",
        title: "The Periodic Table of Elements",
      },
      id: {
        description: "Baca tabel periodik dari struktur atomnya.",
        title: "Sistem Periodik Unsur",
      },
      ms: {
        description: "Baca jadual berkala daripada struktur atom.",
        title: "Jadual Berkala Unsur",
      },
    },
    order: 40,
    translations: {
      de: {
        routeSlug: "das-periodensystem-der-elemente",
        title: "Das Periodensystem der Elemente",
      },
      en: {
        routeSlug: "the-periodic-table-of-elements",
        title: "The Periodic Table of Elements",
      },
      id: {
        routeSlug: "sistem-periodik-unsur",
        title: "Sistem Periodik Unsur",
      },
      ms: { routeSlug: "jadual-berkala-unsur", title: "Jadual Berkala Unsur" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "form-4-chemistry-chemical-bond-chemical-bond",
        level: "lesson",
        materialKeys: ["lesson.chemistry.chemical-bond"],
        order: 10,
        outcomes: [
          {
            code: "Form 4, Content Standards 5.1 to 5.7",
            ...chemistryStandards,
          },
        ],
      }),
    ],
    key: "form-4-chemistry-chemical-bond",
    materialCard: {
      de: {
        description: "Sieh, wie Atome Ionen, Moleküle und Metalle bilden.",
        title: "Chemische Bindung",
      },
      en: {
        description: "See how atoms form ions, molecules and metals.",
        title: "Chemical Bond",
      },
      id: {
        description: "Lihat cara atom membentuk ion, molekul, dan logam.",
        title: "Ikatan Kimia",
      },
      ms: {
        description: "Lihat cara atom membentuk ion, molekul dan logam.",
        title: "Ikatan Kimia",
      },
    },
    order: 50,
    translations: {
      de: { routeSlug: "chemische-bindung", title: "Chemische Bindung" },
      en: { routeSlug: "chemical-bond", title: "Chemical Bond" },
      id: { routeSlug: "ikatan-kimia", title: "Ikatan Kimia" },
      ms: { routeSlug: "ikatan-kimia", title: "Ikatan Kimia" },
    },
  }),
];
