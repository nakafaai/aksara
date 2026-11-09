import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "rempah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Penjual pertama di pulau asal",
        },
        {
          correct: false,
          label: "Pembeli akhir di pasar Eropa",
        },
        {
          correct: false,
          label: "Petani yang menanam rempah",
        },
        {
          correct: true,
          label:
            "Pihak yang menghubungkan penjual dan pembeli lalu mengambil keuntungan",
        },
        {
          correct: false,
          label:
            "Pelaut yang mengemudikan kapal pengangkut rempah dari pulau asal ke pelabuhan-pelabuhan lain",
        },
      ],
    },
  },
};

export default item;
