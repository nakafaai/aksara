import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because new leaf area reached 19 cm², compared with 12 and 13, holding plant variety, water, light duration, and lamp distance constant isolates using a blue light filter as the only possible cause.",
        },
        {
          isCorrect: false,
          label:
            "The strongest follow-up would change both using a blue light filter and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that the filter also reduced total light intensity affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          isCorrect: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of the blue filter and new leaf area.",
        },
        {
          isCorrect: true,
          label:
            "New leaf area reached 19 cm², compared with 12 and 13. This supports an association under the tested conditions, but the filter's lower light intensity must be separated from colour in a stronger follow-up.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
