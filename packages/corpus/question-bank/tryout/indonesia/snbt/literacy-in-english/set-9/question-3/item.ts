import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because fragment collection reached $$71\\%$$, compared with $$38\\%$$ and $$40\\%$$, holding water volume, fragment size, flow rate, and collection time constant isolates adding a removable mesh with smaller openings as the only possible cause.",
        },
        {
          correct: false,
          label:
            "The strongest follow-up would change both adding a removable mesh with smaller openings and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          correct: false,
          label:
            "The limitation that the model used clean fragments of only one material affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          correct: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of the smaller mesh and fragment collection.",
        },
        {
          correct: true,
          label:
            "Fragment collection reached $$71\\%$$, compared with $$38\\%$$ and $$40\\%$$. This supports an association in the model, but mixed debris must be tested before making claims about selectivity in environmental conditions.",
        },
      ],
    },
  },
};

export default item;
