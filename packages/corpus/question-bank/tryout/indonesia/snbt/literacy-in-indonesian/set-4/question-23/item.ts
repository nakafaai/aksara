import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "text-structure",
  },
  stimulus: "balai-pustaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "membuktikan bahwa buku Balai Pustaka lebih bermutu, sehingga rakyat yang mulai melek huruf lebih memilihnya daripada bacaan liar",
        },
        {
          correct: true,
          label:
            "menunjukkan bahwa penyebaran bacaan yang murah ikut menjalankan tugas penyaringan, karena bacaan yang aman jadi lebih mudah didapat",
        },
        {
          correct: false,
          label:
            "menjelaskan bahwa pemerintah kolonial rugi besar karena harus menjual buku dengan harga yang sangat murah",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa harga murah adalah satu-satunya alasan rakyat mulai melek huruf pada masa itu",
        },
        {
          correct: false,
          label:
            "menegaskan bahwa bacaan liar dilarang terbit karena harganya jauh lebih mahal daripada buku-buku terbitan Balai Pustaka",
        },
      ],
    },
  },
};

export default item;
