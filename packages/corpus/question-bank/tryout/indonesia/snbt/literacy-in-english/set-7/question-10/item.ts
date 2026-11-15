import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "phone-ban",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Text B supports a ban but doubts that it explains the size of the rise Text A reports.",
        },
        {
          correct: false,
          label: "Text B says that bullying increased after the ban.",
        },
        {
          correct: true,
          label:
            "Text B's point about bullying is that a fall during school hours was expected once phones were gone.",
        },
        {
          correct: true,
          label:
            "Text B reports that the gains found in other studies were mostly among pupils who were already struggling.",
        },
        {
          correct: false,
          label: "Text A reports that the new maths textbook improved results.",
        },
      ],
    },
  },
};

export default item;
