import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "ridge-turnaround",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "About $$1$$ hour $$55$$ minutes after the cloud reached the ridge",
        },
        {
          correct: false,
          label: "About $$25$$ minutes before the cloud reached the ridge",
        },
        {
          correct: false,
          label: "About $$15$$ minutes before the cloud reached the ridge",
        },
        {
          correct: false,
          label: "About $$25$$ minutes after the cloud reached the ridge",
        },
        {
          correct: false,
          label:
            "About $$2$$ hours $$5$$ minutes after the cloud reached the ridge",
        },
      ],
    },
  },
};

export default item;
