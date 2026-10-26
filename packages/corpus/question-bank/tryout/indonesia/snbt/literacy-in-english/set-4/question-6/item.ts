import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The organisers of a local history display evaluated revised captions that separated observation from interpretation through consultation alone, without comparing the measured outcome across conditions.",
        },
        {
          correct: true,
          label:
            "The organisers of a local history display evaluated revised captions that separated observation from interpretation through a comparison and consultation with affected groups.",
        },
        {
          correct: false,
          label:
            "The organisers of a local history display evaluated revised captions that separated observation from interpretation through the measured comparison alone, while excluding the affected groups' experience from the decision.",
        },
        {
          correct: false,
          label:
            "The organisers of a local history display evaluated revised captions that separated observation from interpretation through a comparison and consultation, then treated the short trial as sufficient for permanent adoption.",
        },
        {
          correct: false,
          label:
            "The organisers of a local history display evaluated revised captions that separated observation from interpretation mainly by defining a technical term, with the proposed change serving only as background information.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
