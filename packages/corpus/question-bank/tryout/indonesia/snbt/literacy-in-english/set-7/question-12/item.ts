import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-3",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Priya wrote the warning in two sentences and tested it with a neighbour who had not attended the planning meeting. The choice resolves the whole conflict at once and makes any later review unnecessary.",
        },
        {
          correct: true,
          label:
            "Testing the two-sentence warning with someone who had not attended the planning meeting lets Priya verify clarity instead of assuming that the message works.",
        },
        {
          correct: false,
          label:
            "Priya wrote the warning in two sentences and tested it with a neighbour who had not attended the planning meeting. The action transfers responsibility for the unresolved task to another character.",
        },
        {
          correct: false,
          label:
            "Priya wrote the warning in two sentences and tested it with a neighbour who had not attended the planning meeting. The decision shows an immediate, complete transformation unrelated to the earlier uncertainty.",
        },
        {
          correct: false,
          label:
            "Priya wrote the warning in two sentences and tested it with a neighbour who had not attended the planning meeting. The setting alone produces the change, so the character's decision has no role in the development.",
        },
      ],
    },
  },
};

export default item;
