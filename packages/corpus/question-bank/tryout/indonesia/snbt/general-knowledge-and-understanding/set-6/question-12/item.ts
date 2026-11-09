import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "sentence-meaning",
    topic: "referent",
  },
  stimulus: "noken",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "tas plastik murah yang makin banyak dipakai",
        },
        {
          correct: false,
          label: "jumlah perajin muda yang berkurang",
        },
        {
          correct: true,
          label:
            "status noken sebagai warisan budaya yang perlu dilindungi segera",
        },
        {
          correct: false,
          label:
            "keterampilan merajut noken yang diajarkan kepada anak muda di Papua",
        },
        {
          correct: false,
          label: "kebiasaan menggendong bayi dengan noken",
        },
      ],
    },
  },
};

export default item;
