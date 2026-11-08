import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "categorical-syllogism",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tidak ada kamus di perpustakaan itu yang boleh dipinjam pulang.",
        },
        {
          correct: false,
          label:
            "Semua buku sejarah di perpustakaan itu boleh dipinjam pulang.",
        },
        {
          correct: false,
          label: "Sebagian kamus di perpustakaan itu adalah buku sejarah.",
        },
        {
          correct: false,
          label: "Semua buku yang tidak boleh dipinjam pulang adalah kamus.",
        },
        {
          correct: false,
          label: "Tidak ada buku sejarah yang merupakan buku referensi.",
        },
      ],
    },
  },
};

export default item;
