import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "conclusion",
  },
  stimulus: "minibus-schedule",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Penumpang angkutan kota itu terus bertambah setiap bulan.",
        },
        {
          correct: false,
          label:
            "Jadwal tetap membuat angkutan selalu berangkat dengan penumpang penuh.",
        },
        {
          correct: true,
          label:
            "Sejak angkutan berangkat menurut jadwal tetap, waktu tunggu menjadi jauh lebih singkat dan penumpang bertambah.",
        },
        {
          correct: false,
          label:
            "Papan jadwal di halte membuat penumpang bertambah pada bulan April.",
        },
        {
          correct: false,
          label: "Waktu tunggu yang lama membuat penumpang bertambah.",
        },
      ],
    },
  },
};

export default item;
