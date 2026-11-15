import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "noise-hearing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menunjukkan bahwa ambang dengar yang pulih belum menjamin telinga utuh, karena sel rambut luar tikus rusak walaupun ambang dengarnya kembali normal.",
        },
        {
          correct: true,
          label:
            "Menunjukkan bahwa ambang dengar yang pulih belum menjamin telinga utuh, karena sinaps sel rambut dalam hilang walaupun ambang dengar tikus kembali normal, meski belum pasti berlaku pada manusia.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa ambang dengar yang pulih belum menjamin telinga utuh pada manusia, karena sinaps penonton konser hilang walaupun audiogramnya normal.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa ambang dengar yang pulih belum menjamin telinga utuh, karena sinaps yang hilang tumbuh kembali dalam dua pekan sehingga tidak tampak pada audiogram.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa ambang dengar yang pulih belum menjamin telinga utuh, karena tinitus pada tikus itu membuktikan bahwa sinapsnya rusak.",
        },
      ],
    },
  },
};

export default item;
