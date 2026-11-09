import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  stimulus: "train-station",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "to explain how a steam locomotive works" },
        {
          correct: false,
          label: "to persuade the town to reopen the station for passengers",
        },
        {
          correct: true,
          label:
            "to describe an old railway station that is now a heritage museum",
        },
        {
          correct: false,
          label: "to tell the story of the last passenger train",
        },
        {
          correct: false,
          label: "to compare the old station with the new one",
        },
      ],
    },
  },
};

export default item;
