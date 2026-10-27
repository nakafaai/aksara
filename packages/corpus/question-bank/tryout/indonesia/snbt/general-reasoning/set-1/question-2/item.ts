import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Petani setempat menghasilkan Agri Gardina 45 hanya melalui metode seleksi.",
        },
        {
          correct: false,
          label:
            "Denarum Agrihorti diseleksi dari mangga komersial yang ditanam di California.",
        },
        {
          correct: true,
          label:
            "Periset menggunakan metode seleksi dan persilangan untuk mengembangkan koleksi plasma nutfah mangga.",
        },
        {
          correct: false,
          label:
            "Denarum Agrihorti memiliki serat buah kasar dalam jumlah tinggi.",
        },
        {
          correct: false,
          label:
            "Setiap aksesi dalam koleksi Cukurgondang sudah siap diekspor.",
        },
      ],
    },
  },
};

export default item;
