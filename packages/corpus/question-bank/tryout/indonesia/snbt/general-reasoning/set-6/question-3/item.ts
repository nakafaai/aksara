import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kedua kegiatan dibatalkan karena hujan",
        },
        {
          correct: false,
          label: "Kedua kegiatan dilaksanakan pada hari Minggu",
        },
        {
          correct: false,
          label: "Hanya kegiatan membersihkan selokan yang dilaksanakan",
        },
        {
          correct: true,
          label: "Barang daur ulang dikumpulkan pada hari Minggu",
        },
        {
          correct: false,
          label: "Kerja bakti ditunda tanpa memilih kegiatan pengganti",
        },
      ],
    },
  },
};

export default item;
