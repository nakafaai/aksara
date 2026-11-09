import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "right-repair",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Laws should open up parts, manuals, and repair, protecting safety in less restrictive ways.",
        },
        {
          correct: false,
          label:
            "Manufacturers should be banned from producing devices with glued batteries.",
        },
        {
          correct: false,
          label:
            "Only authorised service centres should be allowed to repair modern devices.",
        },
        {
          correct: false,
          label:
            "Safety concerns about repairs are invented by manufacturers to increase profits.",
        },
        {
          correct: false,
          label:
            "Owners should be required to repair their devices instead of replacing them.",
        },
      ],
    },
  },
};

export default item;
