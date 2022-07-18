export interface MahasiswaByNimResult {
  nim: string;
  no_pendaftaran: string;
  nama: string;
  emailStimata?: any;
  no_telp?: any;
  tgl_masuk?: any;
  tgl_keluar?: any;
  no_do?: any;
  lama_studi?: any;
  id_master_jenjang: number;
  kode_prodi: string;
  id_master_kelas: number;
  status_mhs_id: number;
  nip: string;
  statusmahasiswa: string;
  jenjang: string;
  prodi: string;
  status_daftar_mahasiswa: string;
  nik: string;
  tempat_lahir: string;
  tgl_lahir: string;
  alamat_domisili: string;
  alamat_asal: string;
  tahun_masuk: string;
  jenis_kelamin: number;
  nama_ibu?: any;
  nama_ayah?: any;
  agama: string;
  asal_sekolah?: any;
  alamat_asal_sekolah?: any;
  jurusan_asal_sekolah?: any;
  danem?: any;
  status_daftar_mhs_id: number;
  dosenwali: string;
}

export interface MahasiswaByNim {
  status: number;
  msg: string;
  result: MahasiswaByNimResult[];
}
