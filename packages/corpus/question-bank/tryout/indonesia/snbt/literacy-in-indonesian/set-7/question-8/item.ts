import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "walkable-city",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Berkendara di jalan yang lebih lebar terasa mudah, sehingga makin banyak orang berkendara.",
        },
        {
          correct: false,
          label:
            "Trotoar yang dikorbankan untuk pelebaran jalan selalu dipakai untuk parkir motor.",
        },
        {
          correct: false,
          label:
            "Jumlah penduduk kota bertambah lebih cepat daripada panjang jalan yang dibangun.",
        },
        {
          correct: false,
          label:
            "Pengendara ojek paling banyak memakai jalan yang sudah dilebarkan pemerintah.",
        },
        {
          correct: false,
          label:
            "Kemacetan hilang dengan sendirinya jika jalan dibiarkan tanpa perubahan.",
        },
      ],
    },
  },
};

export default item;
