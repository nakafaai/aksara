import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "comparison",
  },
  stimulus: "ride-hailing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pengemudi ojek daring harus diakui sebagai pekerja agar terlindungi.",
        },
        {
          correct: false,
          label:
            "Kebebasan memilih jam kerja tidak berarti apa-apa bagi pengemudi ojek daring.",
        },
        {
          correct: false,
          label:
            "Perusahaan aplikasi pasti membatasi jumlah pengemudi jika diwajibkan membayar upah minimum.",
        },
        {
          correct: true,
          label:
            "Pengemudi berhak atas jaminan kecelakaan dan atas aturan yang jelas sebelum akunnya diputus.",
        },
        {
          correct: false,
          label:
            "Sebutan mitra sudah menggambarkan kedudukan pengemudi dengan tepat.",
        },
      ],
    },
  },
};

export default item;
