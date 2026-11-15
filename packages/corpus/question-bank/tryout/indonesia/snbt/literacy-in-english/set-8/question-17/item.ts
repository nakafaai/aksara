import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "night-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "That he kept a fixed distance on purpose, as if he were hunting her, which fits her fear on the lane.",
        },
        {
          correct: true,
          label:
            "That he kept a fixed distance on purpose, as if following an instruction, which fits the task her mother had given him.",
        },
        {
          correct: false,
          label:
            "That he kept a fixed distance on purpose, as if following an instruction, because he was afraid of the narrator.",
        },
        {
          correct: false,
          label:
            "That he kept a fixed distance because his work as a hospital porter had trained him to follow patients.",
        },
        {
          correct: false,
          label:
            "That he kept a fixed distance on purpose, as if following an instruction, because her mother had told him to stay out of sight.",
        },
      ],
    },
  },
};

export default item;
