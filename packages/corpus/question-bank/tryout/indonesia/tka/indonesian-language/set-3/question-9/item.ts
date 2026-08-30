import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "noda membuat Laras menolak semua peta",
        },
        {
          isCorrect: false,
          label: "noda membuktikan jalur lama sudah benar",
        },
        {
          isCorrect: false,
          label: "noda menyebabkan warga menutup lorong baru",
        },
        {
          isCorrect: false,
          label: "noda membuat Laras berhenti bertanya",
        },
        {
          isCorrect: true,
          label:
            "noda memicu pemeriksaan yang mengubah rasa kesal menjadi kehati-hatian",
        },
      ],
    },
  },
  stimulusKey: "mapmakers-ink",
};

export default item;
