import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Peserta menyatakan bahwa pendamping memberikan masukan karier yang berguna.",
        },
        {
          correct: false,
          label:
            "Jumlah pendaftar program pendampingan meningkat sepanjang tahun.",
        },
        {
          correct: false,
          label:
            "Audit independen membenarkan angka perpanjangan kontrak yang dilaporkan.",
        },
        {
          correct: false,
          label:
            "Beberapa departemen berencana menambah sesi pendampingan tahun depan.",
        },
        {
          correct: true,
          label:
            "Kontrak diperpanjang otomatis kecuali pekerja mengirim formulir penolakan.",
        },
      ],
    },
  },
};

export default item;
