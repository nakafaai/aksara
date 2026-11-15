import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6$$ double bonds, and the mass increases by $$0.06\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$6$$ double bonds, and the mass increases by $$0.12\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$12$$ double bonds, and the mass increases by $$0.12\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$3$$ double bonds, and the mass increases by $$0.06\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$6$$ ikatan ganda dua, dan jisim bertambah $$0.06\\text{ g}$$",
        },
        {
          correct: true,
          label:
            "$$6$$ ikatan ganda dua, dan jisim bertambah $$0.12\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$12$$ ikatan ganda dua, dan jisim bertambah $$0.12\\text{ g}$$",
        },
        {
          correct: false,
          label:
            "$$3$$ ikatan ganda dua, dan jisim bertambah $$0.06\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
