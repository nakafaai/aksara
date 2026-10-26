import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menyatakan bahwa setiap benda yang disebut lebih dari sekali pasti memiliki satu arti yang tetap.",
        },
        {
          correct: false,
          label:
            "Menggantikan kebutuhan membaca tindakan Wulan karena makna benang sudah ditentukan oleh definisi istilah.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa penafsiran akhir benar hanya karena benang putih muncul pada awal dan akhir cerita.",
        },
        {
          correct: true,
          label:
            "Mengarahkan pembaca menelusuri bagaimana pengulangan benang memperoleh arti berbeda melalui keputusan Wulan dan respons Raka.",
        },
        {
          correct: false,
          label:
            "Menetapkan bahwa benang putih merupakan lambang sejarah yang berlaku sama dalam setiap cerita tentang kostum.",
        },
      ],
    },
  },
  stimulus: "passage-6",
};

export default item;
