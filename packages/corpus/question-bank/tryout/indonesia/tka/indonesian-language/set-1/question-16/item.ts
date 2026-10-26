import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "seat-seven",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menunjukkan Mira mulai memandang stasiun sebagai tempat bekerja, bukan menunggu",
        },
        {
          correct: true,
          label:
            "menjadi tempat pertemuan antara menunggu dan melanjutkan perjalanan",
        },
        {
          correct: false,
          label: "menjelaskan cara membuat biola",
        },
        {
          correct: false,
          label: "menunjukkan festival diadakan di dalam kereta",
        },
        {
          correct: false,
          label: "membuat Pak Damar meninggalkan pekerjaannya",
        },
      ],
    },
  },
};

export default item;
