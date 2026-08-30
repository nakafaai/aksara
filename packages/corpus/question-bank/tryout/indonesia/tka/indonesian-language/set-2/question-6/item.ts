import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Ruang radio akan dipakai sebagai laboratorium bahasa.",
        },
        {
          isCorrect: true,
          label: "Kaset lama ditemukan dalam lemari.",
        },
        {
          isCorrect: false,
          label: "Semua rekaman langsung dibuang.",
        },
        {
          isCorrect: true,
          label: "Guru sejarah menawarkan penyimpanan kering.",
        },
      ],
    },
  },
  stimulusKey: "last-broadcast",
};

export default item;
