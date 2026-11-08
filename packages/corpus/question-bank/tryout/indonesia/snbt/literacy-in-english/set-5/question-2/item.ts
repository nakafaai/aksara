import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "placebo-effect",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The sugar pills in his studies secretly contained small doses of real medicine.",
        },
        {
          correct: false,
          label:
            "Patients exaggerated their symptoms in order to be given stronger drugs.",
        },
        {
          correct: false,
          label:
            "Most of the illnesses he studied could not be cured by any medicine.",
        },
        {
          correct: true,
          label:
            "Many of the patients would have improved even without any treatment.",
        },
        {
          correct: false,
          label:
            "The 2001 review may have included far more patients than he did.",
        },
      ],
    },
  },
};

export default item;
