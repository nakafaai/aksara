import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "information-quality",
  },
  stimulus: "repair-clinic",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menggambarkan kegiatan peserta, tetapi tidak dapat digeneralisasi",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa sekitar 28 persen benda sejenis dapat diperbaiki pada kegiatan berikutnya",
        },
        {
          correct: false,
          label:
            "menunjukkan perbaikan lebih hemat untuk benda yang berhasil dikembalikan ke penggunaan",
        },
        {
          correct: false,
          label:
            "angka 28 cukup untuk menilai peluang perbaikan benda yang tidak pernah dibawa peserta",
        },
        {
          correct: false,
          label: "membuktikan hasil yang sama akan terjadi di sekolah lain",
        },
      ],
    },
  },
};

export default item;
