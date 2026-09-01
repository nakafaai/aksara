import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The organisers of a night-market waste station evaluated matching symbols on bins and stall permits through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          isCorrect: true,
          label:
            "The night market compared matching permit and bin symbols across measured conditions, consulted affected groups, and supported only a limited extension because each evening's visitors and food mix varied.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a night-market waste station evaluated matching symbols on bins and stall permits through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a night-market waste station evaluated matching symbols on bins and stall permits through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a night-market waste station evaluated matching symbols on bins and stall permits mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
