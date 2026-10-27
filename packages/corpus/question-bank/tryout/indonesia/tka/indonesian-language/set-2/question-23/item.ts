import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "study-breaks",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "kenaikan rata-rata cukup untuk menyimpulkan jeda cenderung bermanfaat bagi peserta",
        },
        {
          correct: false,
          label: "dua paket dapat dianggap setara karena jumlah soalnya sama",
        },
        {
          correct: false,
          label: "penggunaan ponsel meningkatkan ketelitian",
        },
        {
          correct: false,
          label:
            "jumlah peserta cukup untuk mewakili siswa pada kelas lain di sekolah yang sama",
        },
        {
          correct: true,
          label:
            "terdapat beberapa penjelasan alternatif yang membatasi simpulan sebab-akibat",
        },
      ],
    },
  },
};

export default item;
