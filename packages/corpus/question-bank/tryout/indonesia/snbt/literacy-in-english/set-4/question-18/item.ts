import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "inference",
  },
  stimulus: "spare-key",
  versions: {
    en: {
      columns: ["Yes", "No"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Gran found the key as soon as she started looking for it.",
        },
        {
          column: 1,
          label:
            "The narrator chose the hiding place without telling Gran where it was.",
        },
        {
          column: 1,
          label:
            "Gran learned from the narrator, during the phone call, that the key was in a flowerpot at the back.",
        },
        {
          column: 2,
          label:
            "The narrator was still angry with Gran when the drive home ended.",
        },
        {
          column: 2,
          label:
            "Gran and the narrator talk about Gran's memory after the key is moved.",
        },
      ],
    },
  },
};

export default item;
