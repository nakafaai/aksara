import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "slime-mould",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A brainless slime mould builds efficient networks by following simple local rules.",
        },
        {
          correct: false,
          label:
            "Slime moulds are intelligent animals that can plan railway networks for cities.",
        },
        {
          correct: false,
          label:
            "The Tokyo railway system was originally designed by copying the growth of a slime mould.",
        },
        {
          correct: false,
          label:
            "Slime moulds are fungi that grow fastest when food is placed in a maze.",
        },
        {
          correct: false,
          label:
            "Engineers will probably replace computers with slime moulds in the future.",
        },
      ],
    },
  },
};

export default item;
