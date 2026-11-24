import {
  chemistryBookXI,
  merdekaLearningOutcomes,
} from "#corpus/curriculum/merdeka/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** The Kurikulum Merdeka Kelas 11 Kimia units, in the chapter order of the Kemendikbudristek Buku Siswa Kimia SMA/MA Kelas XI (2022). */
export const merdekaClass11ChemistryTopicNodes = [
  unitNode({
    children: [
      materialNode({
        key: "class-11-chemistry-atomic-structure-periodic-table-periodic-groups",
        level: "lesson",
        materialKeys: ["lesson.chemistry.periodic-groups"],
        order: 20,
        outcomes: [
          {
            code: "Kimia, Fase F, elemen Pemahaman Kimia",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab I Struktur Atom dan Sistem Periodik Unsur, C dan D",
            ...chemistryBookXI,
          },
        ],
      }),
    ],
    key: "class-11-chemistry-atomic-structure-periodic-table",
    materialCard: {
      de: {
        description: "Schreibe Elektronenkonfigurationen und Gruppen.",
        title: "Atombau und Periodensystem",
      },
      en: {
        description: "Write electron configurations and read the table.",
        title: "Atomic Structure and the Periodic Table",
      },
      id: {
        description: "Susun konfigurasi elektron dan baca tabel periodik.",
        title: "Struktur Atom dan Sistem Periodik Unsur",
      },
      ms: {
        description: "Tulis susunan elektron dan baca jadual berkala.",
        title: "Struktur Atom dan Jadual Berkala Unsur",
      },
    },
    order: 10,
    translations: {
      de: {
        routeSlug: "atombau-und-periodensystem",
        title: "Atombau und Periodensystem",
      },
      en: {
        routeSlug: "atomic-structure-and-the-periodic-table",
        title: "Atomic Structure and the Periodic Table",
      },
      id: {
        routeSlug: "struktur-atom-dan-sistem-periodik-unsur",
        title: "Struktur Atom dan Sistem Periodik Unsur",
      },
      ms: {
        routeSlug: "struktur-atom-dan-jadual-berkala-unsur",
        title: "Struktur Atom dan Jadual Berkala Unsur",
      },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-chemistry-chemical-bonding-material",
        level: "lesson",
        materialKeys: ["lesson.chemistry.chemical-bond"],
        order: 10,
        outcomes: [
          {
            code: "Kimia, Fase F, elemen Pemahaman Kimia",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab II Ikatan Kimia, A sampai D dan F",
            ...chemistryBookXI,
          },
        ],
      }),
    ],
    key: "class-11-chemistry-chemical-bonding",
    materialCard: {
      de: {
        description: "Unterscheide Ionen-, Atom- und Metallbindung.",
        title: "Chemische Bindung",
      },
      en: {
        description: "Tell ionic, covalent and metallic bonds apart.",
        title: "Chemical Bonding",
      },
      id: {
        description: "Bedakan ikatan ion, kovalen, dan logam.",
        title: "Ikatan Kimia",
      },
      ms: {
        description: "Bezakan ikatan ion, kovalen dan logam.",
        title: "Ikatan Kimia",
      },
    },
    order: 20,
    translations: {
      de: { routeSlug: "chemische-bindung", title: "Chemische Bindung" },
      en: { routeSlug: "chemical-bonding", title: "Chemical Bonding" },
      id: { routeSlug: "ikatan-kimia", title: "Ikatan Kimia" },
      ms: { routeSlug: "ikatan-kimia", title: "Ikatan Kimia" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-chemistry-stoichiometry-material",
        level: "lesson",
        materialKeys: ["lesson.chemistry.mole-concept"],
        order: 10,
        outcomes: [
          { code: "Bab III Stoikiometri, B dan C", ...chemistryBookXI },
        ],
      }),
    ],
    key: "class-11-chemistry-stoichiometry",
    materialCard: {
      de: {
        description: "Berechne Stoffmengen, Massen und Volumen.",
        title: "Stöchiometrie",
      },
      en: {
        description: "Work out moles, masses and volumes in reactions.",
        title: "Stoichiometry",
      },
      id: {
        description: "Hitung mol, massa, dan volume dalam reaksi.",
        title: "Stoikiometri",
      },
      ms: {
        description: "Kira mol, jisim dan isi padu dalam tindak balas.",
        title: "Stoikiometri",
      },
    },
    order: 30,
    translations: {
      de: { routeSlug: "stoechiometrie", title: "Stöchiometrie" },
      en: { routeSlug: "stoichiometry", title: "Stoichiometry" },
      id: { routeSlug: "stoikiometri", title: "Stoikiometri" },
      ms: { routeSlug: "stoikiometri", title: "Stoikiometri" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-chemistry-hydrocarbon-material",
        level: "lesson",
        materialKeys: ["lesson.chemistry.carbon-compound"],
        order: 10,
        outcomes: [
          {
            code: "Kimia, Fase F, elemen Pemahaman Kimia",
            ...merdekaLearningOutcomes,
          },
          { code: "Bab IV Hidrokarbon, C, D dan G", ...chemistryBookXI },
        ],
      }),
    ],
    key: "class-11-chemistry-hydrocarbon",
    materialCard: {
      de: {
        description: "Benenne Alkane, Alkene, Isomere und Reaktionen.",
        title: "Kohlenwasserstoffe",
      },
      en: {
        description: "Name alkanes, alkenes, isomers and their reactions.",
        title: "Hydrocarbons",
      },
      id: {
        description: "Kenali alkana, alkena, isomer, dan reaksinya.",
        title: "Hidrokarbon",
      },
      ms: {
        description: "Namakan alkana, alkena, isomer dan tindak balasnya.",
        title: "Hidrokarbon",
      },
    },
    order: 40,
    translations: {
      de: { routeSlug: "kohlenwasserstoffe", title: "Kohlenwasserstoffe" },
      en: { routeSlug: "hydrocarbons", title: "Hydrocarbons" },
      id: { routeSlug: "hidrokarbon", title: "Hidrokarbon" },
      ms: { routeSlug: "hidrokarbon", title: "Hidrokarbon" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-chemistry-thermochemistry-material",
        level: "lesson",
        materialKeys: ["lesson.chemistry.thermochemistry"],
        order: 10,
        outcomes: [
          {
            code: "Kimia, Fase F, elemen Pemahaman Kimia",
            ...merdekaLearningOutcomes,
          },
          { code: "Bab V Termokimia, A sampai D", ...chemistryBookXI },
        ],
      }),
    ],
    key: "class-11-chemistry-thermochemistry",
    materialCard: {
      de: {
        description: "Berechne Enthalpieänderungen und Reaktionswärmen.",
        title: "Thermochemie",
      },
      en: {
        description: "Work out enthalpy changes and heats of reaction.",
        title: "Thermochemistry",
      },
      id: {
        description: "Hitung perubahan entalpi dan kalor reaksi.",
        title: "Termokimia",
      },
      ms: {
        description: "Kira perubahan entalpi dan haba tindak balas.",
        title: "Termokimia",
      },
    },
    order: 50,
    translations: {
      de: { routeSlug: "thermochemie", title: "Thermochemie" },
      en: { routeSlug: "thermochemistry", title: "Thermochemistry" },
      id: { routeSlug: "termokimia", title: "Termokimia" },
      ms: { routeSlug: "termokimia", title: "Termokimia" },
    },
  }),
  unitNode({
    children: [
      materialNode({
        key: "class-11-chemistry-chemical-kinetics-material",
        level: "lesson",
        materialKeys: ["lesson.chemistry.reaction-rate"],
        order: 10,
        outcomes: [
          {
            code: "Kimia, Fase F, elemen Pemahaman Kimia",
            ...merdekaLearningOutcomes,
          },
          {
            code: "Bab VI Kinetika Kimia, A, B dan D",
            ...chemistryBookXI,
          },
        ],
      }),
    ],
    key: "class-11-chemistry-chemical-kinetics",
    materialCard: {
      de: {
        description: "Miss Reaktionsgeschwindigkeiten und ihre Faktoren.",
        title: "Reaktionskinetik",
      },
      en: {
        description: "Measure reaction rates and what changes them.",
        title: "Chemical Kinetics",
      },
      id: {
        description: "Ukur laju reaksi dan faktor yang memengaruhinya.",
        title: "Kinetika Kimia",
      },
      ms: {
        description: "Ukur kadar tindak balas dan faktor yang mengubahnya.",
        title: "Kinetik Kimia",
      },
    },
    order: 60,
    translations: {
      de: { routeSlug: "reaktionskinetik", title: "Reaktionskinetik" },
      en: { routeSlug: "chemical-kinetics", title: "Chemical Kinetics" },
      id: { routeSlug: "kinetika-kimia", title: "Kinetika Kimia" },
      ms: { routeSlug: "kinetik-kimia", title: "Kinetik Kimia" },
    },
  }),
];
