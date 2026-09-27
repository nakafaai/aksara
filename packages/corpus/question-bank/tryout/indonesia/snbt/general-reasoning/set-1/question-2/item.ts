import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Petani setempat menghasilkan Agri Gardina 45 hanya melalui metode seleksi.",
        },
        {
          isCorrect: false,
          label:
            "Denarum Agrihorti diseleksi dari mangga komersial yang ditanam di California.",
        },
        {
          isCorrect: true,
          label:
            "Periset menggunakan metode seleksi dan persilangan untuk mengembangkan koleksi plasma nutfah mangga.",
        },
        {
          isCorrect: false,
          label:
            "Denarum Agrihorti memiliki serat buah kasar dalam jumlah tinggi.",
        },
        {
          isCorrect: false,
          label:
            "Setiap aksesi dalam koleksi Cukurgondang sudah siap diekspor.",
        },
      ],
    },
  },
};

export default item;
