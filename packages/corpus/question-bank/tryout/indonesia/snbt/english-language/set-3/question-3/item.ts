import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "the mean rose to 16, compared with 9 at baseline and 10 in the comparison condition; this supports an association between side-facing seed openings and root growth under the tested conditions, while the containers were small and the trial lasted only six days requires further testing before a broader claim.",
        },
        {
          isCorrect: false,
          label:
            "Because the mean rose to 16, compared with 9 at baseline and 10 in the comparison condition, holding seed type, moisture, container size, and observation time constant isolates placing the seed opening toward the side of a clear container as the only possible cause.",
        },
        {
          isCorrect: false,
          label:
            "The strongest follow-up would change both placing the seed opening toward the side of a clear container and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that the containers were small and the trial lasted only six days affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          isCorrect: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of side-facing seed openings and root growth.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
