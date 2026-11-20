import { chemistrySyllabus } from "#corpus/curriculum/cambridge-international/documents";
import { materialNode, unitNode } from "#corpus/curriculum/schema";

/** Cambridge IGCSE Chemistry 0620, topic 2 Atoms, elements and compounds. */
export const igcseAtomsUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-atoms-elements-compounds-atomic-structure",
      level: "lesson",
      materialKeys: ["lesson.chemistry.structure-matter"],
      order: 10,
      outcomes: [
        { code: "2.1 Elements, compounds and mixtures", ...chemistrySyllabus },
        {
          code: "2.2 Atomic structure and the Periodic Table",
          ...chemistrySyllabus,
        },
        { code: "2.3 Isotopes", ...chemistrySyllabus },
        { code: "8.1 Arrangement of elements", ...chemistrySyllabus },
      ],
    }),
    materialNode({
      key: "chemistry-0620-atoms-elements-compounds-bonding",
      level: "lesson",
      materialKeys: ["lesson.chemistry.chemical-bond"],
      order: 20,
      outcomes: [
        { code: "2.4 Ions and ionic bonds", ...chemistrySyllabus },
        {
          code: "2.5 Simple molecules and covalent bonds",
          ...chemistrySyllabus,
        },
        { code: "2.6 Giant covalent structures", ...chemistrySyllabus },
        { code: "2.7 Metallic bonding", ...chemistrySyllabus },
        { code: "9.1 Properties of metals", ...chemistrySyllabus },
      ],
    }),
  ],
  key: "chemistry-0620-atoms-elements-compounds",
  materialCard: {
    de: {
      description: "Baue Atome auf und erkläre, wie Teilchen sich binden.",
      title: "Atome, Elemente und Verbindungen",
    },
    en: {
      description: "Build atoms and explain how particles bond.",
      title: "Atoms, elements and compounds",
    },
    id: {
      description: "Susun atom dan jelaskan cara partikel berikatan.",
      title: "Atom, unsur, dan senyawa",
    },
    ms: {
      description: "Bina atom dan terangkan cara zarah berikatan.",
      title: "Atom, unsur dan sebatian",
    },
  },
  order: 20,
  translations: {
    de: {
      routeSlug: "atome-elemente-und-verbindungen",
      title: "Atome, Elemente und Verbindungen",
    },
    en: {
      routeSlug: "atoms-elements-and-compounds",
      title: "Atoms, elements and compounds",
    },
    id: {
      routeSlug: "atom-unsur-dan-senyawa",
      title: "Atom, unsur, dan senyawa",
    },
    ms: {
      routeSlug: "atom-unsur-dan-sebatian",
      title: "Atom, unsur dan sebatian",
    },
  },
});

/** Cambridge IGCSE Chemistry 0620, topic 3 Stoichiometry. */
export const igcseStoichiometryUnit = unitNode({
  children: [
    materialNode({
      key: "chemistry-0620-stoichiometry-formulae",
      level: "lesson",
      materialKeys: ["lesson.chemistry.basic-chemistry-laws"],
      order: 10,
      outcomes: [
        { code: "3.1 Formulae", ...chemistrySyllabus },
        { code: "6.1 Physical and chemical changes", ...chemistrySyllabus },
      ],
    }),
    materialNode({
      key: "chemistry-0620-stoichiometry-moles",
      level: "lesson",
      materialKeys: ["lesson.chemistry.mole-concept"],
      order: 20,
      outcomes: [
        {
          code: "3.2 Relative masses of atoms and molecules",
          ...chemistrySyllabus,
        },
        {
          code: "3.3 The mole and the Avogadro constant",
          ...chemistrySyllabus,
        },
      ],
    }),
  ],
  key: "chemistry-0620-stoichiometry",
  materialCard: {
    de: {
      description: "Stelle Formeln auf und rechne mit dem Mol.",
      title: "Stöchiometrie",
    },
    en: {
      description: "Write formulae and calculate with the mole.",
      title: "Stoichiometry",
    },
    id: {
      description: "Tulis rumus dan hitung dengan konsep mol.",
      title: "Stoikiometri",
    },
    ms: {
      description: "Tulis formula dan kira dengan konsep mol.",
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
});
