import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "belajar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Belajar mandiri pasti menaikkan nilai setiap siswa di sekolah itu.",
        },
        {
          correct: false,
          label:
            "Bimbingan belajar di luar sekolah tidak berpengaruh terhadap nilai ujian.",
        },
        {
          correct: false,
          label:
            "Kelas XII-5 memiliki banyak siswa paling besar di antara kelima kelas.",
        },
        {
          correct: false,
          label:
            "Setiap tambahan satu jam belajar mandiri per minggu menaikkan nilai rata-rata kelas di sekolah itu tepat $$3$$ poin.",
        },
        {
          correct: true,
          label:
            "Kelas dengan rata-rata jam belajar mandiri lebih banyak cenderung memiliki nilai rata-rata lebih tinggi.",
        },
      ],
    },
  },
};

export default item;
