import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "cuckoo-eggs",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Its birds cannot tell their own eggs from the eggs of other birds.",
        },
        {
          correct: true,
          label:
            "Its high acceptance may reflect a low risk of meeting cuckoos rather than an inability to spot odd eggs.",
        },
        {
          correct: false,
          label:
            "Its high acceptance must have been shaped by natural selection over many generations.",
        },
        {
          correct: false,
          label:
            "Each of its birds loses little when an egg it accepts turns out to be a cuckoo's.",
        },
        {
          correct: true,
          label:
            "Its rate of acceptance could fall if cuckoos became more common nearby.",
        },
      ],
    },
  },
};

export default item;
