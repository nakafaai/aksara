import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Priya wrote the warning in two sentences and tested it with a neighbour who had not attended the planning meeting. The choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          isCorrect: true,
          label:
            "Testing the two-sentence warning with someone who had not attended the planning meeting lets Priya verify clarity instead of assuming that the message works.",
        },
        {
          isCorrect: false,
          label:
            "Priya wrote the warning in two sentences and tested it with a neighbour who had not attended the planning meeting. The action transfers responsibility for the unresolved task to another character.",
        },
        {
          isCorrect: false,
          label:
            "Priya wrote the warning in two sentences and tested it with a neighbour who had not attended the planning meeting. The decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "Priya wrote the warning in two sentences and tested it with a neighbour who had not attended the planning meeting. The setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
