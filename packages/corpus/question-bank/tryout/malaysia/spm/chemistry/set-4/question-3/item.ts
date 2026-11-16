import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Boron-10 is $$20\\%$$ of the atoms, and the sample holds $$1.20 \\times 10^{22}$$ boron-10 atoms",
        },
        {
          correct: false,
          label:
            "Boron-10 is $$80\\%$$ of the atoms, and the sample holds $$4.82 \\times 10^{22}$$ boron-10 atoms",
        },
        {
          correct: false,
          label:
            "Boron-10 is $$20\\%$$ of the atoms, and the sample holds $$6.02 \\times 10^{22}$$ boron-10 atoms",
        },
        {
          correct: false,
          label:
            "Boron-10 is $$50\\%$$ of the atoms, and the sample holds $$3.01 \\times 10^{22}$$ boron-10 atoms",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Boron-10 ialah $$20\\%$$ daripada atom, dan sampel itu mengandungi $$1.20 \\times 10^{22}$$ atom boron-10",
        },
        {
          correct: false,
          label:
            "Boron-10 ialah $$80\\%$$ daripada atom, dan sampel itu mengandungi $$4.82 \\times 10^{22}$$ atom boron-10",
        },
        {
          correct: false,
          label:
            "Boron-10 ialah $$20\\%$$ daripada atom, dan sampel itu mengandungi $$6.02 \\times 10^{22}$$ atom boron-10",
        },
        {
          correct: false,
          label:
            "Boron-10 ialah $$50\\%$$ daripada atom, dan sampel itu mengandungi $$3.01 \\times 10^{22}$$ atom boron-10",
        },
      ],
    },
  },
};

export default item;
