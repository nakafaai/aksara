import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "online-loan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Teks B menerima manfaat edukasi, meragukan survei Teks A karena sampelnya terlalu kecil, dan menilai aturan tampilan biaya lebih mendesak.",
        },
        {
          correct: false,
          label:
            "Teks B menolak edukasi keuangan, meragukan survei Teks A karena tidak punya pembanding, dan menilai aturan tampilan biaya lebih mendesak.",
        },
        {
          correct: false,
          label:
            "Teks B menerima manfaat edukasi, meragukan survei Teks A karena tidak punya pembanding, dan menilai edukasi di sekolah lebih mendesak daripada aturan.",
        },
        {
          correct: false,
          label:
            "Teks B menerima manfaat edukasi, menerima survei Teks A sebagai bukti akar masalah, dan menilai aturan tampilan biaya lebih mendesak.",
        },
        {
          correct: true,
          label:
            "Teks B menerima manfaat edukasi, meragukan survei Teks A karena tidak punya pembanding, dan menilai aturan tampilan biaya dan pengawasan lebih mendesak.",
        },
      ],
    },
  },
};

export default item;
