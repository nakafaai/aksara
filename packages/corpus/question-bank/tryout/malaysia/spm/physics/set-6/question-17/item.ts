import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$50\\text{ cm}$$, and $$2$$ times as tall" },
        {
          correct: false,
          label: "$$25\\text{ cm}$$, and $$0.25$$ times as tall",
        },
        { correct: false, label: "$$17\\text{ cm}$$, and $$6$$ times as tall" },
        { correct: true, label: "$$25\\text{ cm}$$, and $$4$$ times as tall" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$50\\text{ cm}$$, dan $$2$$ kali tingginya",
        },
        {
          correct: false,
          label: "$$25\\text{ cm}$$, dan $$0.25$$ kali tingginya",
        },
        {
          correct: false,
          label: "$$17\\text{ cm}$$, dan $$6$$ kali tingginya",
        },
        { correct: true, label: "$$25\\text{ cm}$$, dan $$4$$ kali tingginya" },
      ],
    },
  },
};

export default item;
