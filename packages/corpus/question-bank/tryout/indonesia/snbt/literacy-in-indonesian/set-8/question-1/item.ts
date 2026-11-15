import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "noise-hearing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Membuktikan bahwa penonton konser yang merasa pulih keesokan harinya sudah kehilangan separuh sinapsnya.",
        },
        {
          correct: true,
          label:
            "Menunjukkan bahwa ambang dengar yang pulih belum menjamin tidak ada kerusakan, meski belum pasti berlaku pada manusia.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa sel rambut dapat tumbuh kembali setelah paparan bising asalkan ambang dengarnya sudah pulih.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa audiogram tidak berguna untuk mendeteksi kerusakan telinga yang disebabkan oleh bising.",
        },
        {
          correct: false,
          label:
            "Menjelaskan mengapa dosis bising dihitung dari gabungan tingkat kebisingan dan lamanya paparan.",
        },
      ],
    },
  },
};

export default item;
