import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Jika honor kegiatan dibayarkan, pimpinan dapat menugaskan karyawan membuat laporan",
        },
        {
          correct: false,
          label:
            "Laporan kegiatan belum diserahkan berarti honor pimpinan tidak dibayarkan",
        },
        {
          correct: false,
          label: "Jika pimpinan meminta laporan, kegiatan segera dilaksanakan",
        },
        {
          correct: false,
          label: "Jika honor tidak ada, kegiatan tidak dapat dilaksanakan",
        },
        {
          correct: true,
          label:
            "Honor karyawan tidak dibayarkan berarti kegiatan belum dilaksanakan",
        },
      ],
    },
  },
};

export default item;
