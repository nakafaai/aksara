import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "clever-hans",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "The 1904 commission concluded that Hans could really do arithmetic.",
        },
        {
          column: 1,
          label:
            "Hans could answer correctly when a stranger who knew the answer asked the question.",
        },
        {
          column: 2,
          label: "Von Osten signalled the answers to Hans on purpose.",
        },
        {
          column: 1,
          label:
            "Asked a sum whose answer was known only to someone out of his sight, Hans would most likely have failed.",
        },
        {
          column: 2,
          label:
            "Once Pfungst knew about the cue, he was able to stop himself from giving it.",
        },
      ],
    },
  },
};

export default item;
