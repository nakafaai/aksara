import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "antikythera",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Its unusual weight compared with the statues found beside it",
        },
        {
          correct: false,
          label:
            "Thousands of letters that were clearly visible on its surface",
        },
        {
          correct: false,
          label: "X-ray images taken soon after it was brought to the surface",
        },
        {
          correct: false,
          label: "A user's manual found together with it in the wreck",
        },
        {
          correct: true,
          label: "A toothed gear wheel seen after the lump cracked apart",
        },
      ],
    },
  },
};

export default item;
