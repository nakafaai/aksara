import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "borrowed-words",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lembaga bahasa sebaiknya berhenti membuat padanan untuk kata asing.",
        },
        {
          correct: true,
          label:
            "Nasib sebuah padanan ditentukan oleh pemakaian penutur, bukan oleh lembaga.",
        },
        {
          correct: false,
          label:
            "Kata *unduh* dan *daring* gagal karena jarang dipakai penutur.",
        },
        {
          correct: false,
          label:
            "Dokumen resmi adalah tempat terbaik untuk memperkenalkan kata baru.",
        },
        {
          correct: false,
          label:
            "Padanan dari kosakata sendiri mungkin selalu lebih baik daripada kata serapan.",
        },
      ],
    },
  },
};

export default item;
