import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "lingua-franca",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "kesetaraan, karena tingkat tutur menandai kedudukan lawan bicara dan bahasa satu suku dapat terkesan mengistimewakan suku itu",
        },
        {
          correct: false,
          label:
            "kepraktisan, karena bahasa Melayu pasar sederhana dan mudah dipelajari para pedagang",
        },
        {
          correct: false,
          label:
            "jumlah penutur, karena bahasa dengan penutur asli terbanyak paling adil untuk dipilih",
        },
        {
          correct: false,
          label:
            "kemurnian bahasa, karena bahasa Melayu tidak menyerap kata dari bahasa lain",
        },
        {
          correct: false,
          label:
            "kepatuhan pada pemerintah kolonial, karena Belanda memakai bahasa Melayu di sekolah pribumi",
        },
      ],
    },
  },
};

export default item;
