import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "continuation",
  },
  stimulus: "chess-draw",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bima berhenti bermain catur karena merasa tidak akan pernah menang",
        },
        {
          correct: true,
          label:
            "pada permainan berikutnya, Bima memeriksa gerakan bidak lawan di seluruh papan sebelum menyerang",
        },
        {
          correct: false,
          label: "Bima meminta Kakek kembali memakai bidak putih seperti biasa",
        },
        {
          correct: false,
          label: "Bima menyimpan buku catur pinjaman itu untuk dirinya sendiri",
        },
        {
          correct: false,
          label: "Kakek melarang Bima membaca buku catur dari perpustakaan",
        },
      ],
    },
  },
};

export default item;
