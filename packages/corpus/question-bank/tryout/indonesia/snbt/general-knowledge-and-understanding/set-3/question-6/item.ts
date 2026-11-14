import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "figurative-meaning",
  },
  stimulus: "kedelai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Isi tabungan itu dinikmati tanaman yang ditanam sesudah kedelai, bukan kedelai yang mengumpulkannya.",
        },
        {
          correct: false,
          label:
            "Isi tabungan itu berasal dari bagian tanaman kedelai yang tidak ikut dipanen.",
        },
        {
          correct: false,
          label:
            "Tabungan itu biasanya tidak cukup untuk menghapus kebutuhan jagung berikutnya akan pupuk nitrogen.",
        },
        {
          correct: false,
          label:
            "Tabungan itu dicairkan oleh mikroba tanah sedikit demi sedikit, tidak sekaligus.",
        },
        {
          correct: true,
          label:
            "Sebagian besar isi tabungan itu berupa nitrogen yang tersimpan di dalam biji kedelai.",
        },
      ],
    },
  },
};

export default item;
