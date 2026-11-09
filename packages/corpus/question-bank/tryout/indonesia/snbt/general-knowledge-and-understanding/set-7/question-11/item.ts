import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "term-meaning",
  },
  stimulus: "panas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pulau kecil yang suhunya tinggi karena letaknya dekat dengan garis khatulistiwa",
        },
        {
          correct: false,
          label: "bagian kota yang paling banyak ditumbuhi pepohonan peneduh",
        },
        {
          correct: false,
          label:
            "gedung yang membuang udara panas dari pendingin ruangan ke jalan",
        },
        {
          correct: false,
          label:
            "daerah pinggiran yang suhunya lebih tinggi daripada pusat kota",
        },
        {
          correct: true,
          label:
            "keadaan ketika pusat kota lebih panas daripada daerah pinggiran di sekitarnya",
        },
      ],
    },
  },
};

export default item;
