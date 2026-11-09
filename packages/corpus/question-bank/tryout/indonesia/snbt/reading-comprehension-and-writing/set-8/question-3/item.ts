import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "rattan-weaving",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Para perajin tua mengajarkan cara memilih rotan, merendamnya, dan menganyamnya berulang-ulang kali hingga para pemuda hafal.",
        },
        {
          correct: false,
          label:
            "Para perajin tua mengajarkan cara memilih rotan, merendamnya, dan menganyamnya berkali-kali kali sampai para pemuda hafal.",
        },
        {
          correct: false,
          label:
            "Para perajin tua mengajarkan cara memilih rotan, merendamnya, dan menganyamnya ulang-ulang kali sampai para pemuda hafal.",
        },
        {
          correct: false,
          label:
            "Para perajin tua mengajarkan cara memilih rotan, merendamnya, dan menganyamnya berulang-ulang kali, sampai para pemuda hafal.",
        },
        {
          correct: true,
          label:
            "Para perajin tua mengajarkan cara memilih rotan, merendamnya, dan menganyamnya berulang kali sampai para pemuda hafal.",
        },
      ],
    },
  },
};

export default item;
