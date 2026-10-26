import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The boat is designed mainly to provide permanent internet access.",
        },
        {
          correct: false,
          label:
            "The service follows one standard docking arrangement in each village throughout the year.",
        },
        {
          correct: false,
          label:
            "The crew prioritizes outdoor storage so returned books do not narrow the cabin aisle.",
        },
        {
          correct: false,
          label: "A library building was copied without any changes.",
        },
        {
          correct: true,
          label:
            "The boat adapts library services to river conditions and different users.",
        },
      ],
    },
  },
  stimulus: "library-boat",
};

export default item;
