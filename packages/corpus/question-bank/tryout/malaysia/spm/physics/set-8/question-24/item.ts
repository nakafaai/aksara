import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "the lid, $$6.0\\text{ m}$$ and $$12\\text{ kN}$$",
        },
        {
          correct: false,
          label: "the base, $$6.5\\text{ m}$$ and $$13\\text{ kN}$$",
        },
        {
          correct: false,
          label: "the base, $$5.5\\text{ m}$$ and $$13\\text{ kN}$$",
        },
        {
          correct: true,
          label: "the base, $$5.5\\text{ m}$$ and $$11\\text{ kN}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "penutup, $$6.0\\text{ m}$$ dan $$12\\text{ kN}$$",
        },
        {
          correct: false,
          label: "dasar, $$6.5\\text{ m}$$ dan $$13\\text{ kN}$$",
        },
        {
          correct: false,
          label: "dasar, $$5.5\\text{ m}$$ dan $$13\\text{ kN}$$",
        },
        {
          correct: true,
          label: "dasar, $$5.5\\text{ m}$$ dan $$11\\text{ kN}$$",
        },
      ],
    },
  },
};

export default item;
