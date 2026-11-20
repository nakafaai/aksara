// biome-ignore-all lint/suspicious/noBitwiseOperators: SHA-256 is defined on 32-bit words (FIPS 180-4), so its rotations, shifts, and logical functions are bitwise by definition.
/**
 * The 64 round constants of SHA-256: the first 32 bits of the fractional parts
 * of the cube roots of the first 64 primes (FIPS 180-4, section 4.2.2).
 */
const ROUND_CONSTANTS = new Uint32Array([
  0x42_8a_2f_98, 0x71_37_44_91, 0xb5_c0_fb_cf, 0xe9_b5_db_a5, 0x39_56_c2_5b,
  0x59_f1_11_f1, 0x92_3f_82_a4, 0xab_1c_5e_d5, 0xd8_07_aa_98, 0x12_83_5b_01,
  0x24_31_85_be, 0x55_0c_7d_c3, 0x72_be_5d_74, 0x80_de_b1_fe, 0x9b_dc_06_a7,
  0xc1_9b_f1_74, 0xe4_9b_69_c1, 0xef_be_47_86, 0x0f_c1_9d_c6, 0x24_0c_a1_cc,
  0x2d_e9_2c_6f, 0x4a_74_84_aa, 0x5c_b0_a9_dc, 0x76_f9_88_da, 0x98_3e_51_52,
  0xa8_31_c6_6d, 0xb0_03_27_c8, 0xbf_59_7f_c7, 0xc6_e0_0b_f3, 0xd5_a7_91_47,
  0x06_ca_63_51, 0x14_29_29_67, 0x27_b7_0a_85, 0x2e_1b_21_38, 0x4d_2c_6d_fc,
  0x53_38_0d_13, 0x65_0a_73_54, 0x76_6a_0a_bb, 0x81_c2_c9_2e, 0x92_72_2c_85,
  0xa2_bf_e8_a1, 0xa8_1a_66_4b, 0xc2_4b_8b_70, 0xc7_6c_51_a3, 0xd1_92_e8_19,
  0xd6_99_06_24, 0xf4_0e_35_85, 0x10_6a_a0_70, 0x19_a4_c1_16, 0x1e_37_6c_08,
  0x27_48_77_4c, 0x34_b0_bc_b5, 0x39_1c_0c_b3, 0x4e_d8_aa_4a, 0x5b_9c_ca_4f,
  0x68_2e_6f_f3, 0x74_8f_82_ee, 0x78_a5_63_6f, 0x84_c8_78_14, 0x8c_c7_02_08,
  0x90_be_ff_fa, 0xa4_50_6c_eb, 0xbe_f9_a3_f7, 0xc6_71_78_f2,
]);

/**
 * The initial hash value: the first 32 bits of the fractional parts of the
 * square roots of the first 8 primes (FIPS 180-4, section 5.3.3).
 */
const INITIAL_STATE = [
  0x6a_09_e6_67, 0xbb_67_ae_85, 0x3c_6e_f3_72, 0xa5_4f_f5_3a, 0x51_0e_52_7f,
  0x9b_05_68_8c, 0x1f_83_d9_ab, 0x5b_e0_cd_19,
] as const;

const BLOCK_BYTES = 64;
const LENGTH_BYTES = 8;

/** Rotates a 32-bit word right. */
function rotateRight(word: number, bits: number) {
  return (word >>> bits) | (word << (32 - bits));
}

/** Reads one word of a fixed-size word array, which always holds it. */
function at(words: Uint32Array, index: number) {
  return words[index] ?? 0;
}

/** Expands one block into the 64-word message schedule (FIPS 180-4, 6.2.2 step 1). */
function expandSchedule(block: DataView, schedule: Uint32Array) {
  for (let index = 0; index < 16; index += 1) {
    schedule[index] = block.getUint32(index * 4);
  }
  for (let index = 16; index < 64; index += 1) {
    const early = at(schedule, index - 15);
    const late = at(schedule, index - 2);
    const sigma0 =
      rotateRight(early, 7) ^ rotateRight(early, 18) ^ (early >>> 3);
    const sigma1 =
      rotateRight(late, 17) ^ rotateRight(late, 19) ^ (late >>> 10);
    schedule[index] =
      (at(schedule, index - 16) + sigma0 + at(schedule, index - 7) + sigma1) >>>
      0;
  }
}

