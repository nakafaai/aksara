import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  stimulus: "estuary",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Nadia was too strict, because the birds that came after the squall were real birds that deserved to be counted.",
        },
        {
          correct: false,
          label:
            "Ilham clicked too fast after the squall, so his figures for that hour could not be trusted.",
        },
        {
          correct: true,
          label:
            "The writer's view of the third hour changes once she understands why the totals must be comparable.",
        },
        {
          correct: false,
          label:
            "The club should have stayed out in the squall so that the third hour would remain complete.",
        },
        {
          correct: true,
          label:
            "A total that follows the same rules every year is more useful to the survey than a larger one that does not.",
        },
      ],
    },
  },
};

export default item;
