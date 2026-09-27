import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jika honor kegiatan dibayarkan, pimpinan dapat menugaskan karyawan membuat laporan",
        },
        {
          isCorrect: false,
          label:
            "Laporan kegiatan belum diserahkan berarti honor pimpinan tidak dibayarkan",
        },
        {
          isCorrect: false,
          label: "Jika pimpinan meminta laporan, kegiatan segera dilaksanakan",
        },
        {
          isCorrect: false,
          label: "Jika honor tidak ada, kegiatan tidak dapat dilaksanakan",
        },
        {
          isCorrect: true,
          label:
            "Honor karyawan tidak dibayarkan berarti kegiatan belum dilaksanakan",
        },
      ],
    },
  },
};

export default item;
