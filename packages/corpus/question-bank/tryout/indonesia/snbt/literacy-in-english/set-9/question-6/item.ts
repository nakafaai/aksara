import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The organisers of a night-market waste station evaluated matching symbols on bins and stall permits through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          correct: true,
          label:
            "The night market compared matching permit and bin symbols across measured conditions, consulted affected groups, and supported only a limited extension because each evening's visitors and food mix varied.",
        },
        {
          correct: false,
          label:
            "The organisers of a night-market waste station evaluated matching symbols on bins and stall permits through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          correct: false,
          label:
            "The organisers of a night-market waste station evaluated matching symbols on bins and stall permits through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          correct: false,
          label:
            "The organisers of a night-market waste station evaluated matching symbols on bins and stall permits mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
};

export default item;
