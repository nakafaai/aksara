import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "lichen-air",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menjelaskan alasan pembakaran batu bara dihentikan di Inggris.",
        },
        {
          correct: true,
          label:
            "Memberikan bukti bahwa keberadaan lumut kerak mengikuti naik turunnya kadar sulfur dioksida.",
        },
        {
          correct: false,
          label:
            "Membandingkan jenis lumut kerak di Inggris dengan jenis lumut kerak di Indonesia.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa lumut kerak di pedesaan lebih tahan terhadap pencemaran daripada lumut kerak di kota.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa semua jenis lumut kerak kembali setelah udara menjadi bersih.",
        },
      ],
    },
  },
};

export default item;
