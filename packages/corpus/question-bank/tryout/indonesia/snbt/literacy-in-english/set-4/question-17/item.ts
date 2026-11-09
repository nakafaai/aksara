import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "antikythera",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "They allowed researchers to separate the fused fragments without breaking them.",
        },
        {
          correct: false,
          label:
            "They proved that the device had been used to set the dates of the Olympics.",
        },
        {
          correct: false,
          label:
            "They showed that the mechanism had been built shortly before the ship sank.",
        },
        {
          correct: true,
          label:
            "They let researchers count hidden gear teeth and read letters long unreadable.",
        },
        {
          correct: false,
          label:
            "They confirmed that corrosion had caused the lump to crack apart in the museum.",
        },
      ],
    },
  },
};

export default item;
