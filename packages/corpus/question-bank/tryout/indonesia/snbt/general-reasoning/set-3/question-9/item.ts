import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "parallel-reasoning",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setiap kardus yang dimuat ke sebuah truk beratnya kurang dari $$20$$ kilogram, dan truk itu memuat $$30$$ kardus. Jadi, berat seluruh muatan kardus di truk itu kurang dari $$600$$ kilogram.",
        },
        {
          correct: true,
          label:
            "Setiap musisi dalam sebuah grup musik baru adalah pemain terbaik di kotanya untuk alat musik yang ia mainkan. Jadi, grup musik itu adalah grup musik terbaik di kota tersebut.",
        },
        {
          correct: false,
          label:
            "Sebuah SMK meraih nilai rata-rata ujian tertinggi di provinsinya. Jadi, setiap siswa SMK itu termasuk siswa dengan nilai ujian tertinggi di provinsi tersebut.",
        },
        {
          correct: false,
          label:
            "Pemain bintang sebuah tim futsal tidak pernah ikut latihan pagi, tetapi tetap bermain gemilang. Jadi, latihan pagi tidak diperlukan oleh pemain mana pun di tim itu.",
        },
        {
          correct: false,
          label:
            "Sebuah kampung menjadi kampung terbersih di kecamatannya setelah memasang tempat sampah terpilah. Jadi, kampung tetangganya juga akan menjadi kampung terbersih jika memasang tempat sampah yang sama.",
        },
      ],
    },
  },
};

export default item;
