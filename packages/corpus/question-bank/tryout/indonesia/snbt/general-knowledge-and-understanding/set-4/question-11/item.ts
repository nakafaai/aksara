import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "term-meaning",
  },
  stimulus: "hoaks",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Membaca berita dengan cepat dari atas ke bawah.",
        },
        {
          correct: false,
          label: "Membaca judul berita tanpa membuka isinya.",
        },
        {
          correct: false,
          label:
            "Membaca berita yang sama berulang kali di satu situs sampai seluruh isinya benar-benar dipahami.",
        },
        {
          correct: true,
          label:
            "Memeriksa apa yang dikatakan sumber lain tentang klaim atau situs yang sedang dibaca.",
        },
        {
          correct: false,
          label: "Membaca komentar pembaca di bawah berita.",
        },
      ],
    },
  },
};

export default item;
