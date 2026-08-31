import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Galih memilih untuk mengikuti garis retak di dinding dan menemukan bekas warna dari ruangan lama; bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          isCorrect: true,
          label:
            "Retakan dan serpihan yang semula tampak sebagai kerusakan berubah menjadi jalur menuju pintu lama, lalu bidang yang disisakan menegaskan nilainya sebagai bukti sejarah.",
        },
        {
          isCorrect: false,
          label:
            "Galih memilih untuk mengikuti garis retak di dinding dan menemukan bekas warna dari ruangan lama; akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          isCorrect: false,
          label:
            "Galih memilih untuk mengikuti garis retak di dinding dan menemukan bekas warna dari ruangan lama; perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          isCorrect: false,
          label:
            "Galih memilih untuk mengikuti garis retak di dinding dan menemukan bekas warna dari ruangan lama; benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
