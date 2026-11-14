import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "strengthen-weaken",
  },
  stimulus: "mantis-shrimp",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Shrimp tested with the mixed colours of real reef surfaces separated them as poorly as they separated single wavelengths.",
        },
        {
          correct: false,
          label:
            "The lights in the tank were dimmer than daylight on a shallow reef, which may have made small differences harder to detect.",
        },
        {
          correct: false,
          label:
            "A second species of mantis shrimp failed at the same small wavelength gaps as Haptosquilla trispinosa did.",
        },
        {
          correct: true,
          label:
            "Cells in the shrimp's brain respond most strongly to the difference between signals from neighbouring receptor types.",
        },
        {
          correct: false,
          label:
            "Mantis shrimp identify a coloured target faster than reef fish whose eyes have far fewer receptor types.",
        },
      ],
    },
  },
};

export default item;
