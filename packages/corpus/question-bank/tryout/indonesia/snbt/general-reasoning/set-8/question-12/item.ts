import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Peserta menyatakan bahwa pendamping memberikan masukan karier yang berguna.",
        },
        {
          isCorrect: false,
          label:
            "Jumlah pendaftar program pendampingan meningkat sepanjang tahun.",
        },
        {
          isCorrect: false,
          label:
            "Audit independen membenarkan angka perpanjangan kontrak yang dilaporkan.",
        },
        {
          isCorrect: false,
          label:
            "Beberapa departemen berencana menambah sesi pendampingan tahun depan.",
        },
        {
          isCorrect: true,
          label:
            "Kontrak diperpanjang otomatis kecuali pekerja mengirim formulir penolakan.",
        },
      ],
    },
  },
};

export default item;
