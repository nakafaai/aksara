import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "sentence-relation",
  },
  stimulus: "library-loans",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kalimat (5) memberi contoh siswa yang jarang datang ke perpustakaan.",
        },
        {
          correct: false,
          label: "Kalimat (5) menjelaskan penyebab koleksi baru menarik siswa.",
        },
        {
          correct: true,
          label:
            "Kalimat (5) menyampaikan pandangan yang berbeda dari penilaian dalam kalimat (4).",
        },
        {
          correct: false,
          label: "Kalimat (5) menyimpulkan seluruh isi tabel.",
        },
        {
          correct: false,
          label: "Kalimat (5) mengulang isi kalimat (4) dengan kata lain.",
        },
      ],
    },
  },
};

export default item;
