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
            "membuka bahwa ketenangan Bu Warsih sepanjang adegan adalah sikap menahan diri, karena ia menyesal tidak memberi tahu Nia soal surat rujukan",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa Bu Warsih kedinginan setelah hujan deras turun sepanjang malam di desa tepi sungai itu",
        },
        {
          correct: false,
          label:
            "membuka bahwa ketenangan Bu Warsih sepanjang adegan adalah sikap menahan diri, karena ia tidak percaya Nia mampu mengantar Sumi sampai ke kota",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa Bu Warsih kesal karena kalah berdebat dengan Nia, sehingga perasaannya baru tampak setelah semua orang pergi",
        },
        {
          correct: true,
          label:
            "membuka bahwa ketenangan Bu Warsih sepanjang adegan adalah sikap menahan diri, bukan tanda bahwa ia tidak cemas akan keadaan Sumi",
        },
      ],
    },
  },
};

export default item;
