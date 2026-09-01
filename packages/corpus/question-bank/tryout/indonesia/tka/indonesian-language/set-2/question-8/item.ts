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
          isCorrect: false,
          label:
            "Semua kaset lama langsung diputar sebelum kondisinya diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Rekaman yang konteksnya belum jelas dipindahkan tanpa pencatatan awal.",
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
