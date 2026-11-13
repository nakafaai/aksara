import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "evidence-role",
  },
  stimulus: "crow-tools",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It suggests that Betty's bending was a lucky accident, so her success says little about what crows can do.",
        },
        {
          correct: true,
          label:
            "It weakens the claim that Betty invented a new solution, while leaving untouched the fact that her bending was deliberate and repeated.",
        },
        {
          correct: false,
          label:
            "It indicates that trial and error, rather than insight, explains how Betty arrived at her hook in the 2002 study.",
        },
        {
          correct: false,
          label:
            "It explains why Betty made a hook at all, since crows with deeper hooks pull food out of holes faster.",
        },
        {
          correct: false,
          label:
            "It supports reading Betty's result as planning, since it found bending in a species that rarely has any need for it.",
        },
      ],
    },
  },
};

export default item;
