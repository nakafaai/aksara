import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$253\\text{ dm}^3$$, because its strong carbon to fluorine bonds make it unreactive and its surface non-sticky",
        },
        {
          correct: false,
          label:
            "$$240\\text{ dm}^3$$, because its strong carbon to fluorine bonds make it unreactive and its surface non-sticky",
        },
        {
          correct: false,
          label:
            "$$228\\text{ dm}^3$$, because its strong carbon to fluorine bonds make it unreactive and its surface non-sticky",
        },
        {
          correct: false,
          label:
            "$$253\\text{ dm}^3$$, because it is a condensation polymer that loses hydrogen fluoride as it forms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$253\\text{ dm}^3$$, kerana ikatan karbon kepada fluorin yang kuat menjadikannya tidak reaktif dan permukaannya tidak melekat",
        },
        {
          correct: false,
          label:
            "$$240\\text{ dm}^3$$, kerana ikatan karbon kepada fluorin yang kuat menjadikannya tidak reaktif dan permukaannya tidak melekat",
        },
        {
          correct: false,
          label:
            "$$228\\text{ dm}^3$$, kerana ikatan karbon kepada fluorin yang kuat menjadikannya tidak reaktif dan permukaannya tidak melekat",
        },
        {
          correct: false,
          label:
            "$$253\\text{ dm}^3$$, kerana ia polimer kondensasi yang kehilangan hidrogen fluorida semasa terbentuk",
        },
      ],
    },
  },
};

export default item;
