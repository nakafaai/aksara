import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Menghentikan seluruh pekerjaan untuk beristirahat sepanjang hari",
        },
        {
          isCorrect: false,
          label: "Mengabaikan keadaan sekitar agar dapat menikmati hidup",
        },
        {
          isCorrect: false,
          label: "Menjauhi semua kesibukan di kota secara permanen",
        },
        {
          isCorrect: false,
          label: "Menghitung waktu yang tersisa sebelum malam",
        },
        {
          isCorrect: true,
          label:
            "Berhenti sejenak dari kegiatan dan menyaksikan keindahan matahari terbenam",
        },
      ],
    },
  },
};

export default item;
