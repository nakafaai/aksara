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
        {
          correct: false,
          label: "It has $$6$$ bonding pairs and $$10$$ lone pairs",
        },
        {
          correct: false,
          label: "It has $$7$$ bonding pairs and $$10$$ lone pairs",
        },
        {
          correct: true,
          label:
            "It has $$7$$ bonding pairs and $$9$$ lone pairs, and both electrons of the N–B bond come from nitrogen",
        },
        {
          correct: false,
          label:
            "It has $$7$$ bonding pairs and $$9$$ lone pairs, and both electrons of the N–B bond come from boron",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia mempunyai $$6$$ pasangan elektron ikatan dan $$10$$ pasangan elektron bebas",
        },
        {
          correct: false,
          label:
            "Ia mempunyai $$7$$ pasangan elektron ikatan dan $$10$$ pasangan elektron bebas",
        },
        {
          correct: true,
          label:
            "Ia mempunyai $$7$$ pasangan elektron ikatan dan $$9$$ pasangan elektron bebas, dan kedua-dua elektron ikatan N–B datang daripada nitrogen",
        },
        {
          correct: false,
          label:
            "Ia mempunyai $$7$$ pasangan elektron ikatan dan $$9$$ pasangan elektron bebas, dan kedua-dua elektron ikatan N–B datang daripada boron",
        },
      ],
    },
  },
};

export default item;
