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
        { correct: true, label: "Relative atomic mass 10.8, and 1.08 g of boron holds $$1.20 \\\\times 10^{22}$$ atoms of boron-10" },
        { correct: false, label: "Relative atomic mass 10.8, and 1.08 g of boron holds $$4.82 \\\\times 10^{22}$$ atoms of boron-10" },
        { correct: false, label: "Relative atomic mass 10.5, and 1.08 g of boron holds $$1.20 \\\\times 10^{22}$$ atoms of boron-10" },
        { correct: false, label: "Relative atomic mass 10.8, and 1.08 g of boron holds $$6.02 \\\\times 10^{22}$$ atoms of boron-10" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "Jisim atom relatif 10.8, dan 1.08 g boron mengandungi $$1.20 \\\\times 10^{22}$$ atom boron-10" },
        { correct: false, label: "Jisim atom relatif 10.8, dan 1.08 g boron mengandungi $$4.82 \\\\times 10^{22}$$ atom boron-10" },
        { correct: false, label: "Jisim atom relatif 10.5, dan 1.08 g boron mengandungi $$1.20 \\\\times 10^{22}$$ atom boron-10" },
        { correct: false, label: "Jisim atom relatif 10.8, dan 1.08 g boron mengandungi $$6.02 \\\\times 10^{22}$$ atom boron-10" },
      ],
    },
  },
};

export default item;
