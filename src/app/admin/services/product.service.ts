import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { aProduct } from '../store/aProduct/aProduct.model';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url: string = environment.backendUrl.admin + 'product';
  public form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('',[Validators.required, Validators.minLength(8)]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false)
  });
  constructor(private httpClient: HttpClient) { }


  initialzeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName:'',
      mobile:'',
      email: '',
      city: '',
      gender: '1',
      department: 0,
      hireDate: '',
      isPermanent: false
    });
  }


  list() {
    return this.httpClient.get<aProduct[]>(this.url + '/list');
  }

  insert(product: aProduct) {
    return this.httpClient.put<aProduct>(this.url, product);
  }

  update(form) {
    return this.httpClient.post<aProduct>(this.url, form);
  }

  delete(id: string) {
    return this.httpClient.delete<string>(this.url, {
      params: new HttpParams().set('_id', id)
    });
  }
}
