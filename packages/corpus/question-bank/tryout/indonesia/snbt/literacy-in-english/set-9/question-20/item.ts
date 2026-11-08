import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "braille-code",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "They believed six dots could not represent all the letters.",
        },
        {
          correct: true,
          label:
            "They preferred raised letters, which sighted people could also read.",
        },
        {
          correct: false,
          label:
            "They thought Barbier's twelve-dot system was easier to learn.",
        },
        {
          correct: false,
          label:
            "They did not know that Braille had already published his system in 1829.",
        },
        {
          correct: false,
          label:
            "They wanted the army to use the system before the school did.",
        },
      ],
    },
  },
};

export default item;
