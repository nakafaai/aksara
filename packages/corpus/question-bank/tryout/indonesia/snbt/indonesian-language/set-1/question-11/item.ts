import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Berhenti sejenak dari kegiatan dan menyaksikan keindahan matahari terbenam",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menghentikan seluruh pekerjaan untuk beristirahat sepanjang hari",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mengabaikan keadaan sekitar agar dapat menikmati hidup",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menjauhi semua kesibukan di kota secara permanen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menghitung waktu yang tersisa sebelum malam",
            },
          ],
        },
      ],
    },
  },
};

export default item;
