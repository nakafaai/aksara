import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "free-transit",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Angkutan umum sebaiknya dihapus dan diganti dengan kendaraan pribadi yang lebih cepat.",
        },
        {
          correct: false,
          label:
            "Tiket angkutan umum sebaiknya dinaikkan agar pemerintah memperoleh pendapatan lebih besar.",
        },
        {
          correct: true,
          label:
            "Dana sebaiknya dipakai untuk layanan andal, dengan potongan tiket bagi yang membutuhkan.",
        },
        {
          correct: false,
          label:
            "Semua warga kota sebaiknya mendapat angkutan umum gratis tanpa kecuali.",
        },
        {
          correct: false,
          label:
            "Warga berpenghasilan rendah sebaiknya beralih ke sepeda motor agar lebih tepat waktu.",
        },
      ],
    },
  },
};

export default item;
