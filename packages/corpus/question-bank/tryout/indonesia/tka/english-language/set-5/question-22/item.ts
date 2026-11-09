import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "library-hours",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "64 of the 200 students who answered share a room with younger siblings or live next to a busy road.",
        },
        {
          correct: false,
          label:
            "The library receives an average of 58 visits per day between 12.00 and 14.00.",
        },
        {
          correct: false,
          label: "The library already has tables, fans, and Wi-Fi.",
        },
        {
          correct: false,
          label: "Members of the library club have offered to help on a rota.",
        },
        {
          correct: false,
          label: "The library closes at two o'clock, right when lessons end.",
        },
      ],
    },
  },
};

export default item;
