import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "carnegie-libraries",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It caused most Carnegie libraries to close within a few years.",
        },
        {
          correct: false,
          label:
            "It was dropped soon after the first libraries had been built.",
        },
        {
          correct: true,
          label:
            "It may have helped the buildings last by building a habit of care.",
        },
        {
          correct: false,
          label:
            "It proved that towns valued free gifts more than paid services.",
        },
        {
          correct: false,
          label:
            "It was probably the reason the buildings became museums and offices.",
        },
      ],
    },
  },
};

export default item;
