import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Propane, and the $$50\\text{ cm}^3$$ left is unused oxygen",
        },
        {
          correct: false,
          label: "Propene, and the $$50\\text{ cm}^3$$ left is unused oxygen",
        },
        {
          correct: false,
          label: "Propane, and the $$50\\text{ cm}^3$$ left is water vapour",
        },
        {
          correct: false,
          label: "Butane, and the $$50\\text{ cm}^3$$ left is unused oxygen",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Propana, dan $$50\\text{ cm}^3$$ yang tinggal ialah oksigen yang tidak digunakan",
        },
        {
          correct: false,
          label:
            "Propena, dan $$50\\text{ cm}^3$$ yang tinggal ialah oksigen yang tidak digunakan",
        },
        {
          correct: false,
          label: "Propana, dan $$50\\text{ cm}^3$$ yang tinggal ialah wap air",
        },
        {
          correct: false,
          label:
            "Butana, dan $$50\\text{ cm}^3$$ yang tinggal ialah oksigen yang tidak digunakan",
        },
      ],
    },
  },
};

export default item;
