import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "cholera-pump",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "About $$8{,}220$$, which is about $$8{,}120$$ more than the $$98$$ they actually had.",
        },
        {
          correct: true,
          label:
            "About $$820$$, which is about $$720$$ more than the $$98$$ they actually had.",
        },
        {
          correct: false,
          label:
            "About $$1{,}263$$, the same number as the Southwark and Vauxhall houses had.",
        },
        {
          correct: false,
          label:
            "About $$820$$, which is about $$443$$ fewer than the Southwark and Vauxhall houses had, so Lambeth's water was the more dangerous.",
        },
        {
          correct: false,
          label:
            "About $$720$$, which is about $$622$$ more than the $$98$$ they actually had.",
        },
      ],
    },
  },
};

export default item;
