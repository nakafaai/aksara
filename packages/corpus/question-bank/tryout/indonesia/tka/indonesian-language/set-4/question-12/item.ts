import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "classroom-noise",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "paragraf keempat membantah bahwa papan gabus dapat mengurangi gaung",
        },
        {
          correct: true,
          label:
            "paragraf keempat membatasi cara menafsirkan hasil pengukuran yang disampaikan paragraf ketiga",
        },
        {
          correct: false,
          label:
            "paragraf keempat menjelaskan cara memasang tirai dan papan gabus",
        },
        {
          correct: false,
          label:
            "paragraf keempat memberi contoh sekolah lain yang gagal mengurangi gaung",
        },
        {
          correct: false,
          label:
            "paragraf keempat menyimpulkan bahwa kelas yang penuh siswa lebih bergaung",
        },
      ],
    },
  },
};

export default item;
