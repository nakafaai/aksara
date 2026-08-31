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
            "angka 28 menggambarkan keluaran kegiatan, tetapi tidak memberi persentase keberhasilan",
        },
        {
          isCorrect: false,
          label:
            "mendukung penerapan kegiatan yang sama pada sekolah dengan profil serupa",
        },
      ],
    },
  },
  stimulusKey: "repair-clinic",
};

export default item;
