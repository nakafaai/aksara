import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "menggambarkan kegiatan peserta, tetapi tidak dapat digeneralisasi",
        },
        {
          isCorrect: false,
          label:
            "menunjukkan bahwa sekitar 28 persen benda sejenis dapat diperbaiki pada kegiatan berikutnya",
        },
        {
          isCorrect: false,
          label:
            "menunjukkan perbaikan lebih hemat untuk benda yang berhasil dikembalikan ke penggunaan",
        },
        {
          isCorrect: false,
          label:
            "angka 28 cukup untuk menilai peluang perbaikan benda yang tidak pernah dibawa peserta",
        },
        {
          isCorrect: false,
          label: "membuktikan hasil yang sama akan terjadi di sekolah lain",
        },
      ],
    },
  },
  stimulusKey: "repair-clinic",
};

export default item;
