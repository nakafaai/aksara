import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "figurative-language",
  },
  stimulus: "letter-poem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "gaji pertama aku lirik ternyata jauh lebih kecil daripada yang ia harapkan selama ini",
        },
        {
          correct: false,
          label:
            "aku lirik mengirim uang pada malam hari ketika udara kota dingin",
        },
        {
          correct: true,
          label:
            "kiriman uang terasa tidak mampu mewakili kasih sayang yang ingin diberikan",
        },
        {
          correct: false,
          label: "ibu aku lirik tidak menyukai uang yang dikirim lewat layar",
        },
        {
          correct: false,
          label: "aku lirik lupa menuliskan jumlah uang dengan benar",
        },
      ],
    },
  },
};

export default item;
