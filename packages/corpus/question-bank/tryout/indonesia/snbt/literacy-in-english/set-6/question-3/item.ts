import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "figurative-language",
  },
  stimulus: "dog-pointing",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The wolf pups' nervous systems may still have been too immature at that age to make sense of a pointing gesture.",
        },
        {
          correct: true,
          label:
            "The wolf pups may have grasped the gesture well enough yet been too wary of the person making it to act on it.",
        },
        {
          correct: false,
          label:
            "The wolf pups may have lacked the self-control to wait for the gesture before rushing to one of the bowls.",
        },
        {
          correct: false,
          label:
            "The researchers' account of the wolf pups may reveal more about their own expectations than about the animals.",
        },
        {
          correct: false,
          label:
            "The wolf pups may have failed because they remembered less well where the treat had been hidden.",
        },
      ],
    },
  },
};

export default item;
