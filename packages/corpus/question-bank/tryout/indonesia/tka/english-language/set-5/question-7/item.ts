import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "cave-visit",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "entering the first chamber, receiving helmets, standing in darkness, visiting the museum",
        },
        {
          correct: false,
          label:
            "receiving helmets, visiting the museum, standing in darkness, writing a sentence",
        },
        {
          correct: false,
          label:
            "receiving helmets, standing in darkness, entering the first chamber, visiting the museum",
        },
        {
          correct: true,
          label:
            "receiving helmets, entering the first chamber, standing in darkness, visiting the museum",
        },
        {
          correct: false,
          label:
            "standing in darkness, receiving helmets, visiting the museum, writing a sentence",
        },
      ],
    },
  },
};

export default item;
