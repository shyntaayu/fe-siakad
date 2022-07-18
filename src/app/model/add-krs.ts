export class ListKrs {
  kode_matkul: string;
  krs_id: number;
}

export class ModelAddKRS {
  jenis_aplikasi: string;
  list_krs: ListKrs[];
  nim: string;
  semester: string;
}
