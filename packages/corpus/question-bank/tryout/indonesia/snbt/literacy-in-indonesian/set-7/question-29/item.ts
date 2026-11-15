import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "testing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menutup catatan, menuliskan semua yang diingat, lalu mencocokkannya dengan catatan",
        },
        {
          correct: false,
          label:
            "menandai kalimat-kalimat penting dengan stabilo sambil membaca ulang buku",
        },
        {
          correct: true,
          label:
            "mengerjakan soal latihan sebelum membaca ulang bab, lalu memeriksa jawaban yang salah",
        },
        {
          correct: false,
          label:
            "membaca ulang seluruh catatan empat kali pada malam sebelum ujian",
        },
        {
          correct: true,
          label:
            "menjelaskan materi kepada teman tanpa melihat catatan, lalu memeriksa bagian yang terlewat",
        },
      ],
    },
  },
};

export default item;
