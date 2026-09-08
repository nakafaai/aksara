import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nach dem Abbau der Zugangshindernisse erscheinen Vorschläge zuvor nicht vertretener Weiler im Ergebnis.",
        },
        {
          isCorrect: false,
          label:
            "Eine überarbeitete Einladung macht Zeitpunkt und Ort der Versammlung leichter auffindbar, ohne die verfügbaren Teilnahmewege zu verändern.",
        },
        {
          isCorrect: false,
          label:
            "Die endgültige Entscheidung wird Auswahl, Einwände und Einfluss der Beiträge festhalten.",
        },
        {
          isCorrect: false,
          label:
            "Fast alle ersten Redebeiträge kamen aus den drei nächstgelegenen Vierteln.",
        },
        {
          isCorrect: true,
          label:
            "Überprüfte Fahrtdaten zeigen, dass früh gehende Bewohner auch nach der Entscheidung eine gleichwertige Rückfahrt hatten, aber aus persönlichen Gründen früher aufbrachen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "After access barriers are reduced, proposals from previously unrepresented hamlets appear in the consultation results.",
        },
        {
          isCorrect: false,
          label:
            "A revised invitation makes the meeting time and location easier to find without changing the available ways to participate.",
        },
        {
          isCorrect: false,
          label:
            "The final decision will record the choice, objections, and the influence of contributions.",
        },
        {
          isCorrect: false,
          label:
            "Nearly every initial speaker came from the three nearest neighbourhoods.",
        },
        {
          isCorrect: true,
          label:
            "Verified travel records show that residents who left early had equivalent return transport available after the decision session but chose to leave for personal reasons.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setelah hambatan akses dikurangi, usulan dari dusun yang sebelumnya tidak terwakili mulai muncul dalam hasil musyawarah.",
        },
        {
          isCorrect: false,
          label:
            "Undangan yang direvisi membuat waktu dan lokasi musyawarah lebih mudah ditemukan tanpa mengubah jalur partisipasi yang tersedia.",
        },
        {
          isCorrect: false,
          label:
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
        {
          isCorrect: false,
          label:
            "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat.",
        },
        {
          isCorrect: true,
          label:
            "Catatan perjalanan terverifikasi menunjukkan warga yang pulang lebih awal memiliki angkutan pulang yang setara setelah sesi keputusan, tetapi memilih pergi karena alasan pribadi.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
