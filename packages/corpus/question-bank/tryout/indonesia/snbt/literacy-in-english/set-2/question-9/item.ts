import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "speed-cameras",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The camera sites were picked after an unusually bad run, so they would be expected to fall more than the city's roads even without cameras, and part of the gap is not the cameras' doing.",
        },
        {
          correct: false,
          label:
            "Crash counts at single sites rise and fall by chance, so the city-wide figure is the less reliable of the two and should be left out of the comparison.",
        },
        {
          correct: false,
          label:
            "Crashes moved from the camera sites to nearby streets, so the city-wide fall should have been larger than $$8\\%$$ and the gap is too small.",
        },
        {
          correct: false,
          label:
            "Text A compares an average number of crashes per site with a percentage for the whole city, and the two kinds of figure cannot be subtracted.",
        },
        {
          correct: false,
          label:
            "The cameras went in during 2019, so the city-wide fall reflects later events, which Text B says should be left out of any comparison.",
        },
      ],
    },
  },
};

export default item;
