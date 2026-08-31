import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "ketekunan menunggu pada akhirnya akan membuat orang yang dirindukan kembali",
        },
        {
          isCorrect: false,
          label:
            "kehadiran pemain yang lengkap merupakan syarat utama keberhasilan pertunjukan",
        },
        {
          isCorrect: true,
          label: "harapan dapat berubah bentuk tanpa harus hilang",
        },
        {
          isCorrect: false,
          label:
            "kursi ketujuh akhirnya hanya berfungsi sebagai penanda tempat kosong",
        },
        {
          isCorrect: false,
          label:
            "Mira memilih melepaskan latihan agar dapat menunggu tanpa gangguan",
        },
      ],
    },
  },
  stimulusKey: "seat-seven",
};

export default item;
