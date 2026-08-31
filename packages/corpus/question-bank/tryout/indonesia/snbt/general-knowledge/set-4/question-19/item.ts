import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Eine geordnete Kartierung kann einen amtlichen Hauptindex nutzen und weitere Namen samt Belegen und Kontext bewahren.",
        },
        {
          isCorrect: false,
          label:
            "Einige Kartografen halten kürzere amtliche Namen für leichter druckbar und auffindbar.",
        },
        {
          isCorrect: false,
          label:
            "Neue Belege können den Eintrag ändern, ohne die frühere Namensgeschichte zu löschen.",
        },
        {
          isCorrect: false,
          label:
            "Jeder lokale Name muss denselben Rechtsstatus wie der Verwaltungsname erhalten.",
        },
        {
          isCorrect: true,
          label:
            "Schilder, Grundstücksschreiben, Interviews und Koordinaten zeigen, dass alle drei Namen denselben Ort bezeichnen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Orderly mapping can use one official index while retaining other names with their evidence and context.",
        },
        {
          isCorrect: false,
          label:
            "Some mapmakers consider shorter official names easier to print and search.",
        },
        {
          isCorrect: false,
          label:
            "New evidence may revise the record without erasing earlier naming history.",
        },
        {
          isCorrect: false,
          label:
            "Every local name must have the same legal status as the administrative name.",
        },
        {
          isCorrect: true,
          label:
            "Signs, land letters, interviews, and coordinates show that all three names refer to the same location.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Pemetaan yang tertib dapat memakai satu indeks resmi sambil mempertahankan nama lain beserta bukti dan konteksnya.",
        },
        {
          isCorrect: false,
          label:
            "Nama resmi yang lebih pendek dianggap sebagian pemeta lebih mudah dicetak dan dicari.",
        },
        {
          isCorrect: false,
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi.",
        },
        {
          isCorrect: true,
          label:
            "Papan, surat tanah, wawancara, dan koordinat menunjukkan bahwa ketiga nama merujuk pada lokasi yang sama.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
