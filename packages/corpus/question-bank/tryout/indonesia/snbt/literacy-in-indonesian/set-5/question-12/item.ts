import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "plot-function",
  },
  stimulus: "radio-repair",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "pertemuan tadi menghidupkan lagi kepeduliannya pada radio yang ditinggalkan",
        },
        {
          correct: false,
          label:
            "ia ingin menjual radio-radio lama di raknya untuk menutup kerugian kios",
        },
        {
          correct: false,
          label:
            "ia mencari kabel lain untuk menyambungkan telepon genggamnya ke radio",
        },
        {
          correct: false,
          label:
            "ia menyesal karena telah memutar rekaman, bukan siaran wayang yang asli",
        },
        {
          correct: false,
          label:
            "ia mungkin akan menutup kiosnya karena tidak ada lagi pemilik radio yang kembali",
        },
      ],
    },
  },
};

export default item;
