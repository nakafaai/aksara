import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "golden-record",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Its discovery is unlikely, but it was still worth making.",
        },
        {
          correct: false,
          label: "It was a waste of effort, since no one will ever find it.",
        },
        {
          correct: false,
          label:
            "It will certainly be found and played by another civilisation.",
        },
        {
          correct: false,
          label:
            "Its music was badly chosen by a committee that was too small.",
        },
        {
          correct: false,
          label:
            "It matters mainly because it is made of valuable gold-plated copper.",
        },
      ],
    },
  },
};

export default item;
