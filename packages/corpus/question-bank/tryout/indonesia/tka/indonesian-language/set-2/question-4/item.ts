import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "agar siswa dapat melewati pemeriksaan keselamatan",
        },
        {
          isCorrect: true,
          label: "agar langkah yang sama tidak diulang tanpa alasan",
        },
        {
          isCorrect: false,
          label:
            "agar benda yang berhasil diuji dapat langsung dinyatakan layak tanpa catatan tambahan",
        },
        {
          isCorrect: false,
          label: "agar pemilik tidak mengetahui biaya",
        },
        {
          isCorrect: false,
          label: "agar fasilitator dapat membuang komponen",
        },
      ],
    },
  },
  stimulusKey: "repair-clinic",
};

export default item;
