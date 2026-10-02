import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Menyatakan bahwa setiap benda yang disebut lebih dari sekali pasti memiliki satu arti yang tetap.",
        },
        {
          isCorrect: false,
          label:
            "Menggantikan kebutuhan membaca tindakan Wulan karena makna benang sudah ditentukan oleh definisi istilah.",
        },
        {
          isCorrect: false,
          label:
            "Membuktikan bahwa penafsiran akhir benar hanya karena benang putih muncul pada awal dan akhir cerita.",
        },
        {
          isCorrect: true,
          label:
            "Mengarahkan pembaca menelusuri bagaimana pengulangan benang memperoleh arti berbeda melalui keputusan Wulan dan respons Raka.",
        },
        {
          isCorrect: false,
          label:
            "Menetapkan bahwa benang putih merupakan lambang sejarah yang berlaku sama dalam setiap cerita tentang kostum.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
