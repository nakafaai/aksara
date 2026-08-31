import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because the models held 39 washers on average, compared with 24 and 25, holding paper mass, bridge span, and weight placement constant isolates folding the bridge deck into a triangular truss as the only possible cause.",
        },
        {
          isCorrect: false,
          label:
            "The strongest follow-up would change both folding the bridge deck into a triangular truss and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that paper fibres and folds varied slightly between models affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          isCorrect: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of the triangular truss and the load held by the paper bridge.",
        },
        {
          isCorrect: true,
          label:
            "the models held 39 washers on average, compared with 24 and 25; this supports an association between the triangular truss and the load held by the paper bridge under the tested conditions, while paper fibres and folds varied slightly between models requires further testing before a broader claim.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
