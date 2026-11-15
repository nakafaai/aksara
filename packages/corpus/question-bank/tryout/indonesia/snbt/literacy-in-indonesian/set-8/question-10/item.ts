import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "last-newsstand",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Lapaknya menjadi tempat bertemu bagi beberapa orang yang ia kenal baik.",
        },
        {
          correct: false,
          label:
            "Ia yakin penjualan koran akan kembali naik dalam waktu dekat.",
        },
        {
          correct: true,
          label:
            "Ia merasa punya janji kepada pelanggan tetap seperti Pak Darto.",
        },
        {
          correct: false,
          label: "Ia belum tahu bahwa koran Pagi Raya akan berhenti terbit.",
        },
        {
          correct: false,
          label:
            "Ia ingin menyaingi berita di ponsel dengan menjual koran yang lebih murah.",
        },
      ],
    },
  },
};

export default item;
