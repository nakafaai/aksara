import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It rises by $$0.50\\text{ mm}$$, and the boat rises $$0.50\\text{ cm}$$",
        },
        {
          correct: false,
          label:
            "It falls by $$1.5\\text{ mm}$$, and the boat rises $$1.5\\text{ cm}$$",
        },
        {
          correct: true,
          label:
            "It falls by $$1.0\\text{ mm}$$, and the boat rises $$1.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "It stays the same, and the boat rises $$1.5\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia naik $$0.50\\text{ mm}$$, dan bot naik $$0.50\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Ia turun $$1.5\\text{ mm}$$, dan bot naik $$1.5\\text{ cm}$$",
        },
        {
          correct: true,
          label: "Ia turun $$1.0\\text{ mm}$$, dan bot naik $$1.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "Ia tidak berubah, dan bot naik $$1.5\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
