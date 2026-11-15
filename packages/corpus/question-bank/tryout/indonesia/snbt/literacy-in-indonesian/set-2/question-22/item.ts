import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Empat bibit sawit yang keturunannya disebut menjadi benih perkebunan, dan laboratorium yang mempelajari jenis-jenis tanpa nilai dagang.",
        },
        {
          correct: false,
          label:
            "Empat bibit sawit yang keturunannya disebut menjadi benih perkebunan, dan letak kebun di samping istana gubernur jenderal.",
        },
        {
          correct: false,
          label:
            "Herbarium berisi spesimen tumbuhan yang dikeringkan, dan laboratorium yang mempelajari jenis-jenis tanpa nilai dagang.",
        },
        {
          correct: false,
          label:
            "Aklimatisasi tumbuhan dari negeri lain, dan konservasi tumbuhan yang terancam di hutan.",
        },
        {
          correct: false,
          label:
            "Empat bibit sawit yang keturunannya disebut menjadi benih perkebunan, dan pendiri kebun yang lahir di Jerman.",
        },
      ],
    },
  },
};

export default item;
