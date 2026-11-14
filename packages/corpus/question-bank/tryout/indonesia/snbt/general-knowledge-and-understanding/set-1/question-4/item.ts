import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "mikoriza",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "tanaman, dan gula yang terus mengalir ke jamur yang masih ada",
        },
        {
          correct: false,
          label: "jamur, dan tanaman yang membatasi jumlah jamur di akarnya",
        },
        {
          correct: true,
          label:
            "jamur, dan gula yang terus mengalir ke jamur padahal fosfor kiriman jamur tidak lagi berarti",
        },
        {
          correct: false,
          label:
            "jamur, dan fosfor kiriman jamur yang tidak lagi berarti bagi tanaman",
        },
        {
          correct: false,
          label:
            "tanaman, dan gula kiriman tanaman yang tidak lagi berarti bagi jamur",
        },
      ],
    },
  },
};

export default item;
