import { z } from "zod";

const kendaraanSchema = z.object({
  id: z.string(),
  no_daftar: z.string(),
  no_daftar_eri: z.string(),
  id_kepemilikan: z.string(),
  no_kk: z.string(),
  no_polisi: z.string(),
  no_polisi_lama: z.string().optional(),
  nama_pemilik: z.string(),
  nama_pemilik_lama: z.string().optional(),
  alamat1: z.string(),
  alamat2: z.string().optional(),
  id_kelurahan: z.string().optional(),
  no_telp: z.string(),
  id_jenis_kendaraan: z.string(),
  id_merk_kendaraan: z.string(),
  id_type_kendaraan: z.string(),
  id_model_kendaraan: z.string(),
  id_jenis_map: z.string().optional(),
  tahun_buat: z.number().int().positive(),
  tahun_rakit: z.number().int().positive(),
  tahun_ub: z.number().int().positive(),
  cylinder: z.number().int().positive(),
  id_golongan_kendaraan: z.string().optional(),
  id_warna_tnkb: z.number().int().positive().optional(),
  warna_kendaraan: z.string(),
  id_lokasi: z.string().optional(),
  dati2_induk: z.string().optional(),
  id_fungsi_kendaraan: z.number().int().positive().optional(),
  id_bahan_bakar: z.number().int().positive().optional(),
  no_rangka: z.string(),
  no_mesin: z.string(),
  no_bpkb: z.string(),
  jumlah_sumbu: z.number().int().positive().optional(),
  kode_jenis: z.string().optional(),
  status_blokir: z.boolean(),
  progresif: z.number().int(),
  progresif_tarif: z.number().int(),
  id_pendaftaran: z.string().optional(),
  id_lokasi_proses: z.string().optional(),
  dati2_proses: z.string().optional(),
  tujuan_mutasi: z.string().optional(),
  tanggal_faktur: z.coerce.date(),
  tanggal_kwitansi: z.coerce.date(),
  tanggal_akhir_stnk: z.coerce.date(),
  tanggal_akhir_stnk_lama: z.coerce.date(),
  tanggal_jatuh_tempo: z.coerce.date(),
  tanggal_jatuh_tempo_lama: z.coerce.date(),
  id_status: z.string().optional(),
  bbn1_pokok: z.number().nonnegative(),
  bbn1_denda: z.number().nonnegative(),
  pkb_pokok: z.number().nonnegative(),
  pkb_denda: z.number().nonnegative(),
  pkb_bunga: z.number().nonnegative(),
  swdkllj_pokok: z.number().nonnegative(),
  swdkllj_denda: z.number().nonnegative(),
  stnk: z.number().nonnegative(),
  no_skpd: z.string(),
  no_kohir: z.string(),
  no_skum: z.string(),
  tanggal_daftar: z.coerce.date().optional(),
  tanggal_bayar: z.coerce.date().optional(),
  tahun_berlaku: z.number().int(),
  tanggal_max_bayar_bbn: z.coerce.date(),
  tanggal_max_bayar_pkb: z.coerce.date(),
  tanggal_max_bayar_swdkllj: z.coerce.date(),
  kode_pembayaran: z.string().optional(),
  dpwkp: z.number().optional(),
  ket_dpwkp: z.string().optional(),
  tanggal_jatuh_tempo_dpwkp: z.coerce.date().optional(),
  subsidi: z.boolean(),
  njkb: z.number().nonnegative(),
});

export default kendaraanSchema;
