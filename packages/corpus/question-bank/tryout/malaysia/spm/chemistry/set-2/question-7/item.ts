import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "chemical-bonds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Magnesium oxide is held by covalent bonds, which are stronger than ionic bonds" },
        { correct: true, label: "The oxide ion carries a charge of $$-2$$ and is smaller than the chloride ion, so it attracts the magnesium ion more strongly" },
        { correct: false, label: "Magnesium chloride has fewer ions in each formula unit, so it has fewer bonds to break" },
        { correct: false, label: "The magnesium ion in magnesium oxide has a larger charge than the one in magnesium chloride" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Magnesium oksida diikat oleh ikatan kovalen yang lebih kuat daripada ikatan ion" },
        { correct: true, label: "Ion oksida membawa cas $$-2$$ dan lebih kecil daripada ion klorida, jadi ia menarik ion magnesium dengan lebih kuat" },
        { correct: false, label: "Magnesium klorida mempunyai lebih sedikit ion dalam setiap unit formula, jadi lebih sedikit ikatan perlu dipecahkan" },
        { correct: false, label: "Ion magnesium dalam magnesium oksida mempunyai cas yang lebih besar daripada ion magnesium dalam magnesium klorida" },
      ],
    },
  },
};

export default item;
