import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "clinic-queue",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "berkat sistem antrean daring, setiap pasien kini menunggu di puskesmas rata-rata 40 menit",
        },
        {
          correct: false,
          label:
            "pasien lansia selalu menunggu lebih lama daripada pasien lain",
        },
        {
          correct: false,
          label: "kepala puskesmas sengaja menyembunyikan data waktu tunggu",
        },
        {
          correct: true,
          label:
            "angka penurunan waktu tunggu belum sepenuhnya menggambarkan lama pasien menunggu di puskesmas",
        },
        {
          correct: false,
          label:
            "pesan singkat sering terlambat masuk di desa yang sinyalnya lemah",
        },
      ],
    },
  },
};

export default item;
