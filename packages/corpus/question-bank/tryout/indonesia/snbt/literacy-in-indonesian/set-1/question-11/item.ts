import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Berhenti sejenak dari kegiatan dan menyaksikan keindahan matahari terbenam",
        },
        {
          correct: false,
          label:
            "Menghentikan seluruh pekerjaan untuk beristirahat sepanjang hari",
        },
        {
          correct: false,
          label: "Mengabaikan keadaan sekitar agar dapat menikmati hidup",
        },
        {
          correct: false,
          label: "Menjauhi semua kesibukan di kota secara permanen",
        },
        {
          correct: false,
          label: "Menghitung waktu yang tersisa sebelum malam",
        },
      ],
    },
  },
};

export default item;
