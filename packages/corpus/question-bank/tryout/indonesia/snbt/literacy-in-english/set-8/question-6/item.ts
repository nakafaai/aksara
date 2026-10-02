import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The organisers of a multilingual youth translation club evaluated a shared glossary with examples from each participant through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          isCorrect: true,
          label:
            "The translation club compared a participant-built glossary across measured conditions, consulted its community, and supported only a limited extension because usage varies by region and family.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a multilingual youth translation club evaluated a shared glossary with examples from each participant through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a multilingual youth translation club evaluated a shared glossary with examples from each participant through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          isCorrect: false,
          label:
            "The organisers of a multilingual youth translation club evaluated a shared glossary with examples from each participant mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
