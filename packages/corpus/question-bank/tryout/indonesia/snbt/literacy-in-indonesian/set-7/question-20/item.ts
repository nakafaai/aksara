import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-comparison",
  },
  stimulus: "recorded-lectures",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "rekaman kuliah sebaiknya ditonton belasan jam sekaligus sebelum ujian",
        },
        {
          correct: false,
          label:
            "sambungan internet semua mahasiswa sudah cukup stabil untuk belajar daring",
        },
        {
          correct: true,
          label:
            "mahasiswa perlu kesempatan bertanya dan berlatih bersama di kelas",
        },
        {
          correct: false,
          label:
            "dosen sebaiknya tidak lagi menyiapkan ceramah untuk mahasiswanya",
        },
        {
          correct: false,
          label: "kuliah tatap muka tidak diperlukan lagi dalam beberapa tahun",
        },
      ],
    },
  },
};

export default item;
