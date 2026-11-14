import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "butterfly-garden",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "siswa menolak karena harga pestisida terlalu mahal",
        },
        {
          correct: false,
          label: "siswa menolak karena ulat tidak merusak daun sama sekali",
        },
        {
          correct: false,
          label: "penolakan itu membuat kupu-kupu pergi dari taman",
        },
        {
          correct: true,
          label:
            "ulat adalah tahap hidup kupu-kupu sehingga membunuhnya berarti menggagalkan tujuan taman",
        },
        {
          correct: false,
          label: "siswa ingin ulat dipindahkan ke sekolah lain",
        },
      ],
    },
  },
};

export default item;
