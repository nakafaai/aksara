import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "text-structure",
  },
  stimulus: "village-midwife",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan bahwa Bu Warsih sudah terlalu tua dan lelah untuk menangani pasien seperti Sumi",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa Bu Warsih menyesal karena tidak memberi tahu Nia tentang surat rujukan yang ia tulis sejak sore",
        },
        {
          correct: false,
          label:
            "menegaskan bahwa udara malam itu sangat dingin karena hujan deras belum juga berhenti",
        },
        {
          correct: false,
          label:
            "memberi tanda bahwa Bu Warsih marah kepada Nia karena bidan muda itu terus mendesaknya",
        },
        {
          correct: true,
          label:
            "membuka bahwa ketenangan Bu Warsih sepanjang adegan adalah sikap menahan diri, bukan karena ia tidak cemas",
        },
      ],
    },
  },
};

export default item;
