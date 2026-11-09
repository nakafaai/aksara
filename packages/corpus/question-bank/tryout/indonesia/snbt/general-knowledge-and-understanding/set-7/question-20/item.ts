import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "word-function",
  },
  stimulus: "bayu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "penguatan bahwa turbin selalu berputar lebih cepat dan menghasilkan lebih banyak listrik ketika angin bertambah kencang",
        },
        {
          correct: false,
          label:
            "alasan turbin dibangun di daerah terbuka yang anginnya stabil",
        },
        {
          correct: true,
          label:
            "keadaan yang berlawanan dengan dugaan, yaitu angin kencang malah membuat turbin berhenti",
        },
        {
          correct: false,
          label: "urutan waktu dari angin yang lemah menuju angin yang kencang",
        },
        {
          correct: false,
          label: "contoh lain dari keadaan ketika angin bertiup terlalu lemah",
        },
      ],
    },
  },
};

export default item;
