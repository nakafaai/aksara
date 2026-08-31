import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "kenaikan rata-rata cukup untuk menyimpulkan jeda cenderung bermanfaat bagi peserta",
        },
        {
          isCorrect: false,
          label: "dua paket dapat dianggap setara karena jumlah soalnya sama",
        },
        {
          isCorrect: false,
          label: "penggunaan ponsel meningkatkan ketelitian",
        },
        {
          isCorrect: false,
          label:
            "jumlah peserta cukup untuk mewakili siswa pada kelas lain di sekolah yang sama",
        },
        {
          isCorrect: true,
          label:
            "terdapat beberapa penjelasan alternatif yang membatasi simpulan sebab-akibat",
        },
      ],
    },
  },
  stimulusKey: "study-breaks",
};

export default item;
