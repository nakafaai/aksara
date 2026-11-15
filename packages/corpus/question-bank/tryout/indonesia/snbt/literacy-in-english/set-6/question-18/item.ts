import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "piano-lessons",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Mrs Varga's praise in the spring shows that the narrator's playing had improved.",
        },
        {
          column: 1,
          label:
            "Mrs Varga's move to the end of the keyboard let her watch the narrator's hands.",
        },
        {
          column: 1,
          label:
            "The narrator's annoyance at the spring praise came from feeling that she had not earned it.",
        },
        {
          column: 2,
          label:
            "Mrs Varga moved her chair so that she could hear the piano better.",
        },
        {
          column: 1,
          label:
            "Mr Hollis's first lesson suggests that the wrong note in bar twelve had survived the spring.",
        },
      ],
    },
  },
};

export default item;
