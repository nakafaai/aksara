import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "open-offices",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The companies later put partitions back on the open floors because employees complained about the lack of privacy.",
        },
        {
          correct: false,
          label:
            "Employees missed their old cubicles so much that they asked for private offices to be built for them again.",
        },
        {
          correct: true,
          label:
            "Employees find other ways to keep the privacy the partitions once gave them, and those ways cut down their talk in person.",
        },
        {
          correct: false,
          label:
            "The real barriers to conversation were always people's habits, so removing the partitions made no difference to talk.",
        },
        {
          correct: false,
          label:
            "The badges missed many conversations because headphones and screens hid talk that was still going on between colleagues.",
        },
      ],
    },
  },
};

export default item;
