import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "museum-visits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Families came more and stayed longer, but the holiday may explain part of it.",
        },
        {
          correct: false,
          label:
            "The new gallery doubled the number of families visiting the museum.",
        },
        {
          correct: false,
          label:
            "Adults without children stopped visiting because of the new gallery.",
        },
        {
          correct: false,
          label:
            "School groups disliked the new gallery, since their visits became a little shorter.",
        },
        {
          correct: false,
          label: "The museum will keep growing by 12 percent every six months.",
        },
      ],
    },
  },
};

export default item;
