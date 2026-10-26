import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The definition of *solute* proves that the tested change caused the recorded result, even without the comparison conditions.",
        },
        {
          correct: true,
          label:
            "The definition of *solute* identifies salt's role in the solution, while the temperature comparison and its limitations determine what the results support.",
        },
        {
          correct: false,
          label:
            "The definition makes *solute* a substitute for the controls, so the unmeasured factor no longer limits the conclusion.",
        },
        {
          correct: false,
          label:
            "The definition broadens *solute* from this short investigation to every similar system under any condition.",
        },
        {
          correct: false,
          label:
            "The term *solute* names the report's limitation rather than the concept represented by the measurements.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
