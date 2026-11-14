import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "figurative-meaning",
  },
  stimulus: "beber",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dalang boleh menuturkan adegan perang jauh lebih lama daripada adegan perjalanan.",
        },
        {
          correct: false,
          label:
            "Dalang tidak dapat menampilkan adegan pertemuan lebih dulu jika lukisan perpisahan terletak sebelum lukisan pertemuan pada gulungan.",
        },
        {
          correct: false,
          label:
            "Dalang boleh menuturkan isi percakapan dua tokoh walaupun kata-kata mereka tidak tergambar.",
        },
        {
          correct: true,
          label:
            "Dalang boleh memindahkan sebuah peristiwa ke adegan lain asalkan urutan bentangan pada gulungan tidak diubah.",
        },
        {
          correct: false,
          label:
            "Adegan yang sama dapat terasa lambat dalam satu pertunjukan dan cepat dalam pertunjukan lain.",
        },
      ],
    },
  },
};

export default item;
