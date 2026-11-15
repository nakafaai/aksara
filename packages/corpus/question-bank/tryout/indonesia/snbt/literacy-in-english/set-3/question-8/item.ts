import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "bag-charge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About $$200$$ tonnes, roughly three-eighths of the council's figure.",
        },
        {
          correct: false,
          label:
            "About $$120$$ tonnes, roughly three-eighths of the council's figure.",
        },
        {
          correct: false,
          label: "About $$320$$ tonnes, all of the council's figure.",
        },
        {
          correct: false,
          label: "About $$440$$ tonnes, more than the council's figure.",
        },
        {
          correct: true,
          label:
            "About $$200$$ tonnes, roughly five-eighths of the council's figure.",
        },
      ],
    },
  },
};

export default item;
