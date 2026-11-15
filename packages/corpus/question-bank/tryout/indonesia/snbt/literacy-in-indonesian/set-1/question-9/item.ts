import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "theme",
  },
  stimulus: "lighthouse-keeper",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Gambaran yang dulu berarti kelalaian kini terasa tenang, karena lampu baru ternyata tidak dapat menyala tanpa Pak Darsa.",
        },
        {
          correct: false,
          label:
            "Gambaran itu menegaskan bahwa pesan ayahnya kini dilanggar, karena lampu padam di siang hari dan Pak Darsa menyesal meninggalkan pulau.",
        },
        {
          correct: false,
          label:
            "Gambaran yang dulu berarti kelalaian kini terasa tenang, karena lampu padam di siang hari sebagaimana mestinya, dan Pak Darsa tersenyum karena yakin Wulan akan meneruskan catatannya.",
        },
        {
          correct: false,
          label:
            "Gambaran itu menunjukkan bahwa laut kini tidak perlu lagi dijaga, karena lampu padam di siang hari sebagaimana mestinya dan Pak Darsa tidak lagi memikul pesan itu.",
        },
        {
          correct: true,
          label:
            "Gambaran yang dulu berarti kelalaian kini terasa tenang, karena lampu padam di siang hari sebagaimana mestinya dan Pak Darsa tidak lagi memikul pesan itu.",
        },
      ],
    },
  },
};

export default item;
