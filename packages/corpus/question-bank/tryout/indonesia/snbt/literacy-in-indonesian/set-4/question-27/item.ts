import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Galih memilih untuk mengikuti garis retak di dinding dan menemukan bekas warna dari ruangan lama. Bentuk fisik benda menetapkan seluruh maknanya sejak penyebutan pertama.",
        },
        {
          correct: true,
          label:
            "Retakan dan serpihan yang semula tampak sebagai kerusakan berubah menjadi jalur menuju pintu lama, lalu bidang yang disisakan menegaskan nilainya sebagai bukti sejarah.",
        },
        {
          correct: false,
          label:
            "Galih memilih untuk mengikuti garis retak di dinding dan menemukan bekas warna dari ruangan lama. Akhir cerita menyatakan makna benda secara langsung sehingga rincian tindakan sebelumnya tidak diperlukan.",
        },
        {
          correct: false,
          label:
            "Galih memilih untuk mengikuti garis retak di dinding dan menemukan bekas warna dari ruangan lama. Perubahan suasana hanya berasal dari latar dan tidak berkaitan dengan pilihan tokoh.",
        },
        {
          correct: false,
          label:
            "Galih memilih untuk mengikuti garis retak di dinding dan menemukan bekas warna dari ruangan lama. Benda berulang mempertahankan satu arti meskipun tindakan dan respons akhir tokoh berubah.",
        },
      ],
    },
  },
};

export default item;
