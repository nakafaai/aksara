import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "library-hours",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Evening hours drew some recent non-users, but the data cannot show how many visits merely moved.",
        },
        {
          correct: false,
          label:
            "All 130 evening visitors were people who had never used the library before.",
        },
        {
          correct: false,
          label:
            "The pilot reduced the total number of weekday visits to the library.",
        },
        {
          correct: false,
          label:
            "Daytime visits fell because of the evening hours, exactly as the head librarian argued.",
        },
        {
          correct: false,
          label:
            "The council paid the full 9,000 dollars for the pilot from its budget.",
        },
      ],
    },
  },
};

export default item;
