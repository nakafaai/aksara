import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Activities $$1:16$$, nuclei $$1:16$$",
        },
        {
          correct: false,
          label: "Activities $$1:16$$, nuclei $$1:3$$",
        },
        {
          correct: false,
          label: "Activities $$16:1$$, nuclei $$48:1$$",
        },
        {
          correct: true,
          label: "Activities $$1:16$$, nuclei $$1:48$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Keaktifan $$1:16$$, nukleus $$1:16$$",
        },
        {
          correct: false,
          label: "Keaktifan $$1:16$$, nukleus $$1:3$$",
        },
        {
          correct: false,
          label: "Keaktifan $$16:1$$, nukleus $$48:1$$",
        },
        {
          correct: true,
          label: "Keaktifan $$1:16$$, nukleus $$1:48$$",
        },
      ],
    },
  },
};

export default item;
