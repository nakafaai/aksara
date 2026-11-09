import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "wayang-school",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Wayang kulit ditetapkan UNESCO sebagai warisan budaya karena lakonnya berasal dari India.",
        },
        {
          correct: false,
          label:
            "Punakawan adalah tokoh paling bijak dalam wayang karena Semar sebenarnya seorang dewa.",
        },
        {
          correct: false,
          label:
            "Pertunjukan wayang semalam suntuk sebaiknya diganti dengan pertunjukan yang singkat.",
        },
        {
          correct: true,
          label:
            "Wayang menjadi sarana pendidikan yang lentur, terutama melalui bagian yang diisi punakawan.",
        },
        {
          correct: false,
          label:
            "Sunan Kalijaga satu-satunya tokoh yang memakai wayang untuk tujuan pendidikan.",
        },
      ],
    },
  },
};

export default item;
