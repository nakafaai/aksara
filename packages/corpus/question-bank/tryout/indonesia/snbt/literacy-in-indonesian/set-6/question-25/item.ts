import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "sriwijaya-stones",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "semua prasasti Sriwijaya hanya berisi kisah peperangan dan perjalanan pasukan raja",
        },
        {
          correct: false,
          label:
            "raja Sriwijaya tidak pernah menghadapi pemberontakan selama berkuasa",
        },
        {
          correct: false,
          label:
            "prasasti Sriwijaya hanya dibuat di Pulau Bangka dan bukan di Palembang",
        },
        {
          correct: true,
          label:
            "prasasti dipakai raja untuk berbagai tujuan, dari kisah perjalanan hingga ancaman",
        },
        {
          correct: false,
          label:
            "taman di Talang Tuo dibangun untuk menyambut kedatangan I-Tsing",
        },
      ],
    },
  },
};

export default item;
