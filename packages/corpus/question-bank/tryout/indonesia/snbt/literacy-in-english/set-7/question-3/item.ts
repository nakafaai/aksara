import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "mozart-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Little or no benefit, because any effect fades within about fifteen minutes and depends on how alert and cheerful pupils feel when they take the test.",
        },
        {
          correct: false,
          label:
            "A small benefit, because a review that pooled dozens of studies found that the average effect is small but real.",
        },
        {
          correct: false,
          label:
            "A benefit for pupils who enjoy the music, because the effect comes from mood rather than from Mozart.",
        },
        {
          correct: false,
          label:
            "Little or no benefit, because the effect appears only when the music is by Mozart and the pupils hear it too early.",
        },
        {
          correct: false,
          label:
            "Little or no benefit, because the 1993 study tested only thirty-six students.",
        },
      ],
    },
  },
};

export default item;
