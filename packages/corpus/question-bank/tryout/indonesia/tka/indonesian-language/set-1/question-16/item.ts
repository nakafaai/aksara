import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "menunjukkan Mira mulai memandang stasiun sebagai tempat bekerja, bukan menunggu",
        },
        {
          isCorrect: true,
          label:
            "menjadi tempat pertemuan antara menunggu dan melanjutkan perjalanan",
        },
        {
          isCorrect: false,
          label: "menjelaskan cara membuat biola",
        },
        {
          isCorrect: false,
          label: "menunjukkan festival diadakan di dalam kereta",
        },
        {
          isCorrect: false,
          label: "membuat Pak Damar meninggalkan pekerjaannya",
        },
      ],
    },
  },
  stimulusKey: "seat-seven",
};

export default item;
