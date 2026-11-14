import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "fact-opinion",
  },
  stimulus: "tea-terrace",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The café's terrace faces east, toward a valley.",
        },
        {
          correct: true,
          label:
            "There is no better place to drink a cup of tea than that terrace on a clear morning.",
        },
        {
          correct: false,
          label: "Inside, fresh leaves are spread out on wire racks.",
        },
        {
          correct: false,
          label: "Each terrace is held up by a low wall of stacked stones.",
        },
        {
          correct: false,
          label:
            "The estate covers the lower slopes of a mountain about 1,400 meters above sea level.",
        },
      ],
    },
  },
};

export default item;
