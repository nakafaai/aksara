import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "wrong-hem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Bu Lastri bekerja sampai larut sambil mendengarkan radio.",
        },
        {
          correct: false,
          label: "Bu Lastri membaca kertas pesanan lagi di bawah lampu.",
        },
        {
          correct: true,
          label:
            "Bu Lastri melipat ujung celana ke dalam, bukan memotongnya, agar jahitannya bisa dibuka ketika Tika bertambah tinggi.",
        },
        {
          correct: false,
          label: "Bu Lastri menepuk dahinya sendiri sambil tertawa kecil.",
        },
        {
          correct: false,
          label: "Bu Lastri menyematkan jarum pentul satu per satu.",
        },
      ],
    },
  },
};

export default item;
