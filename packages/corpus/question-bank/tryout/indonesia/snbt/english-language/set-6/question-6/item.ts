import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The organisers of a community repair café evaluated a card listing the tools needed for each repair through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a community repair café evaluated a card listing the tools needed for each repair through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a community repair café evaluated a card listing the tools needed for each repair through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a community repair café evaluated a card listing the tools needed for each repair mainly by defining a technical term, with the proposed change serving only as background information.",
        },
        {
          isCorrect: true,
          label:
            "The repair café compared tool-list cards across measured conditions, consulted the people involved, and supported only a limited extension because repair difficulty varied by object.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
