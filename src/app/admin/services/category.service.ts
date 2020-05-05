import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { aCategory } from '../store/aCategory/aCategory.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = environment.backendUrl.admin + 'category';

  public form: FormGroup = new FormGroup({
    _id: new FormControl(null),
    name: new FormControl('',[Validators.required, Validators.minLength(3)]),
  });
  constructor(private httpClient: HttpClient) { }

  initialzeFormGroup() {
    this.form.setValue({
      _id: null,
      name: ''
    });
  }

  populateForm(formValues) {
    this.form.setValue(formValues);
  }

  list() {
    return this.httpClient.get<aCategory[]>(this.url);
  }

  insert(category: aCategory) {
    return this.httpClient.put<aCategory>(this.url, category);
  }

  update(form) {
    return this.httpClient.post(this.url, form);
  }

  delete(_id: string) {
    return this.httpClient.delete(this.url, {
      params: new HttpParams().set('_id', _id)
    });
  }
}
