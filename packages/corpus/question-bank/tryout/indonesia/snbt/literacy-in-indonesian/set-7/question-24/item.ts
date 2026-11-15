import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "rumah-gadang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Iklan itu tepat, karena bentuk dan atap gonjong rumah itu sama dengan rumah gadang lama.",
        },
        {
          correct: true,
          label:
            "Iklan itu menyesatkan, karena rumah itu meniru bentuk rumah gadang tetapi tidak memakai cara berdiri yang membuat rumah gadang lama lentur.",
        },
        {
          correct: false,
          label:
            "Iklan itu menyesatkan, karena menurut teks rumah dengan fondasi beton pasti roboh saat gempa.",
        },
        {
          correct: false,
          label:
            "Iklan itu tepat, karena beton dan paku lebih kuat daripada kayu dan pasak.",
        },
        {
          correct: false,
          label:
            "Iklan itu menyesatkan, karena menurut teks rumah gadang yang asli pun selalu sama rentannya dengan bangunan lain.",
        },
      ],
    },
  },
};

export default item;
