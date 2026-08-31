import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Der Rückgang entstand, weil die Bibliothek während des Tests den Großteil der Ausleihe schloss.",
        },
        {
          isCorrect: false,
          label:
            "Nach aktualisierten Kontaktdaten sinken die Verspätungen auch bei zuvor nicht erreichten Nutzern.",
        },
        {
          isCorrect: false,
          label:
            "Das neue Kartendesign macht die Erinnerung besser lesbar, verändert aber nicht den Anteil der Nutzer mit gültiger Telefonnummer.",
        },
        {
          isCorrect: false,
          label:
            "Der Test wird um zwei Erinnerungswege und ein Einspruchsverfahren erweitert.",
        },
        {
          isCorrect: false,
          label:
            "Einige Nutzer erhielten wegen geänderter Telefonnummern keine Nachricht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "The decline in delays occurred because the library closed most lending services during the trial.",
        },
        {
          isCorrect: false,
          label:
            "After contact details are updated, delays also fall among users who previously missed messages.",
        },
        {
          isCorrect: false,
          label:
            "The new card design makes the reminder easier to read but does not change the proportion of users with a valid telephone number.",
        },
        {
          isCorrect: false,
          label:
            "The trial will expand with two reminder channels and an appeal process.",
        },
        {
          isCorrect: false,
          label:
            "Some users did not receive messages because their phone numbers had changed.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Penurunan keterlambatan ternyata terjadi karena perpustakaan menutup sebagian besar layanan peminjaman selama masa uji.",
        },
        {
          isCorrect: false,
          label:
            "Setelah nomor kontak diperbarui, penurunan keterlambatan juga terjadi pada kelompok yang sebelumnya tidak menerima pesan.",
        },
        {
          isCorrect: false,
          label:
            "Desain kartu baru membuat pengingat lebih mudah dibaca, tetapi tidak mengubah proporsi pengguna dengan nomor telepon yang masih aktif.",
        },
        {
          isCorrect: false,
          label:
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pengguna tidak menerima pesan karena nomor telepon berubah.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
