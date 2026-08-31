import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Lesenden erschließen die Haltung aus ausgewählten Einzelheiten, obwohl sie nicht direkt genannt wird.",
        },
        {
          isCorrect: false,
          label:
            "Das Modell berücksichtigt Wechselwirkungen zwischen Wetter, Nutzerverhalten und Fahrplan, statt nur eine Ursache zu suchen.",
        },
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung gilt als vorläufig, bis eine Wiederholung mit breiterer Stichprobe abgeschlossen ist.",
        },
        {
          isCorrect: true,
          label:
            "Eine Anweisung verwendet das Wort 'bald' ohne Zeitgrenze, sodass zwei Personen sie unterschiedlich auslegen.",
        },
        {
          isCorrect: false,
          label:
            "Die Methode erlaubt mehrere Durchführungswege, die denselben Ergebniskriterien unterliegen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Readers infer the author's position from selected details even though it is not stated directly.",
        },
        {
          isCorrect: false,
          label:
            "The model considers interactions among weather, user behaviour, and service schedules instead of seeking one cause.",
        },
        {
          isCorrect: false,
          label:
            "The conclusion is treated as provisional until replication with a broader sample is complete.",
        },
        {
          isCorrect: true,
          label:
            "An instruction uses 'soon' without a time limit, causing two operators to interpret it differently.",
        },
        {
          isCorrect: false,
          label:
            "The method allows several implementation paths that remain subject to the same outcome criteria.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pembaca menyimpulkan sikap penulis dari pilihan rincian meskipun sikap itu tidak dinyatakan langsung.",
        },
        {
          isCorrect: false,
          label:
            "Model mempertimbangkan interaksi cuaca, perilaku pengguna, dan jadwal layanan alih-alih mencari satu penyebab tunggal.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan diberi status sementara sampai pengulangan dengan sampel lebih luas selesai.",
        },
        {
          isCorrect: true,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
      ],
    },
  },
};

export default item;
