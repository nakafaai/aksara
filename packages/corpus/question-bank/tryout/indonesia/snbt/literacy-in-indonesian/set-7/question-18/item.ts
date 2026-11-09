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
          label: "perlu tidaknya mahasiswa mengikuti ujian di akhir semester",
        },
        {
          correct: false,
          label: "apakah dosen sebaiknya berbicara lebih lama di dalam kelas",
        },
        {
          correct: false,
          label:
            "perlu tidaknya mahasiswa yang bekerja paruh waktu mendapat beasiswa kuliah dari kampus",
        },
        {
          correct: true,
          label:
            "apakah rekaman sebaiknya menggantikan ceramah di kelas atau melengkapinya",
        },
        {
          correct: false,
          label:
            "mungkin tidaknya diskusi dilakukan di kelas yang sangat besar",
        },
      ],
    },
  },
};

export default item;
