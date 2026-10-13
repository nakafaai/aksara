import { Array as Arr } from "effect";

import {
  doc,
  paragraph,
  place,
  text,
} from "#contracts/test/assessment/document";
import { hash, plainPart, singleChoice } from "#contracts/test/assessment/item";

const SET_10 =
  "question-bank/tryout/indonesia/snbt/general-knowledge-and-understanding/set-10";

/** The namespaced identifier of the first passage of SNBT general knowledge set 10. */
export const PASSAGE_ID = `${SET_10}/passage-1`;

/**
 * The passage that questions 10, 11, and 12 of that set share, in Indonesian,
 * word for word as `question.id.mdx` of question 10 writes it above its
 * question.
 */
export const passageDocument = doc(
  paragraph(
    text(
      "Pasar kota hendak menambahkan label asal pada makanan olahan. Uji awal menunjukkan satu kemasan keripik bertuliskan “Dibuat di Desa Rawa”, padahal singkong ditanam di dua kabupaten, diiris di desa tersebut, digoreng di kota, lalu dikemas oleh distributor lain. Semua keterangan itu benar, tetapi kata asal membuat pembeli menafsirkannya sebagai satu lokasi."
    )
  ),
  paragraph(
    text(
      "Pedagang meminta label singkat karena ruang kemasan terbatas. Kelompok konsumen meminta informasi yang dapat diperiksa ketika muncul masalah mutu. Tim lalu membedakan asal bahan, tempat pengolahan, dan pihak yang menangani setiap tahap. Kode pada kemasan mengarah ke catatan yang lebih lengkap, sedangkan bagian depan hanya menampilkan dua informasi yang paling relevan bagi produk."
    )
  ),
  paragraph(
    text(
      "Sistem itu diuji melalui penarikan simulasi. Ketika satu batch minyak goreng diberi tanda bermasalah, catatan berlapis mempersempit produk yang perlu ditarik. Label satu lokasi justru mencampurkan produk dari bahan dan masa produksi berbeda. Namun, tim juga menemukan kode yang tidak berguna jika catatan pemasok tidak diperbarui."
    )
  ),
  paragraph(
    text(
      "Pasar menyebut ketertelusuran sebagai kemampuan mengikuti perjalanan produk, bukan sekadar menempelkan nama tempat. Sistem yang baik harus cukup ringkas bagi pembeli, cukup rinci untuk pemeriksaan, dan diperbarui sepanjang rantai pasok."
    )
  )
);

/** The shared reading as one stimulus version in Indonesian. */
export const passageVersion = {
  deliveryLanguage: "id",
  document: passageDocument,
  hash: hash("a"),
  id: PASSAGE_ID,
};

/** Builds the family of one question of the passage set. */
function passageFamily(number: number) {
  return { id: `${SET_10}/question-${number}`, stimulus: PASSAGE_ID };
}

/** Builds one version of a passage question, in Indonesian. */
function passageQuestion(
  number: number,
  question: string,
  options: readonly object[],
  digit: string
) {
  return {
    deliveryLanguage: "id",
    family: passageFamily(number).id,
    hash: hash(digit),
    interactions: [singleChoice(options)],
    prompt: doc(paragraph(text(question)), place("answer")),
    scoring: [],
    stimulus: { hash: passageVersion.hash, id: PASSAGE_ID },
  };
}

/** SNBT general knowledge set 10, question 10. The correct option is `option-5`. */
export const snbtQuestion10 = passageQuestion(
  10,
  "Temuan tambahan manakah yang paling melemahkan dugaan bahwa catatan berlapis kembali mempersempit cakupan penarikan pada simulasi yang sebanding?",
  [
    plainPart(
      "option-1",
      "Audit kedua menunjukkan catatan yang diperbarui pada setiap tahap dapat melacak batch bermasalah tanpa menarik produk yang tidak terkait."
    ),
    plainPart(
      "option-2",
      "Simulasi lain menunjukkan bahwa kode satu lokasi mempercepat penelusuran, tetapi tidak dapat membedakan dua pemasok yang beroperasi di lokasi yang sama."
    ),
    plainPart(
      "option-3",
      "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap."
    ),
    plainPart("option-4", "Singkong diiris di Desa Rawa dan digoreng di kota."),
    plainPart(
      "option-5",
      "Pada simulasi lanjutan dengan kasus yang sebanding, catatan berlapis dan label satu lokasi menghasilkan cakupan penarikan yang sama persis meskipun semua data telah diperbarui."
    ),
  ],
  "1"
);

/** SNBT general knowledge set 10, question 11. The correct option is `option-1`. */
export const snbtQuestion11 = passageQuestion(
  11,
  "Simpulan tentang makna yang ditangkap pembeli dari satu nama tempat manakah yang didukung bacaan?",
  [
    plainPart(
      "option-1",
      "Satu nama tempat dapat benar tetapi tetap menyesatkan jika pembaca menganggapnya mewakili seluruh perjalanan produk."
    ),
    plainPart(
      "option-2",
      "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan."
    ),
    plainPart(
      "option-3",
      "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui."
    ),
    plainPart("option-4", "Singkong diiris di Desa Rawa dan digoreng di kota."),
    plainPart(
      "option-5",
      "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap."
    ),
  ],
  "2"
);

/** SNBT general knowledge set 10, question 12. The correct option is `option-2`. */
export const snbtQuestion12 = passageQuestion(
  12,
  "Parafrasa manakah yang mempertahankan definisi ketertelusuran beserta syarat pembaruan pada paragraf terakhir?",
  [
    plainPart(
      "option-1",
      "Semua tahap produksi harus dicetak lengkap di bagian depan setiap kemasan."
    ),
    plainPart(
      "option-2",
      "Ketertelusuran menghubungkan produk dengan catatan perjalanan yang terus diperbarui, bukan hanya sebuah lokasi."
    ),
    plainPart(
      "option-3",
      "Jika kode tersedia, catatan pemasok tidak perlu lagi diperbarui."
    ),
    plainPart("option-4", "Singkong diiris di Desa Rawa dan digoreng di kota."),
    plainPart(
      "option-5",
      "Ketertelusuran cukup menghubungkan produk dengan alamat distributor terakhir tanpa catatan tahap sebelumnya."
    ),
  ],
  "3"
);

/** The three families that share the first passage. */
export const passageFamilies = Arr.map([10, 11, 12], (number) =>
  passageFamily(number)
);
