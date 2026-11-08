import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "wayang-school",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "menandai bahwa kisah itu bersumber dari tradisi lisan, bukan catatan pasti",
        },
        {
          correct: false,
          label:
            "membuktikan bahwa Sunan Kalijaga menciptakan tokoh-tokoh punakawan",
        },
        {
          correct: false,
          label:
            "menunjukkan bahwa kisah Sunan Kalijaga sudah dicatat oleh UNESCO",
        },
        {
          correct: false,
          label:
            "meyakinkan pembaca bahwa ajaran baru selalu masuk melalui wayang",
        },
        {
          correct: false,
          label:
            "menyindir para dalang muda yang mungkin tidak lagi mengenal sejarah wayang",
        },
      ],
    },
  },
};

export default item;
