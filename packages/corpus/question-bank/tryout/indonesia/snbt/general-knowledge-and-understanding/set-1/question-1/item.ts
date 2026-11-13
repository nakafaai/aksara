import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "paragraph-relation",
  },
  stimulus: "mikoriza",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menolak simpulan itu dengan menunjukkan bahwa mikoriza dapat lebih banyak membebani daripada membantu tanaman",
        },
        {
          correct: true,
          label:
            "membatasi simpulan itu dengan menunjukkan bahwa manfaat hifa hilang begitu fosfor tidak lagi sulit didapat, sementara gula tetap dibayarkan",
        },
        {
          correct: false,
          label:
            "membatasi simpulan itu dengan menunjukkan bahwa tanaman harus membayar gula jauh lebih banyak ketika tanahnya kaya fosfor",
        },
        {
          correct: false,
          label:
            "menggeser simpulan itu dari cara kerja mikoriza ke penggunaannya sebagai pupuk hayati di lahan pertanian",
        },
        {
          correct: false,
          label:
            "membatasi simpulan itu sehingga manfaat mikoriza hanya berlaku pada tanaman yang tanahnya belum pernah dipupuk",
        },
      ],
    },
  },
};

export default item;
