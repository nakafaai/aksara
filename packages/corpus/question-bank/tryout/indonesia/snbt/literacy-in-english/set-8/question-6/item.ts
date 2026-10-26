import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The organisers of a multilingual youth translation club evaluated a shared glossary with examples from each participant through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          correct: true,
          label:
            "The translation club compared a participant-built glossary across measured conditions, consulted its community, and supported only a limited extension because usage varies by region and family.",
        },
        {
          correct: false,
          label:
            "The organisers of a multilingual youth translation club evaluated a shared glossary with examples from each participant through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          correct: false,
          label:
            "The organisers of a multilingual youth translation club evaluated a shared glossary with examples from each participant through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          correct: false,
          label:
            "The organisers of a multilingual youth translation club evaluated a shared glossary with examples from each participant mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
