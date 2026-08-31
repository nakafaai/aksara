import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Buku tipis dan satu kalimat kebingungan mengubah kebiasaan menghindar Jati menjadi langkah baca yang kecil tetapi dapat dilanjutkan.",
        },
        {
          isCorrect: false,
          label:
            "Jati memilih untuk memilih buku paling tipis, lalu menulis satu kalimat tentang bagian yang tidak ia pahami; bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          isCorrect: false,
          label:
            "Jati memilih untuk memilih buku paling tipis, lalu menulis satu kalimat tentang bagian yang tidak ia pahami; akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Jati memilih untuk memilih buku paling tipis, lalu menulis satu kalimat tentang bagian yang tidak ia pahami; perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Jati memilih untuk memilih buku paling tipis, lalu menulis satu kalimat tentang bagian yang tidak ia pahami; benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
