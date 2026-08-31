import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because measured voltage reached 2.9 V, compared with 1.4 V and 1.5 V, holding cell type, wire length, meter, and connection time constant isolates connecting two cells in series as the only possible cause.",
        },
        {
          isCorrect: false,
          label:
            "The strongest follow-up would change both connecting two cells in series and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          isCorrect: true,
          label:
            "measured voltage reached 2.9 V, compared with 1.4 V and 1.5 V; this supports an association between the series connection and measured voltage under the tested conditions, while cell age and internal resistance were not measured separately requires further testing before a broader claim.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that cell age and internal resistance were not measured separately affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          isCorrect: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of the series connection and measured voltage.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
