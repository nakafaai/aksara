import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "piano-lessons",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Her wish to stay until Mrs Varga found something wrong shows that she valued the criticism as a sign that Mrs Varga was listening.",
        },
        {
          column: 2,
          label:
            "She believed that the praise she received in the spring was deserved.",
        },
        {
          column: 1,
          label:
            "Looking back, she presents the spring changes as clues that she failed to connect at the time.",
        },
        {
          column: 2,
          label:
            "She wanted to stay with Mrs Varga because Mr Hollis had a reputation as a harsh teacher.",
        },
        {
          column: 2,
          label:
            "She learned from Mrs Varga herself why the lessons had changed.",
        },
      ],
    },
  },
};

export default item;
