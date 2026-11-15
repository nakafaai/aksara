import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "school-start",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The district's buses run in three rounds, and extra buses would cost $$2.4$$ million dollars a year.",
        },
        {
          correct: false,
          label:
            "The district's high schools already start at 8:00, and many working parents could not manage a 9:30 start for primary schools.",
        },
        {
          correct: false,
          label:
            "The writer accepts the biology, and the writer would like the high schools to start later.",
        },
        {
          correct: false,
          label:
            "The other city's students wore wrist monitors, and fewer of them were late for the first lesson.",
        },
        {
          correct: true,
          label:
            "The district's high schools already start at 8:00, and the planned start of 8:30 is only half an hour later.",
        },
      ],
    },
  },
};

export default item;
