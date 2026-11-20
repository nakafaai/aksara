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
        {
          correct: false,
          label:
            "$$41.5°$$, the violet light also leaves the glass, and $$82°$$",
        },
        {
          correct: false,
          label: "$$40.8°$$, the red light is totally reflected, and $$84°$$",
        },
        {
          correct: false,
          label:
            "$$41.5°$$, the violet light is totally reflected, and $$26°$$",
        },
        {
          correct: true,
          label:
            "$$41.5°$$, the violet light is totally reflected, and $$82°$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$41.5°$$, cahaya ungu juga keluar dari kaca, dan $$82°$$",
        },
        {
          correct: false,
          label: "$$40.8°$$, cahaya merah dipantulkan sepenuhnya, dan $$84°$$",
        },
        {
          correct: false,
          label: "$$41.5°$$, cahaya ungu dipantulkan sepenuhnya, dan $$26°$$",
        },
        {
          correct: true,
          label: "$$41.5°$$, cahaya ungu dipantulkan sepenuhnya, dan $$82°$$",
        },
      ],
    },
  },
};

export default item;
