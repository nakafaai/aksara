import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Constructive at first, destructive after the frequency is doubled, and constructive in the deeper water",
        },
        {
          correct: true,
          label:
            "Destructive at first, constructive after the frequency is doubled, and destructive in the deeper water",
        },
        { correct: false, label: "Destructive each time" },
        {
          correct: false,
          label:
            "Destructive at first, constructive after the frequency is doubled, and constructive in the deeper water",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Membina pada mulanya, memusnah selepas frekuensi digandakan, dan membina dalam air yang lebih dalam",
        },
        {
          correct: true,
          label:
            "Memusnah pada mulanya, membina selepas frekuensi digandakan, dan memusnah dalam air yang lebih dalam",
        },
        { correct: false, label: "Memusnah setiap kali" },
        {
          correct: false,
          label:
            "Memusnah pada mulanya, membina selepas frekuensi digandakan, dan membina dalam air yang lebih dalam",
        },
      ],
    },
  },
};

export default item;
