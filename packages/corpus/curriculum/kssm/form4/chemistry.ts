import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The KSSM Form 4 Chemistry chapters, in the order of their DSKP. */
export const kssmForm4ChemistryTopicNodes = [
  unitNode({
    key: "form-4-chemistry-introduction-to-chemistry",
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
        key: "form-4-chemistry-the-mole-concept-chemical-formula-and-equation-basic-chemistry-laws",
        level: "lesson",
        materialKeys: ["lesson.chemistry.basic-chemistry-laws"],
        order: 10,
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
        key: "form-4-chemistry-the-periodic-table-of-elements-structure-matter",
        level: "lesson",
        materialKeys: ["lesson.chemistry.structure-matter"],
        order: 10,
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
    key: "form-4-chemistry-chemical-bond",
    order: 50,
    translations: {
      de: { routeSlug: "chemische-bindung", title: "Chemische Bindung" },
      en: { routeSlug: "chemical-bond", title: "Chemical Bond" },
      id: { routeSlug: "ikatan-kimia", title: "Ikatan Kimia" },
      ms: { routeSlug: "ikatan-kimia", title: "Ikatan Kimia" },
    },
  }),
  unitNode({
    key: "form-4-chemistry-acid-base-and-salt",
    order: 60,
    translations: {
      de: {
        routeSlug: "saeuren-basen-und-salze",
        title: "Säuren, Basen und Salze",
      },
      en: { routeSlug: "acid-base-and-salt", title: "Acid, Base and Salt" },
      id: { routeSlug: "asam-basa-dan-garam", title: "Asam, Basa, dan Garam" },
      ms: { routeSlug: "asid-bes-dan-garam", title: "Asid, Bes dan Garam" },
    },
  }),
  unitNode({
    key: "form-4-chemistry-rate-of-reaction",
    order: 70,
    translations: {
      de: {
        routeSlug: "reaktionsgeschwindigkeit",
        title: "Reaktionsgeschwindigkeit",
      },
      en: { routeSlug: "rate-of-reaction", title: "Rate of Reaction" },
      id: { routeSlug: "laju-reaksi", title: "Laju Reaksi" },
      ms: { routeSlug: "kadar-tindak-balas", title: "Kadar Tindak Balas" },
    },
  }),
  unitNode({
    key: "form-4-chemistry-manufactured-substances-in-industry",
    order: 80,
    translations: {
      de: {
        routeSlug: "industriell-hergestellte-stoffe",
        title: "Industriell hergestellte Stoffe",
      },
      en: {
        routeSlug: "manufactured-substances-in-industry",
        title: "Manufactured Substances in Industry",
      },
      id: {
        routeSlug: "bahan-buatan-dalam-industri",
        title: "Bahan Buatan dalam Industri",
      },
      ms: {
        routeSlug: "bahan-buatan-dalam-industri",
        title: "Bahan Buatan dalam Industri",
      },
    },
  }),
];
