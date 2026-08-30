import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Every result in a neighbourhood flood-warning exercise must apply without limitation elsewhere.",
        },
        {
          isCorrect: false,
          label:
            "The limitation makes all information about a neighbourhood flood-warning exercise useless.",
        },
        {
          isCorrect: false,
          label:
            "One detail about actionable information proves every possible causal relationship.",
        },
        {
          isCorrect: true,
          label:
            "A follow-up decision should combine measured results, affected people's experience, and the trial's limitation.",
        },
        {
          isCorrect: false,
          label:
            "The passage recommends ignoring evidence that conflicts with an early expectation.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
