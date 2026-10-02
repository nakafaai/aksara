import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Karena tim menarik simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          isCorrect: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          isCorrect: false,
          label:
            "Berdasarkan data, menarik tentang uji di studio rekaman sekolah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
