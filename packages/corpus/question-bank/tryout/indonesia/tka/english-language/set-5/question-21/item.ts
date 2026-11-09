import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "library-hours",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "to describe the books and equipment in the school library",
        },
        {
          correct: false,
          label: "to report how the library club carried out its survey",
        },
        {
          correct: false,
          label: "to argue that the library should also open on weekends",
        },
        {
          correct: false,
          label: "to complain that the librarian works too few hours",
        },
        {
          correct: true,
          label:
            "to persuade the school to keep the library open until five in the afternoon",
        },
      ],
    },
  },
};

export default item;
