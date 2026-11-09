import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "synthesis",
  },
  stimulus: "volcano-hike",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The darkness on the way up kept the writer from seeing how steep the trail was.",
        },
        {
          correct: true,
          label:
            "The group reached the summit about three and a quarter hours after starting.",
        },
        {
          correct: false,
          label: "Fajar slipped in the pine forest and lost his headlamp.",
        },
        {
          correct: false,
          label: "The group stayed at the summit until the clouds rolled in.",
        },
      ],
    },
  },
};

export default item;