/** Runs the 64 rounds over the schedule and adds the result to the state (6.2.2 steps 2 to 4). */
function mixRounds(state: Uint32Array, schedule: Uint32Array) {
  let a = at(state, 0);
  let b = at(state, 1);
  let c = at(state, 2);
  let d = at(state, 3);
  let e = at(state, 4);
  let f = at(state, 5);
  let g = at(state, 6);
  let h = at(state, 7);
  for (let index = 0; index < 64; index += 1) {
    const sum1 = rotateRight(e, 6) ^ rotateRight(e, 11) ^ rotateRight(e, 25);
    const choice = (e & f) ^ (~e & g);
    const first =
      (h + sum1 + choice + at(ROUND_CONSTANTS, index) + at(schedule, index)) >>>
      0;
    const sum0 = rotateRight(a, 2) ^ rotateRight(a, 13) ^ rotateRight(a, 22);
    const majority = (a & b) ^ (a & c) ^ (b & c);
    h = g;
    g = f;
    f = e;
    e = (d + first) >>> 0;
    d = c;
    c = b;
    b = a;
    a = (first + sum0 + majority) >>> 0;
  }
  state[0] = (at(state, 0) + a) >>> 0;
  state[1] = (at(state, 1) + b) >>> 0;
  state[2] = (at(state, 2) + c) >>> 0;
  state[3] = (at(state, 3) + d) >>> 0;
  state[4] = (at(state, 4) + e) >>> 0;
  state[5] = (at(state, 5) + f) >>> 0;
  state[6] = (at(state, 6) + g) >>> 0;
  state[7] = (at(state, 7) + h) >>> 0;
}

/**
 * Incremental SHA-256 (FIPS 180-4) over bytes added in pieces. It keeps one
 * 64-byte block and the eight state words, so hashing a stream of any length
 * needs constant memory, and its digest equals Web Crypto's digest of the
 * same bytes joined.
 */
export class Sha256 {
  readonly #state = new Uint32Array(INITIAL_STATE);
  readonly #block = new Uint8Array(BLOCK_BYTES);
  readonly #schedule = new Uint32Array(64);
  #blockLength = 0;
  #totalBytes = 0;

  /** Adds the next bytes of the message. */
  update(bytes: Uint8Array): void {
    this.#totalBytes += bytes.byteLength;
    let offset = 0;
    while (offset < bytes.byteLength) {
      const taken = Math.min(
        BLOCK_BYTES - this.#blockLength,
        bytes.byteLength - offset
      );
      this.#block.set(
        bytes.subarray(offset, offset + taken),
        this.#blockLength
      );
      this.#blockLength += taken;
      offset += taken;
      if (this.#blockLength === BLOCK_BYTES) {
        this.#compress();
        this.#blockLength = 0;
      }
    }
  }

  /**
   * Pads the message, finishes the hash, and returns its 32 digest bytes. It is
   * read once: the padding becomes part of the state.
   */
  digest(): Uint8Array {
    const bitLength = this.#totalBytes * 8;
    this.#block[this.#blockLength] = 0x80;
    this.#blockLength += 1;
    if (this.#blockLength > BLOCK_BYTES - LENGTH_BYTES) {
      this.#block.fill(0, this.#blockLength);
      this.#compress();
      this.#blockLength = 0;
    }
    this.#block.fill(0, this.#blockLength);
    const view = new DataView(this.#block.buffer);
    view.setUint32(BLOCK_BYTES - 8, Math.floor(bitLength / 2 ** 32));
    view.setUint32(BLOCK_BYTES - 4, bitLength >>> 0);
    this.#compress();
    const output = new Uint8Array(32);
    const outputView = new DataView(output.buffer);
    for (let index = 0; index < 8; index += 1) {
      outputView.setUint32(index * 4, at(this.#state, index));
    }
    return output;
  }

  /** Mixes the full 64-byte block into the state words. */
  #compress() {
    expandSchedule(new DataView(this.#block.buffer), this.#schedule);
    mixRounds(this.#state, this.#schedule);
  }
}
