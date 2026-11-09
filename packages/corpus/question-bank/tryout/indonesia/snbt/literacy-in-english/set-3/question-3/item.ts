import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "bird-compass",
  versions: {
    en: {
      columns: ["True", "False"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Birds kept where they cannot see the sky may still try to fly in the correct seasonal direction.",
        },
        {
          column: 2,
          label:
            "The 2012 study confirmed that iron-containing cells in the beak send magnetic signals to the brain.",
        },
        {
          column: 2,
          label:
            "Near the poles, magnetic field lines run almost parallel to the ground.",
        },
        {
          column: 1,
          label:
            "The passage suggests that birds may rely on more than one kind of cue to navigate.",
        },
      ],
    },
  },
};

export default item;
