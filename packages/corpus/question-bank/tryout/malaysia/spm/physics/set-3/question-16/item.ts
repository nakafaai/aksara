import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$354\\text{ m s}^{-1}$$, about $$2.1$$ claps per second, and each echo arrives $$17\\text{ ms}$$ before the next clap",
        },
        {
          correct: false,
          label:
            "$$340\\text{ m s}^{-1}$$, $$2.5$$ claps per second, and each echo arrives $$17\\text{ ms}$$ after the next clap",
        },
        {
          correct: true,
          label:
            "$$340\\text{ m s}^{-1}$$, $$2.0$$ claps per second, and each echo arrives $$17\\text{ ms}$$ before the next clap",
        },
        {
          correct: false,
          label:
            "$$340\\text{ m s}^{-1}$$, $$2.0$$ claps per second, and each echo arrives $$17\\text{ ms}$$ after the next clap",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$354\\text{ m s}^{-1}$$, kira-kira $$2.1$$ tepukan sesaat, dan setiap gema tiba $$17\\text{ ms}$$ sebelum tepukan berikutnya",
        },
        {
          correct: false,
          label:
            "$$340\\text{ m s}^{-1}$$, $$2.5$$ tepukan sesaat, dan setiap gema tiba $$17\\text{ ms}$$ selepas tepukan berikutnya",
        },
        {
          correct: true,
          label:
            "$$340\\text{ m s}^{-1}$$, $$2.0$$ tepukan sesaat, dan setiap gema tiba $$17\\text{ ms}$$ sebelum tepukan berikutnya",
        },
        {
          correct: false,
          label:
            "$$340\\text{ m s}^{-1}$$, $$2.0$$ tepukan sesaat, dan setiap gema tiba $$17\\text{ ms}$$ selepas tepukan berikutnya",
        },
      ],
    },
  },
};

export default item;
