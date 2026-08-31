import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Annahmen, Datengrenzen und Entscheidungskriterien werden im Bericht unmittelbar genannt.",
        },
        {
          isCorrect: false,
          label:
            "Eine Anweisung verwendet das Wort 'bald' ohne Zeitgrenze, sodass zwei Personen sie unterschiedlich auslegen.",
        },
        {
          isCorrect: false,
          label:
            "Die Schlussfolgerung gilt als vorläufig, bis eine Wiederholung mit breiterer Stichprobe abgeschlossen ist.",
        },
        {
          isCorrect: true,
          label:
            "Die Lesenden erschließen die Haltung aus ausgewählten Einzelheiten, obwohl sie nicht direkt genannt wird.",
        },
        {
          isCorrect: false,
          label:
            "Das Team verwirft eine ansprechende Grafik, weil sie die Forschungsfrage nicht beantwortet.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The assumptions, data limits, and decision criteria are stated directly in the report.",
        },
        {
          isCorrect: false,
          label:
            "An instruction uses 'soon' without a time limit, causing two operators to interpret it differently.",
        },
        {
          isCorrect: false,
          label:
            "The conclusion is treated as provisional until replication with a broader sample is complete.",
        },
        {
          isCorrect: true,
          label:
            "Readers infer the author's position from selected details even though it is not stated directly.",
        },
        {
          isCorrect: false,
          label:
            "The team rejects an attractive chart because it does not answer the research question.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
        },
        {
          isCorrect: false,
          label:
            "Petunjuk memakai kata 'segera' tanpa batas waktu sehingga dua pelaksana menafsirkannya secara berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan diberi status sementara sampai pengulangan dengan sampel lebih luas selesai.",
        },
        {
          isCorrect: true,
          label:
            "Pembaca menyimpulkan sikap penulis dari pilihan rincian meskipun sikap itu tidak dinyatakan langsung.",
        },
        {
          isCorrect: false,
          label:
            "Tim menolak grafik yang menarik karena grafik itu tidak menjawab pertanyaan penelitian.",
        },
      ],
    },
  },
};

export default item;
