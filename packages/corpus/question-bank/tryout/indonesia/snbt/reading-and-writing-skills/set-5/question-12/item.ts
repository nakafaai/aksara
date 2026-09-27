import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pada Senin, tim menguji daftar pemeriksaan di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "pada Senin, tim menguji daftar pemeriksaan di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Pada senin, tim menguji daftar pemeriksaan di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin, Tim menguji daftar pemeriksaan di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Pada Senin tim menguji daftar pemeriksaan di studio rekaman sekolah",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
