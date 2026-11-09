import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "peat-fire",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Air dari udara menguap sebelum sampai ke permukaan tanah gambut.",
        },
        {
          correct: false,
          label:
            "Pesawat penyiram air hanya dapat terbang ketika tidak ada asap.",
        },
        {
          correct: false,
          label:
            "Air justru menjadikan gambut lebih ringan dan lebih mudah terbakar.",
        },
        {
          correct: false,
          label:
            "Siraman air dari udara baru dilakukan setelah kebakaran berlangsung berbulan-bulan.",
        },
        {
          correct: true,
          label:
            "Bara yang menjalar di bawah tanah tetap menyala walaupun permukaannya padam.",
        },
      ],
    },
  },
};

export default item;
