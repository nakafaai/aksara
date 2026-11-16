import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.56\\text{ m}$$ ahead of her",
        },
        {
          correct: false,
          label: "Back in her hand",
        },
        {
          correct: false,
          label: "$$2.56\\text{ m}$$ behind her",
        },
        {
          correct: false,
          label: "$$5.12\\text{ m}$$ ahead of her",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2.56\\text{ m}$$ di hadapannya",
        },
        {
          correct: false,
          label: "Kembali ke tangannya",
        },
        {
          correct: false,
          label: "$$2.56\\text{ m}$$ di belakangnya",
        },
        {
          correct: false,
          label: "$$5.12\\text{ m}$$ di hadapannya",
        },
      ],
    },
  },
};

export default item;
