import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "naungan",
  versions: {
    id: {
      columns: ["Dapat disimpulkan", "Tidak dapat disimpulkan"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pohon naungan mengurangi kejadian longsor kecil di kebun yang berada di lereng curam.",
        },
        {
          column: 1,
          label:
            "Lebih dari separuh total panen seluruh kebun bernaungan berasal dari kebun di lereng curam.",
        },
        {
          column: 1,
          label:
            "Jika dihitung dalam persen terhadap rata-rata hasil kebun tanpa naungan di lereng yang sama, keunggulan kebun bernaungan lebih besar di lereng curam daripada di lereng landai.",
        },
        {
          column: 2,
          label:
            "Sejak pohon naungan ditanam, hasil kebun bernaungan di lereng curam meningkat.",
        },
      ],
    },
  },
};

export default item;
