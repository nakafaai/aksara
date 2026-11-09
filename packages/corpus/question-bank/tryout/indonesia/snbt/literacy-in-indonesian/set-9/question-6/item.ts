import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "national-exam",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ujian nasional sebaiknya dihapus karena nilai rapor sudah cukup untuk dibandingkan.",
        },
        {
          correct: false,
          label:
            "Ujian nasional perlu kembali menjadi penentu kelulusan agar siswa bersungguh-sungguh.",
        },
        {
          correct: true,
          label:
            "Ujian bersama tetap perlu, tetapi tidak menjadi satu-satunya penentu kelulusan.",
        },
        {
          correct: false,
          label:
            "Ujian nasional hanya perlu diadakan di wilayah yang mutu pendidikannya tertinggal.",
        },
        {
          correct: false,
          label:
            "Ujian nasional sebaiknya diganti dengan bimbingan belajar untuk semua siswa.",
        },
      ],
    },
  },
};

export default item;
