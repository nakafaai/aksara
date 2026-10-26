import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Membagi peserta ke dalam dua urutan kondisi.",
        },
        {
          correct: true,
          label: "Menguji kesetaraan paket pada kelompok lain.",
        },
        {
          correct: false,
          label: "Menghapus pencatatan jawaban bagian akhir.",
        },
        {
          correct: false,
          label:
            "Memastikan setiap peserta memulai dari kondisi tanpa jeda sebelum kondisi lain.",
        },
      ],
    },
  },
  stimulus: "study-breaks",
};

export default item;
