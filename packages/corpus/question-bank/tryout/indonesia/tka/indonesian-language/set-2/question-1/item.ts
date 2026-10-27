import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "repair-clinic",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "agar siswa dapat melewati pemeriksaan keselamatan",
        },
        {
          correct: true,
          label: "agar langkah yang sama tidak diulang tanpa alasan",
        },
        {
          correct: false,
          label:
            "agar benda yang berhasil diuji dapat langsung dinyatakan layak tanpa catatan tambahan",
        },
        {
          correct: false,
          label: "agar pemilik tidak mengetahui biaya",
        },
        {
          correct: false,
          label: "agar fasilitator dapat membuang komponen",
        },
      ],
    },
  },
};

export default item;
