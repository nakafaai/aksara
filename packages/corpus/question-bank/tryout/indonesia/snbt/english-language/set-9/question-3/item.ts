import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Because fragment collection reached 71%, compared with 38% and 40%, holding water volume, fragment size, flow rate, and collection time constant isolates adding a removable mesh with smaller openings as the only possible cause.",
        },
        {
          isCorrect: false,
          label:
            "The strongest follow-up would change both adding a removable mesh with smaller openings and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          isCorrect: false,
          label:
            "The limitation that the model used clean fragments of only one material affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          isCorrect: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of the smaller mesh and fragment collection.",
        },
        {
          isCorrect: true,
          label:
            "Fragment collection reached 71%, compared with 38% and 40%. This supports an association in the model, but mixed debris must be tested before claiming the same selectivity in environmental conditions.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
