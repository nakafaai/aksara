import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "ferry-mechanic",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pak Wiryo sungguh tidak tersinggung, sebab ia sudah terbiasa menghadapi anak baru yang rajin mencatat.",
        },
        {
          correct: true,
          label:
            "Pak Wiryo tersinggung tetapi tidak mengakuinya, seperti tampak dari sindirannya tentang anak-anak sekarang dan dari caranya memeriksa silinder secara diam-diam.",
        },
        {
          correct: false,
          label:
            "Pak Wiryo tersinggung dan memperlihatkannya terang-terangan dengan menolak memeriksa silinder empat.",
        },
        {
          correct: false,
          label:
            "Pak Wiryo tidak tersinggung, sebab ia yakin pembacaan Darto salah dan terbukti demikian.",
        },
        {
          correct: false,
          label:
            "Pak Wiryo tersinggung karena Darto naik ke geladak sebelum pekerjaannya di kamar mesin selesai.",
        },
      ],
    },
  },
};

export default item;
