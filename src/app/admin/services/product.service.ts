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
    _id: new FormControl(null),
    sku: new FormControl('', [Validators.required, Validators.minLength(5)]),
    name: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    cargo_price: new FormControl('', Validators.required),
    tax_percent: new FormControl('', [Validators.required]),
    cart_desc:  new FormControl('', [Validators.required]),
    short_desc: new FormControl('', [Validators.required]),
    long_desc:  new FormControl(''),
    details: new FormControl(''),
    thumb: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    images: new FormControl(''),
    category: new FormControl('', Validators.required),
    stock: new FormControl(0, Validators.required),
    sell_count: new FormControl(0, Validators.required),
    live: new FormControl(false, Validators.required),
    unlimited: new FormControl(0),
    __v: new FormControl(null),
    date_created: new FormControl(''),
    last_updated: new FormControl('')
  });
  constructor(private httpClient: HttpClient) { }


  initialzeFormGroup() {
    this.form.setValue({
      _id: null,
      __v:null,
      sku: '',
      name: '',
      price: '',
      cargo_price: '',
      tax_percent: '',
      details: '',
      cart_desc:  '',
      short_desc: '',
      long_desc:  '',
      thumb: '',
      image: '',
      images: '',
      category: null,
      stock: 0,
      sell_count: 0,
      live: false,
      date_created: '',
      last_updated: '',
      unlimited: null
    });
  }

  populateForm(formValues) {
    const values = JSON.parse(JSON.stringify(formValues));
    values.category = formValues.category._id;
    values.date_created = values.date_created || values.last_updated;
    this.form.setValue(values);
  }

  list() {
    return this.httpClient.get<aProduct[]>(this.url);
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
