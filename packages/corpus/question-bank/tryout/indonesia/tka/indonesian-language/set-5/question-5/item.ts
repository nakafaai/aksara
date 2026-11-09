import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "clinic-queue",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "loket khusus menyebabkan Pak Harun harus menunggu selama dua jam",
        },
        {
          correct: true,
          label:
            "pengalaman Pak Harun menggambarkan masalah yang kemudian ditanggapi dengan loket pendaftaran manual tersendiri",
        },
        {
          correct: false,
          label:
            "cerita Pak Harun membuktikan bahwa aplikasi antrean tidak berguna bagi semua warga",
        },
        {
          correct: false,
          label:
            "loket khusus dibuka hanya untuk pasien yang lupa membawa kartu berobat",
        },
        {
          correct: false,
          label:
            "cerita Pak Harun tidak berhubungan dengan perubahan layanan puskesmas",
        },
      ],
    },
  },
};

export default item;
