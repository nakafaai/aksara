import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "liquefaction",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Likuefaksi dapat dihentikan dengan alat yang meredam getaran gempa di permukiman.",
        },
        {
          correct: false,
          label:
            "Pondasi yang dalam selalu lebih murah daripada memilih lahan yang aman untuk dihuni.",
        },
        {
          correct: false,
          label:
            "Setelah 2018, warga boleh membangun kembali di semua bekas lokasi likuefaksi.",
        },
        {
          correct: true,
          label:
            "Kerugian likuefaksi dapat dikurangi, antara lain dengan memilih lahan yang tepat.",
        },
        {
          correct: false,
          label:
            "Mengeringkan tanah sebelum dibangun mungkin justru memperparah likuefaksi.",
        },
      ],
    },
  },
};

export default item;
