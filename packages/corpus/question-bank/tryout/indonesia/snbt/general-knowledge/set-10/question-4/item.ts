import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Eine Anweisung verwendet das Wort 'bald' ohne Zeitgrenze, sodass zwei Personen sie unterschiedlich auslegen.",
        },
        {
          isCorrect: true,
          label:
            "Die Schlussfolgerung gilt als vorläufig, bis eine Wiederholung mit breiterer Stichprobe abgeschlossen ist.",
        },
        {
          isCorrect: false,
          label:
            "Die Lesenden erschließen die Haltung aus ausgewählten Einzelheiten, obwohl sie nicht direkt genannt wird.",
        },
        {
          isCorrect: false,
          label:
            "Das Feldverfahren wird bei verändertem Wetter angepasst, ohne das Hauptziel oder die zentralen Messregeln zu ändern.",
        },
        {
          isCorrect: false,
          label:
            "Die letzte zusätzliche Einheit bringt gegenüber der vorherigen nur einen geringen Mehrnutzen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "An instruction uses 'soon' without a time limit, causing two operators to interpret it differently.",
        },
        {
          isCorrect: true,
          label:
            "The conclusion is treated as provisional until replication with a broader sample is complete.",
        },
        {
          isCorrect: false,
          label:
            "Readers infer the author's position from selected details even though it is not stated directly.",
        },
        {
          isCorrect: false,
          label:
            "The field procedure is adjusted when the weather changes without altering the main objective or measurement rules.",
        },
        {
          isCorrect: false,
          label:
            "The final additional unit provides only a small increase in benefit compared with the previous unit.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
        {
          isCorrect: true,
          label:
            "Simpulan diberi status sementara sampai pengulangan dengan sampel lebih luas selesai.",
        },
        {
          isCorrect: false,
          label:
            "Pembaca menyimpulkan sikap penulis dari pilihan rincian meskipun sikap itu tidak dinyatakan langsung.",
        },
        {
          isCorrect: false,
          label:
            "Prosedur lapangan disesuaikan saat cuaca berubah tanpa mengubah tujuan dan aturan ukur utama.",
        },
        {
          isCorrect: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
      ],
    },
  },
};

export default item;
