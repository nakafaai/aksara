import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "II $$300\\text{ cm}^3$$, slower. III $$960\\text{ cm}^3$$, faster",
        },
        {
          correct: true,
          label:
            "II $$600\\text{ cm}^3$$, slower. III $$960\\text{ cm}^3$$, faster",
        },
        {
          correct: false,
          label:
            "II $$600\\text{ cm}^3$$, slower. III $$1200\\text{ cm}^3$$, faster",
        },
        {
          correct: false,
          label:
            "II $$600\\text{ cm}^3$$, as fast. III $$960\\text{ cm}^3$$, faster",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "II $$300\\text{ cm}^3$$, lebih perlahan. III $$960\\text{ cm}^3$$, lebih cepat",
        },
        {
          correct: true,
          label:
            "II $$600\\text{ cm}^3$$, lebih perlahan. III $$960\\text{ cm}^3$$, lebih cepat",
        },
        {
          correct: false,
          label:
            "II $$600\\text{ cm}^3$$, lebih perlahan. III $$1200\\text{ cm}^3$$, lebih cepat",
        },
        {
          correct: false,
          label:
            "II $$600\\text{ cm}^3$$, sama cepat. III $$960\\text{ cm}^3$$, lebih cepat",
        },
      ],
    },
  },
};

export default item;
